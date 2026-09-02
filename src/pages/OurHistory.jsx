import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function OurHistory({ setCurrentPage }) {
  const { settings } = useSiteSettings();

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
          Our Timeline & History
        </span>

        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#1a1c1c]">
          A Movement Born from <span className="text-[#b0004a]">Compassion</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          From a single act of kindness at an outreach drive to a growing movement of hope across underserved communities. Discover the story records that shape our mission.
        </p>
      </section>

      {/* Dynamic Timeline Section */}
      <section className="pb-24 max-w-[1000px] mx-auto px-4 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#ffd9de] -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-16 relative z-10">
          {settings.ourStoryEntries.map((story, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={story.id || idx} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className={`space-y-3 bg-white rounded-2xl p-8 shadow-sm border-t-4 border-[#b0004a] ${!isEven ? 'order-1 md:order-2' : ''}`}>
                  <span className="text-xs font-bold text-[#b0004a] block">{story.year} Outreach Record</span>
                  <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">{story.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {story.description}
                  </p>
                </div>

                <div className={`rounded-2xl overflow-hidden shadow-sm h-64 border border-gray-100 ${!isEven ? 'order-2 md:order-1' : ''}`}>
                  <img 
                    src={story.image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'} 
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="bg-[#e2e2e2] text-gray-700 py-10">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div>
            <span className="font-bold text-[#b0004a] text-sm">{settings.orgName}</span>
            <p className="text-gray-500 mt-1">"{settings.tagline}"</p>
          </div>
          <div className="flex gap-6 text-gray-600 font-medium">
            <button onClick={() => navTo('home-impact')} className="hover:underline font-bold text-[#b0004a]">Our Story</button>
            <button onClick={() => navTo('events')} className="hover:underline">Outreach Events</button>
            <button onClick={() => navTo('donate')} className="hover:underline">Donate</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
