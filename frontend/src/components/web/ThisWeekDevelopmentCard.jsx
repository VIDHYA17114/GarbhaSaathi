import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Info, 
  Compass,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { getDevelopmentForWeek } from '../../data/babyDevelopmentData';

export default function ThisWeekDevelopmentCard({ setActivePage }) {
  const { language, pregnancyProgress, user } = useApp();
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const preg = pregnancyProgress;
  const hasDateData = preg?.week != null;
  const week = hasDateData ? preg.week : 12;
  const development = getDevelopmentForWeek(week, language);
  const currentMonth = Math.min(9, Math.max(1, Math.ceil(week / 4.33)));

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
        className="w-full bg-white dark:bg-slate-800/90 rounded-3xl border border-amber-200/70 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-amber-300 dark:hover:border-amber-800 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group text-left relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top: Illustration + Week Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-100 to-rose-50 dark:from-amber-950/70 dark:to-rose-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 transition-transform overflow-hidden shrink-0">
            <img 
              src={`/fetal_stages/month_${currentMonth}.png`} 
              alt="Baby development illustration" 
              onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block'; }}
              className="w-full h-full object-cover"
            />
            <span style={{ display: 'none' }}>👶</span>
          </div>
          
          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200/80 dark:border-amber-900/60 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <span>
              {hasDateData
                ? (isMarathi ? `आठवडा ${week}` : (isHindi ? `सप्ताह ${week}` : `Week ${week}`))
                : (isMarathi ? 'आठवडा १२' : (isHindi ? 'सप्ताह १२' : 'Week 12'))}
            </span>
          </span>
        </div>

        {/* Middle: Title & Short Development Preview */}
        <div className="space-y-1 mb-3">
          <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
            {tr('इस सप्ताह शिशु विकास', 'या आठवड्यातील विकास', "This Week's Baby")}
          </h4>
          
          {development?.comparison && (
            <p className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1">
              <span>{development.comparison}</span>
              {development.size && (
                <span className="text-[10px] text-slate-400 font-normal">
                  (~{development.size})
                </span>
              )}
            </p>
          )}

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
            {development?.highlight || development?.message || tr('शिशु के अंगों का निरंतर विकास हो रहा है।', 'बाळाच्या अवयवांची वाढ वेगाने होत आहे.', 'Baby is steadily developing major organ systems.')}
          </p>
        </div>

        {/* Bottom: View Details Action Link */}
        <div className="pt-2 border-t border-amber-100/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-bold text-amber-700 dark:text-amber-400 group-hover:text-amber-800 transition">
          <span>{tr('विवरण देखें', 'सविस्तर पहा', 'View Details')}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* ── Development Details Modal ── */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-200 dark:border-slate-700 relative text-left space-y-4 max-h-[85vh] overflow-y-auto"
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
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-2xl overflow-hidden shrink-0">
                <img 
                  src={`/fetal_stages/month_${currentMonth}.png`} 
                  alt="Baby illustration" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  {isMarathi ? `महिना ${currentMonth} • आठवडा ${week}` : (isHindi ? `माह ${currentMonth} • सप्ताह ${week}` : `Month ${currentMonth} • Week ${week}`)}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                  {tr('शिशु का विकास और परिवर्तन', 'बाळाची वाढ आणि बदल', "Baby's Development & Growth")}
                </h3>
              </div>
            </div>

            {/* Size & Fruit Comparison Box */}
            {development && (
              <div className="p-3.5 bg-gradient-to-r from-amber-50 to-rose-50 dark:from-slate-750 dark:to-slate-700 rounded-2xl border border-amber-200/80 dark:border-slate-600 flex items-center gap-3">
                <span className="text-3xl">{development.comparison?.split(' ')[0] || '🌱'}</span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                    {tr('अनुमानित आकार तुलना', 'अंदाजे आकार तुलना', 'Approximate Size')}
                  </span>
                  <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">
                    {development.comparison} {development.size ? `(~${development.size})` : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Main Overview Text */}
            <div className="p-4 bg-slate-50 dark:bg-slate-750/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed space-y-2">
              <p>{development?.highlight || development?.message}</p>
            </div>

            {/* Clinical Disclaimer */}
            <div className="p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p>
                {tr(
                  'ये विवरण सामान्य शैक्षणिक जानकारी के लिए हैं और वास्तविक भ्रूण आकार या स्वास्थ्य का परीक्षण नहीं करते। व्यक्तिगत मूल्यांकन हेतु अपने डॉक्टर से परामर्श करें।',
                  'ही माहिती सामान्य शैक्षणिक मार्गदर्शनासाठी आहे. अचूक वैद्यकीय तपासणीसाठी आपल्या डॉक्टरांचा सल्ला घ्या.',
                  'Descriptions are educational approximations sourced from public maternal health guidelines. Always consult your obstetrician for clinical diagnosis.'
                )}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowDetailsModal(false);
                  if (setActivePage) setActivePage('journey');
                }}
                className="text-xs font-bold text-[#157F66] dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <span>{tr('माह-वार 3D विकास देखें', 'महिनानिहाय 3D प्रवास पहा', 'View 3D Journey Guide')}</span>
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

