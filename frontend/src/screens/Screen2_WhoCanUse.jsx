import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function Screen2_WhoCanUse() {
  const { setCurrentScreen, language, t } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#FAF9F5] text-left select-none">
      {/* Top Bar with Back Arrow */}
      <div>
        <button
          onClick={() => setCurrentScreen(1)}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition inline-flex items-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="mt-4 text-center">
          <h2 className="text-xl font-extrabold text-slate-800">
            {t.whoCanUseTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t.whoCanUseSub}
          </p>
        </div>

        {/* Pregnant Woman Role Card (Matching mockup 2) */}
        <div
          onClick={() => setCurrentScreen(3)}
          className="mt-8 p-5 bg-white rounded-3xl border-2 border-[#157F66]/30 shadow-lg shadow-teal-500/5 hover:border-[#157F66] transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-3xl shadow-xs">
                🤰
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {t.pregnantWomanRole}
                </h3>
                <span className="text-[11px] font-semibold text-[#157F66] bg-teal-50 px-2 py-0.5 rounded-full inline-block mt-0.5">
                  Primary Role
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-[#157F66] group-hover:text-white flex items-center justify-center text-slate-400 transition">
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#157F66] shrink-0" />
              <span>{language === 'hi' ? "व्यक्तिगत स्वास्थ्य व पोषण सलाह" : "Personalised guidance"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#157F66] shrink-0" />
              <span>{language === 'hi' ? "आहार और भावनात्मक सहयोग" : "Nutrition & wellness support"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#157F66] shrink-0" />
              <span>{language === 'hi' ? "माह-वार शिशु विकास ट्रैकिंग" : "Track your pregnancy journey"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note (Matching mockup 2) */}
      <div className="p-4 bg-rose-50/70 border border-rose-100 rounded-2xl text-[11px] text-rose-800 leading-relaxed">
        <p className="font-medium">
          {t.whoCanUseNote}
        </p>
      </div>
    </div>
  );
}
