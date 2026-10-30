import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Droplets, Plus, CheckCircle2, Sparkles } from 'lucide-react';

export default function WaterTrackerModal() {
  const { activeModal, setActiveModal, dailyCheckin, addWaterGlass, language } = useApp();

  if (activeModal !== 'waterTracker') return null;

  const glasses = dailyCheckin.waterGlasses || 0;
  const target = 8;
  const progressPercent = Math.min(Math.round((glasses / target) * 100), 100);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-blue-100 dark:border-slate-800 flex flex-col items-center transition-colors">
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-500 dark:text-blue-400">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
              {isHindi ? "जल संजीवन (Hydration)" : (isMarathi ? "पाणी पिण्याची नोंद" : "Water & Hydration")}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isHindi ? "लक्ष्य: 8-10 गिलास प्रतिदिन" : (isMarathi ? "ध्येय: दररोज 8-10 ग्लास" : "Target: 8-10 glasses / day")}
            </p>
          </div>
        </div>

        {/* Big Water Animation Glass */}
        <div className="w-32 h-44 border-4 border-blue-300 dark:border-blue-700 rounded-b-3xl rounded-t-lg relative overflow-hidden bg-blue-50/50 dark:bg-blue-950/20 shadow-inner my-2 flex flex-col justify-end">
          <div
            className="w-full bg-linear-to-t from-blue-500 to-cyan-400 transition-all duration-500 rounded-b-2xl relative flex items-center justify-center text-white font-bold text-lg"
            style={{ height: `${progressPercent}%` }}
          >
            {progressPercent > 20 && (
              <span className="drop-shadow-sm">{progressPercent}%</span>
            )}
          </div>
        </div>

        {/* Status Text */}
        <div className="my-2 text-center">
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{glasses}</span>
          <span className="text-slate-400 dark:text-slate-500 text-lg"> / {target} </span>
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {isHindi ? "गिलास पूर्ण" : (isMarathi ? "ग्लास पूर्ण" : "glasses")}
          </span>
        </div>

        {/* Quick Add Button */}
        <button
          onClick={addWaterGlass}
          className="w-full mt-2 py-3.5 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none transition transform active:scale-98"
        >
          <Plus className="w-5 h-5" />
          <span>{isHindi ? "+1 गिलास पानी पिया" : (isMarathi ? "+1 ग्लास पाणी प्यायले" : "+1 Glass of Water")}</span>
        </button>

        {/* Tip Box */}
        <div className="w-full bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-100 dark:border-cyan-900/50 rounded-2xl p-3 text-xs text-cyan-900 dark:text-cyan-200 mt-4 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <p>
            {tr(
              "पर्याप्त पानी पीने से एमनियोटिक द्रव (Amniotic fluid) संतुलित रहता है और पैरों में ऐंठन व मूत्र संक्रमण (UTI) से बचाव होता है।",
              "पुरेसे पाणी प्यायल्याने अ‍ॅम्निओटिक फ्लुइड (Amniotic fluid) संतुलित राहते आणि पायांची पेटके व मूत्रमार्गाच्या संसर्गापासून (UTI) बचाव होतो.",
              "Drinking sufficient water maintains amniotic fluid levels and prevents painful leg cramps and urinary tract infections."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
