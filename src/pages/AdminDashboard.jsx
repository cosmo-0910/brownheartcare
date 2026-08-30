import React, { useState } from 'react';

export default function AdminDashboard({ setCurrentPage, donations, volunteers, events, highlights, onUpdateEvents, onUpdateHighlights }) {
  const [passcode, setPasscode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [passError, setPassError] = useState(false);

  const [activeTab, setActiveTab] = useState('overview');

  // Selected Item Modal States
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [invitationMessage, setInvitationMessage] = useState('');
  const [invitationSent, setInvitationSent] = useState(false);

  // New Content Forms
  const [newEvent, setNewEvent] = useState({
    title: '',
    typeLabel: 'Health Walk',
    date: '',
    location: '',
    desc: '',
    img: '',
    featured: true
  });

  const [newHighlight, setNewHighlight] = useState({
    title: '',
    category: 'medical',
    categoryLabel: 'Medical Outreach',
    duration: '04:30',
    date: 'Aug 2024',
    views: '1.2K views',
    desc: '',
    videoUrl: '',
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

  const handleToggleEventFeatured = (id) => {
    const updated = events.map(e => e.id === id ? { ...e, featured: !e.featured } : e);
    onUpdateEvents(updated);
  };

  const handleToggleHighlightFeatured = (id) => {
    const updated = highlights.map(h => h.id === id ? { ...h, featured: !h.featured } : h);
    onUpdateHighlights(updated);
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title) return;
    const item = {
      id: Date.now(),
      ...newEvent,
      img: newEvent.img || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Nbhi6ZZKs6DuolUKw6ihTzq8f644ai4kLMv2Y25bfkh89EHP7Aem9_rNi_F5m11dQlHVRXODZd4RAw7hy2IwP6PiihaTF5JxZcaR3--mOA6DsWTD_dDC6ZISr7LXOSWub3X_SXenXndTwWQ2qUEBdrRaXmrTjT2Qks1V_M4jS5hy4uZGcTZZLWt6a3SHIbL3T2g5sk2BK7dizK2YtW2Jbou7FxLyrLZrj_Wogi-qzh94dJBACKE6YA'
    };
    onUpdateEvents([item, ...events]);
    setNewEvent({ title: '', typeLabel: 'Health Walk', date: '', location: '', desc: '', img: '', featured: true });
    alert('New event published to live site!');
  };

  const handleAddHighlight = (e) => {
    e.preventDefault();
    if (!newHighlight.title) return;
    const item = {
      id: Date.now(),
      ...newHighlight,
      videoUrl: newHighlight.videoUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBll0-lwQpXVroVoV4bAnp6Ygx7qxW2mZoZs_Ou829wSXmwp8Bz-1_Ks568WqOr233bGZVvTKWEZGs6qwN66bWJhJIOllFH_2G25ph3oTyNn0U3JwOV3gf2RWxg5dIl_dFPs29b2YG4pCP-_L44JLVMjVEwLqLDbUMeYzxYh6Dt4cW2dWj2e9ABQUshS9jbppDpi1e_gvTfANEj5wBHZGvxVA1LHFKBF8Wl29iZB3Jq7uNDHSVDD_2xRA'
    };
    onUpdateHighlights([item, ...highlights]);
    setNewHighlight({ title: '', category: 'medical', categoryLabel: 'Medical Outreach', duration: '04:30', date: 'Aug 2024', views: '1.2K views', desc: '', videoUrl: '', featured: true });
    alert('New media highlight added to live site!');
  };

  const handleSendInvitation = (e) => {
    e.preventDefault();
    setInvitationSent(true);
    setTimeout(() => {
      setInvitationSent(false);
      setInvitationMessage('');
      alert(`Outreach invitation sent to ${selectedVolunteer.email}!`);
    }, 1200);
  };

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
            <h2 className="font-heading font-bold text-2xl text-gray-900">Executive Passcode Required</h2>
            <p className="text-xs text-gray-500 mt-1">Enter your executive access passcode to unlock the Administration Control Center.</p>
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
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
            <h1 className="font-heading font-bold text-lg text-white">
              Executive Administration Dashboard <span className="text-xs bg-[#b0004a] text-white px-2 py-0.5 rounded font-mono ml-2">/bhcareexec</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-400">Authenticated: Executive Director</span>
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
            { id: 'overview', label: 'Overview & Metrics', icon: 'dashboard' },
            { id: 'donations', label: `Donations (${donations.length})`, icon: 'payments' },
            { id: 'volunteers', label: `Volunteers (${volunteers.length})`, icon: 'groups' },
            { id: 'events-cms', label: 'Events Manager', icon: 'event' },
            { id: 'highlights-cms', label: 'Media Highlights CMS', icon: 'video_library' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
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
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Raised (NGN)</span>
                <p className="font-heading font-extrabold text-2xl text-[#b0004a]">₦{totalNaira.toLocaleString()}</p>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> Bank Transfer & Online
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Raised (USD)</span>
                <p className="font-heading font-extrabold text-2xl text-[#b0004a]">${totalUSD.toLocaleString()}</p>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">trending_up</span> Stripe & International
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Registered Volunteers</span>
                <p className="font-heading font-extrabold text-2xl text-gray-900">{volunteers.length}</p>
                <span className="text-[11px] text-gray-500 font-medium">Click row for full profile & inviter</span>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Events</span>
                <p className="font-heading font-extrabold text-2xl text-gray-900">{events.length}</p>
                <span className="text-[11px] text-gray-500 font-medium">Published on Events Page</span>
              </div>
            </div>

            {/* Previews */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Donations */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-bold text-base text-gray-900">Recent Transactions (Click row for receipt)</h3>
                  <button onClick={() => setActiveTab('donations')} className="text-xs text-[#b0004a] font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {donations.slice(0, 4).map((d, i) => (
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

              {/* Recent Volunteers */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-heading font-bold text-base text-gray-900">Registered Volunteers (Click for full profile)</h3>
                  <button onClick={() => setActiveTab('volunteers')} className="text-xs text-[#b0004a] font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-3">
                  {volunteers.slice(0, 4).map((v, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedVolunteer(v)}
                      className="flex justify-between items-center p-3.5 bg-gray-50 rounded-xl text-xs cursor-pointer hover:bg-[#ffd9de]/20 border border-transparent hover:border-[#b0004a] transition-all"
                    >
                      <div>
                        <p className="font-bold text-gray-900">{v.name}</p>
                        <p className="text-[11px] text-gray-500">{v.email} • {v.phone}</p>
                      </div>
                      <span className="bg-[#ffd9de] text-[#b0004a] px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {v.interests ? v.interests[0] : 'Medical Outreach'}
                      </span>
                    </div>
                  ))}
                </div>
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
                <p className="text-xs text-gray-500">Click any transaction row to inspect full receipt details & tax audit code.</p>
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
                    <th className="p-3.5">Email</th>
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
                      <td className="p-3.5 font-bold text-gray-900">{d.name}</td>
                      <td className="p-3.5 text-gray-600">{d.email}</td>
                      <td className="p-3.5 font-heading font-bold text-[#b0004a]">
                        {d.currency === 'NGN' ? `₦${Number(d.amount).toLocaleString()}` : `$${d.amount}`}
                      </td>
                      <td className="p-3.5">
                        <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded text-[11px] font-semibold">
                          {d.method || 'Credit Card / Stripe'}
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

        {/* VOLUNTEERS TAB */}
        {activeTab === 'volunteers' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-heading font-bold text-xl text-gray-900">Volunteer Submissions Registry</h3>
              <p className="text-xs text-gray-500">Click any volunteer row to view full address, schedule, credentials, and send outreach invitations.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <th className="p-3.5">Volunteer Name</th>
                    <th className="p-3.5">Contact Details</th>
                    <th className="p-3.5">Location</th>
                    <th className="p-3.5">Interests / Roles</th>
                    <th className="p-3.5">Schedule</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {volunteers.map((v, i) => (
                    <tr 
                      key={i} 
                      onClick={() => setSelectedVolunteer(v)}
                      className="hover:bg-[#ffd9de]/10 cursor-pointer transition-colors"
                    >
                      <td className="p-3.5 font-bold text-gray-900">{v.name}</td>
                      <td className="p-3.5 text-gray-600">
                        <p>{v.email}</p>
                        <p className="text-[11px] text-gray-400">{v.phone}</p>
                      </td>
                      <td className="p-3.5 text-gray-600">{v.city || 'Metropolis'}, {v.state || 'NY'}</td>
                      <td className="p-3.5">
                        <div className="flex flex-wrap gap-1">
                          {(v.interests || ['Medical Outreach']).map((int, k) => (
                            <span key={k} className="bg-[#ffd9de] text-[#b0004a] px-2 py-0.5 rounded text-[10px] font-bold">
                              {int}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3.5 text-gray-600 capitalize">{v.availability || 'Weekends'}</td>
                      <td className="p-3.5">
                        <button className="bg-[#b0004a] text-white px-3 py-1 rounded-full text-[11px] font-bold hover:bg-[#90003b]">
                          Full Profile & Invite
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* EVENTS CMS TAB */}
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
                    placeholder="e.g. Free Pediatric Heart Screening Day"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Category Badge</label>
                    <select
                      value={newEvent.typeLabel}
                      onChange={(e) => setNewEvent({ ...newEvent, typeLabel: e.target.value })}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                    >
                      <option value="Health Walk">Health Walk</option>
                      <option value="Food Drive">Food Drive</option>
                      <option value="Medical Screening">Medical Screening</option>
                      <option value="Surgical Clinic">Surgical Clinic</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Date & Time</label>
                    <input
                      type="text"
                      required
                      placeholder="Dec 15, 2024 • 9:00 AM"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Location / Venue</label>
                  <input
                    type="text"
                    required
                    placeholder="City Central Pavilion"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Provide details about the upcoming outreach event..."
                    value={newEvent.desc}
                    onChange={(e) => setNewEvent({ ...newEvent, desc: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#b0004a] text-white font-bold text-xs shadow-md hover:bg-[#90003b] transition-all"
                >
                  Publish Event to Website
                </button>
              </form>
            </div>

            {/* List of Active Events */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-heading font-bold text-lg text-gray-900">Active Published Events ({events.length})</h3>
              <div className="space-y-4">
                {events.map((evt, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#ffd9de] text-[#b0004a] px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                          {evt.typeLabel}
                        </span>
                        {evt.featured && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            Featured on Front-End
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-base text-gray-900">{evt.title}</h4>
                      <p className="text-gray-500">{evt.date} • {evt.location}</p>
                      <p className="text-gray-600 line-clamp-2">{evt.desc}</p>
                    </div>

                    <button
                      onClick={() => handleToggleEventFeatured(evt.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-colors ${
                        evt.featured ? 'bg-[#b0004a] text-white' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {evt.featured ? 'Featured' : 'Make Featured'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HIGHLIGHTS CMS TAB */}
        {activeTab === 'highlights-cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
            {/* Add Media Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
              <h3 className="font-heading font-bold text-lg text-gray-900">Add Homepage & Events Highlight</h3>
              <form onSubmit={handleAddHighlight} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Highlight Title</label>
                  <input
                    type="text"
                    required
                    placeholder="2024 Pediatric Surgery Documentary"
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
                      <option value="surgery">Surgical Relief</option>
                      <option value="food">Nutritional Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Video Duration</label>
                    <input
                      type="text"
                      placeholder="05:15"
                      value={newHighlight.duration}
                      onChange={(e) => setNewHighlight({ ...newHighlight, duration: e.target.value })}
                      className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Video URL (YouTube / Instagram / MP4)</label>
                  <input
                    type="text"
                    placeholder="https://youtube.com/watch?v=..."
                    value={newHighlight.videoUrl}
                    onChange={(e) => setNewHighlight({ ...newHighlight, videoUrl: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Short summary of this program highlight..."
                    value={newHighlight.desc}
                    onChange={(e) => setNewHighlight({ ...newHighlight, desc: e.target.value })}
                    className="w-full bg-[#eee] p-2.5 rounded-xl border border-transparent focus:bg-white focus:border-[#b0004a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#b0004a] text-white font-bold text-xs shadow-md hover:bg-[#90003b] transition-all"
                >
                  Save Highlight to Front-End
                </button>
              </form>
            </div>

            {/* List of Active Highlights */}
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
                        {h.featured && (
                          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-base text-gray-900">{h.title}</h4>
                      <p className="text-gray-500">{h.duration} • {h.views}</p>
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
      </div>

      {/* FULL VOLUNTEER PROFILE & OUTREACH INVITATION MODAL */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-gray-200 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedVolunteer(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-full bg-[#ffd9de] text-[#b0004a] flex items-center justify-center font-bold text-xl">
                {selectedVolunteer.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-gray-900">{selectedVolunteer.name}</h3>
                <p className="text-xs text-gray-500">Volunteer Application Profile</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">EMAIL ADDRESS</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.email}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">PHONE NUMBER</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.phone}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">STREET ADDRESS</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.street || '123 Care Lane'}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">CITY, STATE, ZIP</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.city || 'Metropolis'}, {selectedVolunteer.state || 'NY'} {selectedVolunteer.zip || '10001'}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="text-gray-500 font-bold uppercase tracking-wider block">Volunteer Interest Categories</span>
              <div className="flex flex-wrap gap-2">
                {(selectedVolunteer.interests || ['Medical Outreach']).map((cat, idx) => (
                  <span key={idx} className="bg-[#ffd9de] text-[#b0004a] px-3 py-1 rounded-full font-bold">
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">SCHEDULE AVAILABILITY</span>
                <p className="font-semibold text-gray-800 capitalize">{selectedVolunteer.availability || 'Weekends'}</p>
              </div>
              <div className="bg-gray-50 p-3.5 rounded-xl space-y-1">
                <span className="text-gray-400 font-bold block text-[10px]">MEDICAL CREDENTIALS</span>
                <p className="font-semibold text-gray-800">{selectedVolunteer.qualifications || 'RN Nurse'}</p>
              </div>
            </div>

            {/* Send Program Invitation Form */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h4 className="font-heading font-bold text-sm text-gray-900">Invite {selectedVolunteer.name} to Upcoming Outreach Program</h4>
              <form onSubmit={handleSendInvitation} className="space-y-3 text-xs">
                <textarea
                  rows={3}
                  required
                  placeholder={`Write invitation message to ${selectedVolunteer.name} regarding upcoming medical outreach shift...`}
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

      {/* FULL DONOR TRANSACTION RECEIPT MODAL */}
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
