import React, { useState } from 'react';

export default function Events({ setCurrentPage, openVolunteerModal }) {
  const [selectedOutreachDetail, setSelectedOutreachDetail] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const navTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pastOutreaches = [
    {
      id: 'medical-jan-2024',
      title: '2024 Rural Heart Screenings & Diagnostic Clinic',
      badge: 'Medical Outreach',
      date: 'Jan 2024',
      location: 'Kwara Rural Outreach District',
      summary: 'A 3-day comprehensive cardiovascular diagnostic camp providing free ECGs, blood pressure checks, diabetes screening, and prescription cardiology medication.',
      stats: {
        patientsScreened: '2,450',
        surgeriesAssessed: '14',
        medicationsDistributed: '5,800 Prescriptions',
        volunteersParticipated: '42 Doctors & Nurses'
      },
      patientQuote: '"I had no idea my high blood pressure was at a critical level. The foundation doctors gave me emergency care and 6 months of medication at zero cost. They saved my life."',
      patientAuthor: '— Chief Isaiah M., Beneficiary',
      videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBll0-lwQpXVroVoV4bAnp6Ygx7qxW2mZoZs_Ou829wSXmwp8Bz-1_Ks568WqOr233bGZVvTKWEZGs6qwN66bWJhJIOllFH_2G25ph3oTyNn0U3JwOV3gf2RWxg5dIl_dFPs29b2YG4pCP-_L44JLVMjVEwLqLDbUMeYzxYh6Dt4cW2dWj2e9ABQUshS9jbppDpi1e_gvTfANEj5wBHZGvxVA1LHFKBF8Wl29iZB3Jq7uNDHSVDD_2xRA',
      galleryPhotos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBll0-lwQpXVroVoV4bAnp6Ygx7qxW2mZoZs_Ou829wSXmwp8Bz-1_Ks568WqOr233bGZVvTKWEZGs6qwN66bWJhJIOllFH_2G25ph3oTyNn0U3JwOV3gf2RWxg5dIl_dFPs29b2YG4pCP-_L44JLVMjVEwLqLDbUMeYzxYh6Dt4cW2dWj2e9ABQUshS9jbppDpi1e_gvTfANEj5wBHZGvxVA1LHFKBF8Wl29iZB3Jq7uNDHSVDD_2xRA',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuARLBcWiP_X08ySCeElYpGbtQNW8xJBiMhkQl-nFWSkhyvrczHjzSxUmEi5ZUCvKm9CV-iSO09siSufmkrcoQPQyhiMQLHLZCBRYY83buNiq5Qip0Gaux1Tn04AZQDAT53H7-YTeBpJmXZBK_68TzXkrgPleHvL94k8IPy9zsVxyoMR7ijOCIfCi-2s7ZQ2-X2bI0nUrrzFHV0-9iDdPNId4z1VkwJzg92t-KcHDnXHLYt9k8_P4g7-BQ',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDF3tpnGHsFdJdmNNm3OM3gJaivPTcZg0SfZYxx0BUJydqSEKw4uxQrWM2Yo92CzsWFrMZAKCgQpIE43p0tSs2Gp0SNqJxIHGZ59TrmD22LN3e5Furl56eRWjYPuKjHipBl8ntmp10qxE-A_J51-mXBXNbE8QhM5rwZ_-8vg6qh6pcj2aaQJeMmskt5oZO92Q_dXGor8lKGXAf-stXzzFwKgDEo7Huga2FWWvYG-1W2b7SDhWy2ysHstQ'
      ]
    },
    {
      id: 'school-dec-2023',
      title: 'School Heart Health & Nutritional Security Drive',
      badge: 'School Feeding',
      date: 'Dec 2023',
      location: 'Primary School District 4',
      summary: 'Providing nutrient-balanced warm meals, multi-vitamin supplements, and pediatric heart screenings for 1,800 elementary students.',
      stats: {
        patientsScreened: '1,800 Children',
        surgeriesAssessed: '3 Pediatric Referrals',
        medicationsDistributed: '1,800 Vitamin Baskets',
        volunteersParticipated: '28 Community Volunteers'
      },
      patientQuote: '"Proper nutrition is vital for developing hearts. Ensuring these children get heart-healthy meals every day builds a foundation for long-term health."',
      patientAuthor: '— Dr. Sarah J., Volunteer Physician',
      videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiNNX2lrpq8dmAxH4r92R5Xsb3kf2eS_PGhmcPCwDww4tb684kSdy-uSTuK3GgoA_gc8112PxCOI2gxPdgfVkbMSYTNfrmblXwDu4uc9Fn2Oz9pppLYGu96H9ba-lg1GzEtig9z14whsxYfwq6Xq_V8FPcrNVNEYgqSLfkF0q0iFssI2LeYzM4Fh6uTjqZmjxK4xi4Dfp1TJAo2lR-sKwP3DzmwsSK_-BhyS6qxQMbhn3aZ_-x5yiBTw',
      galleryPhotos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCiNNX2lrpq8dmAxH4r92R5Xsb3kf2eS_PGhmcPCwDww4tb684kSdy-uSTuK3GgoA_gc8112PxCOI2gxPdgfVkbMSYTNfrmblXwDu4uc9Fn2Oz9pppLYGu96H9ba-lg1GzEtig9z14whsxYfwq6Xq_V8FPcrNVNEYgqSLfkF0q0iFssI2LeYzM4Fh6uTjqZmjxK4xi4Dfp1TJAo2lR-sKwP3DzmwsSK_-BhyS6qxQMbhn3aZ_-x5yiBTw',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAymCEWqicpO4Y6qDXyD6q4l4zIdd41BJN7wtVncItBRM-RW47SmVTrcKpsiFPXMryV5h_ihabBjNguQcqWufZnmnUsRkYhsLC1gne3d4Rtz1Dgz5UkYbO9fd-KXUDKHMC2-ZKP-CitbyK78vbpAiaqn7pSNAHMqEeOKADt41zaPMximhuHde5-ooyU2Arph9NOdfYpVez4XJzpiT0RM0CL8v610-dSyhIH1hCj6M2IjNJgyZtBJMGoSw'
      ]
    },
    {
      id: 'kitchen-nov-2023',
      title: 'Community Kitchen Heart-Healthy Relief Drive',
      badge: 'Community Kitchen',
      date: 'Nov 2023',
      location: 'Westside Community Pavilion',
      summary: 'Preparing and serving 3,500 low-sodium, heart-conscious meals to low-income senior citizens and marginalized families.',
      stats: {
        patientsScreened: '950 Seniors',
        surgeriesAssessed: 'N/A',
        medicationsDistributed: '3,500 Heart Meals',
        volunteersParticipated: '35 Kitchen Volunteers'
      },
      patientQuote: '"Receiving a warm, healthy meal prepared with care gives us hope. The foundation treats us with so much love."',
      patientAuthor: '— Mama Beatrice K., Community Elder',
      videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrvDpFqzH7R9Vv4yRASnc0JwhatGSUF4hgM_t9hGvrM9jb7gpQjv_rTNxAsGYYDSwSWduPDqo_B40HxFcyDZvDe2EmYHO8uBTJvDipHxtFWwX5NTaoUp7GfMMrn_SUxHuP3TusTU8H21uhLndNnKkN2AsUKz8l9EEGSFWx5O3N7UYmTRcPdqEQaN_gYOZCh2b6cfkkz2dOFL9CJMDuk0fKTs3lg0Z0JIBAJigNiqo9SHbZEaECcw1tjA',
      galleryPhotos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBrvDpFqzH7R9Vv4yRASnc0JwhatGSUF4hgM_t9hGvrM9jb7gpQjv_rTNxAsGYYDSwSWduPDqo_B40HxFcyDZvDe2EmYHO8uBTJvDipHxtFWwX5NTaoUp7GfMMrn_SUxHuP3TusTU8H21uhLndNnKkN2AsUKz8l9EEGSFWx5O3N7UYmTRcPdqEQaN_gYOZCh2b6cfkkz2dOFL9CJMDuk0fKTs3lg0Z0JIBAJigNiqo9SHbZEaECcw1tjA'
      ]
    },
    {
      id: 'screening-oct-2023',
      title: 'Pediatric & Adult Cardiac Diagnostic Outreach',
      badge: 'Health Screening',
      date: 'Oct 2023',
      location: 'Central General Hospital Wing',
      summary: 'Specialized mobile cardiac team providing free echocardiograms, blood chemistry analysis, and surgical assessment referrals.',
      stats: {
        patientsScreened: '1,650 Patients',
        surgeriesAssessed: '8 Funded Surgeries',
        medicationsDistributed: '3,200 Prescriptions',
        volunteersParticipated: '20 Cardiologists'
      },
      patientQuote: '"Because of this outreach, my daughter\'s heart valve defect was diagnosed in time for subsidized surgery. We are eternally grateful."',
      patientAuthor: '— David O., Parent',
      videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj5XloEX0loFJzOTTF23iAO9gQGtt8o_CD2HIKGd83bgbM9rQ81g_hKF5ii9lCpBUIJC62nvQW7XMBbXwbgtoQnFguol2NZc8dpPaR-llgJdlaCqhkT0GB4Y5unt_-IOawP20H2Lnr7QIhLXVB6UmLRjo-IQIvE3XBtO1s5clI2Ugq5Fv3G4dvB0WuXte6HZgBhPIKqnT82nURQXBlXO-c7F7eIacbAK8hPD5a08MhYU-cSMy0HoXZhw',
      galleryPhotos: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCj5XloEX0loFJzOTTF23iAO9gQGtt8o_CD2HIKGd83bgbM9rQ81g_hKF5ii9lCpBUIJC62nvQW7XMBbXwbgtoQnFguol2NZc8dpPaR-llgJdlaCqhkT0GB4Y5unt_-IOawP20H2Lnr7QIhLXVB6UmLRjo-IQIvE3XBtO1s5clI2Ugq5Fv3G4dvB0WuXte6HZgBhPIKqnT82nURQXBlXO-c7F7eIacbAK8hPD5a08MhYU-cSMy0HoXZhw'
      ]
    }
  ];

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
          Join us in our mission to bring heart health and nutritional stability to the community. Participate in our upcoming events, volunteer your time, or click on past outreaches to watch detailed video reports.
        </p>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 bg-[#f3f3f3] border-y border-gray-200">
        <div className="max-w-[1100px] mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl text-[#1a1c1c] mb-8">Featured Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Event 1 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-t-4 border-[#b0004a]">
              <div 
                className="h-64 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1Nbhi6ZZKs6DuolUKw6ihTzq8f644ai4kLMv2Y25bfkh89EHP7Aem9_rNi_F5m11dQlHVRXODZd4RAw7hy2IwP6PiihaTF5JxZcaR3--mOA6DsWTD_dDC6ZISr7LXOSWub3X_SXenXndTwWQ2qUEBdrRaXmrTjT2Qks1V_M4jS5hy4uZGcTZZLWt6a3SHIbL3T2g5sk2BK7dizK2YtW2Jbou7FxLyrLZrj_Wogi-qzh94dJBACKE6YA')`
                }}
              />
              <div className="p-6 space-y-4">
                <span className="inline-block px-3 py-1 bg-[#ffd9de] text-[#90003b] rounded-full text-xs font-semibold">
                  Health Walk
                </span>
                <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">Grand Health Awareness Walk</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  A community walk to raise awareness for cardiovascular health and preventative care.
                </p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b0004a] text-base">calendar_today</span>
                    <span>Oct 15, 2024 • 8:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b0004a] text-base">location_on</span>
                    <span>City Center Park</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    onClick={openVolunteerModal}
                    className="flex-1 bg-[#b0004a] text-white py-3 rounded-full text-xs font-semibold hover:bg-[#90003b] transition-all"
                  >
                    Volunteer Now
                  </button>
                  <button 
                    onClick={() => navTo('home-outreach')}
                    className="flex-1 border border-gray-400 text-gray-700 py-3 rounded-full text-xs font-semibold hover:bg-gray-100 transition-all"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Event 2 */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border-t-4 border-[#b0004a]">
              <div 
                className="h-64 w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAymCEWqicpO4Y6qDXyD6q4l4zIdd41BJN7wtVncItBRM-RW47SmVTrcKpsiFPXMryV5h_ihabBjNguQcqWufZnmnUsRkYhsLC1gne3d4Rtz1Dgz5UkYbO9fd-KXUDKHMC2-ZKP-CitbyK78vbpAiaqn7pSNAHMqEeOKADt41zaPMximhuHde5-ooyU2Arph9NOdfYpVez4XJzpiT0RM0CL8v610-dSyhIH1hCj6M2IjNJgyZtBJMGoSw')`
                }}
              />
              <div className="p-6 space-y-4">
                <span className="inline-block px-3 py-1 bg-[#f4dce4] text-[#524249] rounded-full text-xs font-semibold">
                  Food Drive
                </span>
                <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">National Nutrition Month Drive</h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  Distributing heart-healthy food packages to families in underserved neighborhoods.
                </p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b0004a] text-base">calendar_today</span>
                    <span>Nov 05, 2024 • 10:00 AM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#b0004a] text-base">location_on</span>
                    <span>Westside Outreach Hub</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    onClick={openVolunteerModal}
                    className="flex-1 bg-[#b0004a] text-white py-3 rounded-full text-xs font-semibold hover:bg-[#90003b] transition-all"
                  >
                    Volunteer Now
                  </button>
                  <button 
                    onClick={() => navTo('home-outreach')}
                    className="flex-1 border border-gray-400 text-gray-700 py-3 rounded-full text-xs font-semibold hover:bg-gray-100 transition-all"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact in Action Gallery Section (Clickable for Detailed Video Report) */}
      <section className="py-20 max-w-[1100px] mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Our Impact in Action</h2>
          <p className="text-gray-500 text-sm">
            Click on any past outreach card below to open its detailed documentary report, video, and statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {pastOutreaches.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleOpenDetailModal(item)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-[#b0004a] transition-all group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-black">
                <img 
                  src={item.videoUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-[#b0004a] text-white flex items-center justify-center shadow-lg">
                    <span className="material-symbols-outlined text-2xl font-bold fill">play_arrow</span>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">play_circle</span>
                  <span>Watch Video</span>
                </span>
              </div>
              <div className="p-4 space-y-1">
                <span className="inline-block px-2.5 py-0.5 bg-[#ffd9de] text-[#90003b] rounded-full text-[11px] font-semibold">
                  {item.badge}
                </span>
                <h4 className="font-heading font-bold text-sm text-[#1a1c1c] group-hover:text-[#b0004a] transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 font-medium">{item.date} • Click for details</p>
              </div>
            </div>
          ))}
        </div>
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
                        <span className="text-gray-500 block text-[10px]">Patients Screened</span>
                        <span className="font-heading font-bold text-base text-[#b0004a]">{selectedOutreachDetail.stats.patientsScreened}</span>
                      </div>
                      <div className="bg-[#f9f9f9] p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px]">Relief Provided</span>
                        <span className="font-heading font-bold text-base text-[#b0004a]">{selectedOutreachDetail.stats.medicationsDistributed}</span>
                      </div>
                      <div className="bg-[#f9f9f9] p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px]">Surgeries Assessed</span>
                        <span className="font-heading font-bold text-base text-[#1a1c1c]">{selectedOutreachDetail.stats.surgeriesAssessed}</span>
                      </div>
                      <div className="bg-[#f9f9f9] p-3 rounded-xl">
                        <span className="text-gray-500 block text-[10px]">Medical Team</span>
                        <span className="font-heading font-bold text-base text-[#1a1c1c]">{selectedOutreachDetail.stats.volunteersParticipated}</span>
                      </div>
                    </div>
                  </div>

                  {/* Beneficiary Quote */}
                  <div className="bg-[#ffd9de]/30 p-4 rounded-xl space-y-2 border border-[#ffd9de]">
                    <span className="material-symbols-outlined text-[#b0004a] text-lg">format_quote</span>
                    <p className="text-xs text-gray-700 italic leading-relaxed">
                      {selectedOutreachDetail.patientQuote}
                    </p>
                    <p className="text-[11px] font-bold text-[#b0004a] text-right">
                      {selectedOutreachDetail.patientAuthor}
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
