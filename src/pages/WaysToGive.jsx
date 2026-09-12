import React from 'react';

export default function WaysToGive({ setCurrentPage, openDonateModal, openVolunteerModal }) {
  const navTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ways = [
    {
      title: 'One-Time Heart Support',
      desc: 'Immediate financial aid for urgent emergency relief funds, mobile screening center operations, or community food supplies.',
      icon: 'favorite',
      actionText: 'Donate One-Time',
      action: () => navTo('donate')
    },
    {
      title: 'Monthly Pulse Membership',
      desc: 'Sustained recurring giving that ensures our community outreach buses remain fueled and operational every month.',
      icon: 'update',
      actionText: 'Become a Monthly Donor',
      action: () => navTo('donate')
    },
    {
      title: 'Corporate Health Sponsorship',
      desc: 'Partner your enterprise with Brown\'s Heart Care Foundation to fulfill CSR goals, sponsor support equipment, or fund relief funds.',
      icon: 'corporate_fare',
      actionText: 'Corporate Partnership Info',
      action: () => navTo('contact')
    },
    {
      title: 'In-Kind support & Food Supplies',
      desc: 'Donate assessment tools, assessment machines, essential supplies, vitamins, or non-perishable healthy food parcels.',
      icon: 'inventory_2',
      actionText: 'Supply Donation Inquiries',
      action: () => navTo('contact')
    },
    {
      title: 'Legacy & Endowment Giving',
      desc: 'Leave a lasting legacy of compassionate care by including Brown\'s Heart Care in your estate plan or charitable trust.',
      icon: 'shield_heart',
      actionText: 'Legacy Giving Details',
      action: () => navTo('contact')
    },
    {
      title: 'Volunteer Time & support Expertise',
      desc: 'Are you a specialist, nurse, or passionate community member? Lend your skills to our mobile health centers.',
      icon: 'handshake',
      actionText: 'Apply to Volunteer',
      action: openVolunteerModal
    }
  ];

  return (
    <div className="pt-24 pb-20 animate-fadeIn space-y-16">
      {/* Header */}
      <section className="max-w-container-max mx-auto px-4 md:px-8 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
          Support Pathways
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary">
          Ways to Give & Partner
        </h1>
        <p className="text-secondary text-base max-w-2xl mx-auto leading-relaxed">
          Every contribution — whether financial, in-kind relief supplies, corporate sponsorship, or volunteer time — creates real health impact.
        </p>
      </section>

      {/* Ways Grid */}
      <section className="max-w-container-max mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ways.map((w, idx) => (
            <div key={idx} className="bg-surface-bright rounded-2xl p-8 shadow-card border border-surface-variant flex flex-col justify-between hover:shadow-card-hover transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{w.icon}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-on-surface">{w.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">{w.desc}</p>
              </div>

              <button
                onClick={w.action}
                className="mt-8 w-full py-3 rounded-full bg-surface-container hover:bg-primary hover:text-white text-primary text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <span>{w.actionText}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
