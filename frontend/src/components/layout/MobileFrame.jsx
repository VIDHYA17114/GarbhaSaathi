import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import BottomNav from './BottomNav';

export default function MobileFrame({ children }) {
  return (
    <div className="w-full flex-1 flex items-center justify-center py-4 px-2 sm:px-4">
      {/* Mobile Device Frame */}
      <div className="w-full max-w-[400px] h-[820px] bg-white rounded-[44px] shadow-2xl border-[10px] border-slate-900/95 flex flex-col relative overflow-hidden transition-all duration-300">
        
        {/* Top Speaker / Dynamic Island & Status Bar */}
        <div className="w-full bg-white px-7 pt-3 pb-1 flex items-center justify-between z-30 shrink-0 text-slate-800 select-none">
          {/* Time */}
          <span className="font-semibold text-xs tracking-tight">9:41</span>
          
          {/* Speaker slit / punchhole */}
          <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-slate-800 rounded-full mr-2" />
          </div>

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-800">
            <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
            <Battery className="w-4 h-4 stroke-[2.2] fill-slate-800" />
          </div>
        </div>

        {/* Screen Content Area (Scrollable without scrollbar) */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col bg-[#FAF9F5] relative">
          {children}
        </div>

        {/* Bottom Tab Navigation Bar */}
        <BottomNav />

        {/* Bottom Home Indicator Bar */}
        <div className="w-full bg-white pb-2 flex justify-center shrink-0">
          <div className="w-32 h-1 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
