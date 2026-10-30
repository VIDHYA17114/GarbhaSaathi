import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  X, 
  ShieldCheck, 
  Sparkles,
  Heart
} from 'lucide-react';

export default function TrimesterCareCard({ setActivePage }) {
  const { language, pregnancyProgress } = useApp();
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const preg = pregnancyProgress;
  const hasDateData = preg?.week != null;
  const currentTrimester = (hasDateData && preg.trimester) ? preg.trimester : 1;

  const trimesterCareData = {
    1: {
      title: tr('प्रथम त्रैमास देखभाल', 'पहिले त्रैमासिक काळजी', 'First Trimester Care'),
      shortPreview: tr('फोलिक एसिड, जलयोजन व NT स्कैन', 'फॉलिक ॲसिड, पाणी व NT स्कॅन', 'Folic acid, hydration & NT scan'),
      points: [
        tr('फोलिक एसिड व आयरन का नियमित सेवन', 'फॉलिक ॲसिड आणि लोह पूरक गोळ्या नियमित घ्या', 'Take Folic Acid & Iron supplements regularly'),
        tr('पर्याप्त जल स्तर बनाए रखें (8-10 ग्लास)', 'दिवसभरात पुरेसे पाणी व द्रवपदार्थ घ्या', 'Stay well hydrated throughout the day'),
        tr('सप्ताह 11-13 के बीच NT Scan कराएं', 'आठवडे 11-13 दरम्यान NT स्कॅन सोनोग्राफी करा', 'Schedule NT Ultrasound scan at 11-13 weeks'),
        tr('हल्का व सुपाच्य भोजन लें, उल्टी से बचें', 'हलका व पचायला सोपा आहार घ्या', 'Eat small frequent easily digestible meals')
      ],
      badge: tr('सप्ताह 1 - 13', 'आठवडे 1 - 13', 'Weeks 1 - 13')
    },
    2: {
      title: tr('द्वितीय त्रैमास देखभाल', 'दुसरे त्रैमासिक काळजी', 'Second Trimester Care'),
      shortPreview: tr('आयरन-कैल्शियम व अनोमली स्कैन', 'लोह-कॅल्शियम व एनोमली स्कॅन', 'Iron-calcium & anomaly scan'),
      points: [
        tr('आयरन युक्त भोजन और कैल्शियम लें', 'लोहयुक्त आहार आणि कॅल्शियमचे नियमित सेवन करा', 'Eat iron-rich foods and calcium sources'),
        tr('अनोमली अल्ट्रासाउंड स्कैन करवाएं (W18-22)', 'एनोमली सोनोग्राफी स्कॅन (आठवडे 18-22) करून घ्या', 'Attend anomaly ultrasound scan (week 18-22)'),
        tr('हल्का व्यायाम और पैदल चलना जारी रखें', 'हलका व्यायाम आणि रोज चालण्याचा सराव ठेवा', 'Continue gentle exercise and walking'),
        tr('बाईं करवट सोने की आदत डालें', 'डाव्या कुशीवर झोपण्याची सवय ठेवा', 'Sleep primarily on your left side')
      ],
      badge: tr('सप्ताह 14 - 27', 'आठवडे 14 - 27', 'Weeks 14 - 27')
    },
    3: {
      title: tr('तृतीय त्रैमास देखभाल', 'तिसरे त्रैमासिक काळजी', 'Third Trimester Care'),
      shortPreview: tr('शिशु हलचल व प्रसव थैली तैयारी', 'बाळाची हालचाल व हॉस्पिटल बॅग', 'Fetal movement & hospital bag'),
      points: [
        tr('शिशु की दैनिक हलचल पर ध्यान दें', 'बाळाच्या हालचालींवर दररोज लक्ष ठेवा', 'Monitor baby movements daily'),
        tr('अस्पताल जाने की थैली तैयार करें', 'प्रसूतीसाठी आवश्यक हॉस्पिटल बॅग तयार ठेवा', 'Prepare hospital bag for delivery'),
        tr('नियमित चिकित्सक जांच कराएं', 'डॉक्टरांकडे नियमित तपासणीसाठी वेळेवर जा', 'Attend regular antenatal check-ups'),
        tr('प्रसव के लक्षणों को समझें व सतर्क रहें', 'प्रसूतीची लक्षणे समजून घ्या', 'Watch for true labor signs & keep contacts ready')
      ],
      badge: tr('सप्ताह 28 - 40', 'आठवडे 28 - 40', 'Weeks 28 - 40')
    }
  };

  const currentCare = trimesterCareData[currentTrimester] || trimesterCareData[1];

  const handleOpenDetails = (e) => {
    e?.stopPropagation();
    setShowDetailsModal(true);
  };

  return (
    <>
      {/* ── Compact Square-Like Card (Grid Item) ── */}
      <div
        onClick={handleOpenDetails}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleOpenDetails(); } }}
        className="w-full bg-white dark:bg-slate-800/90 rounded-3xl border border-indigo-200/70 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group text-left relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top: Illustration + Trimester Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-100 to-teal-50 dark:from-indigo-950/70 dark:to-teal-950/40 border border-indigo-200/80 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 transition-transform shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          
          <span className="text-[10px] font-bold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/80 dark:border-indigo-900/60">
            {currentCare.badge}
          </span>
        </div>

        {/* Middle: Title & Care Preview */}
        <div className="space-y-1 mb-3">
          <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
            {currentCare.title}
          </h4>

          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-300">
            {currentCare.shortPreview}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {currentCare.points[0]}
          </p>
        </div>

        {/* Bottom: View Details Action Link */}
        <div className="pt-2 border-t border-indigo-100/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-400 group-hover:text-indigo-800 transition">
          <span>{tr('मार्गदर्शन देखें', 'मार्गदर्शन पहा', 'View Care Guide')}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* ── Trimester Care Details Modal ── */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-indigo-200 dark:border-slate-700 relative text-left space-y-4 max-h-[85vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-750 rounded-full transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  {currentCare.badge}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                  {currentCare.title}
                </h3>
              </div>
            </div>

            {/* Essential Care Checklist Points */}
            <div className="space-y-2 pt-1">
              <h5 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                {tr('प्रमुख देखभाल बिंदु', 'महत्त्वाचे काळजी मुद्दे', 'Key Clinical Highlights')}:
              </h5>
              <div className="space-y-2">
                {currentCare.points.map((pt, idx) => (
                  <div 
                    key={idx}
                    className="p-3 bg-slate-50 dark:bg-slate-750/70 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#157F66] dark:text-teal-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowDetailsModal(false);
                  if (setActivePage) setActivePage('tasks');
                }}
                className="text-xs font-bold text-[#157F66] dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>{tr('दैनिक कार्य सूची देखें', 'दैनंदिन कार्ये पहा', 'Open Daily Tasks')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                {tr('बंद करें', 'बंद करा', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

