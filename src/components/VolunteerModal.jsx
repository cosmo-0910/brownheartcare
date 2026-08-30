import React, { useState } from 'react';

export default function VolunteerModal({ isOpen, onClose, onAddVolunteer }) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState(['medical', 'events']);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    availability: 'weekends',
    qualifications: ''
  });

  if (!isOpen) return null;

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleComplete = () => {
    if (onAddVolunteer) {
      onAddVolunteer({
        name: formData.fullName || 'Kind Volunteer',
        email: formData.email || 'volunteer@example.com',
        phone: formData.phone || '+1 (555) 000-0000',
        city: formData.city || 'Metropolis',
        state: formData.state || 'NY',
        interests: selectedInterests.map(i => {
          if (i === 'medical') return 'Medical Outreach';
          if (i === 'events') return 'Community Events';
          if (i === 'admin') return 'Admin Support';
          if (i === 'fundraising') return 'Fundraising';
          return 'Patient Care';
        }),
        availability: formData.availability,
        qualifications: formData.qualifications || 'RN Nurse'
      });
    }
    setStep(4);
  };

  const handleResetAndClose = () => {
    setStep(1);
    onClose();
  };

  const interestCards = [
    {
      id: 'medical',
      title: 'Medical Outreach',
      desc: 'Assist clinical staff during community health screenings and remote clinics.',
      icon: 'medical_services'
    },
    {
      id: 'events',
      title: 'Community Events',
      desc: 'Help organize and run local awareness events, walks, and educational seminars.',
      icon: 'groups'
    },
    {
      id: 'admin',
      title: 'Admin Support',
      desc: 'Provide vital office support, data entry, and help manage communications.',
      icon: 'table_restaurant'
    },
    {
      id: 'fundraising',
      title: 'Fundraising',
      desc: 'Join campaigns to gather resources and secure sponsorships for care programs.',
      icon: 'volunteer_activism'
    },
    {
      id: 'patient',
      title: 'Patient Care',
      desc: 'Offer non-clinical support, companionship, and guidance to patients and families.',
      icon: 'favorite'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#f9f9f9] rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-200 max-h-[95vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#b0004a] text-2xl font-bold">favorite</span>
            <span className="font-heading font-bold text-lg text-[#b0004a]">HeartCare Foundation</span>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-xs text-gray-500 hover:text-gray-900 font-medium hover:underline"
          >
            Exit Registration
          </button>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-6 md:p-10 overflow-y-auto space-y-6 flex-grow">
          {/* Progress Indicator */}
          <div className="space-y-2 max-w-3xl mx-auto">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-800">Step {step} of 4</span>
              <span className="text-[#b0004a]">
                {step === 1 && 'Personal Details'}
                {step === 2 && 'Volunteer Interests'}
                {step === 3 && 'Availability & Skills'}
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

          {/* STEP 1: Personal Details */}
          {step === 1 && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#1a1c1c] mb-1">Join Our Mission</h2>
                <p className="text-xs text-gray-500">
                  Please provide your contact information so we can reach you about upcoming volunteer opportunities.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="font-heading font-bold text-sm text-[#1a1c1c] mb-3">Address</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Street Address</label>
                      <input
                        type="text"
                        placeholder="123 Care Lane"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">City</label>
                        <input
                          type="text"
                          placeholder="Metropolis"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-3 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">State</label>
                        <input
                          type="text"
                          placeholder="NY"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-3 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Zip Code</label>
                        <input
                          type="text"
                          placeholder="10001"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-3 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
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
                  onClick={() => setStep(2)}
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
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#1a1c1c]">How would you like to help?</h2>
                <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
                  Select all the areas where you'd be interested in volunteering your time and skills. We'll try to match you with appropriate opportunities.
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
                  <span>Next</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Availability & Skills */}
          {step === 3 && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6 animate-fadeIn">
              <div>
                <h2 className="font-heading font-bold text-2xl text-[#1a1c1c] mb-1">Availability & Credentials</h2>
                <p className="text-xs text-gray-500">
                  Help us organize medical teams and outreach shifts based on your schedule.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Schedule Preference</label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                    className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a]"
                  >
                    <option value="weekends">Weekend Outreach Camps Only</option>
                    <option value="flexible">Flexible Weekday Hours</option>
                    <option value="oncall">Emergency Medical Response Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Medical License / Skill Qualifications (Optional)</label>
                  <textarea
                    rows={4}
                    placeholder="e.g. Registered Nurse (RN), MD Cardiologist, Clinical Support, Event Logistics..."
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full bg-[#eee] border border-transparent rounded-xl py-3 px-4 text-xs font-medium text-gray-800 focus:outline-none focus:bg-white focus:border-[#b0004a] resize-none"
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
                  onClick={handleComplete}
                  className="px-6 py-2.5 rounded-full bg-[#b0004a] text-white text-xs font-semibold hover:bg-[#90003b] transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>Complete Registration</span>
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
                Thank you, <strong>{formData.fullName || 'Kind Volunteer'}</strong>. Our volunteer coordinator will reach out to you via <strong>{formData.email || 'your email'}</strong> to confirm your upcoming outreach shift.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-full bg-[#b0004a] text-white text-xs font-bold shadow-md hover:bg-[#90003b] transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="bg-[#eee] px-6 py-3 border-t border-gray-200 text-center text-[11px] text-gray-500 shrink-0">
          © 2024 HeartCare Foundation. Registered NGO. All rights reserved.
        </div>
      </div>
    </div>
  );
}
