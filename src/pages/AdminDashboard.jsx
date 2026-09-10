import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function AdminDashboard({ 
  setCurrentPage, 
  donations: propsDonations, 
  volunteers: propsVolunteers, 
  events: propsEvents, 
  highlights: propsHighlights, 
  onUpdateEvents: propsOnUpdateEvents, 
  onUpdateHighlights: propsOnUpdateHighlights 
}) {
  const { 
    settings, 
    updateSettings, 
    updateStats, 
    updateSocialLinks, 
    updateContactInfo, 
    addStoryEntry, 
    updateStoryEntry,
    deleteStoryEntry,
    donations: ctxDonations,
    volunteers: ctxVolunteers,
    events: ctxEvents,
    highlights: ctxHighlights,
    updateEventsList,
    updateSingleEvent,
    deleteVolunteer,
    updateHighlightsList
  } = useSiteSettings();

  const donations = propsDonations || ctxDonations || [];
  const volunteers = propsVolunteers || ctxVolunteers || [];
  const events = propsEvents || ctxEvents || [];
  const highlights = propsHighlights || ctxHighlights || [];

  const onUpdateEvents = propsOnUpdateEvents || updateEventsList;
  const onUpdateHighlights = propsOnUpdateHighlights || updateHighlightsList;

  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [passError, setPassError] = useState(false);

  const [activeTab, setActiveTab] = useState('overview');

  // Selected Item Modal States
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [invitationMessage, setInvitationMessage] = useState('');
  const [invitationSent, setInvitationSent] = useState(false);
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Safe Date Formatting Helper to prevent crashes from bad date strings
  const safeFormatDate = (val) => {
    if (!val) return 'Recent';
    try {
      const d = new Date(val);
      return isNaN(d.getTime()) ? String(val) : d.toLocaleDateString();
    } catch (e) {
      return String(val);
    }
  };

  // Content Manager Forms State
  const [statsForm, setStatsForm] = useState(settings?.stats || { livesTouched: '0', outreachEvents: '0', activeVolunteers: '0', aidDistributed: '0' });
  const [socialsForm, setSocialsForm] = useState(settings?.socialLinks || {});
  const [contactForm, setContactForm] = useState(settings?.contactInfo || {});
  const [brandingForm, setBrandingForm] = useState({
    orgName: settings?.orgName || 'Brown Heart Care',
    tagline: settings?.tagline || '',
    heroTitle: settings?.heroTitle || '',
    heroSubtitle: settings?.heroSubtitle || '',
    logo: settings?.logo || ''
  });

  // Story Form State
  const [newStory, setNewStory] = useState({
    year: new Date().getFullYear().toString(),
    title: '',
    description: '',
    image: ''
  });

  // New Event Form State with Status, Full Background Details & Multiple Gallery Files
  const [newEvent, setNewEvent] = useState({
    title: '',
    typeLabel: 'Community Outreach',
    status: 'Upcoming', // 'Upcoming', 'Current', 'Past'
    date: '',
    location: '',
    desc: '',
    fullDetails: '',
    img: '',
    galleryPhotos: [],
    videoUrl: '',
    featured: true
  });

  // New Media Highlight Form State with Auto Duration
  const [newHighlight, setNewHighlight] = useState({
    title: '',
    category: 'medical',
    categoryLabel: 'Medical Outreach',
    duration: '04:30',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    views: '1.2K views',
    desc: '',
    videoUrl: '',
    galleryPhotos: [],
    featured: true
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const adminPass = import.meta.env.VITE_ADMIN_PASSCODE || 'bhcareexec';
    if (passcode === adminPass) {
      setAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleSaveBranding = (e) => {
    e.preventDefault();
    updateSettings(brandingForm);
    alert('Branding and tagline saved to live site!');
  };

  const handleSaveStats = (e) => {
    e.preventDefault();
    updateStats(statsForm);
    alert('Impact statistics updated live on front-end!');
  };

  const handleSaveSocials = (e) => {
    e.preventDefault();
    updateSocialLinks(socialsForm);
    alert('Social media links updated live across header, footer, and contact page!');
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    updateContactInfo(contactForm);
    alert('Contact information updated live!');
  };

  // Editing Story State
  const [editingStory, setEditingStory] = useState(null);

  const handleEditStoryClick = (story) => {
    setEditingStory({ ...story });
  };

  const handleSaveEditedStory = (e) => {
    e.preventDefault();
    if (!editingStory || !editingStory.title) return;
    updateStoryEntry(editingStory.id, {
      year: editingStory.year,
      title: editingStory.title,
      description: editingStory.description,
      image: editingStory.image
    });
    setEditingStory(null);
    alert('Our Story timeline record updated live!');
  };

  const handleAddStory = (e) => {
    e.preventDefault();
    if (!newStory.title) return;
    addStoryEntry({
      id: `story-${Date.now()}`,
      ...newStory,
      image: newStory.image || '/hero/PHOTO-2026-09-01-13-37-18.jpg'
    });
    setNewStory({ year: new Date().getFullYear().toString(), title: '', description: '', image: '' });
    alert('New Story Record added to Our Story timeline!');
  };

  const handleStoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewStory(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditStoryImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingStory(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandingForm(prev => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Multiple Gallery Photo Files Uploader
  const handleEventGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const readers = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(images => {
        setNewEvent(prev => ({
          ...prev,
          img: images[0] || prev.img,
          galleryPhotos: [...prev.galleryPhotos, ...images]
        }));
      });
    }
  };

  // Video File Upload with Auto Duration Calculation
  const handleHighlightVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const videoDataUrl = reader.result;

        // Auto calculate video duration using offscreen video element
        const videoElement = document.createElement('video');
        videoElement.src = videoDataUrl;
        videoElement.onloadedmetadata = () => {
          const seconds = Math.floor(videoElement.duration);
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          const formattedDuration = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

          setNewHighlight(prev => ({
            ...prev,
            videoUrl: videoDataUrl,
            duration: formattedDuration
          }));
        };
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete Actions
  const handleDeleteVolunteer = (volId) => {
    if (window.confirm('Are you sure you want to delete this volunteer record from the roster?')) {
      const savedVols = JSON.parse(localStorage.getItem('bhc_volunteers_roster') || '[]');
      const updatedVols = savedVols.filter(v => v.id !== volId);
      localStorage.setItem('bhc_volunteers_roster', JSON.stringify(updatedVols));
      setSelectedVolunteer(null);
      alert('Volunteer application record deleted.');
      window.location.reload();
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this outreach event?')) {
      const updated = events.filter(e => e.id !== eventId);
      onUpdateEvents(updated);
      alert('Outreach event deleted.');
    }
  };

  const handleDeleteHighlight = (highlightId) => {
    if (window.confirm('Are you sure you want to delete this media highlight?')) {
      const updated = highlights.filter(h => h.id !== highlightId);
      onUpdateHighlights(updated);
      alert('Media highlight deleted.');
    }
  };

  const handleToggleEventFeatured = (id) => {
    const updated = events.map(e => e.id === id ? { ...e, featured: !e.featured } : e);
    onUpdateEvents(updated);
  };

  const handleToggleHighlightFeatured = (id) => {
    const updated = highlights.map(h => h.id === id ? { ...h, featured: !h.featured } : h);
    onUpdateHighlights(updated);
  };

  const handleEventPosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewEvent(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditEventPosterUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingEvent(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditEventGalleryUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const readers = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(images => {
        setEditingEvent(prev => ({
          ...prev,
          galleryPhotos: [...(prev.galleryPhotos || []), ...images]
        }));
      });
    }
  };

  const handleSaveEditedEvent = (e) => {
    e.preventDefault();
    if (!editingEvent || !editingEvent.title) return;
    if (updateSingleEvent) {
      updateSingleEvent(editingEvent.id, editingEvent);
    } else {
      const updated = events.map(ev => ev.id === editingEvent.id ? editingEvent : ev);
      onUpdateEvents(updated);
    }
    setEditingEvent(null);
    alert('Outreach event updated live on website!');
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    const item = {
      id: `evt-${Date.now()}`,
      ...newEvent,
      img: newEvent.img || '/hero/PHOTO-2026-09-01-13-37-18.jpg',
      fullDetails: newEvent.fullDetails || newEvent.desc
    };
    onUpdateEvents([item, ...events]);
    setNewEvent({
      title: '',
      typeLabel: 'Community Outreach',
      status: 'Upcoming',
      date: '',
      dateTimeRaw: '',
      location: '',
      desc: '',
      fullDetails: '',
      img: '',
      galleryPhotos: [],
      videoUrl: '',
      featured: true
    });
    alert(`New outreach event published under ${item.status} status!`);
  };

  const handleAddHighlight = (e) => {
    e.preventDefault();
    if (!newHighlight.title) return;
    const item = {
      id: Date.now(),
      ...newHighlight,
      videoUrl: newHighlight.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'
    };
    onUpdateHighlights([item, ...highlights]);
    setNewHighlight({
      title: '',
      category: 'medical',
      categoryLabel: 'Medical Outreach',
      duration: '04:30',
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      views: '1.2K views',
      desc: '',
      videoUrl: '',
      galleryPhotos: [],
      featured: true
    });
    alert('New media highlight published with automatic video duration!');
  };

  const handleSendInvitation = (e) => {
    e.preventDefault();
    setInvitationSent(true);
    setTimeout(() => {
      setInvitationSent(false);
      setInvitationMessage('');
      alert(`Outreach invitation sent to ${selectedVolunteer.email || selectedVolunteer.full_name}!`);
    }, 1200);
  };

  // Combine roster volunteers with local storage saved ones
  const localVols = JSON.parse(localStorage.getItem('bhc_volunteers_roster') || '[]');
  const allVolunteers = [...localVols, ...volunteers.filter(v => !localVols.some(lv => lv.id === v.id || lv.email === v.email))];

  const totalNaira = donations.filter(d => d.currency === 'NGN').reduce((sum, d) => sum + Number(d.amount), 0);
  const totalUSD = donations.filter(d => d.currency === 'USD').reduce((sum, d) => sum + Number(d.amount), 0);

  // PASSCODE LOGIN GUARD
  if (!authenticated) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center bg-[#1a1c1c] text-white p-4">
        <div className="bg-white text-gray-900 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6 text-center border-t-8 border-[#b0004a]">
          <div className="w-16 h-16 rounded-full bg-[#ffd9de] text-[#b0004a] mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">lock</span>
          </div>

          <div>
            <h2 className="font-heading font-bold text-2xl text-gray-900">Executive Access Required</h2>
            <p className="text-xs text-gray-500 mt-1">Enter your executive passcode to unlock the Administration & Content Manager Portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                required
                placeholder="Enter executive passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-[#eee] border border-transparent rounded-xl py-3.5 px-4 text-xs font-semibold text-center text-gray-900 focus:outline-none focus:border-[#b0004a] focus:bg-white"
              />
              {passError && (
                <p className="text-xs text-red-600 mt-1 font-semibold">Invalid passcode. Please try again.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#b0004a] text-white font-bold text-xs shadow-md hover:bg-[#90003b] transition-all"
            >
              Unlock Executive Portal
            </button>
          </form>

          <button
            onClick={() => {
              setCurrentPage('home-outreach');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs text-gray-500 hover:text-gray-900 underline font-medium"
          >
            Return to Live Front-End
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-20 animate-fadeIn font-sans bg-[#f3f4f6] text-[#1a1c1c] min-h-screen">
      {/* Top Executive Admin Banner */}
      <div className="bg-[#1a1c1c] text-white py-4 px-6 shadow-md">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={settings.logo || '/logo.png'} alt="Logo" className="h-8 w-auto object-contain bg-white/10 p-1 rounded" onError={(e) => e.target.style.display = 'none'} />
            <div>
              <h1 className="font-heading font-bold text-lg text-white leading-none">
                Executive Administration Dashboard
              </h1>
              <span className="text-[10px] text-gray-400 italic">"{settings.tagline}"</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => setShowLivePreview(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full font-semibold transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>Live Site Preview</span>
            </button>
            <button
              onClick={() => {
                setAuthenticated(false);
                setCurrentPage('home-outreach');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#b0004a] hover:bg-[#90003b] text-white px-4 py-1.5 rounded-full font-semibold transition-colors"
            >
              Lock & Exit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
          {[
            { id: 'overview', label: 'Overview Metrics', icon: 'dashboard' },
            { id: 'volunteers', label: `Volunteer Roster (${allVolunteers.length})`, icon: 'groups' },
            { id: 'site-content', label: 'Site Text & Stats Manager', icon: 'edit_note' },
            { id: 'events-cms', label: 'Outreach Events', icon: 'event' },
            { id: 'highlights-cms', label: 'Media & Video Uploads', icon: 'video_library' },
            { id: 'donations', label: `Donations (${donations.length})`, icon: 'payments' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#b0004a] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lives Touched (Front-end)</span>
                <p className="font-heading font-extrabold text-2xl text-[#b0004a]">{settings.stats.livesTouched}</p>
                <span className="text-[11px] text-gray-500 font-medium">Editable in Site Content Manager</span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Raised (NGN)</span>
                <p className="font-heading font-extrabold text-2xl text-[#b0004a]">₦{totalNaira.toLocaleString()}</p>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> Bank Transfer & Online
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Registered Volunteers</span>
                <p className="font-heading font-extrabold text-2xl text-gray-900">{allVolunteers.length}</p>
                <span className="text-[11px] text-gray-500 font-medium">Includes photos & detailed addresses</span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Published Events</span>
                <p className="font-heading font-extrabold text-2xl text-gray-900">{events.length}</p>
                <span className="text-[11px] text-gray-500 font-medium">Outreach history & upcoming drives</span>
              </div>
            </div>

            {/* Previews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Volunteers Preview */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-bold text-base text-gray-900">Recent Volunteers</h3>
                  <button onClick={() => setActiveTab('volunteers')} className="text-xs text-[#b0004a] font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {allVolunteers.slice(0, 5).map((v, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedVolunteer(v)}
                      className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl text-xs cursor-pointer hover:bg-[#ffd9de]/20 border border-transparent hover:border-[#b0004a] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        {v.photo_url || v.photoUrl ? (
                          <img src={v.photo_url || v.photoUrl} alt={v.full_name || v.name} className="w-10 h-10 rounded-full object-cover border border-[#b0004a]" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#ffd9de] text-[#b0004a] flex items-center justify-center font-bold">
                            {(v.full_name || v.name || 'V').charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900">{v.full_name || v.name}</p>
                          <p className="text-[11px] text-gray-500">{v.occupation || 'Volunteer'} • {v.city || 'Lagos'}, {v.state || 'NG'}</p>
                        </div>
                      </div>
                      <span className="bg-[#ffd9de] text-[#b0004a] px-2.5 py-1 rounded-full text-[10px] font-bold">
                        Full Details
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-bold text-base text-gray-900">Recent Transactions</h3>
                  <button onClick={() => setActiveTab('donations')} className="text-xs text-[#b0004a] font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {donations.slice(0, 5).map((d, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedDonor(d)}
                      className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl text-xs cursor-pointer hover:bg-[#ffd9de]/20 border border-transparent hover:border-[#b0004a] transition-all"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{d.name}</p>
                        <p className="text-[11px] text-gray-500">{d.email} • {d.date}</p>
                      </div>
                      <span className="font-heading font-bold text-[#b0004a]">
                        {d.currency === 'NGN' ? `₦${Number(d.amount).toLocaleString()}` : `$${d.amount}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VOLUNTEERS TAB WITH DELETE & OUTREACH EVENT FILTERING */}
        {activeTab === 'volunteers' && (() => {
          const filteredVolunteers = selectedEventFilter === 'All'
            ? allVolunteers
            : allVolunteers.filter(v => (v.event_title || 'General Outreach Volunteer') === selectedEventFilter);

          const eventOptions = Array.from(new Set(allVolunteers.map(v => v.event_title || 'General Outreach Volunteer')));

          const handleBulkEmail = () => {
            const emails = filteredVolunteers.map(v => v.email).filter(Boolean).join(',');
            if (!emails) {
              alert('No volunteer emails found for this event selection.');
              return;
            }
            window.location.href = `mailto:${emails}?subject=${encodeURIComponent(`Brown Heart Care Outreach Update: ${selectedEventFilter}`)}`;
          };

          return (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-heading font-bold text-xl text-gray-900">Volunteer Submissions Roster ({filteredVolunteers.length})</h3>
                  <p className="text-xs text-gray-500">Filter volunteers by specific outreach program, view full contact details, and send bulk updates.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <label className="font-bold text-gray-700">Filter by Outreach:</label>
                    <select
                      value={selectedEventFilter}
                      onChange={(e) => setSelectedEventFilter(e.target.value)}
                      className="bg-gray-100 border border-gray-300 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#b0004a]"
                    >
                      <option value="All">All Outreach Events ({allVolunteers.length})</option>
                      {eventOptions.map((evtName, idx) => (
                        <option key={idx} value={evtName}>{evtName}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleBulkEmail}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">mail</span>
                    <span>Bulk Email Event Volunteers</span>
                  </button>
                </div>
              </div>

              {filteredVolunteers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVolunteers.map((vol, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gray-50 rounded-2xl p-5 border border-gray-200 shadow-sm hover:border-[#b0004a] transition-all space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3 cursor-pointer" onClick={() => setSelectedVolunteer(vol)}>
                        <div className="flex justify-between items-start gap-2">
                          <span className="bg-[#ffd9de] text-[#b0004a] px-2.5 py-0.5 rounded-full text-[10px] font-bold line-clamp-1">
                            {vol.event_title || 'General Outreach Volunteer'}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold">{vol.created_at ? new Date(vol.created_at).toLocaleDateString() : ''}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          {vol.photo_url || vol.photoUrl ? (
                            <img 
                              src={vol.photo_url || vol.photoUrl} 
                              alt={vol.full_name || vol.name} 
                              className="w-14 h-14 rounded-full object-cover border-2 border-[#b0004a] shadow-sm shrink-0" 
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-[#ffd9de] text-[#b0004a] flex items-center justify-center font-bold text-xl shrink-0">
                              {(vol.full_name || vol.name || 'V').charAt(0)}
                            </div>
                          )}
                          <div>
                            <h4 className="font-heading font-bold text-base text-gray-900">{vol.full_name || vol.name}</h4>
                            <p className="text-xs font-semibold text-[#b0004a]">{vol.occupation || 'Volunteer'}</p>
                            <p className="text-[11px] text-gray-500">{vol.email}</p>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-gray-100 space-y-1.5 text-xs">
                          <div className="flex items-start gap-1.5 text-gray-700">
                            <span className="material-symbols-outlined text-sm text-[#b0004a] shrink-0 mt-0.5">home</span>
                            <span className="line-clamp-2">{vol.detailed_address || `${vol.street || ''}, ${vol.city || ''}, ${vol.state || ''}`}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-700">
                            <span className="material-symbols-outlined text-sm text-[#b0004a] shrink-0">call</span>
                            <span>{vol.phone}</span>
                          </div>
                          <div className="flex items-start gap-1.5 text-gray-600 pt-1 border-t border-gray-100">
                            <span className="material-symbols-outlined text-sm text-[#b0004a] shrink-0 mt-0.5">psychology</span>
                            <span className="line-clamp-2 italic">"{vol.qualifications || vol.medical_qualifications || 'General volunteer skills'}"</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedVolunteer(vol)}
                          className="flex-1 py-2 bg-[#b0004a] text-white rounded-xl text-xs font-bold hover:bg-[#90003b] transition-colors"
                        >
                          View Profile & Invite
                        </button>
                        <button 
                          onClick={() => handleDeleteVolunteer(vol.id)}
                          className="px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl text-xs font-bold transition-colors"
                          title="Delete volunteer record"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                  <span className="material-symbols-outlined text-4xl text-gray-400">group_off</span>
                  <h4 className="font-bold text-gray-700 text-sm">No Volunteers Found for "{selectedEventFilter}"</h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">Select another outreach event from the dropdown filter or view all registered volunteers.</p>
                </div>
              )}
            </div>
          );
        })()}

        {/* SITE TEXT & STATS MANAGER TAB */}
        {activeTab === 'site-content' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Stats Editor */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900">Front Page Impact Numbers</h3>
                <p className="text-xs text-gray-500">Edit any statistical counter on the front page (e.g. change 5,000 to 4,000 or 10,000).</p>
              </div>

              <form onSubmit={handleSaveStats} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Lives Touched Counter</label>
                  <input
                    type="text"
                    value={statsForm.livesTouched}
                    onChange={(e) => setStatsForm({ ...statsForm, livesTouched: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Outreach Events Counter</label>
                  <input
                    type="text"
                    value={statsForm.outreachEvents}
                    onChange={(e) => setStatsForm({ ...statsForm, outreachEvents: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Active Volunteers Counter</label>
                  <input
                    type="text"
                    value={statsForm.activeVolunteers}
                    onChange={(e) => setStatsForm({ ...statsForm, activeVolunteers: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Aid Distributed Packages</label>
                  <input
                    type="text"
                    value={statsForm.aidDistributed}
                    onChange={(e) => setStatsForm({ ...statsForm, aidDistributed: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#b0004a] text-white rounded-full text-xs font-bold hover:bg-[#90003b] shadow-sm transition-all"
                  >
                    Save Impact Stats Live
                  </button>
                </div>
              </form>
            </div>

            {/* Organization Branding & Tagline Editor */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900">Logo, Name & Tagline Editor</h3>
                <p className="text-xs text-gray-500">Update logo file, foundation tagline, and homepage hero headline text.</p>
              </div>

              <form onSubmit={handleSaveBranding} className="space-y-4 text-xs">
                <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300 flex flex-col sm:flex-row items-center gap-4">
                  <img src={brandingForm.logo || '/logo.png'} alt="Preview logo" className="h-12 w-auto object-contain" />
                  <div className="space-y-1">
                    <label className="block font-bold text-gray-700">Upload New Official Logo Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="text-xs text-gray-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Organization Name</label>
                    <input
                      type="text"
                      value={brandingForm.orgName}
                      onChange={(e) => setBrandingForm({ ...brandingForm, orgName: e.target.value })}
                      className="w-full bg-[#eee] p-3 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Official Tagline</label>
                    <input
                      type="text"
                      value={brandingForm.tagline}
                      onChange={(e) => setBrandingForm({ ...brandingForm, tagline: e.target.value })}
                      className="w-full bg-[#eee] p-3 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Homepage Hero Headline</label>
                  <input
                    type="text"
                    value={brandingForm.heroTitle}
                    onChange={(e) => setBrandingForm({ ...brandingForm, heroTitle: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Homepage Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={brandingForm.heroSubtitle}
                    onChange={(e) => setBrandingForm({ ...brandingForm, heroSubtitle: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent font-medium text-gray-900 focus:bg-white focus:border-[#b0004a] resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#b0004a] text-white rounded-full text-xs font-bold hover:bg-[#90003b] shadow-sm transition-all"
                  >
                    Save Branding Live
                  </button>
                </div>
              </form>
            </div>

            {/* Social Media Links Manager */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900">Social Media Handles & Links</h3>
                <p className="text-xs text-gray-500">Update social media links dynamically across navbar, footer, and contact page.</p>
              </div>

              <form onSubmit={handleSaveSocials} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={socialsForm.instagram}
                    onChange={(e) => setSocialsForm({ ...socialsForm, instagram: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Facebook URL</label>
                  <input
                    type="text"
                    value={socialsForm.facebook}
                    onChange={(e) => setSocialsForm({ ...socialsForm, facebook: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">YouTube URL</label>
                  <input
                    type="text"
                    value={socialsForm.youtube}
                    onChange={(e) => setSocialsForm({ ...socialsForm, youtube: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={socialsForm.linkedin}
                    onChange={(e) => setSocialsForm({ ...socialsForm, linkedin: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Twitter / X URL</label>
                  <input
                    type="text"
                    value={socialsForm.twitter}
                    onChange={(e) => setSocialsForm({ ...socialsForm, twitter: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">WhatsApp Support Link</label>
                  <input
                    type="text"
                    value={socialsForm.whatsapp}
                    onChange={(e) => setSocialsForm({ ...socialsForm, whatsapp: e.target.value })}
                    className="w-full bg-[#eee] p-3 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#b0004a] text-white rounded-full text-xs font-bold hover:bg-[#90003b] shadow-sm transition-all"
                  >
                    Save Social Media Links Live
                  </button>
                </div>
              </form>
            </div>

            {/* Our Story Timeline Manager */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-6">
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900">Our Story & Outreach Timeline Records</h3>
                <p className="text-xs text-gray-500">Add or delete history records behind each outreach event.</p>
              </div>

              {/* Add Story Form */}
              <form onSubmit={handleAddStory} className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-3 text-xs">
                <h4 className="font-bold text-gray-800">Add New Outreach Timeline Record</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Year</label>
                    <input
                      type="text"
                      required
                      placeholder="2024"
                      value={newStory.year}
                      onChange={(e) => setNewStory({ ...newStory, year: e.target.value })}
                      className="w-full bg-white p-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-gray-700 mb-1">Outreach Record Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Free Health Screening for 1,500 Rural Families"
                      value={newStory.title}
                      onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                      className="w-full bg-white p-2.5 rounded-xl border border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Story & Impact Record Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write detailed background story of this outreach..."
                    value={newStory.description}
                    onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                    className="w-full bg-white p-2.5 rounded-xl border border-gray-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Story / Event Picture</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 flex items-center gap-2 font-medium text-gray-700 shrink-0">
                      <span className="material-symbols-outlined text-base text-[#b0004a]">upload_file</span>
                      <span>Upload Photo</span>
                      <input type="file" accept="image/*" onChange={handleStoryImageUpload} className="hidden" />
                    </label>
                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        placeholder="Or paste image URL (https://...)"
                        value={newStory.image}
                        onChange={(e) => setNewStory({ ...newStory, image: e.target.value })}
                        className="w-full bg-white p-2.5 rounded-xl border border-gray-200"
                      />
                    </div>
                  </div>
                  {newStory.image && (
                    <div className="mt-2 relative w-32 h-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm group">
                      <img src={newStory.image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewStory({ ...newStory, image: '' })}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        title="Remove picture"
                      >
                        <span className="material-symbols-outlined text-xs block">close</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#b0004a] text-white rounded-full font-bold text-xs hover:bg-[#90003b]"
                  >
                    Add Story Record to Website
                  </button>
                </div>
              </form>

              {/* Active Story Records List */}
              <div className="space-y-3">
                <h4 className="font-bold text-xs text-gray-700 uppercase tracking-wider">Current Timeline Stories ({(settings?.ourStoryEntries || []).length})</h4>
                <div className="space-y-3">
                  {(settings?.ourStoryEntries || []).map((st) => (
                    <div key={st.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start gap-4 text-xs">
                      {st.image && (
                        <div className="w-full sm:w-28 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-200 bg-gray-100">
                          <img src={st.image} alt={st.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="space-y-1 flex-1">
                        <span className="bg-[#b0004a] text-white px-2 py-0.5 rounded font-bold text-[10px]">{st.year}</span>
                        <h5 className="font-heading font-bold text-sm text-gray-900">{st.title}</h5>
                        <p className="text-gray-600 leading-relaxed">{st.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleEditStoryClick(st)}
                          className="px-3 py-1.5 bg-[#b0004a] text-white rounded-lg font-bold text-xs hover:bg-[#90003b] transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteStoryEntry(st.id)}
                          className="p-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-bold transition-colors"
                          title="Delete story record"
                        >
                          <span className="material-symbols-outlined text-sm block">delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* EDIT STORY MODAL */}
            {editingStory && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4 relative">
                  <button
                    onClick={() => setEditingStory(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>

                  <h3 className="font-heading font-bold text-xl text-gray-900 border-b border-gray-100 pb-3">Edit Our Story Timeline Record</h3>

                  <form onSubmit={handleSaveEditedStory} className="space-y-4 text-xs">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">Year</label>
                        <input
                          type="text"
                          required
                          value={editingStory.year}
                          onChange={(e) => setEditingStory({ ...editingStory, year: e.target.value })}
                          className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block font-semibold text-gray-700 mb-1">Record Title</label>
                        <input
                          type="text"
                          required
                          value={editingStory.title}
                          onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                          className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Full Story Description</label>
                      <textarea
                        rows={4}
                        required
                        value={editingStory.description}
                        onChange={(e) => setEditingStory({ ...editingStory, description: e.target.value })}
                        className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-medium text-gray-900 focus:bg-white focus:border-[#b0004a] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Story / Event Picture</label>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <label className="cursor-pointer px-4 py-2 bg-[#eee] border border-gray-200 rounded-xl hover:bg-gray-200 flex items-center gap-2 font-medium text-gray-700 shrink-0">
                          <span className="material-symbols-outlined text-base text-[#b0004a]">upload_file</span>
                          <span>Upload New Photo</span>
                          <input type="file" accept="image/*" onChange={handleEditStoryImageUpload} className="hidden" />
                        </label>
                        <div className="flex-1 w-full">
                          <input
                            type="text"
                            placeholder="Or image URL (https://...)"
                            value={editingStory.image || ''}
                            onChange={(e) => setEditingStory({ ...editingStory, image: e.target.value })}
                            className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-medium text-gray-900 focus:bg-white focus:border-[#b0004a]"
                          />
                        </div>
                      </div>
                      {editingStory.image && (
                        <div className="mt-2 relative w-36 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                          <img src={editingStory.image} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setEditingStory({ ...editingStory, image: '' })}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            title="Remove picture"
                          >
                            <span className="material-symbols-outlined text-xs block">close</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingStory(null)}
                        className="px-4 py-2 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#b0004a] text-white font-bold hover:bg-[#90003b] shadow-sm"
                      >
                        Save Changes Live
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* EVENTS CMS TAB WITH STATUS SELECTOR & MULTI-FILE GALLERY UPLOAD */}
        {activeTab === 'events-cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Form to Add Event */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-heading font-bold text-lg text-gray-900">Publish New Outreach Event</h3>
              <form onSubmit={handleAddEvent} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Free Health Screening & Medical Drive"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Event Status</label>
                    <select
                      value={newEvent.status}
                      onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] font-bold text-[#b0004a]"
                    >
                      <option value="Upcoming">Upcoming Event</option>
                      <option value="Current">Current / Ongoing Event</option>
                      <option value="Past">Past Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Category Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Medical Screening, Food Drive..."
                      value={newEvent.typeLabel}
                      onChange={(e) => setNewEvent({ ...newEvent, typeLabel: e.target.value })}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                </div>

                {/* Event Poster Photo Upload */}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Main Event Poster / Image</label>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-3 py-2 bg-[#eee] border border-gray-300 rounded-xl hover:bg-gray-200 flex items-center gap-1.5 font-semibold text-gray-700 shrink-0">
                      <span className="material-symbols-outlined text-base text-[#b0004a]">upload_file</span>
                      <span>Upload Poster</span>
                      <input type="file" accept="image/*" onChange={handleEventPosterUpload} className="hidden" />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste poster URL..."
                      value={newEvent.img}
                      onChange={(e) => setNewEvent({ ...newEvent, img: e.target.value })}
                      className="flex-1 bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                  {newEvent.img && (
                    <div className="mt-2 relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                      <img src={newEvent.img} alt="Poster Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewEvent({ ...newEvent, img: '' })}
                        className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <span className="material-symbols-outlined text-xs block">close</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Select Date & Time</label>
                    <input
                      type="datetime-local"
                      required
                      value={newEvent.dateTimeRaw || ''}
                      onChange={(e) => {
                        const rawVal = e.target.value;
                        let formattedDate = rawVal;
                        if (rawVal) {
                          const d = new Date(rawVal);
                          formattedDate = d.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }) + ' • ' + d.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          });
                        }
                        setNewEvent({ ...newEvent, dateTimeRaw: rawVal, date: formattedDate });
                      }}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] font-sans text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Location / Venue</label>
                    <input
                      type="text"
                      required
                      placeholder="Community Center, Lagos"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Short Card Summary (Homepage preview)</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Brief 1-2 sentence summary of this outreach event..."
                    value={newEvent.desc}
                    onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] resize-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Full Program Details & Background (Shown on "Learn More")</label>
                  <textarea
                    rows={4}
                    placeholder="Write detailed program objectives, schedule, requirements, medical services offered, etc..."
                    value={newEvent.fullDetails}
                    onChange={(e) => setNewEvent({ ...newEvent, fullDetails: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] resize-none font-sans"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Upload Gallery Photos</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleEventGalleryUpload}
                    className="text-xs text-gray-600 w-full mb-1"
                  />
                  {newEvent.galleryPhotos.length > 0 && (
                    <div className="flex gap-1 overflow-x-auto py-1">
                      {newEvent.galleryPhotos.map((img, idx) => (
                        <img key={idx} src={img} alt="Gallery" className="w-12 h-12 rounded object-cover border border-[#b0004a]" />
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#b0004a] text-white font-bold text-xs shadow-md hover:bg-[#90003b] transition-all"
                >
                  Publish Event to Live Website
                </button>
              </form>
            </div>

            {/* List of Active Events with Edit & Delete Action */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-heading font-bold text-lg text-gray-900">Published Outreach Events ({events.length})</h3>
              <div className="space-y-4">
                {events.map((evt, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {evt.img && (
                        <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                          <img src={evt.img} alt={evt.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="space-y-1 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            evt.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                            evt.status === 'Current' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {evt.status || 'Upcoming'} Event
                          </span>
                          <span className="bg-[#ffd9de] text-[#b0004a] px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                            {evt.typeLabel}
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-base text-gray-900">{evt.title}</h4>
                        <p className="text-gray-500 font-semibold">{evt.date} • {evt.location}</p>
                        <p className="text-gray-600 line-clamp-2">{evt.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setEditingEvent({ ...evt })}
                        className="px-3 py-1.5 bg-[#b0004a] text-white rounded-lg font-bold text-xs hover:bg-[#90003b] transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleToggleEventFeatured(evt.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          evt.featured ? 'bg-amber-600 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {evt.featured ? 'Featured' : 'Make Featured'}
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(evt.id)}
                        className="p-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg text-xs font-bold transition-colors"
                        title="Delete Event"
                      >
                        <span className="material-symbols-outlined text-base block">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EDIT EVENT MODAL */}
            {editingEvent && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-gray-200 space-y-4 relative max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => setEditingEvent(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>

                  <h3 className="font-heading font-bold text-xl text-gray-900 border-b border-gray-100 pb-3">Edit Outreach Event & Program Details</h3>

                  <form onSubmit={handleSaveEditedEvent} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Event Title</label>
                      <input
                        type="text"
                        required
                        value={editingEvent.title || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                        className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-bold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">Event Status</label>
                        <select
                          value={editingEvent.status || 'Upcoming'}
                          onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                          className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-bold text-[#b0004a] focus:bg-white focus:border-[#b0004a]"
                        >
                          <option value="Upcoming">Upcoming Event</option>
                          <option value="Current">Current / Ongoing Event</option>
                          <option value="Past">Past Event</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">Category Badge</label>
                        <input
                          type="text"
                          value={editingEvent.typeLabel || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, typeLabel: e.target.value })}
                          className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-semibold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Main Event Poster / Image</label>
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer px-3 py-2 bg-[#eee] border border-gray-300 rounded-xl hover:bg-gray-200 flex items-center gap-1.5 font-semibold text-gray-700 shrink-0">
                          <span className="material-symbols-outlined text-base text-[#b0004a]">upload_file</span>
                          <span>Upload New Poster</span>
                          <input type="file" accept="image/*" onChange={handleEditEventPosterUpload} className="hidden" />
                        </label>
                        <input
                          type="text"
                          placeholder="Or image URL..."
                          value={editingEvent.img || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, img: e.target.value })}
                          className="flex-1 bg-[#eee] p-2.5 rounded-xl border border-transparent font-medium text-gray-900 focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                      {editingEvent.img && (
                        <div className="mt-2 relative w-28 h-28 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                          <img src={editingEvent.img} alt="Poster" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => setEditingEvent({ ...editingEvent, img: '' })}
                            className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <span className="material-symbols-outlined text-xs block">close</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">Date & Time Display</label>
                        <input
                          type="text"
                          required
                          value={editingEvent.date || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                          className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-semibold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">Location / Venue</label>
                        <input
                          type="text"
                          required
                          value={editingEvent.location || ''}
                          onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                          className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-semibold text-gray-900 focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Short Card Summary</label>
                      <textarea
                        rows={2}
                        required
                        value={editingEvent.desc || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, desc: e.target.value })}
                        className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-medium text-gray-900 focus:bg-white focus:border-[#b0004a] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Full Program Details & Background (Shown on "Learn More")</label>
                      <textarea
                        rows={5}
                        placeholder="Write comprehensive program details, schedule, medical services offered, etc..."
                        value={editingEvent.fullDetails || editingEvent.desc || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, fullDetails: e.target.value })}
                        className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent font-sans text-gray-900 focus:bg-white focus:border-[#b0004a] resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">Add Gallery Photos</label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleEditEventGalleryUpload}
                        className="text-xs text-gray-600 w-full mb-1"
                      />
                      {editingEvent.galleryPhotos && editingEvent.galleryPhotos.length > 0 && (
                        <div className="flex gap-1 overflow-x-auto py-1">
                          {editingEvent.galleryPhotos.map((img, idx) => (
                            <img key={idx} src={img} alt="Gallery" className="w-12 h-12 rounded object-cover border border-[#b0004a]" />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingEvent(null)}
                        className="px-4 py-2 rounded-full border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#b0004a] text-white font-bold hover:bg-[#90003b] shadow-sm"
                      >
                        Save Changes Live
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MEDIA & VIDEO UPLOAD CMS TAB WITH AUTOMATIC VIDEO DURATION */}
        {activeTab === 'highlights-cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Add Media Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-heading font-bold text-lg text-gray-900">Upload Video & Media Showcase</h3>
              <form onSubmit={handleAddHighlight} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Highlight Title</label>
                  <input
                    type="text"
                    required
                    placeholder="2024 Rural Outreach Documentary"
                    value={newHighlight.title}
                    onChange={(e) => setNewHighlight({ ...newHighlight, title: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Category</label>
                    <select
                      value={newHighlight.category}
                      onChange={(e) => setNewHighlight({ ...newHighlight, category: e.target.value, categoryLabel: e.target.options[e.target.selectedIndex].text })}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                    >
                      <option value="medical">Medical Outreach</option>
                      <option value="food">Nutritional Relief</option>
                      <option value="community">Community Aid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">
                      Video Duration <span className="text-emerald-600 text-[10px] font-normal">(Auto calculated)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Auto calculated on upload"
                      value={newHighlight.duration}
                      onChange={(e) => setNewHighlight({ ...newHighlight, duration: e.target.value })}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] font-mono font-bold text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Upload Direct Video File (MP4/WebM)</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleHighlightVideoUpload}
                    className="text-xs text-gray-600 w-full mb-1"
                  />
                  <p className="text-[10px] text-gray-400">Or enter video URL below:</p>
                  <input
                    type="text"
                    placeholder="https://youtube.com/watch?v=..."
                    value={newHighlight.videoUrl}
                    onChange={(e) => setNewHighlight({ ...newHighlight, videoUrl: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] mt-1"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Short summary of this video highlight..."
                    value={newHighlight.desc}
                    onChange={(e) => setNewHighlight({ ...newHighlight, desc: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#b0004a] text-white font-bold text-xs shadow-md hover:bg-[#90003b] transition-all"
                >
                  Save Highlight to Live Site
                </button>
              </form>
            </div>

            {/* List of Active Highlights with Delete Action */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-heading font-bold text-lg text-gray-900">Active Media Showcase ({highlights.length})</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((h, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-2 text-xs flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="bg-[#ffd9de] text-[#b0004a] px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          {h.categoryLabel || 'Medical Outreach'}
                        </span>
                        <div className="flex items-center gap-2">
                          {h.featured && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                          <button
                            onClick={() => handleDeleteHighlight(h.id)}
                            className="p-1 text-red-600 hover:text-red-800 font-bold"
                            title="Delete Highlight"
                          >
                            <span className="material-symbols-outlined text-base block">delete</span>
                          </button>
                        </div>
                      </div>
                      <h4 className="font-heading font-bold text-base text-gray-900">{h.title}</h4>
                      <p className="text-gray-500 font-mono">⏱️ {h.duration} • {h.views}</p>
                      <p className="text-gray-600 leading-relaxed">{h.desc}</p>
                    </div>

                    <button
                      onClick={() => handleToggleHighlightFeatured(h.id)}
                      className={`mt-4 w-full py-2 rounded-full text-xs font-bold transition-colors ${
                        h.featured ? 'bg-[#b0004a] text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {h.featured ? 'Featured on Homepage' : 'Set as Featured'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DONATIONS TAB */}
        {activeTab === 'donations' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900">Donation Transactions & Receipts</h3>
                <p className="text-xs text-gray-500">Click any transaction row to inspect full receipt details.</p>
              </div>
              <div className="flex gap-2 text-xs font-semibold">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full">
                  Total: ₦{totalNaira.toLocaleString()} + ${totalUSD.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="p-3.5">Donor Name</th>
                    <th className="p-3.5">Email & Phone</th>
                    <th className="p-3.5">Frequency</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Payment Method</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {donations.map((d, i) => (
                    <tr 
                      key={i} 
                      onClick={() => setSelectedDonor(d)}
                      className="hover:bg-[#ffd9de]/10 cursor-pointer transition-colors"
                    >
                      <td className="p-3.5 font-bold text-gray-900">{d.donorName || d.name || 'Anonymous Donor'}</td>
                      <td className="p-3.5 text-gray-600">
                        <div>{d.email || 'No email'}</div>
                        <div className="text-[11px] text-gray-400">{d.phone || ''}</div>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                          (d.frequency || '').toLowerCase() === 'monthly'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {(d.frequency || '').toLowerCase() === 'monthly' ? 'Monthly Supporter' : 'One-Time Gift'}
                        </span>
                      </td>
                      <td className="p-3.5 font-heading font-bold text-[#b0004a]">
                        {d.currency === 'NGN' ? `₦${Number(d.amount).toLocaleString()}` : `$${d.amount}`}
                      </td>
                      <td className="p-3.5">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-[11px] font-semibold">
                          {d.paymentMethod === 'card' ? 'Credit / Debit Card' : (d.paymentMethod === 'transfer' ? 'Direct Bank Transfer' : (d.method || 'Direct Bank Transfer'))}
                        </span>
                      </td>
                      <td className="p-3.5 text-gray-500">{d.date}</td>
                      <td className="p-3.5">
                        <button className="text-[#b0004a] font-bold hover:underline">View Receipt</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* LIVE PREVIEW MODAL OVERLAY */}
      {showLivePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 shadow-2xl border border-gray-200 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowLivePreview(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 z-10"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="border-b border-gray-100 pb-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-[#b0004a] text-2xl">visibility</span>
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900">Live Executive Preview Mode</h3>
                <p className="text-xs text-gray-500">Below is an exact live rendering of your updated statistics, tagline, and branding.</p>
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-[#f9f9f9] p-6 rounded-2xl border border-gray-200 space-y-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
                <img src={settings.logo || '/logo.png'} alt="Logo" className="h-10 w-auto object-contain" />
                <div>
                  <h4 className="font-heading font-bold text-lg text-[#b0004a]">{settings.orgName}</h4>
                  <p className="text-xs text-gray-500 italic">"{settings.tagline}"</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="font-heading font-bold text-2xl text-gray-900">{settings.heroTitle}</h2>
                <p className="text-xs text-gray-600">{settings.heroSubtitle}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <span className="font-heading font-extrabold text-2xl text-[#b0004a] block">{settings.stats.livesTouched}</span>
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Lives Touched</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <span className="font-heading font-extrabold text-2xl text-[#b0004a] block">{settings.stats.outreachEvents}</span>
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Outreach Drives</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <span className="font-heading font-extrabold text-2xl text-[#b0004a] block">{settings.stats.activeVolunteers}</span>
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Active Volunteers</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <span className="font-heading font-extrabold text-2xl text-[#b0004a] block">{settings.stats.aidDistributed}</span>
                  <span className="text-[11px] text-gray-500 font-bold uppercase">Aid Distributed</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowLivePreview(false)}
                className="px-6 py-2.5 rounded-full bg-[#1a1c1c] text-white text-xs font-bold hover:bg-gray-800"
              >
                Close Live Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL VOLUNTEER PROFILE MODAL WITH DELETE BUTTON */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              {selectedVolunteer.photo_url || selectedVolunteer.photoUrl ? (
                <img 
                  src={selectedVolunteer.photo_url || selectedVolunteer.photoUrl} 
                  alt={selectedVolunteer.full_name || selectedVolunteer.name} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#b0004a] shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#ffd9de] text-[#b0004a] flex items-center justify-center font-bold text-3xl">
                  {(selectedVolunteer.full_name || selectedVolunteer.name || 'V').charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-heading font-bold text-xl text-gray-900">{selectedVolunteer.full_name || selectedVolunteer.name || 'Volunteer Profile'}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-[#b0004a]">{selectedVolunteer.occupation || 'Volunteer'}</span>
                  <span className="bg-[#ffd9de] text-[#b0004a] px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                    {selectedVolunteer.event_title || selectedVolunteer.eventTitle || 'General Outreach Volunteer'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Submitted: {safeFormatDate(selectedVolunteer.created_at)}</p>
              </div>
              <button
                onClick={() => handleDeleteVolunteer(selectedVolunteer.id)}
                className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-xl text-xs font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                <span>Delete</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">EMAIL ADDRESS</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.email || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">PHONE NUMBER</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.phone || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1 sm:col-span-2">
                <span className="text-gray-400 font-bold block text-[10px]">DETAILED RESIDENTIAL HOME ADDRESS</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.detailed_address || `${selectedVolunteer.street || ''}, ${selectedVolunteer.city || ''}, ${selectedVolunteer.state || ''}`}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">LIVING PROFESSION / OCCUPATION</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.occupation || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">PROFESSION & KEY SKILLS</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.qualifications || selectedVolunteer.medical_qualifications || 'General volunteer skills'}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1 sm:col-span-2">
                <span className="text-gray-400 font-bold block text-[10px]">EMERGENCY CONTACT PERSON</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.emergency_contact || selectedVolunteer.emergencyContact || 'N/A'}</p>
              </div>
              {selectedVolunteer.motivation && (
                <div className="bg-gray-50 p-3.5 rounded-xl space-y-1 sm:col-span-2">
                  <span className="text-gray-400 font-bold block text-[10px]">MOTIVATION TO VOLUNTEER</span>
                  <p className="font-semibold text-gray-800 italic">"{selectedVolunteer.motivation}"</p>
                </div>
              )}
            </div>

            {/* Send Program Invitation Form */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h4 className="font-heading font-bold text-sm text-gray-900">Invite {selectedVolunteer.full_name || selectedVolunteer.name} to Outreach Shift</h4>
              <form onSubmit={handleSendInvitation} className="space-y-3 text-xs">
                <textarea
                  rows={3}
                  required
                  placeholder={`Write official invitation email to ${selectedVolunteer.email}...`}
                  value={invitationMessage}
                  onChange={(e) => setInvitationMessage(e.target.value)}
                  className="w-full bg-[#eee] p-3 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] resize-none"
                />
                <button
                  type="submit"
                  disabled={invitationSent}
                  className="w-full py-3 rounded-full bg-[#b0004a] text-white font-bold shadow-md hover:bg-[#90003b] transition-all flex items-center justify-center gap-2"
                >
                  {invitationSent ? (
                    <span className="animate-spin material-symbols-outlined text-sm">progress_activity</span>
                  ) : (
                    <>
                      <span>Send Program Invitation Email</span>
                      <span className="material-symbols-outlined text-sm">send</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* DONOR RECEIPT MODAL */}
      {selectedDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-200 space-y-6 relative">
            <button
              onClick={() => setSelectedDonor(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="text-center space-y-2 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-gray-900">Official Donation Audit Receipt</h3>
              <p className="text-xs text-gray-500">Tax Deductible Receipt #BHCARE-{Math.floor(100000 + Math.random() * 900000)}</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Donor Name:</span>
                <span className="font-bold text-gray-900">{selectedDonor.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Donor Email:</span>
                <span className="font-semibold text-gray-800">{selectedDonor.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Transaction Date:</span>
                <span className="font-semibold text-gray-800">{selectedDonor.date}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Payment Channel:</span>
                <span className="font-semibold text-gray-800">{selectedDonor.method || 'Direct Bank Transfer'}</span>
              </div>
              <div className="flex justify-between py-2 items-center">
                <span className="text-gray-500">Total Donated:</span>
                <span className="font-heading font-extrabold text-xl text-[#b0004a]">
                  {selectedDonor.currency === 'NGN' ? `₦${Number(selectedDonor.amount).toLocaleString()}` : `$${selectedDonor.amount}`}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedDonor(null)}
              className="w-full py-3 rounded-full bg-[#1a1c1c] text-white font-bold text-xs hover:bg-gray-800 transition-colors"
            >
              Close Receipt Audit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
