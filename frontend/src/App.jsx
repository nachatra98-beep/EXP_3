import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeatureCards from './components/FeatureCards';
import ProgramsSection from './components/ProgramsSection';
import CommunityBanner from './components/CommunityBanner';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import ChatbotInterface from './components/ChatbotInterface';
import { CourseDetailModal, ContactModal, AdminModal, AuthModal } from './components/Modals';
import { fetchSiteOverview, checkCurrentUser } from './api';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'chat'
  const [siteData, setSiteData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [chatInitialPrompt, setChatInitialPrompt] = useState('');

  useEffect(() => {
    loadOverview();
    checkAuth();
  }, []);

  const loadOverview = async () => {
    try {
      const data = await fetchSiteOverview();
      setSiteData(data);
    } catch (e) {
      console.error("Overview load error", e);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await checkCurrentUser();
      if (res && res.authenticated) {
        setCurrentUser(res.user);
      }
    } catch (e) {
      console.error("Auth check error", e);
    }
  };

  const handleNavigate = (page, options = {}) => {
    if (page === 'chat') {
      if (options.prompt) {
        setChatInitialPrompt(options.prompt);
      }
      setCurrentView('chat');
      window.scrollTo(0, 0);
    } else if (page === 'contact') {
      setContactModalOpen(true);
    } else if (page === 'home') {
      setCurrentView('home');
      window.scrollTo(0, 0);
    } else if (page === 'programs') {
      setCurrentView('home');
      const el = document.getElementById('programs-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (page === 'about' || page === 'admissions' || page === 'student-life' || page === 'placements') {
      // Direct user to relevant section or prompt chatbot
      setChatInitialPrompt(`Tell me everything about CIT ${page} including official details.`);
      setCurrentView('chat');
    }
  };

  const handleOpenChatWithPrompt = (prompt) => {
    setChatInitialPrompt(prompt);
    setCurrentView('chat');
    window.scrollTo(0, 0);
  };

  const handleSelectCourse = (code) => {
    if (code === 'all') {
      const el = document.getElementById('programs-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const c = siteData?.courses?.find(item => item.code.toLowerCase() === code.toLowerCase());
    if (c) {
      setSelectedCourse(c);
    }
  };

  // View 1: Dedicated Chatbot Screen (Right Screen in Uploaded Image)
  if (currentView === 'chat') {
    return (
      <ChatbotInterface 
        onBackToHome={() => {
          setChatInitialPrompt('');
          setCurrentView('home');
        }}
        initialPrompt={chatInitialPrompt}
      />
    );
  }

  // View 2: Main Website (Left Screen in Uploaded Image)
  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Header / Navbar */}
      <Navbar 
        onNavigate={handleNavigate}
        activePage={currentView}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Main Public Page Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onExplore={() => {
            const el = document.getElementById('programs-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* 4 Feature Cards */}
        <FeatureCards 
          onCardClick={(featId) => {
            if (featId === 'education') handleOpenChatWithPrompt("What academic courses, degrees, and accreditations does CIT hold?");
            if (featId === 'innovation') handleOpenChatWithPrompt("Tell me about the CIT Catalyst Innovation Hub, incubation center, and student startups.");
            if (featId === 'faculty') handleOpenChatWithPrompt("Tell me about the faculty members, professors, and leadership at CIT.");
            if (featId === 'future') handleOpenChatWithPrompt("What are the placement statistics, highest package, and top recruiters at CIT?");
          }}
        />

        {/* Our Programs Section */}
        <div id="programs-section">
          <ProgramsSection 
            courses={siteData?.courses || []}
            onSelectCourse={handleSelectCourse}
            onAskChatbot={handleOpenChatWithPrompt}
          />
        </div>

        {/* Join Our Community Section */}
        <CommunityBanner 
          onLearnMore={() => handleOpenChatWithPrompt("Tell me about student life, clubs, hackathons, and hostel culture at CIT.")}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Chat Action Button (FAB) with "Chat with us!" bubble */}
      <ChatWidget onOpenChat={() => setCurrentView('chat')} />

      {/* Modals */}
      {selectedCourse && (
        <CourseDetailModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)}
          onAskChatbot={handleOpenChatWithPrompt}
        />
      )}

      {contactModalOpen && (
        <ContactModal onClose={() => setContactModalOpen(false)} />
      )}

      {adminModalOpen && (
        <AdminModal onClose={() => setAdminModalOpen(false)} />
      )}

      {authModalOpen && (
        <AuthModal 
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      )}

    </div>
  );
}
