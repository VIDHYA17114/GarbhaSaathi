import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Compass, 
  Utensils, 
  CheckSquare,
  Activity,
  Smile, 
  FileText, 
  Settings,
  X,
  ShieldAlert,
  Sparkles,
  Heart,
  LogOut,
  Mic
} from 'lucide-react';

export default function WebSidebar({ activePage, setActivePage, isMobileOpen, setIsMobileOpen, onLogout }) {
  const { language, user, logout, setActiveModal } = useApp();
  const handleLogoutAction = onLogout || logout;

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  // 8 navigation items in exact required order
  const navItems = [
    { 
      id: 'home', 
      label: isHindi ? 'डैशबोर्ड' : (isMarathi ? 'डॅशबोर्ड' : 'Dashboard'), 
      icon: Home 
    },
    { 
      id: 'journey', 
      label: isHindi ? 'मेरी यात्रा' : (isMarathi ? 'माझा प्रवास' : 'My Journey'), 
      icon: Compass 
    },
    { 
      id: 'nutrition', 
      label: isHindi ? 'पोषण योजना' : (isMarathi ? 'पोषण योजना' : 'Nutrition Plan'), 
      icon: Utensils 
    },
    { 
      id: 'tasks', 
      label: isHindi ? 'दैनिक कार्य' : (isMarathi ? 'दैनंदिन कार्ये' : 'Daily Tasks'), 
      icon: CheckSquare
    },
    { 
      id: 'exercise', 
      label: isHindi ? 'दैनिक व्यायाम' : (isMarathi ? 'दैनंदिन व्यायाम' : 'Daily Exercise'), 
      icon: Activity
    },
    { 
      id: 'wellness', 
      label: isHindi ? 'लर्निंग गार्डन' : (isMarathi ? 'लर्निंग गार्डन' : 'Learning Garden'), 
      icon: Sparkles 
    },
    { 
      id: 'records', 
      label: isHindi ? 'रिकॉर्ड्स व रिमाइंडर' : (isMarathi ? 'अहवाल व औषधे' : 'Records & Reminders'), 
      icon: FileText 
    },
    { 
      id: 'settings', 
      label: isHindi ? 'सेटिंग्स' : (isMarathi ? 'सेटिंग्ज' : 'Settings'), 
      icon: Settings 
    }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 text-left select-none transition-colors duration-200">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400/80 p-0.5 bg-white dark:bg-slate-800 shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-200">
            <img 
              src="/garbhasaathi_logo.png" 
              alt="GarbhaSaathi Logo" 
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/garbhasaathi_emblem.jpg';
              }}
            />
          </div>
          <div className="overflow-hidden">
            <h1 className="text-xl font-extrabold text-[#157F66] dark:text-teal-400 tracking-tight leading-none flex items-center gap-1.5">
              <span>GarbhaSaathi</span>
            </h1>
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block mt-1 tracking-wide">
              {isMarathi ? 'मातृत्व साथी पोर्टल' : (isHindi ? 'मातृत्व साथी पोर्टल' : 'Maternal Health Portal')}
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        {setIsMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg bg-slate-100 dark:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 pb-2 block">
          {isMarathi ? 'नेव्हिगेशन' : (isHindi ? 'नेविगेशन' : 'Navigation')}
        </span>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition text-left cursor-pointer ${
                isActive
                  ? 'bg-[#157F66] text-white shadow-md shadow-teal-700/20'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-teal-50/60 dark:hover:bg-slate-800 hover:text-[#157F66] dark:hover:text-teal-400'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 ml-auto shrink-0" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── AI Voice Assistant Feature (Marathi, Hindi, English) ── */}
      <div className="px-4 py-1.5">
        <button
          onClick={() => {
            setActiveModal('aiVoiceAssistant');
            if (setIsMobileOpen) setIsMobileOpen(false);
          }}
          className="w-full flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-[#157F66] via-teal-700 to-emerald-700 hover:from-[#116752] hover:to-emerald-800 text-white shadow-md shadow-teal-900/20 transition-all duration-200 cursor-pointer group active:scale-95 text-left relative overflow-hidden"
        >
          {/* Subtle animated background glow */}
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none" />

          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 shadow-xs relative">
            <Mic className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-400 ring-2 ring-teal-700 animate-ping" />
          </div>

          <div className="overflow-hidden flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black truncate tracking-tight">
                {isMarathi ? 'AI वाणी साथी' : (isHindi ? 'AI वाणी साथी' : 'AI Voice Saathi')}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-900 font-extrabold uppercase shrink-0">
                Gemini
              </span>
            </div>
            <span className="text-[10px] text-teal-100 font-medium block truncate mt-0.5">
              {isMarathi ? 'मराठी • हिंदी • English' : (isHindi ? 'हिंदी • मराठी • English' : 'Voice Assistance')}
            </span>
          </div>

          <Sparkles className="w-4 h-4 text-amber-300 shrink-0 group-hover:rotate-12 transition-transform" />
        </button>
      </div>

      {/* Bottom: User Profile & Emergency */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-[#FAF9F5] dark:bg-slate-900/90 space-y-3">
        {/* User Mini Profile */}
        <div 
          onClick={() => handleNavClick('settings')}
          className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs flex items-center gap-3 cursor-pointer hover:border-teal-300 dark:hover:border-teal-500 transition"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-900 flex items-center justify-center text-xl shrink-0">
            👩
          </div>
          <div className="overflow-hidden">
            <h4 className="font-extrabold text-xs text-slate-900 dark:text-slate-100 truncate">
              {user.name || 'Priya Sharma'}
            </h4>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block truncate">
              {isMarathi ? 'प्रोफाइल संपादित करा' : (isHindi ? 'प्रोफाइल संपादित करें' : 'Edit Profile')}
            </span>
          </div>
        </div>

        {/* Log Out Button */}
        <button
          onClick={handleLogoutAction}
          className="w-full flex items-center justify-center gap-2 py-2 mb-2 text-slate-500 hover:text-red-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 transition cursor-pointer"
          title="Log Out"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{isMarathi ? 'लॉगआउट' : (isHindi ? 'लॉगआउट' : 'Log Out')}</span>
        </button>

        {/* Emergency SOS */}
        <a
          href="tel:108"
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-xs shadow-xs transition active:scale-95"
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{isMarathi ? 'तात्काळ मदत — 108 वर कॉल करा' : (isHindi ? 'आपातकाल — 108 कॉल करें' : 'Emergency — Call 108')}</span>
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 z-30 border-r border-slate-200 dark:border-slate-800 shadow-xs">
        {sidebarContent}
      </aside>

      {/* Mobile Overlay Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Drawer Panel */}
          <aside className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
