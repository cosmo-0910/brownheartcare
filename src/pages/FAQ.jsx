import React, { useState } from 'react';

export default function FAQ({ setCurrentPage, openDonateModal }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does Brown\'s Heart Care Foundation ensure financial transparency?',
      a: 'We publish audited annual financial reports detailing every dollar received and spent. 88% of all funds raised directly support beneficiary emergency relief funds, mobile center operations, and food relief baskets, while 12% is allocated to administration and fundraising.'
    },
    {
      q: 'How can a beneficiary apply for emergency relief fund subsidies or free relief supply?',
      a: 'beneficiaries or their family members can apply through our Contact page under "beneficiary Assistance" or visit our mobile health center. Applications require a support diagnosis report from a certified doctor and financial verification.'
    },
    {
      q: 'Is my donation tax-deductible?',
      a: 'Yes. Brown\'s Heart Care Foundation is a fully registered Non-Governmental Organization (NGO). An automated official tax receipt is sent to your email address immediately upon completing a donation.'
    },
    {
      q: 'What is the "Monthly Pulse Partner" program?',
      a: 'Monthly Pulse Partners provide reliable recurring gifts that keep our mobile heart assessment buses fueled and staffed continuously throughout the year. You can choose any monthly amount and cancel or modify it at any time.'
    },
    {
      q: 'Can skilled volunteers volunteer for mobile center outreaches?',
      a: 'Absolutely! We actively welcome licensed specialists, general practitioners, registered support staff, assessment technicians, and support students. Please fill out our Volunteer application to join our upcoming outreach roster.'
    }
  ];

  return (
    <div className="pt-24 pb-20 animate-fadeIn max-w-container-max mx-auto px-4 md:px-8 space-y-12">
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
          Support & Questions
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-secondary text-base leading-relaxed">
          Find clear answers regarding our support programs, beneficiary eligibility, donor security, and volunteer opportunities.
        </p>
      </section>

      {/* Accordion List */}
      <section className="max-w-3xl mx-auto space-y-4">
        {faqs.map((f, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className="bg-surface-container-lowest rounded-2xl border border-surface-variant shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-6 text-left font-heading font-bold text-base md:text-lg text-on-surface flex justify-between items-center gap-4 hover:text-primary transition-colors"
              >
                <span>{f.q}</span>
                <span className="material-symbols-outlined text-primary text-xl">
                  {isOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-xs md:text-sm text-on-surface-variant leading-relaxed border-t border-surface-container pt-4">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Help Banner */}
      <section className="text-center bg-surface-container-low p-8 rounded-3xl max-w-xl mx-auto space-y-3 border border-surface-variant">
        <h3 className="font-heading font-bold text-xl text-on-surface">Still have questions?</h3>
        <p className="text-xs text-secondary">Our compassionate donor support team is here to assist you.</p>
        <button
          onClick={() => {
            setCurrentPage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 rounded-full bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-colors"
        >
          Contact Our Team
        </button>
      </section>
    </div>
  );
}
