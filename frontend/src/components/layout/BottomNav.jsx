import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Compass, Utensils, Heart, Menu } from 'lucide-react';

export default function BottomNav() {
  const { activeTab, handleTabChange, language, currentScreen } = useApp();

  // Only show bottom nav for in-app screens (Screen 8 to 15)
  if (currentScreen < 8) return null;

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const navItems = [
    {
      id: 'home',
      label: isHindi ? 'होम' : (isMarathi ? 'होम' : 'Home'),
      icon: Home
    },
    {
      id: 'journey',
      label: isHindi ? 'यात्रा' : (isMarathi ? 'प्रवास' : 'Journey'),
      icon: Compass
    },
    {
      id: 'nutrition',
      label: isHindi ? 'पोषण' : (isMarathi ? 'पोषण' : 'Nutrition'),
      icon: Utensils
    },
    {
      id: 'wellness',
      label: isHindi ? 'वेलनेस' : (isMarathi ? 'वेलनेस' : 'Wellness'),
      icon: Heart
    },
    {
      id: 'more',
      label: isHindi ? 'अधिक' : (isMarathi ? 'अधिक' : 'More'),
      icon: Menu
    }
  ];

  return (
    <div className="w-full bg-white border-t border-slate-100 px-3 py-2 flex items-center justify-around shrink-0 z-30 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              isActive ? 'text-[#157F66] font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-1 rounded-full transition ${isActive ? 'bg-teal-50' : ''}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
