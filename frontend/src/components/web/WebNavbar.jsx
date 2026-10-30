import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldAlert, 
  Menu, 
  Globe, 
  Sparkles, 
  AlertCircle, 
  Sun, 
  Moon,
  Compass
} from 'lucide-react';

export default function WebNavbar({ activePage, setActivePage, setIsMobileOpen, onViewLanding, onLogout }) {
  const { 
    language, 
    setLanguage, 
    user, 
    setActiveModal, 
    pregnancyProgress, 
    eddConflict, 
    theme, 
    isDarkMode, 
    toggleTheme,
    logout
  } = useApp();

  const handleLogoutAction = onLogout || logout;

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const pageTitles = {
    'home':      isHindi ? 'मुख्य डैशबोर्ड' : (isMarathi ? 'डॅशबोर्ड' : 'Dashboard'),
    'journey':   isHindi ? 'गर्भावस्था यात्रा' : (isMarathi ? 'गर्भधारणा प्रवास' : 'My Pregnancy Journey'),
    'nutrition': isHindi ? 'पोषण योजना' : (isMarathi ? 'पोषण योजना' : 'Nutrition Plan'),
    'tasks':     isHindi ? 'दैनिक कार्य' : (isMarathi ? 'दैनंदिन कार्ये' : 'Daily Tasks'),
    'exercise':  isHindi ? 'दैनिक व्यायाम एवं योग' : (isMarathi ? 'दैनंदिन व्यायाम व योग' : 'Daily Exercise & Yoga'),
    'wellness':  isHindi ? 'लर्निंग गार्डन' : (isMarathi ? 'लर्निंग गार्डन' : 'Learning Garden'),
    'records':   isHindi ? 'स्वास्थ्य रिकॉर्ड्स' : (isMarathi ? 'अहवाल व औषधे' : 'Records & Reminders'),
    'settings':  isHindi ? 'प्रोफाइल व सेटिंग्स' : (isMarathi ? 'सेटिंग्ज' : 'Settings')
  };

  const weekLabel = pregnancyProgress?.week != null
    ? pregnancyProgress.formattedText
    : (isMarathi ? 'तारीख नोंदवा' : (isHindi ? 'तिथि अपडेट करें' : 'Update Dates'));

  const trimesterBadge = pregnancyProgress?.trimesterLabels?.short || '';

  return (
    <header className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shadow-xs transition-colors duration-200">
      <div className="w-full px-4 sm:px-8 py-3.5 flex items-center justify-between gap-3">
        
        {/* Left: Logo + Hamburger + Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition shrink-0"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile Brand Seal */}
          <div 
            onClick={() => setActivePage('home')}
            className="md:hidden flex items-center gap-1.5 cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-300/80 p-0.5 bg-amber-50 shrink-0">
              <img 
                src="/garbhasaathi_logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/garbhasaathi_emblem.jpg';
                }}
              />
            </div>
          </div>

          {/* Subtle Vertical Divider */}
          <div className="hidden sm:block w-px h-7 bg-slate-200 dark:bg-slate-700 mx-1 shrink-0" />

          {/* Page Title & Pregnancy Details */}
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100 tracking-tight truncate">
                {pageTitles[activePage] || 'Dashboard'}
              </h2>
              {weekLabel && (
                <span className="hidden lg:inline px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#157F66] dark:text-teal-400 text-xs font-bold border border-teal-100 dark:border-teal-900 shrink-0">
                  {weekLabel}{trimesterBadge ? ` • ${trimesterBadge}` : ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

          {/* Theme Quick Toggle (Light / Dark) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-400 border border-slate-200 dark:border-slate-700 transition flex items-center justify-center shrink-0"
            title={isDarkMode ? (isMarathi ? 'लाईट मोड सुरू करा' : (isHindi ? 'लाइट मोड चालू करें' : 'Switch to Light Mode')) : (isMarathi ? 'डार्क मोड सुरू करा' : (isHindi ? 'डार्क मोड चालू करें' : 'Switch to Dark Mode'))}
            aria-label="Toggle light/dark theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 animate-spin-once" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* EDD Conflict Warning */}
          {eddConflict && (
            <button
              onClick={() => setActivePage('settings')}
              title="LMP and EDD dates seem inconsistent. Please review."
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-xl text-xs font-bold transition"
            >
              <AlertCircle className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isMarathi ? 'तारखा तपासा' : (isHindi ? 'तिथियां जांचें' : 'Review Dates')}
              </span>
            </button>
          )}

          {/* Emergency SOS */}
          <button
            onClick={() => setActiveModal('emergencySos')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition active:scale-95"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">{isMarathi ? 'धोक्याची लक्षणे (108)' : (isHindi ? 'खतरे के लक्षण (108)' : 'SOS 108/102')}</span>
            <span className="sm:hidden font-extrabold">SOS</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-0.5 border border-slate-200 dark:border-slate-700">
            {[
              { code: 'hi', label: 'हिं' },
              { code: 'mr', label: 'म' },
              { code: 'en', label: 'EN' }
            ].map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold transition ${
                  language === code
                    ? 'bg-white dark:bg-slate-700 text-[#157F66] dark:text-teal-300 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Landing Page Quick View */}
          {onViewLanding && (
            <button
              onClick={onViewLanding}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#157F66] text-xs font-bold border border-slate-200 dark:border-slate-700 transition cursor-pointer"
              title="View public landing page"
            >
              <Compass className="w-3.5 h-3.5 text-[#157F66]" />
              <span>Landing</span>
            </button>
          )}

          {/* User Avatar */}
          <button
            onClick={() => setActivePage('settings')}
            className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-lg hover:scale-105 transition shrink-0"
            title={user.name || 'Profile'}
          >
            👩
          </button>

        </div>
      </div>
    </header>
  );
}
