import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function Home({ setCurrentPage, openDonateModal, openVolunteerModal }) {
  const { events: contextEvents, highlights: contextHighlights } = useSiteSettings();

  const navTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-0 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center absolute inset-0 transform scale-105 transition-transform duration-1000"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCyzq7097kmw6xbbECjvPQaZQrwdIURVFvPdmG5Tf2owyHvo6uYeUK73KtmgU_7vJirCIAdiGXcTcJevBZT86TuhcWwfF3hASk28j6AZPCImygE1KQWafdbhL0_B-fVm9-Gy_0E48yqEyPmJGDHQiv0TkWBU61fEhoFLILtDcW5ttCCm2HA-8KmqYZuwUYQWbDy-_V-5tdTNYzpz9FFIiO26ysoVLs4nxXS1hlzVYOQRZIv9jy6S-78Pw')`
            }}
          />
          <div className="absolute inset-0 bg-surface/85 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row items-center gap-12">
          {/* Main Hero Copy */}
          <div className="w-full lg:w-3/5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold text-xs tracking-wide">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Brown's Heart Care Foundation</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-on-surface leading-tight tracking-tight">
              We breathe out <span className="text-primary relative inline-block">love<svg className="absolute -bottom-2 left-0 w-full h-3 text-primary-container opacity-50" preserveAspectRatio="none" viewBox="0 0 100 20"><path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="4"></path></svg></span> for others to inhale
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Dedicated to promoting community well-being, providing essential support, emergency relief, and nutritional stability to vulnerable communities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => navTo('donate')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-heading font-bold text-sm shadow-md hover:shadow-card-hover hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Donate Now</span>
                <span className="material-symbols-outlined fill text-lg">favorite</span>
              </button>
              <button
                onClick={() => navTo('story')}
                className="px-8 py-4 rounded-full border-2 border-secondary text-on-surface font-heading font-semibold text-sm hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
              >
                <span>Read Our Story</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Impact Live Widget Card */}
          <div className="w-full lg:w-2/5">
            <div className="bg-surface-container-lowest rounded-2xl shadow-card p-6 md:p-8 border-t-4 border-primary relative overflow-hidden card-gradient-top">
              <div className="absolute -right-8 -top-8 w-28 h-28 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Annual Impact Progress
                </span>
                <span className="material-symbols-outlined text-primary fill text-2xl">trending_up</span>
              </div>

              <h3 className="font-heading font-bold text-2xl text-on-surface mb-1">50,000+ Lives Touched</h3>
              <p className="text-xs text-secondary mb-6">Target for community support & food relief across communities.</p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-on-surface-variant">Community Support Programs</span>
                    <span className="text-primary font-bold">14,250 / 15,000</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[95%] transition-all duration-1000"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-on-surface-variant">Emergency Relief Packages</span>
                    <span className="text-primary font-bold">184 Distributed</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container rounded-full w-[82%] transition-all duration-1000"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-on-surface-variant">Nutritional Meal Packages</span>
                    <span className="text-primary font-bold">34,500 Distributed</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary-container rounded-full w-[88%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-xs font-medium">
                <span className="text-secondary">Audit Status: Verified 100% NGO</span>
                <button onClick={() => navTo('waystogive')} className="text-primary font-bold hover:underline flex items-center gap-1">
                  <span>Support Impact</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Focus Section (Bento Cards) */}
      <section className="py-20 bg-surface-container-lowest border-y border-surface-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface">Our Core Focus Pillars</h2>
            <p className="text-secondary text-base leading-relaxed">
              Building a foundation of hope through targeted community interventions and nutritional security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-surface-bright rounded-2xl p-6 border border-surface-variant shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined fill text-2xl">favorite</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-on-surface mb-2">Community Support</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Providing essential resources, counseling, and material support to uplift vulnerable families and individuals in our communities.
                </p>
              </div>
              <button onClick={() => navTo('programs')} className="mt-6 text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Explore Support</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-surface-bright rounded-2xl p-6 border border-surface-variant shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-container/10 flex items-center justify-center text-primary-container mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined fill text-2xl">volunteer_activism</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-on-surface mb-2">Emergency Relief</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Rapid response and financial assistance for low-income individuals facing sudden crises or urgent life challenges.
                </p>
              </div>
              <button onClick={() => navTo('programs')} className="mt-6 text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Relief Fund</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-bright rounded-2xl p-6 border border-surface-variant shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#dda63a]/10 flex items-center justify-center text-[#dda63a] mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined fill text-2xl">restaurant</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-on-surface mb-2">Nutritional Security</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  SDG 2 Zero Hunger alignment. Providing nutrient-rich food baskets, grain boxes, and essential nourishment.
                </p>
              </div>
              <button onClick={() => navTo('programs')} className="mt-6 text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Food Relief Initiatives</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-surface-bright rounded-2xl p-6 border border-surface-variant shadow-card hover:shadow-card-hover transition-all group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tertiary-container/20 flex items-center justify-center text-tertiary mb-5 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined fill text-2xl">groups</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-on-surface mb-2">Community Outreach</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Grassroots events, support circles, and volunteer teams serving remote and marginalized areas.
                </p>
              </div>
              <button onClick={() => navTo('events')} className="mt-6 text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>View Outreach Schedule</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Upcoming Outreach Event Preview */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                Outreach & Events
              </span>
              <h2 className="font-heading font-extrabold text-3xl text-on-surface mt-2">Upcoming Community Outreaches</h2>
            </div>
            <button
              onClick={() => navTo('events')}
              className="text-sm font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All Events & Gallery</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {contextEvents && contextEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contextEvents.slice(0, 2).map((evt) => (
                <div 
                  key={evt.id} 
                  onClick={() => navTo('events')}
                  className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all border-t-4 border-primary cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div 
                      className="h-60 w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('${evt.img || '/hero/PHOTO-2026-09-01-13-37-18.jpg'}')`
                      }}
                    />
                    <div className="p-6 space-y-4">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                        {evt.typeLabel || 'Community Outreach'}
                      </span>
                      <h3 className="font-heading font-bold text-xl text-on-surface group-hover:text-primary transition-colors">{evt.title}</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-3">
                        {evt.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-secondary pt-2">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-base">calendar_today</span>
                          <span>{evt.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-primary text-base">location_on</span>
                          <span>{evt.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (openVolunteerModal) openVolunteerModal(evt);
                      }}
                      className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary to-primary-container text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all text-center"
                    >
                      Volunteer for Event
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navTo('events');
                      }}
                      className="py-3 px-6 rounded-full border border-secondary text-secondary text-xs font-semibold hover:bg-surface-container text-center"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-variant text-center space-y-2">
               <span className="material-symbols-outlined text-4xl text-primary">event_available</span>
               <h3 className="font-heading font-bold text-lg text-on-surface">No Upcoming Events</h3>
               <p className="text-xs text-secondary">Check back soon for upcoming community outreaches.</p>
             </div>
          )}
        </div>
      </section>
      
      {/* Our Impact in Action Gallery Section */}
      <section className="py-20 bg-surface-container-lowest border-y border-surface-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
            <h2 className="font-heading font-bold text-3xl text-on-surface">Our Impact in Action</h2>
            <p className="text-secondary text-sm">
              Watch our video documentaries and reports from recent community outreach initiatives.
            </p>
          </div>

          {contextHighlights && contextHighlights.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {contextHighlights.slice(0, 3).map((item) => (
                <div 
                  key={item.id}
                  onClick={() => navTo('events')}
                  className="bg-surface-bright rounded-2xl overflow-hidden shadow-sm border border-surface-variant cursor-pointer hover:shadow-md hover:border-primary transition-all group"
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
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined text-2xl font-bold fill">play_arrow</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-[11px] font-semibold">
                      {item.categoryLabel || 'Outreach Video'}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-surface-bright p-8 rounded-2xl border border-surface-variant text-center space-y-2 max-w-xl mx-auto">
              <span className="material-symbols-outlined text-4xl text-primary">video_library</span>
              <h3 className="font-heading font-bold text-lg text-on-surface">No Media Highlights Uploaded Yet</h3>
              <p className="text-xs text-secondary">Upload video documentaries and photo albums in the Admin Dashboard to show them live here.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-container to-primary text-white relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-4 md:px-8 text-center relative z-10 space-y-6">
          <span className="material-symbols-outlined text-5xl fill">volunteer_activism</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl max-w-3xl mx-auto leading-tight">
            Together, We Can Save Hearts and Nourish Lives
          </h2>
          <p className="text-white/90 text-base max-w-xl mx-auto leading-relaxed">
            Your support provides essential care, resources, and nutritious food to those who need it most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <button
              onClick={() => navTo('donate')}
              className="px-8 py-4 rounded-full bg-white text-primary font-heading font-bold text-sm shadow-xl hover:bg-surface-bright hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Donate Now</span>
              <span className="material-symbols-outlined fill text-base">favorite</span>
            </button>
            <button
              onClick={openVolunteerModal}
              className="px-8 py-4 rounded-full border-2 border-white text-white font-heading font-semibold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span>Become a Volunteer</span>
              <span className="material-symbols-outlined text-base">handshake</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

