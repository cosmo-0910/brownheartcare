import React from 'react';

export default function Volunteer({ openVolunteerModal }) {
  const roles = [
    {
      title: 'skilled volunteers (specialists, counselors & support staff)',
      desc: 'Perform free needs assessments, assessment reviews, and beneficiary consultations during weekend outreach centers.',
      icon: 'volunteer_activism'
    },
    {
      title: 'Nutritional Specialists & Dietitians',
      desc: 'Conduct community education workshops on sodium management, heart-healthy diets, and food preparation.',
      icon: 'restaurant'
    },
    {
      title: 'Event & Logistics Operations',
      desc: 'Assist with registration, crowd management, food hamper packing, and center setup during health walks and drives.',
      icon: 'diversity_3'
    },
    {
      title: 'Tech, Admin & Youth Ambassadors',
      desc: 'Help manage support record intake, photography, social media coverage, and administrative coordination.',
      icon: 'laptop_mac'
    }
  ];

  return (
    <div className="pt-24 pb-20 animate-fadeIn space-y-16">
      {/* Header */}
      <section className="max-w-container-max mx-auto px-4 md:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
          Volunteer Force
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary">
          Join Our Volunteer Network
        </h1>
        <p className="text-secondary text-base max-w-2xl mx-auto leading-relaxed">
          Be the heartbeat of our foundation. Whether you are a healthcare professional or an enthusiastic volunteer, your passion changes lives.
        </p>
        <div className="pt-2">
          <button
            onClick={openVolunteerModal}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm shadow-md hover:shadow-card-hover transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <span>Fill Volunteer Application</span>
            <span className="material-symbols-outlined text-sm">assignment</span>
          </button>
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="max-w-container-max mx-auto px-4 md:px-8">
        <h2 className="font-heading font-bold text-2xl text-on-surface mb-8 text-center">Open Volunteer Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((r, idx) => (
            <div key={idx} className="bg-surface-bright rounded-2xl p-8 shadow-card border border-surface-variant space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">{r.icon}</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-on-surface">{r.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{r.desc}</p>
              <button
                onClick={openVolunteerModal}
                className="text-xs font-bold text-primary flex items-center gap-1 hover:underline pt-2"
              >
                <span>Apply for this role</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
