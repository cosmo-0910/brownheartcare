import React, { useState, useRef, useEffect } from 'react';

export default function Navbar({ currentPage, setCurrentPage, openVolunteerModal }) {
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navTo = (page) => {
    setCurrentPage(page);
    setMoreDropdownOpen(false);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3 transition-all">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex justify-between items-center h-14">
        {/* Brand Logo */}
        <div 
          onClick={() => navTo('home-outreach')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[#b0004a] text-3xl font-bold">favorite</span>
          <span className="font-heading font-bold text-xl text-[#b0004a] tracking-tight">
            Brown's Heart Care
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => navTo('home-outreach')}
            className={`py-1 transition-colors ${
              currentPage === 'home-outreach'
                ? 'text-[#b0004a] font-bold border-b-2 border-[#b0004a]'
                : 'text-gray-600 hover:text-[#b0004a]'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => navTo('home-impact')}
            className={`py-1 transition-colors ${
              currentPage === 'home-impact'
                ? 'text-[#b0004a] font-bold border-b-2 border-[#b0004a]'
                : 'text-gray-600 hover:text-[#b0004a]'
            }`}
          >
            Our Story
          </button>
          <button
            onClick={() => navTo('history')}
            className={`py-1 transition-colors ${
              currentPage === 'history'
                ? 'text-[#b0004a] font-bold border-b-2 border-[#b0004a]'
                : 'text-gray-600 hover:text-[#b0004a]'
            }`}
          >
            Our History
          </button>
          <button
            onClick={() => navTo('events')}
            className={`py-1 transition-colors ${
              currentPage === 'events'
                ? 'text-[#b0004a] font-bold border-b-2 border-[#b0004a]'
                : 'text-gray-600 hover:text-[#b0004a]'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => navTo('donate')}
            className={`py-1 transition-colors ${
              currentPage === 'donate'
                ? 'text-[#b0004a] font-bold border-b-2 border-[#b0004a]'
                : 'text-gray-600 hover:text-[#b0004a]'
            }`}
          >
            Donate
          </button>

          {/* More Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`py-1 px-2.5 rounded-lg flex items-center gap-1 transition-all ${
                ['programs', 'faq', 'privacy'].includes(currentPage) || moreDropdownOpen
                  ? 'text-[#b0004a] font-bold bg-[#ffd9de]/40'
                  : 'text-gray-600 hover:text-[#b0004a] hover:bg-gray-100'
              }`}
            >
              <span>More</span>
              <span className="material-symbols-outlined text-lg">
                {moreDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fadeIn space-y-1">
                <button
                  onClick={() => navTo('programs')}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-[#ffd9de]/30 hover:text-[#b0004a] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">medical_services</span>
                  <span>Programs & Services</span>
                </button>

                <button
                  onClick={() => {
                    setMoreDropdownOpen(false);
                    openVolunteerModal();
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-[#ffd9de]/30 hover:text-[#b0004a] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">handshake</span>
                  <span>Volunteer Registration</span>
                </button>

                <button
                  onClick={() => navTo('faq')}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-[#ffd9de]/30 hover:text-[#b0004a] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">quiz</span>
                  <span>Frequently Asked Questions</span>
                </button>

                <button
                  onClick={() => navTo('privacy')}
                  className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-[#ffd9de]/30 hover:text-[#b0004a] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-base">security</span>
                  <span>Privacy & Governance</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Action CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navTo('donate')}
            className="bg-gradient-to-r from-[#b0004a] to-[#d81b60] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            Donate Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#b0004a]"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-2 animate-fadeIn">
          <button onClick={() => navTo('home-outreach')} className="block w-full text-left py-2 text-sm font-medium text-gray-700">Home</button>
          <button onClick={() => navTo('home-impact')} className="block w-full text-left py-2 text-sm font-medium text-gray-700">Our Story</button>
          <button onClick={() => navTo('history')} className="block w-full text-left py-2 text-sm font-medium text-gray-700">Our History</button>
          <button onClick={() => navTo('events')} className="block w-full text-left py-2 text-sm font-medium text-gray-700">Events</button>
          <button onClick={() => navTo('donate')} className="block w-full text-left py-2 text-sm font-medium text-gray-700">Donate</button>
          <button onClick={() => navTo('programs')} className="block w-full text-left py-2 text-sm font-medium text-gray-700">Programs & Services</button>
          <button onClick={() => { setMobileMenuOpen(false); openVolunteerModal(); }} className="block w-full text-left py-2 text-sm font-semibold text-[#b0004a]">Volunteer Registration</button>
          <button onClick={() => navTo('faq')} className="block w-full text-left py-2 text-sm font-medium text-gray-700">FAQ</button>
          <button onClick={() => navTo('privacy')} className="block w-full text-left py-2 text-sm font-medium text-gray-700">Privacy Policy</button>
        </div>
      )}
    </header>
  );
}
