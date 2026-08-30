import React from 'react';

export default function OurStory({ setCurrentPage, openDonateModal, openVolunteerModal }) {
  const navTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20 animate-fadeIn space-y-16">
      {/* Hero Origin Section */}
      <section className="max-w-container-max mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 rounded-full text-primary font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>Our Origin & Philosophy</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-primary leading-tight">
              Love is the Greatest Healer.
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Brown’s Heart Care Foundation is built on one simple truth: compassion heals. What started as quiet acts of kindness — sharing home-cooked meals, visiting sick neighbors, providing emergency heart medicine — has grown into a widespread healthcare movement.
            </p>
            <p className="text-sm text-secondary leading-relaxed">
              We bridge the gap between high-level hospital cardiovascular care and underserved communities that lack basic health access or nutritional stability.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => navTo('history')}
                className="px-6 py-3 rounded-full bg-primary text-white text-xs font-bold shadow-md hover:bg-primary-container transition-colors flex items-center gap-2"
              >
                <span>Explore Historical Timeline</span>
                <span className="material-symbols-outlined text-sm">history</span>
              </button>
              <button
                onClick={() => navTo('mission')}
                className="px-6 py-3 rounded-full border border-secondary text-secondary text-xs font-semibold hover:bg-surface-container transition-colors"
              >
                <span>Read Mission & Values</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-card border border-surface-variant relative aspect-[4/3]">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7dq8alDGLDeZu9kNV2yoxhUESKLenr98CMcibVSyLpQQQSAU25xKP6XF-e0VNGmSI4tNsOD3uv1WmBRe0z0xgbqQSoTaCsaPCHbRciagj6ADOnKT3OdXVq99G9unzwCUsPb3S5lt50rjxWyyE9YgkWNCg3wEj0mf695mZV7DG8VyjUj7SMsm5HbrOv93GR4tHmmt7n7I80KVusV6cAKo7JBoa3r3t_21oecKfMTbqcIuEsPpjgyEU3A"
              alt="Community healthcare team in outreach"
            />
          </div>
        </div>
      </section>

      {/* Global Commitment Progress Bars Section */}
      <section className="bg-surface-container-low py-16 border-y border-surface-variant">
        <div className="max-w-container-max mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="font-heading font-extrabold text-3xl text-on-surface">Our Global Sustainable Commitments</h2>
            <p className="text-secondary text-sm">Aligning local heart healthcare with United Nations Sustainable Development Goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* SDG 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-card border-t-4 border-primary relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#dda63a]/10 text-[#dda63a] font-bold text-xs rounded-full">SDG 2</span>
                <h3 className="font-heading font-bold text-xl text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">restaurant</span>
                  <span>Zero Hunger & Nutrition Security</span>
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                We believe nutritional stability is the foundation of heart health. Through community feeding programs and grain box distributions, we work to ensure no patient goes to bed hungry while recovering.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-secondary">Initiative Progress</span>
                  <span className="text-primary font-bold">85%</span>
                </div>
                <div className="w-full bg-primary-fixed h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[85%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>

            {/* SDG 3 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-card border-t-4 border-primary relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-[#4c9f38]/10 text-[#4c9f38] font-bold text-xs rounded-full">SDG 3</span>
                <h3 className="font-heading font-bold text-xl text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">health_and_safety</span>
                  <span>Good Health & Cardiovascular Well-Being</span>
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
                Access to essential cardiovascular care should never be a privilege based on wealth. We provide free screening, maternal heart health monitoring, and subsidize pediatric cardiac surgeries.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-secondary">Initiative Progress</span>
                  <span className="text-primary font-bold">92%</span>
                </div>
                <div className="w-full bg-primary-fixed h-3 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[92%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movement Banner */}
      <section className="max-w-container-max mx-auto px-4 md:px-8">
        <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant/40 p-8 md:p-14 rounded-3xl shadow-card text-center space-y-6">
          <span className="material-symbols-outlined text-5xl text-primary fill">vital_signs</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-on-surface max-w-2xl mx-auto">
            A Movement of Compassion in Action
          </h2>
          <p className="text-on-surface-variant text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            We envision a world where structural barriers to basic health services and nutrition are permanently dismantled. Every meal served and every heart screened is a step toward an empathetic, healthier society.
          </p>
          <div className="pt-2">
            <button
              onClick={openVolunteerModal}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm shadow-md hover:shadow-card-hover transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <span>Get Involved Today</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
