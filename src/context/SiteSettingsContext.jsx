import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const defaultSettings = {
  logo: '/logo.png',
  orgName: "Brown Heart Care",
  tagline: "We breathe out love for others to inhale",
  heroTitle: "Touching Lives, Restoring Hope for Underserved Communities",
  heroSubtitle: "We are a dedicated outreach foundation providing free health screenings, food, clothing, and essential care to the poor and vulnerable.",
  stats: {
    livesTouched: '0',
    outreachEvents: '0',
    activeVolunteers: '0',
    aidDistributed: '0'
  },
  socialLinks: {
    instagram: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    twitter: '',
    whatsapp: 'https://wa.me/2348136374060'
  },
  contactInfo: {
    phone: '08136374060 / 09150973161 (Mrs. Brown) | +234 810 736 9839 (Miss Esther)',
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
      id: 'story-2024',
      year: '2024',
      title: 'Free Health Screening & Cardiac Care Outreach',
      description: 'Expanded community medical drives across rural and underserved districts, providing free diagnostic screenings, ECGs, blood pressure checks, and essential medications.',
      image: '/hero/PHOTO-2026-09-01-13-37-18.jpg'
    },
    {
      id: 'story-2023',
      year: '2023',
      title: 'Nutritional Security & Grain Relief Program',
      description: 'Launched our food distribution initiative delivering nutrient-balanced grain packages and healthy food kits to low-income families and senior citizens.',
      image: '/hero/PHOTO-2026-09-01-13-37-25.jpg'
    }
  ]
};

const SiteSettingsContext = createContext();

export function SiteSettingsProvider({ children }) {
  // Main settings state
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

  // Dynamic Events State (Starts empty, no gimmicks!)
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('bhc_events');
    return saved ? JSON.parse(saved) : [];
  });

  // Dynamic Highlights State (Starts empty, no gimmicks!)
  const [highlights, setHighlights] = useState(() => {
    const saved = localStorage.getItem('bhc_highlights');
    return saved ? JSON.parse(saved) : [];
  });

  // Dynamic Volunteers Roster State
  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('bhc_volunteers_roster');
    return saved ? JSON.parse(saved) : [];
  });

  // Dynamic Donations State
  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('bhc_donations');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch remote settings from Supabase if connected
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
          if (remoteObj.events) setEvents(remoteObj.events);
          if (remoteObj.highlights) setHighlights(remoteObj.highlights);
        }
      } catch (err) {
        console.log('Supabase sync notice:', err.message || err);
      }
    }
    loadRemoteSettings();
  }, []);

  // Save Settings helper
  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('bhc_site_settings', JSON.stringify(updated));

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

  // Helper functions for Events
  const addEvent = (newEvent) => {
    const updated = [newEvent, ...events];
    setEvents(updated);
    localStorage.setItem('bhc_events', JSON.stringify(updated));
    updateSettings({ events: updated });
  };

  const updateEventsList = (updatedEvents) => {
    setEvents(updatedEvents);
    localStorage.setItem('bhc_events', JSON.stringify(updatedEvents));
    updateSettings({ events: updatedEvents });
  };

  const deleteEvent = (eventId) => {
    const updated = events.filter(e => e.id !== eventId);
    setEvents(updated);
    localStorage.setItem('bhc_events', JSON.stringify(updated));
    updateSettings({ events: updated });
  };

  // Helper functions for Highlights / Video Showcase
  const addHighlight = (newHighlight) => {
    const updated = [newHighlight, ...highlights];
    setHighlights(updated);
    localStorage.setItem('bhc_highlights', JSON.stringify(updated));
    updateSettings({ highlights: updated });
  };

  const updateHighlightsList = (updatedHighlights) => {
    setHighlights(updatedHighlights);
    localStorage.setItem('bhc_highlights', JSON.stringify(updatedHighlights));
    updateSettings({ highlights: updatedHighlights });
  };

  const deleteHighlight = (highlightId) => {
    const updated = highlights.filter(h => h.id !== highlightId);
    setHighlights(updated);
    localStorage.setItem('bhc_highlights', JSON.stringify(updated));
    updateSettings({ highlights: updated });
  };

  // Helper functions for Volunteers
  const addVolunteer = (newVol) => {
    const updated = [newVol, ...volunteers];
    setVolunteers(updated);
    localStorage.setItem('bhc_volunteers_roster', JSON.stringify(updated));

    // Live auto-increment active volunteers count in settings stats
    const currentCount = parseInt(settings?.stats?.activeVolunteers || '0', 10) || 0;
    const newCount = (currentCount + 1).toString();
    updateStats({ activeVolunteers: newCount });
  };

  const deleteVolunteer = (volId) => {
    const updated = volunteers.filter(v => v.id !== volId);
    setVolunteers(updated);
    localStorage.setItem('bhc_volunteers_roster', JSON.stringify(updated));
  };

  // Helper functions for Donations
  const addDonation = (newDonation) => {
    const updated = [newDonation, ...donations];
    setDonations(updated);
    localStorage.setItem('bhc_donations', JSON.stringify(updated));
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
        events,
        addEvent,
        updateEventsList,
        deleteEvent,
        highlights,
        addHighlight,
        updateHighlightsList,
        deleteHighlight,
        volunteers,
        addVolunteer,
        deleteVolunteer,
        donations,
        addDonation,
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
