import React from 'react';

export default function OurHistory({ setCurrentPage }) {
  const navTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-20 animate-fadeIn font-sans bg-[#f9f9f9] text-[#1a1c1c]">
      {/* Header */}
      <section className="py-16 max-w-[800px] mx-auto px-4 text-center space-y-4">
        <span className="inline-block px-4 py-1.5 bg-[#ffd9de] text-[#b0004a] rounded-full text-xs font-semibold">
          <span className="material-symbols-outlined text-xs align-middle mr-1">history</span>
          Our Journey
        </span>

        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#1a1c1c]">
          A Movement Born from <span className="text-[#b0004a]">Compassion</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          From a single act of kindness at an orphanage to a growing movement of hope. Discover the milestones that have shaped our mission to restore dignity, joy, and well-being.
        </p>
      </section>

      {/* Vertical Timeline Section */}
      <section className="pb-24 max-w-[1000px] mx-auto px-4 relative">
        {/* Central Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#ffd9de] -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-16 relative z-10">
          {/* Milestone 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-[#b0004a] space-y-3 relative">
              <span className="text-xs font-bold text-[#b0004a] block">March 15th, 2025</span>
              <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">The First Seed</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Our journey began with a simple but profound step: our first outreach at a local orphanage home. We arrived sharing food items, but we left with a deeper understanding of the need for sustained support.
              </p>
            </div>

            {/* Right Image */}
            <div className="rounded-2xl overflow-hidden shadow-sm h-64 border border-gray-100">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBll0-lwQpXVroVoV4bAnp6Ygx7qxW2mZoZs_Ou829wSXmwp8Bz-1_Ks568WqOr233bGZVvTKWEZGs6qwN66bWJhJIOllFH_2G25ph3oTyNn0U3JwOV3gf2RWxg5dIl_dFPs29b2YG4pCP-_L44JLVMjVEwLqLDbUMeYzxYh6Dt4cW2dWj2e9ABQUshS9jbppDpi1e_gvTfANEj5wBHZGvxVA1LHFKBF8Wl29iZB3Jq7uNDHSVDD_2xRA" 
                alt="The First Seed"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Image */}
            <div className="order-2 md:order-1 rounded-2xl overflow-hidden shadow-sm h-64 border border-gray-100">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrvDpFqzH7R9Vv4yRASnc0JwhatGSUF4hgM_t9hGvrM9jb7gpQjv_rTNxAsGYYDSwSWduPDqo_B40HxFcyDZvDe2EmYHO8uBTJvDipHxtFWwX5NTaoUp7GfMMrn_SUxHuP3TusTU8H21uhLndNnKkN2AsUKz8l9EEGSFWx5O3N7UYmTRcPdqEQaN_gYOZCh2b6cfkkz2dOFL9CJMDuk0fKTs3lg0Z0JIBAJigNiqo9SHbZEaECcw1tjA" 
                alt="Restoring Dignity"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Card */}
            <div className="order-1 md:order-2 bg-white rounded-2xl p-8 shadow-sm border-t-4 border-[#b0004a] space-y-3">
              <span className="text-xs font-bold text-[#b0004a] block">Early 2026</span>
              <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">Restoring Dignity</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Recognizing that physical nourishment must be paired with emotional care, we began our journey to restore dignity and joy. We expanded our team to include counselors and community builders.
              </p>
            </div>
          </div>

          {/* Milestone 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Card */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border-t-4 border-[#b0004a] space-y-3">
              <span className="text-xs font-bold text-[#b0004a] block">Present Day</span>
              <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">A Movement of Hope</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Today, our reach has expanded exponentially through organized food drives, comprehensive health initiatives, and structured emotional support programs, touching thousands of lives.
              </p>
            </div>

            {/* Right Image */}
            <div className="rounded-2xl overflow-hidden shadow-sm h-64 border border-gray-100">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj5XloEX0loFJzOTTF23iAO9gQGtt8o_CD2HIKGd83bgbM9rQ81g_hKF5ii9lCpBUIJC62nvQW7XMBbXwbgtoQnFguol2NZc8dpPaR-llgJdlaCqhkT0GB4Y5unt_-IOawP20H2Lnr7QIhLXVB6UmLRjo-IQIvE3XBtO1s5clI2Ugq5Fv3G4dvB0WuXte6HZgBhPIKqnT82nURQXBlXO-c7F7eIacbAK8hPD5a08MhYU-cSMy0HoXZhw" 
                alt="A Movement of Hope"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer matching Image 5 */}
      <footer className="bg-[#e2e2e2] text-gray-700 py-10">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div>
            <span className="font-bold text-[#b0004a] text-sm">Brown's Heart Care</span>
            <p className="text-gray-500 mt-1">Restoring dignity, joy, and well-being through compassionate care and community support.</p>
          </div>
          <div className="flex gap-6 text-gray-600 font-medium">
            <button onClick={() => navTo('home-impact')} className="hover:underline">Zero Hunger SDG</button>
            <button onClick={() => navTo('events')} className="hover:underline">Good Health SDG</button>
            <button onClick={() => navTo('donate')} className="hover:underline">Contact Us</button>
            <button onClick={() => navTo('donate')} className="hover:underline">Privacy Policy</button>
          </div>
        </div>
        <div className="max-w-[1100px] mx-auto px-4 mt-4 pt-4 border-t border-gray-300 text-center text-xs text-gray-400">
          © 2024 Brown's Heart Care Foundation. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
