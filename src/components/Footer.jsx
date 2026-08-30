import React, { useState } from 'react';

export default function Footer({ setCurrentPage, openDonateModal, openVolunteerModal }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  const navTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surface-container-highest border-t border-outline-variant/30 text-on-surface pt-16 pb-12">
      <div className="max-w-container-max mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navTo('home')}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-white shadow-md">
                <span className="material-symbols-outlined fill text-2xl">favorite</span>
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-primary block leading-none">
                  Brown's Heart Care
                </span>
                <span className="text-xs font-semibold text-secondary tracking-widest uppercase">
                  Foundation
                </span>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant max-w-md leading-relaxed">
              We breathe out love for others to inhale. Dedicated to promoting cardiovascular health, providing free health screenings, subsidized surgeries, emergency medication, and nutritional security.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">
                Subscribe to Impact Updates
              </h4>
              {subscribed ? (
                <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl text-xs text-primary font-medium flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Thank you for joining our compassionate community!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 bg-surface-container-lowest border border-outline-variant/50 rounded-full px-4 py-2.5 text-xs text-on-surface focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary-container transition-colors shadow-sm"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-on-surface mb-4">About the Foundation</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li><button onClick={() => navTo('story')} className="hover:text-primary transition-colors">Our Story & Origin</button></li>
              <li><button onClick={() => navTo('history')} className="hover:text-primary transition-colors">Historical Timeline</button></li>
              <li><button onClick={() => navTo('mission')} className="hover:text-primary transition-colors">Mission & Core Values</button></li>
              <li><button onClick={() => navTo('programs')} className="hover:text-primary transition-colors">Health Care Programs</button></li>
              <li><button onClick={() => navTo('events')} className="hover:text-primary transition-colors">Events & Photo Gallery</button></li>
            </ul>
          </div>

          {/* Support & Action */}
          <div>
            <h4 className="font-heading font-bold text-sm text-on-surface mb-4">Get Involved</h4>
            <ul className="space-y-2.5 text-xs text-on-surface-variant">
              <li><button onClick={() => navTo('donate')} className="hover:text-primary font-semibold text-primary transition-colors">Make a Donation</button></li>
              <li><button onClick={() => navTo('waystogive')} className="hover:text-primary transition-colors">Ways to Give & Partner</button></li>
              <li><button onClick={openVolunteerModal} className="hover:text-primary transition-colors">Volunteer Opportunities</button></li>
              <li><button onClick={() => navTo('contact')} className="hover:text-primary transition-colors">Contact Support Team</button></li>
              <li><button onClick={() => navTo('faq')} className="hover:text-primary transition-colors">Frequently Asked Questions</button></li>
            </ul>
          </div>

          {/* Legal & SDG Badges */}
          <div>
            <h4 className="font-heading font-bold text-sm text-on-surface mb-4">Global Alignment</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs bg-surface-container-lowest p-2 rounded-lg border border-surface-variant">
                <span className="w-7 h-7 rounded bg-[#dda63a] text-white flex items-center justify-center font-bold text-[10px]">SDG 2</span>
                <span className="text-[11px] font-medium text-secondary">Zero Hunger & Nutrition</span>
              </div>
              <div className="flex items-center gap-2 text-xs bg-surface-container-lowest p-2 rounded-lg border border-surface-variant">
                <span className="w-7 h-7 rounded bg-[#4c9f38] text-white flex items-center justify-center font-bold text-[10px]">SDG 3</span>
                <span className="text-[11px] font-medium text-secondary">Good Health & Well-being</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-on-surface-variant">
              <p><button onClick={() => navTo('privacy')} className="hover:text-primary underline transition-colors">Privacy & Donor Policy</button></p>
              <p><button onClick={() => navTo('privacy')} className="hover:text-primary underline transition-colors">Financial Transparency Reports</button></p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-surface-variant flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-secondary">
          <p>© 2024 Brown's Heart Care Foundation. All Rights Reserved. Registered Non-Governmental Organization.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-primary cursor-pointer transition-colors">Facebook</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Twitter/X</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-primary cursor-pointer transition-colors">LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
