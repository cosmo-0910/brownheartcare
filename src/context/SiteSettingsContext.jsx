import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const defaultSettings = {
  logo: '/logo.png',
  orgName: "Brown Heart Care",
  tagline: "We breathe out love for others to inhale",
  heroTitle: "Touching Lives, Restoring Hope for Underserved Communities",
  heroSubtitle: "We are a dedicated outreach foundation providing free health screenings, food, clothing, and essential care to the poor and vulnerable.",
  stats: {
    livesTouched: '5,000+',
    outreachEvents: '120+',
    activeVolunteers: '450+',
    aidDistributed: '10,000+'
  },
  socialLinks: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    whatsapp: 'https://wa.me/2348136374060'
  },
  contactInfo: {
    phone: '08136374060 / 09150973161 (Miss. Brown) | +234 810 736 9839 (Miss Esther)',
    mrsBrownPhone: '08136374060 / 09150973161',
    missEstherPhone: '+234 810 736 9839',
    email: 'brownheartcare@gmail.com',
    address: 'Lagos, Nigeria'
  },
  bankDetails: {
    bankName: 'Lotus Bank',
    accountNumber: '1009761198',
    accountName: 'Aina Esther Oluwatoyin'
  },
  ourStoryEntries: [
    {
      id: 'story-1',
      year: '2023',
      title: 'Rural Community Health Screening & Aid',
      description: 'Conducted comprehensive health screenings, free vital checks, and distributed over 1,500 care packages to elderly residents in underserved rural districts.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'story-2',
      year: '2024',
      title: 'Emergency Relief & Food Distribution Drive',
      description: 'Mobilized 80+ volunteers to provide hot meals, clean water, and nutritional kits to 2,000+ vulnerable families during flood disaster recovery.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
    }
  ]
};

const SiteSettingsContext = createContext();

export function SiteSettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('bhc_site_settings');
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse site settings from localStorage', e);
      }
    }
    return defaultSettings;
  });

  // Fetch remote settings from Supabase if table exists
  useEffect(() => {
    async function loadRemoteSettings() {
      try {
        const { data, error } = await supabase.from('site_content').select('*');
        if (data && data.length > 0 && !error) {
          const remoteObj = {};
          data.forEach(item => {
            remoteObj[item.key] = item.value;
          });
          setSettings(prev => ({ ...prev, ...remoteObj }));
        }
      } catch (err) {
        console.log('Supabase sync notice:', err.message || err);
      }
    }
    loadRemoteSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('bhc_site_settings', JSON.stringify(updated));

    // Async persist to Supabase if connected
    try {
      for (const [key, value] of Object.entries(newSettings)) {
        await supabase.from('site_content').upsert({
          key,
          value,
          updated_at: new Date().toISOString()
        });
      }
    } catch (e) {
      console.warn('Local save successful; Supabase sync deferred:', e.message);
    }
  };

  const updateStats = (newStats) => {
    updateSettings({ stats: { ...settings.stats, ...newStats } });
  };

  const updateSocialLinks = (newSocials) => {
    updateSettings({ socialLinks: { ...settings.socialLinks, ...newSocials } });
  };

  const updateContactInfo = (newContact) => {
    updateSettings({ contactInfo: { ...settings.contactInfo, ...newContact } });
  };

  const addStoryEntry = (entry) => {
    const updatedStories = [entry, ...settings.ourStoryEntries];
    updateSettings({ ourStoryEntries: updatedStories });
  };

  const updateStoryEntry = (id, updatedFields) => {
    const updatedStories = settings.ourStoryEntries.map(story =>
      story.id === id ? { ...story, ...updatedFields } : story
    );
    updateSettings({ ourStoryEntries: updatedStories });
  };

  const deleteStoryEntry = (id) => {
    const updatedStories = settings.ourStoryEntries.filter(s => s.id !== id);
    updateSettings({ ourStoryEntries: updatedStories });
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateStats,
        updateSocialLinks,
        updateContactInfo,
        addStoryEntry,
        updateStoryEntry,
        deleteStoryEntry
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
}
