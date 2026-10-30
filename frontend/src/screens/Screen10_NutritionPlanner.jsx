import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { nutritionDatabase } from '../data/nutritionDatabase';
import { ArrowLeft, CheckCircle2, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

export default function Screen10_NutritionPlanner() {
  const { setCurrentScreen, language, dailyCheckin, t } = useApp();
  const [activeSubTab, setActiveSubTab] = useState('today'); // 'today', 'week', 'month'
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const plan = nutritionDatabase.standardPlan;

  const handleSaveHome = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#FAF9F5] text-left select-none overflow-y-auto no-scrollbar">
      <div>
        {/* Top Header */}
        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={() => setCurrentScreen(8)}
            className="p-1.5 -ml-1.5 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
              {isHindi ? "पोषण योजना बनाएं" : "Create Your Plan"}
            </span>
            <h2 className="text-base font-extrabold text-slate-800">
              {isHindi ? "आज की पोषण योजना" : "Today's Nutrition Plan"}
            </h2>
          </div>
        </div>

        {/* Subtabs: Today / This Week / By Month (Matching Mockup 10) */}
        <div className="grid grid-cols-3 gap-2 my-2">
          <button
            onClick={() => setActiveSubTab('today')}
            className={`py-1.5 rounded-full text-xs font-bold transition ${
              activeSubTab === 'today'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {t.today}
          </button>
          <button
            onClick={() => setActiveSubTab('week')}
            className={`py-1.5 rounded-full text-xs font-bold transition ${
              activeSubTab === 'week'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {t.thisWeek}
          </button>
          <button
            onClick={() => {
              setActiveSubTab('month');
              setCurrentScreen(12); // jumps to Month-wise Guidance
            }}
            className={`py-1.5 rounded-full text-xs font-bold transition ${
              activeSubTab === 'month'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {t.byMonth}
          </button>
        </div>

        {/* Notice Banner */}
        <div className="my-2.5 p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2 text-xs text-emerald-900">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.nutritionNotice}
          </p>
        </div>

        {/* Nausea Barrier Alert (if user reported nausea in checkin) */}
        {dailyCheckin?.feeling === 'nausea' && (
          <div className="mb-2.5 p-2.5 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 flex items-center justify-between">
            <span>🍋 {isHindi ? "जी मिचलाने के लिए हल्का सूखा भोजन चुनें" : "Nausea alert: Mild & dry foods recommended"}</span>
            <button
              onClick={() => setCurrentScreen(11)}
              className="text-[#157F66] font-bold underline ml-2 shrink-0"
            >
              {isHindi ? "विकल्प" : "Swap"}
            </button>
          </div>
        )}

        {/* Meal Cards List (Matching Mockup 10) */}
        <div className="space-y-2.5 mt-2">
          {/* 1. Breakfast */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl shrink-0">
              {plan.breakfast.img}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                {t.breakfast}
              </span>
              <h4 className="font-bold text-xs text-slate-800 truncate">
                {isHindi ? plan.breakfast.titleHi : plan.breakfast.title}
              </h4>
              <p className="text-[11px] text-emerald-600 font-medium">
                ({isHindi ? plan.breakfast.benefitHi : plan.breakfast.benefit})
              </p>
            </div>
          </div>

          {/* 2. Lunch */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl shrink-0">
              {plan.lunch.img}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                {t.lunch}
              </span>
              <h4 className="font-bold text-xs text-slate-800 truncate">
                {isHindi ? plan.lunch.titleHi : plan.lunch.title}
              </h4>
              <p className="text-[11px] text-emerald-600 font-medium">
                ({isHindi ? plan.lunch.benefitHi : plan.lunch.benefit})
              </p>
            </div>
          </div>

          {/* 3. Evening Snack */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-2xl shrink-0">
              {plan.eveningSnack.img}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                {t.eveningSnack}
              </span>
              <h4 className="font-bold text-xs text-slate-800 truncate">
                {isHindi ? plan.eveningSnack.titleHi : plan.eveningSnack.title}
              </h4>
              <p className="text-[11px] text-emerald-600 font-medium">
                ({isHindi ? plan.eveningSnack.benefitHi : plan.eveningSnack.benefit})
              </p>
            </div>
          </div>

          {/* 4. Dinner */}
          <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl shrink-0">
              {plan.dinner.img}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">
                {t.dinner}
              </span>
              <h4 className="font-bold text-xs text-slate-800 truncate">
                {isHindi ? plan.dinner.titleHi : plan.dinner.title}
              </h4>
              <p className="text-[11px] text-emerald-600 font-medium">
                ({isHindi ? plan.dinner.benefitHi : plan.dinner.benefit})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions: "I have this at home" & "Find Alternatives" (Matching Mockup 10) */}
      <div className="pt-3 flex gap-2">
        <button
          onClick={handleSaveHome}
          className="flex-1 py-3 px-2 bg-[#157F66] hover:bg-[#0e5947] text-white text-xs font-bold rounded-2xl shadow-md shadow-teal-700/20 transition active:scale-98 flex items-center justify-center gap-1.5"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{savedSuccess ? (isHindi ? "सत्यापित!" : "Confirmed!") : t.haveAtHome}</span>
        </button>

        <button
          onClick={() => setCurrentScreen(11)} // Screen 11: Budget & Food Availability
          className="flex-1 py-3 px-2 bg-white border border-[#157F66] text-[#157F66] hover:bg-teal-50 text-xs font-bold rounded-2xl transition active:scale-98 flex items-center justify-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{t.findAlternatives}</span>
        </button>
      </div>
    </div>
  );
}
