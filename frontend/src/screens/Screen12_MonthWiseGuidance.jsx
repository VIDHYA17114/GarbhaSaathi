import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { monthWiseGuidance } from '../data/monthWiseGuidance';
import { nutritionDatabase } from '../data/nutritionDatabase';
import { ArrowLeft, CheckCircle2, Sparkles, Sprout } from 'lucide-react';

export default function Screen12_MonthWiseGuidance() {
  const { setCurrentScreen, language, t } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(3); // default Month 3 as shown in image

  const currentData = monthWiseGuidance.find(m => m.month === selectedMonth) || monthWiseGuidance[2];

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  return (
    <div className="flex-1 flex flex-col p-4 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar pb-6">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={() => setCurrentScreen(6)}
            className="p-1.5 -ml-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-bold text-slate-800">
            {t.monthWiseTitle}
          </h2>
        </div>

        {/* Horizontal Month Tabs [Month 1] [Month 2] [Month 3] [Month 4]... (Matching Mockup 12) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMonth(m)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                selectedMonth === m
                  ? 'bg-[#157F66] text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {isHindi ? `माह ${m}` : `Month ${m}`}
            </button>
          ))}
        </div>

        {/* Current Month Highlight Card (Matching Mockup 12) */}
        <div className="mt-3 p-4 rounded-3xl bg-linear-to-r from-rose-50 to-orange-50/70 border border-rose-200/60 shadow-xs flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">
              {isHindi ? currentData.titleHi : (isMarathi ? currentData.titleMr : currentData.title)}
            </h3>
            <span className="text-[11px] font-semibold text-[#157F66] block mt-0.5">
              {isHindi ? currentData.stageNameHi : currentData.stageName}
            </span>
            <p className="text-[11px] text-slate-600 mt-1 max-w-[190px] leading-tight">
              {isHindi ? currentData.babyDescHi : currentData.babyDesc}
            </p>
          </div>
          {/* Fetus / Baby Illustration */}
          <div className="w-16 h-16 rounded-full bg-white/90 border border-rose-200 flex items-center justify-center text-3xl shadow-xs shrink-0">
            👶
          </div>
        </div>

        {/* "What to focus on?" Section (Matching Mockup 12) */}
        <div className="mt-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-xs">
          <h4 className="font-bold text-xs text-slate-800 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#157F66]" />
            <span>{t.focusOn}</span>
          </h4>

          <div className="space-y-2">
            {currentData.focusItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#157F66] shrink-0" />
                <span>{isHindi ? item.textHi : item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* "Recommended foods" Grid (Matching Mockup 12) */}
        <div className="mt-4">
          <h4 className="font-bold text-xs text-slate-800 mb-2.5">
            {t.recommendedFoods}
          </h4>

          <div className="grid grid-cols-3 gap-2">
            {nutritionDatabase.categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-50/60 border border-orange-100 flex items-center justify-center text-2xl mb-1.5">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-700 leading-tight">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
