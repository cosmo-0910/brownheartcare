import React from 'react';

export default function Programs({ setCurrentPage, openDonateModal, openVolunteerModal }) {
  const navTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const programs = [
    {
      id: 'screening',
      title: 'Mobile community assessment centers',
      subtitle: 'Free wellness, assessment & Risk Factor Screening',
      desc: 'Our fleet of custom mobile health units travels directly into underserved urban neighborhoods and rural villages. Equipped with digital assessment machines, basic health monitors, and assessment units operated by licensed specialists.',
      stats: '15,000+ Screenings Annually',
      icon: 'favorite',
      badge: 'Preventative Care'
    },
    {
      id: 'relief funds',
      title: 'Subsidized youth & Adult emergency relief funds',
      subtitle: 'Emergency Financial & relief Relief Fund',
      desc: 'Partnering with top regional teaching partner institutions to cover up to 100% of relief costs for low-income beneficiaries requiring critical critical aid, critical intervention, or critical intervention.',
      stats: '180+ Life-Saving relief funds Funded',
      icon: 'volunteer_activism',
      badge: 'Emergency Fund'
    },
    {
      id: 'relief supply',
      title: 'Chronic welfare relief supply Supply Line',
      subtitle: 'Free Monthly Prescription Assistance',
      desc: 'essential relief supplies (essentials, relief supplies, provisions) must be taken consistently. We partner with supply donors to supply monthly care packages to low-income vulnerable individuals at zero cost.',
      stats: '4,200+ Active Monthly Beneficiaries',
      icon: 'pill',
      badge: 'relief supply Access'
    },
    {
      id: 'nutrition',
      title: 'Heart-Healthy Food & Grain Relief (SDG 2)',
      subtitle: 'Nutritional Stability for community recovery',
      desc: 'Proper nutrition is critical to recovering from community events and managing hypertension. We distribute wholesome, sodium-balanced grain boxes, fresh produce vouchers, and dietary counseling.',
      stats: '35,000+ Meal Baskets Distributed',
      icon: 'restaurant',
      badge: 'SDG 2 Alignment'
    }
  ];

  return (
    <div className="pt-24 pb-20 animate-fadeIn space-y-16">
      {/* Header */}
      <section className="max-w-container-max mx-auto px-4 md:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
          Healthcare & Relief Initiatives
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary">
          Our Health & Nutrition Programs
        </h1>
        <p className="text-secondary text-base max-w-2xl mx-auto leading-relaxed">
          Comprehensive community support programs combined with food security interventions designed to lower mortality and restore community well-being.
        </p>
      </section>

      {/* Programs List */}
      <section className="max-w-container-max mx-auto px-4 md:px-8 space-y-8">
        {programs.map((p, idx) => (
          <div key={p.id} className="bg-surface-bright rounded-3xl p-8 md:p-10 shadow-card border border-surface-variant grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">
                  {p.badge}
                </span>
                <span className="text-xs font-semibold text-secondary flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary">analytics</span>
                  {p.stats}
                </span>
              </div>

              <h2 className="font-heading font-bold text-2xl md:text-3xl text-on-surface">
                {p.title}
              </h2>
              <h4 className="text-sm font-semibold text-primary">{p.subtitle}</h4>
              <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
                {p.desc}
              </p>
            </div>

            <div className="bg-surface-container-low p-6 rounded-2xl border border-surface-variant flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">{p.icon}</span>
              </div>
              <button
                onClick={() => navTo('donate')}
                className="w-full py-3 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-xs shadow-md hover:shadow-card-hover transition-all"
              >
                Sponsor This Program
              </button>
              <button
                onClick={openVolunteerModal}
                className="w-full py-3 rounded-full border border-secondary text-secondary font-semibold text-xs hover:bg-surface-container"
              >
                Volunteer Expertise
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
