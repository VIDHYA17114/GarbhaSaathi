import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Droplets, ShieldAlert, Globe, Smartphone, Eye } from 'lucide-react';

export default function ScreenSwitcherBar() {
  const { currentScreen, setCurrentScreen, language, setLanguage, setActiveModal } = useApp();

  const screens = [
    { num: 1, name: "1. Welcome" },
    { num: 2, name: "2. Who can use" },
    { num: 3, name: "3. Sign Up" },
    { num: 4, name: "4. Login" },
    { num: 5, name: "5. Profile Setup" },
    { num: 6, name: "6. Pregnancy Journey" },
    { num: 7, name: "7. Onboarding Complete" },
    { num: 8, name: "8. Home Dashboard" },
    { num: 9, name: "9. AI Health Check" },
    { num: 10, name: "10. AI Nutrition Planner" },
    { num: 11, name: "11. Budget & Food" },
    { num: 12, name: "12. Month-wise Guidance" },
    { num: 13, name: "13. Mood & Media" },
    { num: 14, name: "14. Health Records" },
    { num: 15, name: "15. Privacy & Settings" },
  ];

  return (
    <header className="w-full bg-slate-900 text-white border-b border-slate-800 shrink-0 sticky top-0 z-40 shadow-md">
      {/* Top Quick Actions Bar */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Brand & Badge */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#157F66] flex items-center justify-center text-xs">
            🌸
          </div>
          <span className="font-bold tracking-wide text-sm text-teal-300">GarbhaSaathi</span>
          <span className="hidden sm:inline px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
            15 Prototype Screens
          </span>
        </div>

        {/* Extra Helpful Tools Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveModal('kickCounter')}
            className="flex items-center gap-1 px-2.5 py-1 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 rounded-lg font-medium transition"
            title="Baby Kick Counter"
          >
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span className="hidden md:inline">Baby Kicks</span>
          </button>

          <button
            onClick={() => setActiveModal('waterTracker')}
            className="flex items-center gap-1 px-2.5 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/30 rounded-lg font-medium transition"
            title="Hydration Water Tracker"
          >
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Water</span>
          </button>

          <button
            onClick={() => setActiveModal('emergencySos')}
            className="flex items-center gap-1 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition shadow-xs"
            title="Emergency SOS / Warning Signs"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>SOS 108</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700 ml-1">
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition ${
                language === 'hi' ? 'bg-[#157F66] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLanguage('mr')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition ${
                language === 'mr' ? 'bg-[#157F66] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition ${
                language === 'en' ? 'bg-[#157F66] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Screen selector horizontal scroll bar matching all 15 screens in mockup */}
      <div className="bg-slate-950 px-4 py-1.5 border-t border-slate-800/80 overflow-x-auto no-scrollbar flex items-center gap-1.5 text-[11px]">
        <span className="text-slate-400 text-[10px] font-mono shrink-0 mr-1 flex items-center gap-1">
          <Eye className="w-3 h-3 text-teal-400" />
          <span>Screen:</span>
        </span>
        {screens.map((s) => (
          <button
            key={s.num}
            onClick={() => setCurrentScreen(s.num)}
            className={`shrink-0 px-2.5 py-1 rounded-md font-medium transition whitespace-nowrap ${
              currentScreen === s.num
                ? 'bg-[#157F66] text-white font-bold shadow-xs'
                : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </header>
  );
}
