import React from 'react';

export default function Privacy() {
  return (
    <div className="pt-24 pb-20 animate-fadeIn max-w-container-max mx-auto px-4 md:px-8 space-y-10">
      <section className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
          Governance & Compliance
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface">
          Privacy Policy & Donor Bill of Rights
        </h1>
        <p className="text-secondary text-sm">Last updated: August 2024</p>
      </section>

      <div className="bg-surface-container-lowest p-8 md:p-12 rounded-3xl shadow-card border border-surface-variant max-w-4xl space-y-8 text-xs md:text-sm text-on-surface-variant leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-on-surface">1. Commitment to Donor Privacy</h2>
          <p>
            Brown's Heart Care Foundation holds all donor information in strict confidence. We do not sell, rent, trade, or share donor contact information, mailing lists, or transaction histories with any third-party commercial entity under any circumstances.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-on-surface">2. Data Security & Encryption</h2>
          <p>
            All electronic payment transactions are encrypted using industry-standard 256-Bit SSL / TLS protocols through certified payment processors. We do not store raw credit card or banking numbers on our web servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-on-surface">3. Financial Transparency & Audit Reports</h2>
          <p>
            As a registered NGO, our annual financial statements undergo independent external auditing. 88% of all funds raised directly fund patient surgeries, mobile clinics, and nutrition boxes. 12% covers essential administrative compliance and operational support.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading font-bold text-xl text-on-surface">4. Patient Rights & Privacy</h2>
          <p>
            Patient medical records and screening results gathered during mobile outreaches are strictly protected under medical confidentiality laws and HIPAA standards.
          </p>
        </section>
      </div>
    </div>
  );
}
