import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { monthlyBabyGrowthData, getMonthFromWeek } from '../../data/monthlyBabyGrowthData';
import { nutritionDatabase } from '../../data/nutritionDatabase';
import BabyGrowth3DViewer from './BabyGrowth3DViewer';
import { 
  Sparkles, 
  Sprout, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Heart, 
  ArrowLeft,
  ArrowRight,
  Info,
  Activity,
  Layers,
  Utensils,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Month-specific colour palette (matches BabyGrowth3DViewer MONTH_SCENES)
const MONTH_COLORS = {
  1: { from: '#0f2027', to: '#2c5364', glow: '#34d399', trim: 1 },
  2: { from: '#1a0533', to: '#6d28d9', glow: '#f43f5e',  trim: 1 },
  3: { from: '#042f2e', to: '#0d9488', glow: '#2dd4bf',  trim: 1 },
  4: { from: '#1c0a00', to: '#ea580c', glow: '#fb923c',  trim: 2 },
  5: { from: '#0c1a4b', to: '#3b82f6', glow: '#60a5fa',  trim: 2 },
  6: { from: '#1a0e00', to: '#ca8a04', glow: '#fbbf24',  trim: 2 },
  7: { from: '#0a0a2e', to: '#7c3aed', glow: '#a78bfa',  trim: 3 },
  8: { from: '#0f0f1e', to: '#0ea5e9', glow: '#38bdf8',  trim: 3 },
  9: { from: '#1a0a00', to: '#d97706', glow: '#f59e0b',  trim: 3 },
};

export default function WebJourneyPage() {
  const { language, t, pregnancyProgress, isDarkMode } = useApp();

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  // Calculate user's actual estimated current month from gestational age
  const userCurrentMonth = getMonthFromWeek(pregnancyProgress?.week);

  // Default selected month to the user's actual current month
  const [selectedMonth, setSelectedMonth] = useState(() => userCurrentMonth);

  // Sync if pregnancyProgress changes
  useEffect(() => {
    if (userCurrentMonth) {
      setSelectedMonth(userCurrentMonth);
    }
  }, [userCurrentMonth]);

  // Find the selected month's verified educational data
  const currentData = monthlyBabyGrowthData.find(m => m.monthNumber === selectedMonth) || monthlyBabyGrowthData[2];

  const isViewingCurrentMonth = selectedMonth === userCurrentMonth;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-7 animate-in fade-in duration-300 text-left">
      
      {/* ── Top Page Header ── */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full uppercase tracking-wider border border-teal-100 dark:border-teal-900/40">
              {tr("माह-वार 3D भ्रूण विकास यात्रा", "महिनानिहाय 3D गर्भ विकास प्रवास", "Monthly 3D Fetal Growth Journey")}
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {tr("40 सप्ताह • 9 माह", "40 आठवडे • 9 महिने", "40 Weeks • 9 Months")}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            {t.pregnancyJourney}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            {tr(
              "गर्भधारण से लेकर प्रसव तक प्रत्येक माह शिशु के 3D शारीरिक विकास, नन्हीं धड़कन, आकार, आवश्यक पोषण और चिकित्सकीय जांचों का संपूर्ण अवलोकन।",
              "गर्भधारणेपासून ते प्रसूतीपर्यंत प्रत्येक महिन्यात बाळाच्या 3D शारीरिक विकास, हृदयाचे ठोके, आकार, आवश्यक पोषण आणि वैद्यकीय तपासण्यांचे सविस्तर अवलोकन.",
              "Track your baby's interactive 3D physical development, heart rate, approximate size, essential nutrition, and clinical milestones month by month."
            )}
          </p>
        </div>

        {/* User's Actual Current Stage Badge */}
        <div className="p-4 bg-gradient-to-tr from-rose-50 via-[#FAF9F5] to-orange-50 dark:from-rose-950/30 dark:via-slate-800/80 dark:to-orange-950/30 border border-rose-200 dark:border-rose-900/60 rounded-3xl flex items-center gap-4 shrink-0 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-rose-100 dark:border-rose-900/50 flex items-center justify-center text-3xl shadow-xs shrink-0">
            {currentData.sizeIcon || "👶"}
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold block uppercase tracking-wider">
              {tr("आपकी वर्तमान स्थिति", "आपली सध्याची स्थिती", "Your Current Stage")}
            </span>
            <span className="text-base font-extrabold text-[#157F66] dark:text-teal-400 block">
              {pregnancyProgress?.formattedText || (isMarathi ? "13 आठवडे 1 दिवस" : (isHindi ? "13 सप्ताह 1 दिन" : "13 Weeks 1 Day"))}
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">
              {isMarathi 
                ? `महिना ${userCurrentMonth} • ${pregnancyProgress?.trimesterLabels?.mr || pregnancyProgress?.trimesterLabels?.hi || 'त्रैमासिक'}`
                : (isHindi 
                    ? `माह ${userCurrentMonth} • ${pregnancyProgress?.trimesterLabels?.hi || 'त्रैमास'}`
                    : `Month ${userCurrentMonth} • ${pregnancyProgress?.trimesterLabels?.en || 'Trimester'}`)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Return to Current Month Pill (if exploring another month) ── */}
      {!isViewingCurrentMonth && (
        <div className="p-3.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl flex items-center justify-between flex-wrap gap-2 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs text-amber-950 dark:text-amber-200 font-medium">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              {tr(
                `आप माह ${selectedMonth} का विवरण देख रही हैं। आपकी गर्भावस्था का वर्तमान चरण माह ${userCurrentMonth} (${pregnancyProgress?.formattedText || ''}) है।`,
                `तुम्ही महिना ${selectedMonth} ची माहिती पाहत आहात. आपल्या गर्भधारणेचा सध्याचा टप्पा महिना ${userCurrentMonth} (${pregnancyProgress?.formattedText || ''}) आहे.`,
                `You are exploring Month ${selectedMonth}. Your estimated pregnancy stage is Month ${userCurrentMonth} (${pregnancyProgress?.formattedText || ''}).`
              )}
            </span>
          </div>

          <button
            onClick={() => setSelectedMonth(userCurrentMonth)}
            className="px-4 py-1.5 bg-[#157F66] hover:bg-[#0e5947] text-white text-xs font-extrabold rounded-xl shadow-xs transition"
          >
            {tr(`मेरे वर्तमान माह ${userCurrentMonth} पर जाएं`, `माझ्या सध्याच्या महिन्यावर (${userCurrentMonth}) जा`, `Jump to My Month ${userCurrentMonth}`)}
          </button>
        </div>
      )}

      {/* ── Month Selector Bar (Months 1 to 9) — colour-coded visual cards ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {tr('माह चुनें', 'महिना निवडा', 'Select Month')}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-medium mr-1">
              {isMarathi 
                ? `महिना ${selectedMonth}/9 — ${currentData.weekRange}` 
                : (isHindi ? `${selectedMonth}/9 माह — ${currentData.weekRange}` : `Month ${selectedMonth}/9 — ${currentData.weekRange}`)}
            </span>
            <button
              onClick={() => setSelectedMonth(m => Math.max(1, m - 1))}
              disabled={selectedMonth === 1}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-35 transition"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            </button>
            <button
              onClick={() => setSelectedMonth(m => Math.min(9, m + 1))}
              disabled={selectedMonth === 9}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-35 transition"
              aria-label="Next month"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            </button>
          </div>
        </div>

        <div className="flex items-stretch gap-2 overflow-x-auto no-scrollbar pb-1">
          {monthlyBabyGrowthData.map((m) => {
            const isSelected = selectedMonth === m.monthNumber;
            const isUserActualMonth = userCurrentMonth === m.monthNumber;
            const mc = MONTH_COLORS[m.monthNumber] || MONTH_COLORS[3];

            return (
              <button
                key={m.monthNumber}
                onClick={() => setSelectedMonth(m.monthNumber)}
                className="relative flex-shrink-0 w-[96px] sm:w-[108px] rounded-2xl flex flex-col items-center justify-center gap-0.5 py-3 px-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-slate-50 dark:bg-slate-800/80"
                style={{
                  background: isSelected
                    ? `linear-gradient(155deg, ${mc.from}, ${mc.to})`
                    : undefined,
                  border: isSelected
                    ? `2px solid ${mc.glow}88`
                    : (isDarkMode ? '2px solid #334155' : '2px solid #e2e8f0'),
                  boxShadow: isSelected ? `0 0 18px 0 ${mc.glow}44` : undefined,
                  transform: isSelected ? 'translateY(-3px) scale(1.04)' : undefined,
                }}
                aria-pressed={isSelected}
                aria-label={`Select Month ${m.monthNumber}: ${m.weekRange}`}
              >
                {/* Current user stage badge */}
                {isUserActualMonth && (
                  <span
                    className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-px rounded-full text-[9px] font-black whitespace-nowrap border"
                    style={
                      isSelected
                        ? { background: '#f43f5e', color: '#fff', borderColor: '#fff' }
                        : { background: isDarkMode ? '#881337' : '#fee2e2', color: isDarkMode ? '#fecdd3' : '#b91c1c', borderColor: isDarkMode ? '#be123c' : '#fca5a5' }
                    }
                  >
                    {tr('वर्तमान', 'सध्याचा', 'Current')}
                  </span>
                )}

                {/* Mini colour dot */}
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-base shadow-sm mb-0.5"
                  style={{
                    background: isSelected ? `${mc.glow}30` : (isDarkMode ? '#1e293b' : '#f1f5f9'),
                    border: `1.5px solid ${isSelected ? mc.glow + '88' : (isDarkMode ? '#334155' : '#e2e8f0')}`,
                  }}
                >
                  {m.sizeIcon}
                </span>

                <span
                  className="text-[11px] font-extrabold"
                  style={{ color: isSelected ? '#ffffff' : (isDarkMode ? '#e2e8f0' : '#334155') }}
                >
                  {isMarathi ? `महिना ${m.monthNumber}` : (isHindi ? `माह ${m.monthNumber}` : `Mo. ${m.monthNumber}`)}
                </span>
                <span
                  className="text-[9px] font-semibold"
                  style={{ color: isSelected ? 'rgba(255,255,255,0.65)' : (isDarkMode ? '#94a3b8' : '#94a3b8') }}
                >
                  {m.weekRange}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Month Details Grid (7 cols + 5 cols) ── */}
      <div
        key={selectedMonth}
        className="grid grid-cols-1 lg:grid-cols-12 gap-7 animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        
        {/* Left Column (7 cols): 3D Visual Viewer & Anatomical Development Card */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. 3D Interactive Fetal Growth Viewer */}
          <BabyGrowth3DViewer 
            monthData={currentData} 
            language={language} 
          />

          {/* 2. Detailed Development Overview Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5 transition-colors">
            
            {/* Header with Weeks & Trimester */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800 flex-wrap gap-3">
              <div>
                <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                  {currentData.weekRange} • {tr(currentData.trimesterNameHi, currentData.trimesterNameMr || currentData.trimesterNameHi, currentData.trimesterName)}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                  {tr(currentData.titleHi, currentData.titleMr || currentData.titleHi, currentData.title)}
                </h3>
                <span className="text-xs sm:text-sm font-bold text-[#157F66] dark:text-teal-400 block mt-0.5">
                  {tr(currentData.stageNameHi, currentData.stageNameMr || currentData.stageNameHi, currentData.stageName)}
                </span>
              </div>

              <div className="text-right bg-slate-50 dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 dark:text-slate-400 block uppercase font-bold tracking-wider">
                  {tr("अनुमानित आकार व वजन", "अंदाजे आकार व वजन", "Approx Size & Weight")}
                </span>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100 block">
                  {tr(currentData.sizeComparisonHi, currentData.sizeComparisonMr || currentData.sizeComparisonHi, currentData.approximateSize)}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">
                  {currentData.lengthCm} cm • ~{currentData.weightGrams} g
                </span>
              </div>
            </div>

            {/* Fetal Description */}
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/80 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              {tr(currentData.developmentDescriptionHi, currentData.developmentDescriptionMr || currentData.developmentDescriptionHi, currentData.developmentDescription)}
            </p>

            {/* Anatomical Highlights */}
            <div>
              <h4 className="font-extrabold text-xs text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#157F66] dark:text-teal-400" />
                <span>{tr("इस माह के प्रमुख शारीरिक विकास (Anatomical Milestones):", "या महिन्यातील महत्त्वाचे शारीरिक विकास (Anatomical Milestones):", "Key Anatomical Milestones:")}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentData.anatomicalHighlights?.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-teal-50/40 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/40 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#157F66] dark:text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-teal-950 dark:text-teal-200">
                      {tr(item.hi, item.mr || item.hi, item.en)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Maternal Focus Checklist */}
            <div className="pt-2">
              <h4 className="font-extrabold text-xs text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#157F66] dark:text-teal-400" />
                <span>{tr("मां के लिए आवश्यक दैनिक स्व-देखभाल (Self-Care Focus):", "मातेसाठी आवश्यक दैनंदिन स्वतःची काळजी (Self-Care Focus):", "Maternal Care Focus Points:")}</span>
              </h4>

              <div className="space-y-2">
                {currentData.focusPoints?.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 flex items-center justify-center text-xs font-black shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                      {tr(item.textHi, item.textMr || item.textHi, item.text)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Clinical Antenatal Care (ANC) Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-start gap-4 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-900/50">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                {tr("चिकित्सीय परीक्षण व सोनोग्राफी (ANC Checkup)", "वैद्यकीय तपासणी व सोनोग्राफी (ANC Checkup)", "Recommended Clinical Checkup")}
              </span>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-0.5">
                {tr(`माह ${selectedMonth} के आवश्यक चिकित्सीय परीक्षण:`, `महिना ${selectedMonth} मधील आवश्यक वैद्यकीय तपासण्या:`, `Essential Tests for Month ${selectedMonth}:`)}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed bg-amber-50/50 dark:bg-amber-950/20 p-3 rounded-xl border border-amber-100 dark:border-amber-900/40">
                {tr(currentData.clinicalTestsHi, currentData.clinicalTestsMr || currentData.clinicalTestsHi, currentData.clinicalTests)}
              </p>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): Month-Specific Recommended Foods & Guidance */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. Stage-Specific Recommended Foods for This Month */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-[#157F66] dark:text-teal-400 border border-teal-100 dark:border-teal-900/40">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                    {tr(`माह ${selectedMonth} के लिए अनुशंसित आहार`, `महिना ${selectedMonth} साठी शिफारस केलेला आहार`, `Recommended Foods for Month ${selectedMonth}`)}
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {tr("शिशु के इस चरण के लिए विशेष पोषक तत्व", "बाळाच्या या टप्प्यासाठी विशेष पोषक घटक", "Stage-specific essential nutrients")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {currentData.recommendedFoods?.map((food, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-100/90 dark:border-teal-900/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🥗</span>
                    <div>
                      <h5 className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
                        {tr(food.nameHi, food.nameMr || food.nameHi, food.name)}
                      </h5>
                      <span className="text-[11px] text-[#157F66] dark:text-teal-400 font-semibold block mt-0.5">
                        {tr(food.reasonHi, food.reasonMr || food.reasonHi, food.reasonHi)}
                      </span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#157F66] dark:text-teal-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* 2. 6 Core Maternal Food Groups */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
            <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Sprout className="w-4 h-4 text-[#157F66] dark:text-teal-400" />
              <span>{tr("गर्भावस्था के 6 अनिवार्य पोषण समूह", "गर्भधारणेचे 6 आवश्यक पोषण गट", "Essential Pregnancy Food Groups")}</span>
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              {nutritionDatabase.categories.map((cat) => (
                <div key={cat.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                  <span className="text-2xl mb-1">{cat.icon}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    {tr(cat.nameHi, cat.nameMr || cat.nameHi, cat.name)}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">
                    {tr(cat.benefitHi || cat.benefit, cat.benefitMr || cat.benefitHi || cat.benefit, cat.benefit)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Safety Guidance Disclaimer */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-3xl p-5 text-emerald-950 dark:text-emerald-200 text-xs leading-relaxed flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold block mb-1">
                {tr("चिकित्सीय समीक्षा एवं सुरक्षा सूचना:", "वैद्यकीय पुनरावलोकन व सुरक्षा सूचना:", "Medical Review & Safety Guidance:")}
              </span>
              <p>
                {tr(
                  "यह माह-वार मार्गदर्शिका सामान्य शैक्षिक स्व-देखभाल के लिए है। आपकी विशिष्ट सोनोग्राफी व रक्त रिपोर्ट के आधार पर आपके प्रसूति विशेषज्ञ (Obstetrician) की सलाह सर्वोपरि है।",
                  "हे महिनानिहाय मार्गदर्शन सामान्य शैक्षणिक स्वयं-काळजीसाठी आहे. आपल्या विशिष्ट सोनोग्राफी व रक्त अहवालानुसार आपल्या प्रसूती तज्ज्ञांचा (Obstetrician) सल्ला सर्वोपरि आहे.",
                  "This milestone roadmap is for educational self-care and fetal development awareness. Always consult your certified obstetrician for individualized medical advice."
                )}
              </p>
              <div className="mt-2 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
                Source: {currentData.source} • Reviewed: {currentData.lastReviewedDate}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
