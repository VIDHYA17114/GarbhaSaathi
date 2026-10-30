import React from 'react';
import { useApp } from '../../context/AppContext';
import { safetyGuidelines } from '../../data/safetyGuidelines';
import { X, AlertTriangle, PhoneCall, ShieldAlert, HeartPulse } from 'lucide-react';

export default function EmergencySosModal() {
  const { activeModal, setActiveModal, language } = useApp();

  if (activeModal !== 'emergencySos') return null;

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border-2 border-red-200 dark:border-red-900/60 max-h-[90vh] overflow-y-auto no-scrollbar transition-colors">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-extrabold text-red-600 dark:text-red-400 text-lg leading-snug">
              {isHindi ? "आपातकालीन खतरे के लक्षण" : (isMarathi ? "धोक्याची लक्षणे व तातडीची मदत" : "Maternal Emergency Warning Signs")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {tr("तत्काल चिकित्सकीय सहायता हेतु दिशानिर्देश", "तातडीच्या वैद्यकीय मदतीसाठी मार्गदर्शक सूचना", "Seek immediate emergency hospital care")}
            </p>
          </div>
        </div>

        {/* Urgent Non-Diagnostic Disclaimer */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-2xl p-3 text-xs text-red-900 dark:text-red-200 font-medium mb-4 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          <p>
            {tr(
              "गर्भसाथी एक स्व-देखभाल मार्गदर्शिका है, डॉक्टर नहीं। यदि नीचे दिए गए किसी भी खतरे के लक्षण दिखाई दें, तो बिना किसी देरी के निकटतम अस्पताल जाएं।",
              "गर्भसाथी ही एक स्व-काळजी मार्गदर्शिका आहे, डॉक्टर नाही. खालीलपैकी कोणतेही धोक्याचे लक्षण आढळल्यास त्वरित जवळच्या रुग्णालयात जा.",
              "GarbhaSaathi is a self-care app, not a clinical doctor. If you experience any red-flag signs below, reach your nearest maternity hospital immediately."
            )}
          </p>
        </div>

        {/* Quick Helpline Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <a
            href="tel:108"
            className="flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-red-200 dark:shadow-none transition transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>{tr("108 एम्बुलेंस", "१०८ रुग्णवाहिका", "108 Ambulance")}</span>
          </a>
          <a
            href="tel:102"
            className="flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-200 dark:shadow-none transition transform active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{tr("102 जननी सेवा", "१०२ जननी सेवा", "102 Maternal")}</span>
          </a>
        </div>

        {/* Danger Signs List */}
        <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm mb-2.5 flex items-center gap-1.5">
          <HeartPulse className="w-4 h-4 text-red-500" />
          <span>{tr("तुरंत अस्पताल जाने योग्य लक्षण:", "तातडीने रुग्णालयात जाण्याची लक्षणे:", "Emergency Symptoms requiring urgent attention:")}</span>
        </h4>

        <div className="space-y-2.5">
          {safetyGuidelines.dangerSigns.map((sign) => (
            <div key={sign.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 text-left">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-100 text-xs">
                  {tr(sign.titleHi, sign.titleMr, sign.title)}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300">
                  {sign.severity}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                {tr(sign.actionHi, sign.actionMr, sign.action)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
