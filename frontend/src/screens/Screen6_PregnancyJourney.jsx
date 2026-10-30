import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Sprout, Heart, ChevronRight } from 'lucide-react';

export default function Screen6_PregnancyJourney() {
  const { setCurrentScreen, user, pregnancyProgress, language, t } = useApp();
  const [activeTrimester, setActiveTrimester] = useState('T1');

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen(5)}
            className="p-1.5 -ml-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-slate-800">
            {t.pregnancyJourney}
          </h2>
        </div>

        {/* Hero Card (Matching Screen 6) */}
        <div className="mt-4 p-4 rounded-3xl bg-linear-to-r from-rose-50 to-orange-50 border border-rose-200/60 shadow-xs relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-extrabold text-slate-900 text-sm block">
                12 Weeks 3 Days
              </span>
              <span className="text-[11px] font-semibold text-[#157F66] block">
                {isHindi ? "पहला त्रैमास (First Trimester)" : "First Trimester"}
              </span>
              <p className="text-[11px] text-slate-600 mt-2 max-w-[170px] leading-tight">
                {t.doingGreat}
              </p>
            </div>
            {/* Pregnant Mother Illustration */}
            <div className="w-16 h-16 rounded-2xl bg-white/80 border border-rose-100 flex items-center justify-center text-3xl shadow-xs">
              🤰
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-200/50 flex justify-between text-[11px] text-slate-600">
            <div>
              <span className="block text-slate-400 text-[10px]">LMP:</span>
              <span className="font-bold text-slate-700">15 March 2025</span>
            </div>
            <div className="text-right">
              <span className="block text-slate-400 text-[10px]">Expected Due Date:</span>
              <span className="font-bold text-slate-700">20 December 2025</span>
            </div>
          </div>
        </div>

        {/* Trimester Tabs (T1, T2, T3) */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveTrimester('T1')}
            className={`py-2 px-2 rounded-2xl text-center text-xs font-bold transition ${
              activeTrimester === 'T1'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            T1 (1-12 w)
          </button>
          <button
            onClick={() => setActiveTrimester('T2')}
            className={`py-2 px-2 rounded-2xl text-center text-xs font-bold transition ${
              activeTrimester === 'T2'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            T2 (13-27 w)
          </button>
          <button
            onClick={() => setActiveTrimester('T3')}
            className={`py-2 px-2 rounded-2xl text-center text-xs font-bold transition ${
              activeTrimester === 'T3'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            T3 (28-40 w)
          </button>
        </div>

        {/* Progress Bar (Week 12 of 40) */}
        <div className="mt-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
            <span className="flex items-center gap-1 text-[#157F66]">
              <Sprout className="w-4 h-4" />
              <span>{t.weekOf40}</span>
            </span>
            <span className="text-slate-500 font-semibold">{t.completed}</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '30%' }} />
          </div>
        </div>

        {/* This Week's Baby Development */}
        <div className="mt-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
          <h4 className="font-bold text-xs text-slate-800 mb-2">
            {t.babysDevelopment}
          </h4>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl shrink-0">
              👶
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.babySizeDesc}
            </p>
          </div>
        </div>
      </div>

      {/* View Month-wise Journey CTA */}
      <div className="pt-4">
        <button
          onClick={() => setCurrentScreen(7)} // or 12 for month-wise, next in onboarding is 7
          className="w-full py-3.5 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-lg shadow-teal-700/20 transition active:scale-98 flex items-center justify-center gap-2"
        >
          <span>{t.viewMonthWise}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
