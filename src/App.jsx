import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VolunteerModal from './components/VolunteerModal';
import { useSiteSettings } from './context/SiteSettingsContext';

import HomeOutreach from './pages/HomeOutreach';
import HomeImpact from './pages/HomeImpact';
import OurHistory from './pages/OurHistory';
import Events from './pages/Events';
import Donate from './pages/Donate';
import Programs from './pages/Programs';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home-outreach');
  const [isVolunteerOpen, setIsVolunteerOpen] = useState(false);
  const [targetEvent, setTargetEvent] = useState(null);
  const [targetSponsorEvent, setTargetSponsorEvent] = useState(null);
  const { addDonation, addVolunteer } = useSiteSettings();

  // Check URL pathname for /bhcareexec
  useEffect(() => {
    if (window.location.pathname.includes('bhcareexec')) {
      setCurrentPage('bhcareexec');
    }
  }, []);

  const openVolunteerModal = (evt) => {
    setTargetEvent(evt || null);
    setIsVolunteerOpen(true);
  };
  
  const closeVolunteerModal = () => {
    setIsVolunteerOpen(false);
    setTargetEvent(null);
  };

  const openSponsorPage = (evt) => {
    setTargetSponsorEvent(evt || null);
    setCurrentPage('donate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home-outreach':
        return <HomeOutreach setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} openSponsorPage={openSponsorPage} />;
      case 'home-impact':
        return <HomeImpact setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'history':
        return <OurHistory setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'events':
        return <Events setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} openSponsorPage={openSponsorPage} />;
      case 'donate':
        return <Donate setCurrentPage={setCurrentPage} onAddDonation={addDonation} openVolunteerModal={openVolunteerModal} targetSponsorEvent={targetSponsorEvent} />;
      case 'programs':
        return <Programs setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'faq':
        return <FAQ setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'privacy':
        return <Privacy setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'bhcareexec':
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      default:
        return <HomeOutreach setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} openSponsorPage={openSponsorPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] text-[#1a1c1c]">
      {currentPage !== 'bhcareexec' && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          openVolunteerModal={openVolunteerModal} 
        />
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Global Multi-Step Volunteer Registration Modal */}
      <VolunteerModal 
        isOpen={isVolunteerOpen} 
        onClose={closeVolunteerModal}
        onAddVolunteer={addVolunteer}
        targetEvent={targetEvent}
      />
    </div>
  );
}
