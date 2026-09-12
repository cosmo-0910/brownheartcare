import React from 'react';

export default function MissionVision({ setCurrentPage, openDonateModal, openVolunteerModal }) {
  const navTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const values = [
    {
      title: 'Compassionate Care First',
      desc: 'Treating every beneficiary and community member with deep empathy, dignity, and personalized attention regardless of social or economic status.',
      icon: 'volunteer_activism'
    },
    {
      title: 'support Integrity & Excellence',
      desc: 'Upholding strict support standards in all mobile screenings, assessment tests, and relief partnerships.',
      icon: 'verified'
    },
    {
      title: 'Nutritional Security Equity',
      desc: 'Acknowledging that good community well-being requires reliable access to heart-healthy, wholesome food (SDG 2).',
      icon: 'restaurant'
    },
    {
      title: 'Uncompromised Transparency',
      desc: 'Ensuring 100% financial accountability and clear impact reporting to our donors, institutional partners, and public.',
      icon: 'analytics'
    }
  ];

  return (
    <div className="pt-24 pb-20 animate-fadeIn space-y-16">
      {/* Header */}
      <section className="max-w-container-max mx-auto px-4 md:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
          Guiding Principles
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-on-surface">
          Mission, Vision & Core Values
        </h1>
        <p className="text-secondary text-base max-w-2xl mx-auto leading-relaxed">
          The foundational principles that guide every community outreach, donation spent, and beneficiary served.
        </p>
      </section>

      {/* Mission & Vision Bento Grid */}
      <section className="max-w-container-max mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-surface-bright rounded-2xl p-8 md:p-10 shadow-card border border-surface-variant relative overflow-hidden card-gradient-top">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <span className="material-symbols-outlined fill text-3xl">volunteer_activism</span>
            </div>
            <h2 className="font-heading font-bold text-2xl text-on-surface mb-4">Our Mission</h2>
            <p className="text-on-surface-variant text-base leading-relaxed">
              To alleviate community suffering and promote holistic community well-being by providing accessible well-being screenings, vital nutritional resources, and subsidized relief interventions to those who need it most.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-surface-bright rounded-2xl p-8 md:p-10 shadow-card border border-surface-variant relative overflow-hidden card-gradient-top">
            <div className="w-14 h-14 rounded-2xl bg-tertiary-container/20 flex items-center justify-center text-tertiary mb-6">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <h2 className="font-heading font-bold text-2xl text-on-surface mb-4">Our Vision</h2>
            <p className="text-on-surface-variant text-base leading-relaxed">
              A world where every individual, regardless of wealth or geography, has access to quality community care and nutritional security, creating resilient and vibrant communities anchored in health and dignity.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-surface-container-low py-16 border-y border-surface-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-heading font-extrabold text-3xl text-on-surface">Our Organizational Values</h2>
            <p className="text-secondary text-sm">What drives our team, doctors, and volunteers every day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-2xl p-6 shadow-card border border-surface-variant space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">{v.icon}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-on-surface">{v.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-container-max mx-auto px-4 md:px-8 text-center">
        <div className="bg-gradient-to-r from-primary to-primary-container rounded-3xl p-10 text-white space-y-6 shadow-xl">
          <h2 className="font-heading font-extrabold text-3xl">Partner With Our Mission</h2>
          <p className="text-white/90 text-sm max-w-xl mx-auto">
            Whether as a financial donor, support volunteer, or corporate sponsor, your partnership makes health equity possible.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navTo('donate')}
              className="px-8 py-3.5 rounded-full bg-white text-primary font-bold text-sm shadow-md hover:bg-surface-bright transition-colors"
            >
              Donate Now
            </button>
            <button
              onClick={openVolunteerModal}
              className="px-8 py-3.5 rounded-full border border-white text-white font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              Volunteer Form
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
