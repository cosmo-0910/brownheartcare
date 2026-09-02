import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function Contact() {
  const { settings } = useSiteSettings();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24 pb-20 animate-fadeIn max-w-container-max mx-auto px-4 md:px-8 space-y-16">
      {/* Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
          Get In Touch
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary">
          Contact Support & HQ
        </h1>
        <p className="text-secondary text-base leading-relaxed">
          Have questions about medical outreach assistance, volunteer programs, donations, or corporate partnerships? Reach out to our dedicated foundation team.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-variant space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">location_on</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-on-surface">Foundation Base</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
              {settings.orgName}<br />
              Lagos, Nigeria (Community Outreach Operations)
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-variant space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">call</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-on-surface">Official Phone Lines</h3>
            <div className="text-xs text-on-surface-variant space-y-1">
              <p>📞 <strong>Mrs. Brown:</strong> 08136374060 / 09150973161</p>
              <p>📞 <strong>Miss Esther:</strong> +234 810 736 9839</p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-card border border-surface-variant space-y-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">mail</span>
            </div>
            <h3 className="font-heading font-bold text-lg text-on-surface">Email Inquiries</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              ✉️ <strong>Official Email:</strong> brownheartcare@gmail.com
            </p>
          </div>
        </div>



        {/* Contact Form */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-3xl shadow-card border border-surface-variant">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="font-heading font-bold text-2xl text-on-surface">Send Us a Direct Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-surface-container border border-transparent rounded-xl py-3 px-4 text-xs text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface-container border border-transparent rounded-xl py-3 px-4 text-xs text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Inquiry Category</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-surface-container border border-transparent rounded-xl py-3 px-4 text-xs text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all"
                >
                  <option value="general">General Inquiry</option>
                  <option value="patient">Patient Assistance / Surgery Subsidy Application</option>
                  <option value="donor">Donation & Tax Receipt Support</option>
                  <option value="corporate">Corporate Partnership & Sponsorship</option>
                  <option value="media">Media & Press</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Your Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can our foundation assist you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-surface-container border border-transparent rounded-xl py-3 px-4 text-xs text-on-surface focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-heading font-bold text-sm shadow-md hover:shadow-card-hover transition-all flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl">mark_email_read</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-on-surface">Message Received!</h3>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                Thank you for reaching out, <strong>{formData.name}</strong>. A foundation support representative will get back to you at <strong>{formData.email}</strong> within 12 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-8 py-3 rounded-full bg-primary text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
