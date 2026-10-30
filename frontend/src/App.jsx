import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { VoiceProvider } from './context/VoiceContext';

// Web Portal Navigation & Pages
import WebSidebar from './components/web/WebSidebar';
import WebNavbar from './components/web/WebNavbar';
import WebHomeDashboard from './components/web/WebHomeDashboard';
import WebJourneyPage from './components/web/WebJourneyPage';
import WebNutritionPage from './components/web/WebNutritionPage';
import WebDailyTasksPage from './components/web/WebDailyTasksPage';
import WebDailyExercisePage from './components/web/WebDailyExercisePage';
import WebMoodWellnessPage from './components/web/WebMoodWellnessPage';
import WebHealthRecordsPage from './components/web/WebHealthRecordsPage';
import WebSettingsPage from './components/web/WebSettingsPage';
import WebFooter from './components/web/WebFooter';

// Public Landing & Auth Pages
import WebLandingPage from './components/landing/WebLandingPage';
import WebLoginPage from './components/auth/WebLoginPage';
import WebRegisterPage from './components/auth/WebRegisterPage';

// Global Modals
import KickCounterModal from './components/common/KickCounterModal';
import WaterTrackerModal from './components/common/WaterTrackerModal';
import EmergencySosModal from './components/common/EmergencySosModal';
import AudioPlayerModal from './components/common/AudioPlayerModal';
import VideoPlayerModal from './components/common/VideoPlayerModal';
import BookReaderModal from './components/common/BookReaderModal';
import ReportUploadModal from './components/common/ReportUploadModal';
import AIVoiceAssistantModal from './components/common/AIVoiceAssistantModal';

function MainAppContent() {
  const { user, logout } = useApp();
  // Active page: 'home' | 'journey' | 'nutrition' | 'tasks' | 'wellness' | 'records' | 'settings'
  const [activePage, setActivePage] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Authentication gate states ('landing' | 'login' | 'register')
  const [authView, setAuthView] = useState('landing');
  // Initial open must always show the Landing Page first before the website portal,
  // but if the user has already entered portal in this session or is logged in, stay on portal!
  const [hasEnteredPortal, setHasEnteredPortal] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('garbhasaathi_portal_active');
      if (saved === 'true') return true;
    }
    return Boolean(user?.isLoggedIn);
  });

  const isLoggedIn = Boolean(user?.isLoggedIn);

  const handleEnterPortal = () => {
    setHasEnteredPortal(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('garbhasaathi_portal_active', 'true');
    }
  };

  const handleLogout = () => {
    logout();
    setHasEnteredPortal(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('garbhasaathi_portal_active');
    }
    setAuthView('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] dark:bg-[#0b1320] text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
      
      {/* A. Landing Page & Auth Screens — Always open first */}
      {!hasEnteredPortal ? (
        <div className="flex-1 flex flex-col min-h-screen w-full">
          {authView === 'landing' && (
            <WebLandingPage 
              onNavigateAuth={(target) => setAuthView(target)} 
              onEnterPortal={handleEnterPortal}
            />
          )}
          {authView === 'login' && (
            <WebLoginPage 
              onNavigateAuth={(target) => setAuthView(target)} 
              onLoginSuccess={() => {
                setHasEnteredPortal(true);
                setAuthView('landing');
              }} 
            />
          )}
          {authView === 'register' && (
            <WebRegisterPage 
              onNavigateAuth={(target) => setAuthView(target)} 
              onRegisterSuccess={() => {
                setHasEnteredPortal(true);
                setAuthView('landing');
              }} 
            />
          )}
        </div>
      ) : (
        /* B. Authenticated Full Portal Website Experience */
        <div className="flex-1 flex min-h-screen relative">
          <WebSidebar
            activePage={activePage}
            setActivePage={setActivePage}
            isMobileOpen={isMobileMenuOpen}
            setIsMobileOpen={setIsMobileMenuOpen}
            onLogout={handleLogout}
          />

          {/* Main content offset by sidebar */}
          <div className="md:pl-64 flex-1 flex flex-col min-h-screen w-full">
            <WebNavbar
              activePage={activePage}
              setActivePage={setActivePage}
              setIsMobileOpen={setIsMobileMenuOpen}
              onViewLanding={() => {
                setHasEnteredPortal(false);
                setAuthView('landing');
              }}
              onLogout={handleLogout}
            />

            <main className="flex-1 flex flex-col">
              {activePage === 'home'      && <WebHomeDashboard setActivePage={setActivePage} onLogout={handleLogout} />}
              {activePage === 'journey'   && <WebJourneyPage />}
              {activePage === 'nutrition' && <WebNutritionPage />}
              {activePage === 'tasks'     && <WebDailyTasksPage setActivePage={setActivePage} />}
              {activePage === 'exercise'  && <WebDailyExercisePage setActivePage={setActivePage} />}
              {activePage === 'wellness'  && <WebMoodWellnessPage />}
              {activePage === 'records'   && <WebHealthRecordsPage />}
              {activePage === 'settings'  && <WebSettingsPage onLogout={handleLogout} />}
            </main>

            {/* Footer displayed exclusively on the Settings tab */}
            {activePage === 'settings' && <WebFooter setActivePage={setActivePage} />}
          </div>
        </div>
      )}

      {/* Global Modals */}
      <KickCounterModal />
      <WaterTrackerModal />
      <EmergencySosModal />
      <AudioPlayerModal />
      <VideoPlayerModal />
      <BookReaderModal />
      <ReportUploadModal />
      <AIVoiceAssistantModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <VoiceProvider>
        <MainAppContent />
      </VoiceProvider>
    </AppProvider>
  );
}
