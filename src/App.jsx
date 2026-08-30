import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import VolunteerModal from './components/VolunteerModal';

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

  // Check URL pathname for /bhcareexec
  useEffect(() => {
    if (window.location.pathname.includes('bhcareexec')) {
      setCurrentPage('bhcareexec');
    }
  }, []);

  // Shared Data States for Real-Time Simulation
  const [donations, setDonations] = useState([
    { name: 'Dr. Alabi Williams', email: 'alabi@example.com', amount: 250000, currency: 'NGN', method: 'Direct Bank Transfer', date: 'Aug 28, 2024' },
    { name: 'Chief Mrs. Florence A.', email: 'florence@example.com', amount: 500, currency: 'USD', method: 'Credit Card / Stripe', date: 'Aug 27, 2024' },
    { name: 'Anonymous Donor', email: 'donor@gmail.com', amount: 100000, currency: 'NGN', method: 'Direct Bank Transfer', date: 'Aug 25, 2024' },
    { name: 'David Miller', email: 'david.m@example.com', amount: 100, currency: 'USD', method: 'Credit Card / Stripe', date: 'Aug 22, 2024' }
  ]);

  const [volunteers, setVolunteers] = useState([
    { name: 'Jane Doe', email: 'jane@example.com', phone: '+1 (555) 000-0000', city: 'Metropolis', state: 'NY', interests: ['Medical Outreach', 'Patient Care'], availability: 'Weekends', qualifications: 'RN Nurse' },
    { name: 'Dr. Samuel K.', email: 'samuel@example.com', phone: '+234 803 000 1122', city: 'Lagos', state: 'LA', interests: ['Medical Outreach'], availability: 'Flexible', qualifications: 'MD Cardiologist' }
  ]);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Grand Health Awareness Walk 2024',
      typeLabel: 'Health Walk',
      date: 'Oct 15, 2024 • 8:00 AM',
      location: 'City Center Park',
      desc: 'A community walk to raise awareness for cardiovascular health and preventative care.'
    },
    {
      id: 2,
      title: 'National Nutrition Month Drive',
      typeLabel: 'Food Drive',
      date: 'Nov 05, 2024 • 10:00 AM',
      location: 'Westside Outreach Hub',
      desc: 'Distributing heart-healthy food packages to families in underserved neighborhoods.'
    }
  ]);

  const [highlights, setHighlights] = useState([
    {
      id: 1,
      title: '2024 Rural Cardiac Mobile Clinic',
      category: 'medical',
      categoryLabel: 'Medical Outreach',
      duration: '4:15',
      date: 'Jan 2024',
      views: '12.4K views',
      desc: 'Watch our medical team provide free ECG tests, cardiac consultations, and emergency medications in underserved rural communities.',
      videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARLBcWiP_X08ySCeElYpGbtQNW8xJBiMhkQl-nFWSkhyvrczHjzSxUmEi5ZUCvKm9CV-iSO09siSufmkrcoQPQyhiMQLHLZCBRYY83buNiq5Qip0Gaux1Tn04AZQDAT53H7-YTeBpJmXZBK_68TzXkrgPleHvL94k8IPy9zsVxyoMR7ijOCIfCi-2s7ZQ2-X2bI0nUrrzFHV0-9iDdPNId4z1VkwJzg92t-KcHDnXHLYt9k8_P4g7-BQ'
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
      videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj5XloEX0loFJzOTTF23iAO9gQGtt8o_CD2HIKGd83bgbM9rQ81g_hKF5ii9lCpBUIJC62nvQW7XMBbXwbgtoQnFguol2NZc8dpPaR-llgJdlaCqhkT0GB4Y5unt_-IOawP20H2Lnr7QIhLXVB6UmLRjo-IQIvE3XBtO1s5clI2Ugq5Fv3G4dvB0WuXte6HZgBhPIKqnT82nURQXBlXO-c7F7eIacbAK8hPD5a08MhYU-cSMy0HoXZhw'
    }
  ]);

  const openVolunteerModal = () => setIsVolunteerOpen(true);
  const closeVolunteerModal = () => setIsVolunteerOpen(false);

  const handleAddDonation = (newDonation) => {
    setDonations([newDonation, ...donations]);
  };

  const handleAddVolunteer = (newVol) => {
    setVolunteers([newVol, ...volunteers]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home-outreach':
        return <HomeOutreach setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'home-impact':
        return <HomeImpact setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'history':
        return <OurHistory setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'events':
        return <Events setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'donate':
        return <Donate setCurrentPage={setCurrentPage} onAddDonation={handleAddDonation} openVolunteerModal={openVolunteerModal} />;
      case 'programs':
        return <Programs setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'faq':
        return <FAQ setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'privacy':
        return <Privacy setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
      case 'bhcareexec':
        return (
          <AdminDashboard
            setCurrentPage={setCurrentPage}
            donations={donations}
            volunteers={volunteers}
            events={events}
            highlights={highlights}
            onUpdateEvents={setEvents}
            onUpdateHighlights={setHighlights}
          />
        );
      default:
        return <HomeOutreach setCurrentPage={setCurrentPage} openVolunteerModal={openVolunteerModal} />;
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
        onAddVolunteer={handleAddVolunteer}
      />
    </div>
  );
}
