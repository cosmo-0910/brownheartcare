import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function Events({ setCurrentPage, openVolunteerModal, openDonateModal, openSponsorPage }) {
  const { events: contextEvents, highlights: contextHighlights } = useSiteSettings();
  const [selectedOutreachDetail, setSelectedOutreachDetail] = useState(null);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const navTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetailModal = (item) => {
    setSelectedOutreachDetail(item);
    setIsVideoPlaying(false);
  };

  const handleCloseDetailModal = () => {
    setSelectedOutreachDetail(null);
    setIsVideoPlaying(false);
  };

  return (
    <div className="pt-20 pb-20 animate-fadeIn font-sans bg-[#f9f9f9] text-[#1a1c1c]">
      {/* Hero Section */}
      <section className="py-16 max-w-[800px] mx-auto px-4 text-center space-y-4">
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#b0004a]">
          Our Outreach & Events
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
          Join us in our mission to bring well-being and nutritional stability to the community. Participate in our upcoming events, volunteer your time, or click on past outreaches to watch detailed video reports.
        </p>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-[#f3f3f3] border-y border-gray-200">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl text-[#1a1c1c] mb-8">Featured Events & Programs</h2>

          {contextEvents && contextEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contextEvents.map((evt) => (
                <div key={evt.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border-t-4 border-[#b0004a] flex flex-col justify-between">
                  <div>
                    {/* Square / Boxy Image Container to show full outreach advertisement poster */}
                    <div className="aspect-square md:aspect-[4/3] max-h-80 w-full bg-gray-100 overflow-hidden relative flex items-center justify-center">
                      <img 
                        src={evt.img || '/hero/PHOTO-2026-09-01-13-37-18.jpg'} 
                        alt={evt.title}
                        className="w-full h-full object-contain bg-black/5"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="inline-block px-3 py-1 bg-[#ffd9de] text-[#90003b] rounded-full text-xs font-semibold">
                          {evt.typeLabel || 'Community Outreach'}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          evt.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                          evt.status === 'Current' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {evt.status || 'Upcoming'}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">{evt.title}</h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {evt.desc}
                      </p>
                      <div className="space-y-1.5 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#b0004a] text-base">calendar_today</span>
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#b0004a] text-base">location_on</span>
                          <span>{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => openVolunteerModal && openVolunteerModal(evt)}
                        className="flex-1 bg-[#b0004a] text-white py-3 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-[#90003b] transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base">how_to_reg</span>
                        <span>Volunteer Now</span>
                      </button>
                      <button 
                        onClick={() => openSponsorPage ? openSponsorPage(evt) : navTo('donate')}
                        className="flex-1 bg-white border-2 border-[#b0004a] text-[#b0004a] py-3 rounded-full text-[11px] font-bold uppercase tracking-wider hover:bg-[#b0004a] hover:text-white transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        <span>Sponsor Outreach</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => setSelectedEventDetail(evt)}
                      className="w-full border border-gray-400 text-gray-700 py-2.5 rounded-full text-xs font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">info</span>
                      <span>Learn More</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-2">
              <span className="material-symbols-outlined text-4xl text-[#b0004a]">event_available</span>
              <h3 className="font-heading font-bold text-lg text-gray-800">No Featured Events Published</h3>
              <p className="text-xs text-gray-500">Create new events in the Admin Dashboard to publish them live here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Our Impact in Action Gallery Section */}
      <section className="py-20 max-w-[1100px] mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Our Impact in Action</h2>
          <p className="text-gray-500 text-sm">
            Watch our video documentaries and reports from recent needs assessment and community outreach initiatives.
          </p>
        </div>

        {contextHighlights && contextHighlights.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {contextHighlights.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleOpenDetailModal({
                  title: item.title,
                  badge: item.categoryLabel || 'community outreach',
                  date: item.date || 'Recent Outreach',
                  location: 'Lagos & Rural Outreach Centers',
                  summary: item.desc || 'Community support and nutritional outreach initiative.',
                  stats: {
                    beneficiariesScreened: 'Multiple Families',
                    reliefFundsAssessed: 'Assessed Live',
                    reliefSuppliesDistributed: 'Aid Distributed',
                    volunteersParticipated: 'Active Volunteers'
                  },
                  beneficiaryQuote: '"The care and dedication of the Brown\'s Heart Care team changed our lives."',
                  beneficiaryAuthor: '— Community Beneficiary',
                  videoUrl: item.videoUrl || '/hero/PHOTO-2026-09-01-13-37-18.jpg',
                  galleryPhotos: item.galleryPhotos && item.galleryPhotos.length > 0 ? item.galleryPhotos : ['/hero/PHOTO-2026-09-01-13-37-18.jpg']
                })}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-[#b0004a] transition-all group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  {item.videoUrl && item.videoUrl.endsWith('.mp4') ? (
                    <video src={item.videoUrl} className="w-full h-full object-cover opacity-90" />
                  ) : (
                    <img 
                      src={item.galleryPhotos && item.galleryPhotos[0] ? item.galleryPhotos[0] : '/hero/PHOTO-2026-09-01-13-37-18.jpg'}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#b0004a] text-white flex items-center justify-center shadow-lg">
                      <span className="material-symbols-outlined text-2xl font-bold fill">play_arrow</span>
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">play_circle</span>
                    <span>{item.duration || 'Watch Video'}</span>
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <span className="inline-block px-2.5 py-0.5 bg-[#ffd9de] text-[#90003b] rounded-full text-[11px] font-semibold">
                    {item.categoryLabel || 'Outreach Video'}
                  </span>
                  <h4 className="font-heading font-bold text-sm text-[#1a1c1c] group-hover:text-[#b0004a] transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">{item.views || '1.2K views'} • Click for details</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-2 max-w-xl mx-auto">
            <span className="material-symbols-outlined text-4xl text-[#b0004a]">video_library</span>
            <h3 className="font-heading font-bold text-lg text-gray-800">No Media Highlights Uploaded Yet</h3>
            <p className="text-xs text-gray-500">Upload video documentaries and photo albums in the Admin Dashboard to show them live here.</p>
          </div>
        )}
      </section>

      {/* Detailed Outreach Case Study & Video Lightbox Modal (Requested by User) */}
      {selectedOutreachDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#f9f9f9] rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl border border-gray-200 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#ffd9de] text-[#b0004a] rounded-full text-xs font-bold">
                  {selectedOutreachDetail.badge}
                </span>
                <span className="text-xs text-gray-500 font-semibold">{selectedOutreachDetail.date}</span>
              </div>
              <button
                onClick={handleCloseDetailModal}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Modal Body: Split Layout for Video & Case Study Details */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-grow">
              <div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#1a1c1c] mb-1">
                  {selectedOutreachDetail.title}
                </h2>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#b0004a]">location_on</span>
                  <span>{selectedOutreachDetail.location}</span>
                </p>
              </div>

              {/* Main Content Grid: Video Player + Detailed Report */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Video Player Container (7 cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden bg-black shadow-md aspect-video">
                    {!isVideoPlaying ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={selectedOutreachDetail.videoUrl} 
                          alt={selectedOutreachDetail.title}
                          className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3 p-4 text-center">
                          <button
                            onClick={() => setIsVideoPlaying(true)}
                            className="w-16 h-16 rounded-full bg-[#b0004a] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                          >
                            <span className="material-symbols-outlined text-4xl fill">play_arrow</span>
                          </button>
                          <span className="text-white text-xs font-semibold tracking-wide">
                            Click to Play Documentary Footage
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full bg-black flex flex-col justify-between p-4 text-white">
                        <div className="flex justify-between items-center text-xs">
                          <span className="bg-[#b0004a] px-2.5 py-1 rounded font-bold">NOW PLAYING</span>
                          <button onClick={() => setIsVideoPlaying(false)} className="text-white/80 hover:text-white">Pause Video</button>
                        </div>

                        {/* Interactive Play Controls Simulation */}
                        <div className="space-y-2 pt-20">
                          <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                            <div className="h-full bg-[#b0004a] w-[45%] rounded-full"></div>
                          </div>
                          <div className="flex justify-between items-center text-[11px] text-white/80">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-base">pause</span>
                              <span>02:15 / 04:30</span>
                            </div>
                            <span className="material-symbols-outlined text-base">fullscreen</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Photo Gallery Thumbnails */}
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-xs text-gray-700 uppercase tracking-wider">Outreach Photo Album</h4>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                      {selectedOutreachDetail.galleryPhotos.map((photo, idx) => (
                        <div key={idx} className="w-24 h-16 rounded-xl overflow-hidden shadow-sm shrink-0 border border-gray-200">
                          <img src={photo} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Detailed Summary & Statistics Report (5 cols) */}
                <div className="lg:col-span-5 space-y-6 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#1a1c1c] mb-2">Outreach Impact Summary</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {selectedOutreachDetail.summary}
                    </p>
                  </div>

                  {/* Metrics Grid */}
                  <div className="space-y-2 border-t border-b border-gray-100 py-4">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Key Statistics Achieved</h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-[#f9f9f9] p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px]">beneficiaries Screened</span>
                        <span className="font-heading font-bold text-base text-[#b0004a]">{selectedOutreachDetail.stats.beneficiariesScreened}</span>
                      </div>
                      <div className="bg-[#f9f9f9] p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px]">Relief Provided</span>
                        <span className="font-heading font-bold text-base text-[#b0004a]">{selectedOutreachDetail.stats.reliefSuppliesDistributed}</span>
                      </div>
                      <div className="bg-[#f9f9f9] p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px]">relief funds Assessed</span>
                        <span className="font-heading font-bold text-base text-[#1a1c1c]">{selectedOutreachDetail.stats.reliefFundsAssessed}</span>
                      </div>
                      <div className="bg-[#f9f9f9] p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px]">support team</span>
                        <span className="font-heading font-bold text-base text-[#1a1c1c]">{selectedOutreachDetail.stats.volunteersParticipated}</span>
                      </div>
                    </div>
                  </div>

                  {/* Beneficiary Quote */}
                  <div className="bg-[#ffd9de]/30 p-4 rounded-xl space-y-2 border border-[#ffd9de]">
                    <span className="material-symbols-outlined text-[#b0004a] text-lg">format_quote</span>
                    <p className="text-xs text-gray-700 italic leading-relaxed">
                      {selectedOutreachDetail.beneficiaryQuote}
                    </p>
                    <p className="text-[11px] font-bold text-[#b0004a] text-right">
                      {selectedOutreachDetail.beneficiaryAuthor}
                    </p>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      onClick={() => {
                        handleCloseDetailModal();
                        openVolunteerModal();
                      }}
                      className="flex-1 py-3 rounded-full bg-[#b0004a] text-white text-xs font-bold shadow-md hover:bg-[#90003b] transition-all"
                    >
                      Volunteer for Next Event
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Outreach Event Full Details Modal (Requested by User) */}
      {selectedEventDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-gray-200 max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-[#1a1c1c] text-white px-6 py-4 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#ffd9de] text-[#b0004a] rounded-full text-xs font-bold">
                  {selectedEventDetail.typeLabel || 'Outreach Program'}
                </span>
                <span className="text-xs text-gray-300 font-semibold">{selectedEventDetail.status || 'Upcoming'}</span>
              </div>
              <button
                onClick={() => setSelectedEventDetail(null)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Left Side: Boxy Poster Image */}
                <div className="md:col-span-5 space-y-4">
                  <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-md bg-black/5 border border-gray-200">
                    <img 
                      src={selectedEventDetail.img || '/hero/PHOTO-2026-09-01-13-37-18.jpg'} 
                      alt={selectedEventDetail.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-xs text-gray-700 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#b0004a] text-base">calendar_today</span>
                      <span className="font-bold">{selectedEventDetail.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#b0004a] text-base">location_on</span>
                      <span className="font-bold">{selectedEventDetail.location}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Detailed Program Information */}
                <div className="md:col-span-7 space-y-6">
                  <div>
                    <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#1a1c1c] mb-3">
                      {selectedEventDetail.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {selectedEventDetail.desc}
                    </p>
                  </div>

                  <div className="bg-[#ffd9de]/30 p-4 rounded-2xl border border-[#ffd9de] space-y-2">
                    <h4 className="font-heading font-bold text-xs text-[#b0004a] uppercase tracking-wider">Foundation Outreach Objectives</h4>
                    <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                      <li>Free vital needs assessments & assessment evaluations.</li>
                      <li>Distribution of essential food relief kits & nutritional supplies.</li>
                      <li>Community health education & ongoing support support.</li>
                    </ul>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        const targetEvt = selectedEventDetail;
                        setSelectedEventDetail(null);
                        openVolunteerModal && openVolunteerModal(targetEvt);
                      }}
                      className="flex-1 py-3.5 rounded-full bg-[#b0004a] text-white text-xs font-bold shadow-md hover:bg-[#90003b] transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">how_to_reg</span>
                      <span>Volunteer for This Event</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEventDetail(null);
                        openDonateModal && openDonateModal();
                      }}
                      className="py-3.5 px-6 rounded-full border border-gray-400 text-gray-800 text-xs font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-base text-[#b0004a]">favorite</span>
                      <span>Sponsor Outreach</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer matching Image 3 */}
      <footer className="bg-[#e2e2e2] text-gray-700 py-10">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span className="font-bold text-[#1a1c1c] text-sm">Brown's Heart Care</span>
          <div className="flex flex-wrap gap-4 text-gray-600 font-medium">
            <button onClick={() => navTo('donate')} className="hover:underline">Privacy Policy</button>
            <button onClick={() => navTo('donate')} className="hover:underline">Terms of Service</button>
            <button onClick={() => navTo('history')} className="hover:underline">Annual Reports</button>
            <button onClick={() => navTo('donate')} className="hover:underline">Contact Us</button>
            <button onClick={() => navTo('events')} className="hover:underline">Volunteer Portal</button>
          </div>
          <span className="text-gray-500">© 2024 Brown's Heart Care Foundation. All rights reserved. Registered NGO.</span>
        </div>
      </footer>
    </div>
  );
}
