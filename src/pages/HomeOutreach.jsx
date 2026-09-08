import React, { useState, useEffect } from 'react';

const heroImages = [
  '/hero/PHOTO-2026-09-01-13-37-18.jpg',
  '/hero/PHOTO-2026-09-01-13-37-25.jpg',
  '/hero/PHOTO-2026-09-01-13-37-28.jpg',
  '/hero/PHOTO-2026-09-01-13-37-31.jpg',
  '/hero/PHOTO-2026-09-01-13-37-32.jpg',
  '/hero/PHOTO-2026-09-01-13-45-14.jpg',
];

export default function HomeOutreach({ setCurrentPage }) {
  const [activeMediaTab, setActiveMediaTab] = useState('all');
  const [playingVideo, setPlayingVideo] = useState(false);
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

  const highlights = [
    {
      id: 1,
      title: '2024 Rural Cardiac Mobile Clinic',
      category: 'medical',
      categoryLabel: 'Medical Outreach',
      duration: '4:15',
      date: 'Jan 2024',
      views: '12.4K views',
      desc: 'Watch our medical team provide free ECG tests, cardiac consultations, and emergency medications in underserved rural communities.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARLBcWiP_X08ySCeElYpGbtQNW8xJBiMhkQl-nFWSkhyvrczHjzSxUmEi5ZUCvKm9CV-iSO09siSufmkrcoQPQyhiMQLHLZCBRYY83buNiq5Qip0Gaux1Tn04AZQDAT53H7-YTeBpJmXZBK_68TzXkrgPleHvL94k8IPy9zsVxyoMR7ijOCIfCi-2s7ZQ2-X2bI0nUrrzFHV0-9iDdPNId4z1VkwJzg92t-KcHDnXHLYt9k8_P4g7-BQ'
    },
    {
      id: 2,
      title: 'Pediatric Cardiac Surgery Relief Fund',
      category: 'surgery',
      categoryLabel: 'Surgical Relief',
      duration: '6:30',
      date: 'Dec 2023',
      views: '18.9K views',
      desc: 'Emotional story of 5-year-old Emmanuel receiving life-saving pediatric open-heart surgery funded by Brown\'s Heart Care Foundation donors.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj5XloEX0loFJzOTTF23iAO9gQGtt8o_CD2HIKGd83bgbM9rQ81g_hKF5ii9lCpBUIJC62nvQW7XMBbXwbgtoQnFguol2NZc8dpPaR-llgJdlaCqhkT0GB4Y5unt_-IOawP20H2Lnr7QIhLXVB6UmLRjo-IQIvE3XBtO1s5clI2Ugq5Fv3G4dvB0WuXte6HZgBhPIKqnT82nURQXBlXO-c7F7eIacbAK8hPD5a08MhYU-cSMy0HoXZhw'
    },
    {
      id: 3,
      title: 'Heart-Healthy Food & Grain Relief Drive',
      category: 'food',
      categoryLabel: 'Nutritional Security',
      duration: '3:45',
      date: 'Nov 2023',
      views: '9.8K views',
      desc: 'Distributing 2,500 nutrient-rich grain boxes and low-sodium produce hampers to families recovering from cardiovascular conditions.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAymCEWqicpO4Y6qDXyD6q4l4zIdd41BJN7wtVncItBRM-RW47SmVTrcKpsiFPXMryV5h_ihabBjNguQcqWufZnmnUsRkYhsLC1gne3d4Rtz1Dgz5UkYbO9fd-KXUDKHMC2-ZKP-CitbyK78vbpAiaqn7pSNAHMqEeOKADt41zaPMximhuHde5-ooyU2Arph9NOdfYpVez4XJzpiT0RM0CL8v610-dSyhIH1hCj6M2IjNJgyZtBJMGoSw'
    }
  ];

  const filteredHighlights = activeMediaTab === 'all' 
    ? highlights 
    : highlights.filter(h => h.category === activeMediaTab);

  return (
    <div className="pt-16 animate-fadeIn font-sans bg-[#f9f9f9] text-[#1a1c1c]">
      {/* Hero Banner Section */}
      <section className="relative min-h-[620px] lg:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImages.map((imgSrc, index) => (
            <div 
              key={imgSrc}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${imgSrc}')`
              }}
            />
          ))}
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <div className="relative z-10 max-w-[900px] mx-auto px-4 text-center text-white space-y-6 pt-10">
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
            We breathe out love for others to inhale
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Join us in our mission to bring nutritional stability and health support to communities in need, aligned with global sustainability goals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button
              onClick={() => navTo('donate')}
              className="bg-[#b0004a] text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-[#90003b] transition-all flex items-center gap-2 shadow-lg"
            >
              <span className="material-symbols-outlined fill text-base">favorite</span>
              <span>Donate Today</span>
            </button>
            <button
              onClick={() => navTo('events')}
              className="bg-white/20 backdrop-blur-sm border border-white/60 text-white px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-white/30 transition-all"
            >
              Be a Volunteer
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center gap-2 pt-12">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-10 bg-[#b0004a]' : 'w-6 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Foundation Section */}
      <section className="py-20 max-w-[960px] mx-auto px-4 text-center space-y-4">
        <span className="inline-block px-4 py-1.5 bg-[#ffd9de] text-[#b0004a] rounded-full text-xs font-semibold">
          The Foundation
        </span>
        <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Our Story</h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Rooted in compassion and driven by a vision of systemic health equality, Brown's Heart Care Foundation was established to bridge the gap between vulnerable communities and essential care.
        </p>
      </section>

      {/* Legacy & SDG Cards Section */}
      <section className="pb-20 max-w-[1100px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Legacy Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-8 sm:p-10 shadow-sm border-t-4 border-[#b0004a] relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-xl text-[#1a1c1c]">A Legacy of Care</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                What started as a localized effort to support a single community center has blossomed into a comprehensive foundation addressing fundamental human needs. We believe that health and nutrition are not privileges, but fundamental rights. Our approach combines clinical precision with the warmth of a community-driven NGO, ensuring that every intervention is both effective and profoundly human.
              </p>
            </div>
            <div className="pt-6">
              <button 
                onClick={() => navTo('home-impact')}
                className="text-[#b0004a] text-xs font-bold flex items-center gap-1.5 hover:underline"
              >
                <span>Read Full Mission</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* SDG Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffd9de] text-[#b0004a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">restaurant</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-sm text-[#1a1c1c]">SDG 2: Zero Hunger</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Combating food insecurity through sustainable nutritional programs and community pantries.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#ffd9de] text-[#b0004a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xl">medical_services</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-sm text-[#1a1c1c]">SDG 3: Good Health</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Facilitating access to essential medical care, preventative screenings, and wellness education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Next Outreach Section */}
      <section className="py-20 bg-[#f3f3f3] border-t border-gray-200">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#ffd9de] text-[#b0004a] rounded-full text-xs font-semibold">
              Get Involved
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Join Our Next Outreach</h2>
            <p className="text-gray-600 text-sm">
              Be the change you want to see. Join our dedicated team of volunteers in these upcoming community initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-[#ffd9de] text-[#b0004a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">volunteer_activism</span>
                </div>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  Oct 12, 2025
                </span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#1a1c1c] mb-1">Community Food Drive</h3>
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#b0004a]">location_on</span>
                  <span>Central Community Center</span>
                </p>
              </div>
              <div className="flex gap-4 pt-2">
                <button 
                  onClick={() => navTo('events')}
                  className="bg-[#b0004a] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#90003b] transition-all"
                >
                  Join as Volunteer
                </button>
                <button 
                  onClick={() => navTo('events')}
                  className="text-gray-600 hover:text-[#b0004a] text-xs font-semibold py-2.5 px-3"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-6">
              <div className="flex justify-between items-center">
                <div className="w-10 h-10 rounded-xl bg-[#ffd9de] text-[#b0004a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">medical_services</span>
                </div>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                  Nov 5, 2025
                </span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-[#1a1c1c] mb-1">Free Health Screening Camp</h3>
                <p className="text-gray-500 text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#b0004a]">location_on</span>
                  <span>Westside Outreach Hub</span>
                </p>
              </div>
              <div className="flex gap-4 pt-2">
                <button 
                  onClick={() => navTo('events')}
                  className="bg-[#b0004a] text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#90003b] transition-all"
                >
                  Join as Volunteer
                </button>
                <button 
                  onClick={() => navTo('events')}
                  className="text-gray-600 hover:text-[#b0004a] text-xs font-semibold py-2.5 px-3"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights & Past Media Showcase Section (Requested by User) */}
      <section className="py-20 bg-white border-t border-gray-200 space-y-12">
        <div className="max-w-[1100px] mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="inline-block px-4 py-1.5 bg-[#ffd9de] text-[#b0004a] rounded-full text-xs font-semibold mb-2">
                Outreach Highlights & Media
              </span>
              <h2 className="font-heading font-bold text-3xl text-[#1a1c1c]">Program Highlights & Impact Stories</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Explore real footage, video documentaries, and photo archives of our past health missions.
              </p>
            </div>

            {/* Media Tabs */}
            <div className="flex gap-2 bg-[#eee] p-1 rounded-full text-xs font-semibold">
              <button
                onClick={() => setActiveMediaTab('all')}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeMediaTab === 'all' ? 'bg-white text-[#b0004a] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Media
              </button>
              <button
                onClick={() => setActiveMediaTab('medical')}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeMediaTab === 'medical' ? 'bg-white text-[#b0004a] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Screening Outreaches
              </button>
              <button
                onClick={() => setActiveMediaTab('surgery')}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeMediaTab === 'surgery' ? 'bg-white text-[#b0004a] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Surgical Relief
              </button>
              <button
                onClick={() => setActiveMediaTab('food')}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeMediaTab === 'food' ? 'bg-white text-[#b0004a] shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Food Relief
              </button>
            </div>
          </div>

          {/* Featured Video Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredHighlights.map((item) => (
              <div 
                key={item.id}
                className="bg-[#f9f9f9] rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Video Thumbnail with Play Overlay */}
                  <div className="relative h-56 w-full overflow-hidden bg-black">
                    <img 
                      src={item.img} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        onClick={() => navTo('events')}
                        className="w-14 h-14 rounded-full bg-[#b0004a] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                      >
                        <span className="material-symbols-outlined text-3xl font-bold fill">play_arrow</span>
                      </button>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-mono px-2 py-1 rounded">
                      {item.duration}
                    </span>
                    <span className="absolute top-3 left-3 bg-[#b0004a] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Video Details */}
                  <div className="p-6 space-y-3">
                    <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                      <span>{item.date}</span>
                      <span>{item.views}</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#1a1c1c] group-hover:text-[#b0004a] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => navTo('events')}
                    className="w-full py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-semibold hover:bg-[#b0004a] hover:text-white hover:border-[#b0004a] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Watch Full Outreach Video</span>
                    <span className="material-symbols-outlined text-sm">play_circle</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer matching Image 1 */}
      <footer className="bg-[#e8e8e8] text-gray-700 py-12 border-t border-gray-300">
        <div className="max-w-[1100px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-[#b0004a] text-sm">
              <span className="material-symbols-outlined text-base">favorite</span>
              <span>Brown's Heart Care</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              We breathe out love for others to inhale. Dedicated to nutritional stability and health equality.
            </p>
            <p className="text-gray-400 pt-2">
              © 2024 Brown's Heart Care Foundation. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1c1c] mb-3">Initiatives</h4>
            <ul className="space-y-2 text-gray-600">
              <li><button onClick={() => navTo('home-impact')} className="hover:underline">Zero Hunger SDG</button></li>
              <li><button onClick={() => navTo('events')} className="hover:underline">Good Health SDG</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1c1c] mb-3">About Us</h4>
            <ul className="space-y-2 text-gray-600">
              <li><button onClick={() => navTo('donate')} className="hover:underline">Contact Us</button></li>
              <li><button onClick={() => navTo('donate')} className="hover:underline">Privacy Policy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#1a1c1c] mb-3">Connect</h4>
            <div className="flex gap-3 text-gray-600">
              <span className="material-symbols-outlined text-lg cursor-pointer">mail</span>
              <span className="material-symbols-outlined text-lg cursor-pointer">share</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
