import React, { useState, useEffect } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

const heroImages = [
  '/hero/PHOTO-2026-09-01-13-37-18.jpg',
  '/hero/PHOTO-2026-09-01-13-37-25.jpg',
  '/hero/PHOTO-2026-09-01-13-37-28.jpg',
  '/hero/PHOTO-2026-09-01-13-37-31.jpg',
  '/hero/PHOTO-2026-09-01-13-37-32.jpg',
  '/hero/PHOTO-2026-09-01-13-45-14.jpg',
];

export default function HomeImpact({ setCurrentPage }) {
  const { settings } = useSiteSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const navTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-16 animate-fadeIn font-sans bg-[#f9f9f9] text-[#1a1c1c]">
      {/* Hero Section */}
      <section className="relative min-h-[580px] flex items-center pt-16 pb-20 overflow-hidden">
        {/* Hero Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((imgSrc, index) => (
            <div
              key={imgSrc}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-35' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${imgSrc}')`
              }}
            />
          ))}
          {/* Subtle gradient overlay to keep readability high */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f9f9f9]/90 via-[#f9f9f9]/70 to-[#f9f9f9]/40 sm:to-transparent" />
          
          {/* Slideshow Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-6 bg-[#b0004a]' : 'w-2 bg-gray-400/50 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-[1100px] mx-auto px-4 w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text */}
          <div className="w-full lg:w-3/5 space-y-6">
            <span className="inline-block px-4 py-1.5 bg-[#ffd9de] text-[#b0004a] rounded-full text-xs font-semibold">
              {settings.orgName}
            </span>

            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-[#1a1c1c] tracking-tight leading-tight">
              {settings.heroTitle}
            </h1>

            <p className="text-gray-600 text-sm sm:text-base max-w-xl leading-relaxed">
              {settings.heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navTo('donate')}
                className="bg-[#b0004a] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#90003b] transition-all flex items-center gap-2 shadow-md"
              >
                <span>Donate Now</span>
                <span className="material-symbols-outlined fill text-base">favorite</span>
              </button>
              <button
                onClick={() => navTo('history')}
                className="bg-transparent border border-gray-400 text-[#1a1c1c] px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-200 transition-all"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Right Widget Card */}
          <div className="w-full lg:w-2/5 max-w-md">
            <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-[#b0004a] space-y-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Impact Statistics
              </span>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-gray-500 font-medium">Lives Touched</span>
                <span className="font-heading font-bold text-3xl text-[#b0004a]">{settings.stats.livesTouched}</span>
              </div>
              <div className="w-full h-3 bg-[#ffd9de] rounded-full overflow-hidden">
                <div className="h-full bg-[#b0004a] w-[85%] rounded-full"></div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 text-center">
                <div>
                  <span className="font-heading font-bold text-xl text-gray-900 block">{settings.stats.outreachEvents}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Outreach Drives</span>
                </div>
                <div>
                  <span className="font-heading font-bold text-xl text-gray-900 block">{settings.stats.activeVolunteers}</span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">Volunteers Enrolled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Focus Section */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Our Core Focus</h2>
            <p className="text-gray-500 text-sm">
              Building a foundation of hope through targeted health and nutritional interventions for underserved communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Mission */}
            <div className="bg-[#f9f9f9] rounded-2xl p-8 border border-gray-200 relative overflow-hidden space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#ffd9de] text-[#b0004a] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">Our Mission</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                To alleviate suffering and promote holistic well-being by providing accessible health screening support, vital nutritional resources, and compassionate community outreach to the poor and vulnerable.
              </p>
            </div>

            {/* Our Vision */}
            <div className="bg-[#f9f9f9] rounded-2xl p-8 border border-gray-200 relative overflow-hidden space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gray-200 text-gray-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">visibility</span>
              </div>
              <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">Our Vision</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                A world where every underserved individual has access to essential health screening and nutrition, fostering resilient, vibrant communities built on care and dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Alignment Section */}
      <section className="py-20 bg-[#eee] border-b border-gray-300">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/3 space-y-3">
            <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Global Alignment</h2>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              We are committed to advancing the United Nations Sustainable Development Goals, focusing our efforts where they create the most profound impact for the underprivileged.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {/* Zero Hunger */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#dda63a] flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#dda63a]/15 text-[#dda63a] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">restaurant</span>
              </div>
              <h4 className="font-heading font-bold text-base text-[#1a1c1c]">Zero Hunger</h4>
              <p className="text-gray-500 text-xs">
                SDG 2: End hunger, achieve food security and improved nutrition for poor families.
              </p>
            </div>

            {/* Good Health */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-[#4c9f38] flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#4c9f38]/15 text-[#4c9f38] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">favorite</span>
              </div>
              <h4 className="font-heading font-bold text-base text-[#1a1c1c]">Good Health & Well-being</h4>
              <p className="text-gray-500 text-xs">
                SDG 3: Ensure healthy lives and promote well-being for all at all ages through free community screenings.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#e2e2e2] text-gray-700 py-10">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div>
            <span className="font-bold text-[#b0004a] text-sm">{settings.orgName}</span>
            <p className="text-gray-500 mt-1">© {new Date().getFullYear()} {settings.orgName}. "{settings.tagline}".</p>
          </div>
          <div className="flex gap-6 text-gray-600 font-medium">
            <button onClick={() => navTo('home-impact')} className="hover:underline">Zero Hunger SDG</button>
            <button onClick={() => navTo('events')} className="hover:underline">Good Health SDG</button>
            <button onClick={() => navTo('donate')} className="hover:underline">Donate</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
