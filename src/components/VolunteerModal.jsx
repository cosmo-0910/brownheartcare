import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function VolunteerModal({ isOpen, onClose, onAddVolunteer, targetEvent }) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState(['support', 'events']);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hasCachedProfile, setHasCachedProfile] = useState(false);

  const targetEventTitle = typeof targetEvent === 'string' 
    ? targetEvent 
    : (targetEvent?.title || 'General Outreach Volunteer');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    occupation: '',
    qualifications: '',
    emergencyContact: '',
    motivation: '',
    photoUrl: ''
  });

  // Auto-fill from cached profile on open
  useEffect(() => {
    if (isOpen) {
      const cached = localStorage.getItem('bhc_cached_volunteer');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setFormData(prev => ({ ...prev, ...parsed }));
          if (parsed.photoUrl) setPhotoPreview(parsed.photoUrl);
          setHasCachedProfile(true);
        } catch (e) {
          console.error('Failed to load cached volunteer profile', e);
        }
      }
    }
  }, [isOpen]);

  const clearCachedProfile = () => {
    localStorage.removeItem('bhc_cached_volunteer');
    setHasCachedProfile(false);
    setPhotoPreview(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      occupation: '',
      qualifications: '',
      emergencyContact: '',
      motivation: '',
      photoUrl: ''
    });
  };

  if (!isOpen) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setValidationError('Photo size must be under 10MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, photoUrl: reader.result }));
        setValidationError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const validateStep1 = () => {
    if (!formData.photoUrl) {
      setValidationError('Please upload your photo (Compulsory).');
      return false;
    }
    if (!formData.fullName.trim()) {
      setValidationError('Full Name is compulsory.');
      return false;
    }
    if (!formData.email.trim()) {
      setValidationError('Email address is compulsory.');
      return false;
    }
    if (!formData.phone.trim()) {
      setValidationError('Phone number is compulsory.');
      return false;
    }
    if (!formData.street.trim() || !formData.city.trim() || !formData.state.trim()) {
      setValidationError('Detailed Home Address (Street, City, State) is compulsory.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const validateStep3 = () => {
    if (!formData.occupation.trim()) {
      setValidationError('Occupation / What you do for a living is compulsory.');
      return false;
    }
    if (!formData.qualifications.trim()) {
      setValidationError('Profession, Specialization & Key Skills are compulsory.');
      return false;
    }
    if (!formData.emergencyContact.trim()) {
      setValidationError('Emergency Contact Name & Phone is compulsory.');
      return false;
    }
    if (!formData.motivation.trim()) {
      setValidationError('Motivation for volunteering is compulsory.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleComplete = async () => {
    if (!validateStep3()) return;

    setSubmitting(true);

    // Save profile to local cache for auto-fill on future visits
    localStorage.setItem('bhc_cached_volunteer', JSON.stringify(formData));

    const volunteerRecord = {
      id: window.crypto.randomUUID ? window.crypto.randomUUID() : `vol-${Date.now()}`,
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      street_address: formData.street,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zip,
      detailed_address: `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`.trim(),
      occupation: formData.occupation,
      support_qualifications: formData.qualifications, // legacy field key maintained for db compatibility
      qualifications: formData.qualifications,
      emergency_contact: formData.emergencyContact,
      motivation: formData.motivation,
      photo_url: formData.photoUrl,
      event_title: targetEventTitle,
      interests: selectedInterests.map(i => {
        if (i === 'support') return 'support Screening & Outreach';
        if (i === 'events') return 'Community Food & Aid';
        if (i === 'admin') return 'Logistics & Admin Support';
        if (i === 'fundraising') return 'Resource Mobilization';
        return 'beneficiary Support Care';
      }),
      created_at: new Date().toISOString(),
      invitation_status: 'Pending'
    };

    try {
      // Save locally to localStorage fallback roster
      const savedVols = JSON.parse(localStorage.getItem('bhc_volunteers_roster') || '[]');
      localStorage.setItem('bhc_volunteers_roster', JSON.stringify([volunteerRecord, ...savedVols]));

      // Save to Supabase
      await supabase.from('volunteers').insert([volunteerRecord]);
    } catch (err) {
      console.warn('Saved to local roster; Supabase sync notice:', err.message);
    }

    if (onAddVolunteer) {
      onAddVolunteer({
        id: volunteerRecord.id,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        street: formData.street,
        occupation: formData.occupation,
        qualifications: formData.qualifications,
        emergencyContact: formData.emergencyContact,
        photoUrl: formData.photoUrl,
        event_title: targetEventTitle,
        interests: volunteerRecord.interests
      });
    }

    setSubmitting(false);
    setStep(4);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setPhotoPreview(null);
    setValidationError('');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      occupation: '',
      qualifications: '',
      emergencyContact: '',
      motivation: '',
      photoUrl: ''
    });
    onClose();
  };

  const interestCards = [
    {
      id: 'support',
      title: 'support Screening Outreach',
      desc: 'Assist support staff and doctors during community health checks & vital screenings.',
      icon: 'volunteer_activism'
    },
    {
      id: 'events',
      title: 'Food & Relief Distribution',
      desc: 'Organize hot meals, clean water, and nutritional relief packages for families.',
      icon: 'volunteer_activism'
    },
    {
      id: 'admin',
      title: 'Logistics & Admin Support',
      desc: 'Help coordinate registration desks, record-keeping, and event logistics.',
      icon: 'table_restaurant'
    },
    {
      id: 'fundraising',
      title: 'Community Resource Drive',
      desc: 'Help gather clothing, aid supplies, and donor support for poor communities.',
      icon: 'groups'
    },
    {
      id: 'beneficiary',
      title: 'beneficiary Care & Companionship',
      desc: 'Offer personal care, comfort, and follow-up guidance to vulnerable beneficiaries.',
      icon: 'favorite'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#f9f9f9] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-200 max-h-[95vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Brown Heart Care" className="h-8 w-auto object-contain" onError={(e) => e.target.style.display = 'none'} />
            <div>
              <span className="font-heading font-bold text-base md:text-lg text-[#b0004a] block leading-none">
                Brown Heart Care
              </span>
              <span className="text-[10px] text-gray-500 italic">Official Volunteer Onboarding</span>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-xs text-gray-500 hover:text-gray-900 font-medium hover:underline"
          >
            Exit Registration
          </button>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-5 md:p-8 overflow-y-auto space-y-6 flex-grow">
          {/* Progress Indicator */}
          <div className="space-y-2 max-w-3xl mx-auto">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-800">Step {step} of 4</span>
              <span className="text-[#b0004a]">
                {step === 1 && 'Photo & Personal Details (Compulsory)'}
                {step === 2 && 'Outreach Focus Areas'}
                {step === 3 && 'Occupation & Emergency Contact (Compulsory)'}
                {step === 4 && 'Registration Complete'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#b0004a] rounded-full transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Validation Warning Alert */}
          {validationError && (
            <div className="max-w-3xl mx-auto p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-semibold flex items-center gap-2 animate-shake">
              <span className="material-symbols-outlined text-base text-red-600">error</span>
              <span>{validationError}</span>
            </div>
          )}

          {/* Target Event Banner */}
          {targetEventTitle && (
            <div className="max-w-3xl mx-auto bg-[#ffd9de]/50 border border-[#b0004a]/30 p-3.5 rounded-2xl flex items-center justify-between text-xs text-[#90003b]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#b0004a]">event_available</span>
                <span>Volunteering specifically for: <strong className="text-[#b0004a] font-bold">{targetEventTitle}</strong></span>
              </div>
              <span className="bg-[#b0004a] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase">Target Event</span>
            </div>
          )}

          {/* Cached Profile Auto-Fill Alert */}
          {hasCachedProfile && step === 1 && (
            <div className="max-w-3xl mx-auto p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-emerald-600">verified_user</span>
                <span>Welcome back! Your saved volunteer profile has been auto-filled.</span>
              </div>
              <button
                type="button"
                onClick={clearCachedProfile}
                className="text-[11px] font-bold text-red-600 hover:underline"
              >
                Clear Saved Details
              </button>
            </div>
          )}

          {/* STEP 1: Photo & Personal Details */}
          {step === 1 && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#1a1c1c] mb-1">Volunteer Information</h2>
                <p className="text-xs text-gray-500">
                  All fields marked with <span className="text-red-500 font-bold">*</span> are compulsory for foundation onboarding.
                </p>
              </div>

              {/* Photo Upload Section */}
              <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center space-y-3">
                <label className="block text-xs font-bold text-gray-700">
                  Upload Volunteer Photo Headshot <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {photoPreview ? (
                    <div className="relative group">
                      <img 
                        src={photoPreview} 
                        alt="Volunteer headshot" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-[#b0004a] shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => { setPhotoPreview(null); setFormData(p => ({ ...p, photoUrl: '' })); }}
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700"
                        title="Remove photo"
                      >
                        <span className="material-symbols-outlined text-xs block">close</span>
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 text-gray-400 flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                      <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                      <span className="text-[10px] text-gray-500">No Photo</span>
                    </div>
                  )}

                  <div className="text-left space-y-1">
                    <input
                      type="file"
                      id="volunteer-photo-input"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="volunteer-photo-input"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#b0004a] text-white text-xs font-semibold cursor-pointer hover:bg-[#90003b] transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-base">upload_file</span>
                      <span>{photoPreview ? 'Change Photo' : 'Select Photo File'}</span>
                    </label>
                    <p className="text-[11px] text-gray-500">Formats: JPG, PNG, WEBP (Max 10MB)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full legal name..."
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="font-heading font-bold text-sm text-[#1a1c1c] mb-3">
                    Detailed Home Address <span className="text-red-500">*</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Street / Residential Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House No., Street Name, Neighborhood"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">City <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="Lagos"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-3 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">State <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          required
                          placeholder="Lagos State"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-3 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Postal Code</label>
                        <input
                          type="text"
                          placeholder="100001"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-3 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#b0004a] text-white text-xs font-semibold hover:bg-[#90003b] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next Step</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Volunteer Interests */}
          {step === 2 && (
            <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#1a1c1c]">Select Your Outreach Areas</h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                  Choose the foundation outreach activities you would love to participate in.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {interestCards.map((card) => {
                  const isSelected = selectedInterests.includes(card.id);
                  return (
                    <div
                      key={card.id}
                      onClick={() => toggleInterest(card.id)}
                      className={`bg-white rounded-2xl p-6 shadow-sm border text-center space-y-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#b0004a] ring-2 ring-[#b0004a]/30 scale-[1.02]'
                          : 'border-gray-200 hover:border-[#b0004a]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#ffd9de]/50 text-[#b0004a] mx-auto flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                      </div>
                      <h3 className="font-heading font-bold text-base text-[#1a1c1c]">{card.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{card.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 max-w-4xl mx-auto">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 rounded-full border border-gray-400 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 rounded-full bg-[#b0004a] text-white text-xs font-semibold hover:bg-[#90003b] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Next Step</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Occupation, Credentials & Emergency Contact */}
          {step === 3 && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#1a1c1c] mb-1">Background & Emergency Contact</h2>
                <p className="text-xs text-gray-500">
                  Please provide your profession and emergency contact details (Compulsory).
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Occupation / What do you do for a living? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Registered Nurse, Teacher, Civil Servant, Business Owner..."
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Profession, Specialization & Key Skills <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your profession, key skills, area of expertise, or past community experience..."
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Emergency Contact Person & Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spouse / Relative Name - +234 801 234 5678"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Why do you want to volunteer with Brown Heart Care? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Share your motivation to help poor and underserved communities..."
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full bg-[#f4f4f4] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a] resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-full border border-gray-400 text-gray-700 text-xs font-semibold hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleComplete}
                  className="px-6 py-2.5 rounded-full bg-[#b0004a] text-white text-xs font-semibold hover:bg-[#90003b] transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  <span>{submitting ? 'Submitting...' : 'Complete Registration'}</span>
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Success Confirmation */}
          {step === 4 && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#ffd9de] text-[#b0004a] mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">verified</span>
              </div>
              <h2 className="font-heading font-bold text-2xl text-[#1a1c1c]">Registration Received!</h2>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your detailed volunteer profile and uploaded photo have been submitted to the Brown Heart Care Foundation team.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-full bg-[#b0004a] text-white text-xs font-bold shadow-md hover:bg-[#90003b] transition-colors"
                >
                  Return to Foundation Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-[#eee] px-6 py-3 border-t border-gray-200 text-center text-[11px] text-gray-500 shrink-0">
          © {new Date().getFullYear()} Brown Heart Care Foundation. "We breathe out love for others to inhale".
        </div>
      </div>
    </div>
  );
}
