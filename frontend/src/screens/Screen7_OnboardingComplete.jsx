import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function Screen7_OnboardingComplete() {
  const { setCurrentScreen, t, language } = useApp();

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-linear-to-b from-[#FFF5F2] via-[#FAF9F5] to-[#EAF5F1] text-left select-none overflow-y-auto no-scrollbar">
      <div>
        {/* Title & Subtitle */}
        <div className="text-center pt-2">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            {t.allSetTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-[260px] mx-auto">
            {t.allSetSub}
          </p>
        </div>

        {/* Feature Checkmarks List (Matching Mockup 7) */}
        <div className="mt-5 space-y-2.5 bg-white/80 backdrop-blur-xs p-4 rounded-3xl border border-rose-100 shadow-xs">
          {t.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#157F66] shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Centered Illustration */}
        <div className="my-5 flex justify-center">
          <div className="w-36 h-36 rounded-full bg-linear-to-tr from-rose-100 to-teal-50 flex items-center justify-center border border-rose-200/50 shadow-inner">
            <span className="text-6xl">🤰</span>
          </div>
        </div>
      </div>

      {/* Go to Home CTA */}
      <div className="pt-2">
        <button
          onClick={() => setCurrentScreen(8)}
          className="w-full py-4 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-xl shadow-teal-700/20 transition active:scale-98 flex items-center justify-center gap-2"
        >
          <span>{t.goToHome}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
