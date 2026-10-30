import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getMonthFromWeek } from '../../data/monthlyBabyGrowthData';
import { 
  EXERCISE_CATEGORIES, 
  MONTH_EXERCISE_GUIDANCE, 
  EXERCISE_LIBRARY, 
  CLINICAL_RED_FLAGS,
  CLINICAL_REVIEW_METADATA 
} from '../../data/exerciseYogaData';
import Exercise3DVisualizer, { getExerciseRealPhoto } from './Exercise3DVisualizer';
import { 
  Activity, 
  Sparkles, 
  Calendar, 
  ShieldAlert, 
  ShieldCheck, 
  Heart, 
  Bookmark, 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown, 
  RotateCcw, 
  Plus, 
  Trash2, 
  PhoneCall, 
  Info, 
  Check, 
  Layers, 
  Wind, 
  Footprints, 
  ArrowRight,
  Filter,
  Flame,
  Award
} from 'lucide-react';

export default function WebDailyExercisePage({ setActivePage }) {
  const { 
    language, 
    user, 
    pregnancyProgress, 
    savedExercises, 
    dailyExercisePlan, 
    exerciseCompletions, 
    toggleSaveExercise, 
    isExerciseSaved, 
    addToExercisePlan, 
    removeFromExercisePlan, 
    toggleExerciseCompleted, 
    skipExerciseInPlan, 
    resetExercisePlan,
    setActiveModal 
  } = useApp();

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  // Three-language translation helper
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  // Calculate user's actual current pregnancy month dynamically from LMP / EDD
  const userCurrentMonth = getMonthFromWeek(pregnancyProgress?.week) || 3;

  // Selected month state (defaults to user's estimated current month)
  const [selectedMonth, setSelectedMonth] = useState(() => userCurrentMonth);

  // Sync if pregnancy progress recalculates
  useEffect(() => {
    if (userCurrentMonth) {
      setSelectedMonth(userCurrentMonth);
    }
  }, [userCurrentMonth]);

  // Active view tab: 'month_all' | 'my_plan' | 'saved' | 'safety'
  const [activeTab, setActiveTab] = useState('month_all');

  // Category filter for 'month_all' view: 'all' or category key
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Currently expanded exercise ID for full 3D demonstration
  const [activeExerciseId, setActiveExerciseId] = useState(() => {
    const firstEx = EXERCISE_LIBRARY.find(ex => ex.month === userCurrentMonth) || EXERCISE_LIBRARY[0];
    return firstEx?.id || 'm9_labor_malasana';
  });

  // Safety red-flags modal / banner toggle
  const [showFullSafetyModal, setShowFullSafetyModal] = useState(false);

  // Current month's verified educational guidance
  const monthGuidance = MONTH_EXERCISE_GUIDANCE[selectedMonth] || MONTH_EXERCISE_GUIDANCE[1];
  const userCurrentMonthGuidance = MONTH_EXERCISE_GUIDANCE[userCurrentMonth] || MONTH_EXERCISE_GUIDANCE[1];

  const isViewingCurrentMonth = selectedMonth === userCurrentMonth;

  // Filter exercises strictly applicable to the selected month (Month-Wise Isolation)
  const monthExercises = useMemo(() => {
    return EXERCISE_LIBRARY.filter(ex => {
      const matchesMonth = ex.month === selectedMonth;
      const matchesCategory = selectedCategory === 'all' || ex.category === selectedCategory;
      return matchesMonth && matchesCategory;
    });
  }, [selectedMonth, selectedCategory]);

  // When selected month changes, automatically switch 3D viewer to the first exercise of that month
  useEffect(() => {
    const firstExForMonth = EXERCISE_LIBRARY.find(ex => ex.month === selectedMonth);
    if (firstExForMonth) {
      setActiveExerciseId(firstExForMonth.id);
    }
  }, [selectedMonth]);

  // User's daily plan exercise objects
  const dailyPlanExercises = useMemo(() => {
    return dailyExercisePlan
      .map(id => EXERCISE_LIBRARY.find(ex => ex.id === id))
      .filter(Boolean);
  }, [dailyExercisePlan]);

  // Saved bookmark exercises
  const bookmarkedExercises = useMemo(() => {
    return savedExercises
      .map(id => EXERCISE_LIBRARY.find(ex => ex.id === id))
      .filter(Boolean);
  }, [savedExercises]);

  // Calculate completion progress for daily routine
  const totalInPlan = dailyPlanExercises.length;
  const completedInPlan = dailyPlanExercises.filter(ex => exerciseCompletions[ex.id]?.completed).length;
  const skippedInPlan = dailyPlanExercises.filter(ex => exerciseCompletions[ex.id]?.skipped).length;

  // Active exercise object currently selected for 3D visualizer
  const currentActiveExercise = useMemo(() => {
    return EXERCISE_LIBRARY.find(ex => ex.id === activeExerciseId) || monthExercises[0] || EXERCISE_LIBRARY[0];
  }, [activeExerciseId, monthExercises]);

  // Reset view to user's estimated current month
  const handleReturnToCurrentMonth = () => {
    setSelectedMonth(userCurrentMonth);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-in fade-in duration-300 text-left transition-colors">
      
      {/* ── 1. Page Header & Pregnancy Stage Summary ── */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-colors">
        
        {/* Left: Titles & Clinical Advisory */}
        <div className="space-y-2 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full uppercase tracking-wider border border-teal-100 dark:border-teal-900/40 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>{tr('दैनिक व्यायाम एवं गर्भ संस्कार योग', 'दैनंदिन व्यायाम व गर्भसंस्कार योग', 'Daily Exercise & Pregnancy Yoga')}</span>
            </span>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              {tr('चिकित्सीय समीक्षा युक्त (ACOG & FOGSI)', 'वैद्यकीय तपासणी युक्त (ACOG व FOGSI)', 'Clinically Reviewed')}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {tr('दैनिक व्यायाम एवं मातृत्व योग', 'दैनंदिन व्यायाम व मातृत्व योग', 'Daily Exercise & Pregnancy Yoga')}
          </h1>
          
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            {tr(
              'अपनी गर्भावस्था की वर्तमान स्थिति अनुसार सौम्य मातृत्व योग, 3D निर्देशित आसन, पेल्विक फ्लोर कीगेल और प्राणायाम का अभ्यास करें।',
              'आपल्या गर्भधारणेच्या सध्याच्या टप्प्यानुसार हलकी योगासने, 3D प्रात्यक्षिके, पेल्व्हिक फ्लोअर कीगेल आणि प्राणायामाचा सराव करा.',
              'Explore gentle movement and pregnancy wellness activities suited to your pregnancy stage.'
            )}
          </p>

          {/* Educational Confirmation Notice */}
          <div className="pt-1 flex items-start gap-2 text-[11px] text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200/80 dark:border-amber-900/50">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>{tr('शैक्षिक सलाह: ', 'शैक्षणिक सूचना: ', 'Educational Notice: ')}</strong>
              {tr(
                'यह सामग्री केवल शैक्षिक मार्गदर्शन हेतु है। कोई भी नया व्यायाम शुरू करने से पहले अपनी प्रसूति विशेषज्ञ (Doctor / Gynaecologist) से अवश्य पुष्टि करें।',
                'ही माहिती केवळ शैक्षणिक मार्गदर्शनासाठी आहे. कोणताही नवीन व्यायाम सुरू करण्यापूर्वी आपल्या डॉक्टरांचा किंवा स्त्रीरोगतज्ज्ञांचा सल्ला नक्की घ्या.',
                'Activities are educational. Confirm suitable exercises with your maternity care professional before starting.'
              )}
            </p>
          </div>
        </div>

        {/* Right: User's Calculated Pregnancy Stage Card */}
        <div className="w-full lg:w-auto p-4 sm:p-5 bg-gradient-to-tr from-teal-50/80 via-white to-rose-50/80 dark:from-teal-950/40 dark:via-slate-800/80 dark:to-rose-950/30 border border-teal-200/70 dark:border-teal-900/60 rounded-3xl shadow-xs flex items-center justify-between lg:justify-start gap-5 shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#157F66] to-teal-400 text-white flex items-center justify-center text-2xl shadow-md shadow-teal-700/20 shrink-0">
            🧘‍♀️
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              {tr('आपकी गर्भावस्था स्थिति', 'आपली गर्भधारणा स्थिती', 'Your Pregnancy Stage')}
            </span>
            <div className="text-base sm:text-lg font-black text-[#157F66] dark:text-teal-400 leading-tight">
              {pregnancyProgress?.formattedText || tr('सप्ताह 13, दिन 1', 'आठवडा १३, दिवस १', 'Week 13, Day 1')}
            </div>
            <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
              {tr(
                `माह ${userCurrentMonth} • ${pregnancyProgress?.trimesterLabels?.hi || 'द्वितीय त्रैमास'}`,
                `महिना ${userCurrentMonth} • ${pregnancyProgress?.trimesterLabels?.mr || pregnancyProgress?.trimesterLabels?.hi || 'दुसरे त्रैमासिक'}`,
                `Month ${userCurrentMonth} • ${pregnancyProgress?.trimesterLabels?.en || 'Second Trimester'}`
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ── 2. Month-Wise Exercise Selection Bar (Months 1–9) ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm sm:text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#157F66] dark:text-teal-400" />
              <span>{tr('माह-वार उपयुक्त व्यायाम चुनें (माह 1 से 9)', 'महिनानिहाय योग्य व्यायाम निवडा (महिना १ ते ९)', 'Month-Wise Exercise Selection (Months 1 to 9)')}</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {isViewingCurrentMonth 
                ? tr(
                    `वर्तमान में आप अपनी अनुमानित अवस्था (माह ${userCurrentMonth}) के व्यायाम देख रही हैं।`,
                    `सध्या तुम्ही तुमच्या अंदाजित टप्प्यासाठी (महिना ${userCurrentMonth}) योग्य व्यायाम पाहत आहात.`,
                    `Showing exercises suited for your current estimated stage (Month ${userCurrentMonth}).`
                  )
                : tr(
                    `आप माह ${selectedMonth} का अन्वेषण कर रही हैं (आपकी वास्तविक अवस्था: माह ${userCurrentMonth})।`,
                    `तुम्ही महिना ${selectedMonth} चे व्यायाम पाहत आहात (तुमचा प्रत्यक्ष टप्पा: महिना ${userCurrentMonth}).`,
                    `Exploring Month ${selectedMonth} (Your estimated current stage: Month ${userCurrentMonth}).`
                  )}
            </p>
          </div>

          {/* Return to My Current Month Button */}
          {!isViewingCurrentMonth && (
            <button
              onClick={handleReturnToCurrentMonth}
              className="px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/70 hover:bg-teal-100 dark:hover:bg-teal-900 text-[#157F66] dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{tr(`मेरे वर्तमान माह (${userCurrentMonth}) पर लौटें`, `माझ्या चालू महिन्यावर (${userCurrentMonth}) परत जा`, `My Current Month (${userCurrentMonth})`)}</span>
            </button>
          )}
        </div>

        {/* 9 Selectable Month Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((mNum) => {
            const mData = MONTH_EXERCISE_GUIDANCE[mNum];
            const isSelected = selectedMonth === mNum;
            const isUserCurrent = userCurrentMonth === mNum;

            return (
              <button
                key={mNum}
                onClick={() => setSelectedMonth(mNum)}
                className={`relative p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#157F66] text-white border-[#157F66] shadow-lg shadow-teal-700/25 scale-[1.03]'
                    : isUserCurrent
                      ? 'bg-teal-50/90 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800 text-slate-800 dark:text-slate-200 hover:border-teal-400'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                {/* Current Stage Badge */}
                {isUserCurrent && (
                  <span className={`absolute -top-2 right-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase tracking-tight shadow-xs ${
                    isSelected ? 'bg-amber-400 text-slate-900' : 'bg-[#157F66] text-white'
                  }`}>
                    {tr('वर्तमान', 'सध्याचा', 'Current')}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black">
                      {tr(`माह ${mNum}`, `महिना ${mNum}`, `Month ${mNum}`)}
                    </span>
                    <span className="text-base">
                      {mNum <= 3 ? '🌱' : mNum <= 6 ? '🌸' : '👶'}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold block mt-0.5 ${
                    isSelected ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {mData?.weekRange}
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-white/20 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-semibold">
                  <span className={isSelected ? 'text-teal-200' : 'text-slate-500 dark:text-slate-400'}>
                    {mData?.trimester === 1 ? tr('त्रैमास 1', 'त्रैमासिक १', 'Trim 1') : mData?.trimester === 2 ? tr('त्रैमास 2', 'त्रैमासिक २', 'Trim 2') : tr('त्रैमास 3', 'त्रैमासिक ३', 'Trim 3')}
                  </span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. Selected Month Guidance Spotlight Banner ── */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white shadow-lg shadow-teal-950/20 relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/30 text-teal-200 font-bold text-[11px] border border-teal-400/30">
                {tr(`माह ${selectedMonth} दिशानिर्देश`, `महिना ${selectedMonth} मार्गदर्शक`, `Month ${selectedMonth} Guidance`)}
              </span>
              <span className="text-xs text-teal-200 font-semibold">
                {monthGuidance.weekRange} • {tr(`त्रैमास ${monthGuidance.trimester}`, `त्रैमासिक ${monthGuidance.trimester}`, `Trimester ${monthGuidance.trimester}`)}
              </span>
              {isViewingCurrentMonth && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 font-black text-[10px]">
                  {tr('आपकी वर्तमान अवस्था', 'आपली सध्याची स्थिती', 'Your Actual Stage')}
                </span>
              )}
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-white">
              {tr(monthGuidance.themeHi, monthGuidance.themeMr || monthGuidance.themeHi, monthGuidance.theme)}
            </h3>

            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              {tr(monthGuidance.descriptionHi, monthGuidance.descriptionMr || monthGuidance.descriptionHi, monthGuidance.description)}
            </p>

            <div className="pt-2 flex items-center gap-4 flex-wrap text-xs text-teal-200">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span>{tr('अनुशंसित समय:', 'शिफारस केलेली वेळ:', 'Recommended:')} <strong>{monthGuidance.recommendedMinutesDaily}</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
                <span>{tr(monthGuidance.safetyTipHi, monthGuidance.safetyTipMr || monthGuidance.safetyTipHi, monthGuidance.safetyTip)}</span>
              </div>
            </div>
          </div>

          {/* Quick Action: Open Safety Panel */}
          <button
            onClick={() => setActiveTab('safety')}
            className="px-4 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{tr('व्यायाम रोकने के लक्षण (Red Flags)', 'व्यायाम थांबवण्याची लक्षणे (Red Flags)', 'Safety Red Flags')}</span>
          </button>
        </div>
      </div>

      {/* ── 4. Main Navigation Tabs ── */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2 flex-wrap">
        
        {/* Tab Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('month_all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'month_all'
                ? 'bg-[#157F66] text-white shadow-md shadow-teal-700/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>{tr(`केवल माह ${selectedMonth} के विशेष आसन (${monthExercises.length})`, `फक्त महिना ${selectedMonth} चे विशेष आसन (${monthExercises.length})`, `Month ${selectedMonth} Dedicated Only (${monthExercises.length})`)}</span>
          </button>

          <button
            onClick={() => setActiveTab('my_plan')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'my_plan'
                ? 'bg-[#157F66] text-white shadow-md shadow-teal-700/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{tr(`मेरी दैनिक दिनचर्या (${totalInPlan})`, `माझी दैनंदिन दिनचर्या (${totalInPlan})`, `My Daily Routine (${totalInPlan})`)}</span>
            {completedInPlan > 0 && (
              <span className="w-4 h-4 rounded-full bg-emerald-300 text-teal-950 text-[10px] font-black flex items-center justify-center">
                {completedInPlan}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-[#157F66] text-white shadow-md shadow-teal-700/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>{tr(`सहेजे गए आसन (${bookmarkedExercises.length})`, `जतन केलेली आसने (${bookmarkedExercises.length})`, `Saved List (${bookmarkedExercises.length})`)}</span>
          </button>

          <button
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'safety'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-700/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{tr('सुरक्षा व आपातकालीन लक्षण', 'सुरक्षा व धोक्याची लक्षणे', 'Safety & Red Flags')}</span>
          </button>
        </div>

        {/* Category Filters (when viewing all exercises) */}
        {activeTab === 'month_all' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tr('सभी श्रेणियां', 'सर्व प्रकार', 'All')}
            </button>
            {Object.entries(EXERCISE_CATEGORIES).map(([catKey, catInfo]) => (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition cursor-pointer truncate ${
                  selectedCategory === catKey
                    ? 'bg-[#157F66] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {isMarathi ? (catInfo.titleMr || catInfo.titleHi) : (isHindi ? catInfo.titleHi : catInfo.title)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── 5. Tab Content Rendering ── */}

      {/* TAB 1: ALL EXERCISES FOR THE SELECTED MONTH */}
      {activeTab === 'month_all' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Top: Interactive 3D Demonstration Player Spotlight */}
          <div className="lg:col-span-6 space-y-5 sticky top-20">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#157F66] dark:text-teal-400" />
                  <span>{tr('माह-वार सचित्र योगासन व चरणबद्ध मार्गदर्शिका', 'महिनानिहाय सचित्र योगासन व पायरीनुसार मार्गदर्शन', 'Prenatal Exercise Photo Guidance & Steps')}</span>
                </span>
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400">
                  {currentActiveExercise.duration}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                {isMarathi ? (currentActiveExercise.titleMr || currentActiveExercise.titleHi) : (isHindi ? currentActiveExercise.titleHi : currentActiveExercise.title)}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {isMarathi ? (currentActiveExercise.summaryMr || currentActiveExercise.summaryHi) : (isHindi ? currentActiveExercise.summaryHi : currentActiveExercise.summary)}
              </p>
            </div>

            {/* 3D Visualizer Component */}
            <Exercise3DVisualizer 
              exercise={currentActiveExercise} 
              isHindi={isHindi}
              isMarathi={isMarathi}
            />

            {/* Breathing & Posture Reminder Card */}
            <div className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-900/50 space-y-2">
              <h5 className="font-extrabold text-xs text-[#157F66] dark:text-teal-300 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{tr('श्वास व मुद्रा नियम (Breathing Cues)', 'श्वासोच्छ्वास व आसनाचे नियम', 'Breathing & Posture Reminders')}</span>
              </h5>
              <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                {((isHindi || isMarathi) ? (currentActiveExercise.breathingRemindersHi || currentActiveExercise.breathingReminders) : currentActiveExercise.breathingReminders)?.map((rem, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <span>{rem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Bar for Currently Focused Exercise */}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => {
                  if (dailyExercisePlan.includes(currentActiveExercise.id)) {
                    removeFromExercisePlan(currentActiveExercise.id);
                  } else {
                    addToExercisePlan(currentActiveExercise.id);
                  }
                }}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                  dailyExercisePlan.includes(currentActiveExercise.id)
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-[#157F66] hover:bg-teal-700 text-white shadow-md shadow-teal-700/20'
                }`}
              >
                {dailyExercisePlan.includes(currentActiveExercise.id) ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{tr('दिनचर्या में शामिल है (हटाएं)', 'दिनचर्येत समाविष्ट आहे (काढा)', 'In Daily Plan (Remove)')}</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>{tr('दैनिक दिनचर्या में जोड़ें', 'दैनंदिन दिनचर्येत जोडा', 'Add to Daily Routine')}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleSaveExercise(currentActiveExercise.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer ${
                  isExerciseSaved(currentActiveExercise.id)
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-rose-500'
                }`}
                title="Bookmark Exercise"
              >
                <Bookmark className={`w-4 h-4 ${isExerciseSaved(currentActiveExercise.id) ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => toggleExerciseCompleted(currentActiveExercise.id)}
                className={`p-3 rounded-2xl border transition cursor-pointer ${
                  exerciseCompletions[currentActiveExercise.id]?.completed
                    ? 'bg-teal-600 text-white border-teal-600'
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-teal-600'
                }`}
                title={tr('पूर्ण चिह्नित करें', 'पूर्ण झाले म्हणून नोंदवा', 'Mark Completed Today')}
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Exercise Cards List */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-[#157F66] dark:text-teal-400 uppercase tracking-wider block">
                  {tr(
                    `माह ${selectedMonth} विशेष व्यायाम व योग (${monthExercises.length} विकल्प)`,
                    `महिना ${selectedMonth} चे विशेष व्यायाम व योग (${monthExercises.length} पर्याय)`,
                    `Month ${selectedMonth} Dedicated Yoga & Exercises (${monthExercises.length} options)`
                  )}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {tr(
                    `सप्ताह ${monthGuidance.weekRange} • केवल इस माह की शारीरिक स्थिति हेतु विशेष रूप से प्रस्तुत`,
                    `आठवडा ${monthGuidance.weekRange} • केवळ या महिन्यातील शारीरिक स्थितीनुसार विशेष रचना`,
                    `${monthGuidance.weekRange} • Curated specifically for this month's physical stage`
                  )}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 shrink-0">
                {tr('मार्गदर्शन देखने हेतु क्लिक करें', 'मार्गदर्शन पाहण्यासाठी क्लिक करा', 'Click to view guidance')}
              </span>
            </div>

            {monthExercises.map((ex) => {
              const isSelected = activeExerciseId === ex.id;
              const inPlan = dailyExercisePlan.includes(ex.id);
              const isCompleted = exerciseCompletions[ex.id]?.completed;
              const isSaved = isExerciseSaved(ex.id);
              const categoryInfo = EXERCISE_CATEGORIES[ex.category];

              return (
                <div
                  key={ex.id}
                  onClick={() => setActiveExerciseId(ex.id)}
                  className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer text-left space-y-3 ${
                    isSelected
                      ? 'bg-white dark:bg-slate-900 border-[#157F66] dark:border-teal-500 shadow-lg shadow-teal-800/10 ring-2 ring-teal-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                  }`}
                >
                  {/* Card Header: Title, Category & Bookmark */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                          {tr(`माह ${ex.month} विशेष`, `महिना ${ex.month} विशेष`, `Month ${ex.month} Specific`)}
                        </span>
                        {categoryInfo && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryInfo.badgeColor}`}>
                            {isMarathi ? (categoryInfo.titleMr || categoryInfo.titleHi) : (isHindi ? categoryInfo.titleHi : categoryInfo.title)}
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ex.difficultyColor}`}>
                          {tr(ex.difficultyHi, ex.difficultyHi, ex.difficulty)}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{ex.duration}</span>
                        </span>
                      </div>

                      <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <span>{isMarathi ? (ex.titleMr || ex.titleHi) : (isHindi ? ex.titleHi : ex.title)}</span>
                        {isCompleted && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => toggleSaveExercise(ex.id)}
                        className={`p-2 rounded-xl transition ${
                          isSaved 
                            ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/60' 
                            : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        title="Bookmark"
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Summary & Primary Benefit */}
                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shrink-0 shadow-2xs">
                      <img 
                        src={getExerciseRealPhoto(ex)} 
                        alt={ex.title}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/exercise_poses/real_seated_breath.jpg';
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                      {isMarathi ? (ex.summaryMr || ex.summaryHi) : (isHindi ? ex.summaryHi : ex.summary)}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    <span className="truncate">
                      <strong>{tr('प्रमुख लाभ: ', 'मुख्य फायदा: ', 'Primary Benefit: ')}</strong>
                      {isMarathi ? (ex.primaryBenefitMr || ex.primaryBenefitHi) : (isHindi ? ex.primaryBenefitHi : ex.primaryBenefit)}
                    </span>
                  </div>

                  {/* Props Needed & Action Toggles */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs flex-wrap" onClick={e => e.stopPropagation()}>
                    <span className="text-[11px] text-slate-400">
                      {tr('सहारे:', 'साहित्य:', 'Props:')} {((isHindi || isMarathi) ? (ex.propsNeededHi || ex.propsNeeded) : ex.propsNeeded)?.join(', ')}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => inPlan ? removeFromExercisePlan(ex.id) : addToExercisePlan(ex.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          inPlan
                            ? 'bg-teal-50 dark:bg-teal-950/60 text-[#157F66] dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {inPlan ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{inPlan ? tr('दिनचर्या में है', 'दिनचर्येत समाविष्ट', 'In Routine') : tr('दिनचर्या में जोड़ें', 'दिनचर्येत जोडा', 'Add to Routine')}</span>
                      </button>

                      <button
                        onClick={() => toggleExerciseCompleted(ex.id)}
                        className={`p-2 rounded-xl transition ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500'
                        }`}
                        title={tr('पूर्ण चिह्नित करें', 'पूर्ण झाले', 'Mark Completed')}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 2: MY DAILY EXERCISE ROUTINE (EDITABLE & NEUTRAL PROGRESS) */}
      {activeTab === 'my_plan' && (
        <div className="space-y-6">
          
          {/* Neutral Progress Banner (Guilt-Free & Stage-Appropriate) */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full uppercase tracking-wider">
                {tr('दैनिक गतिशीलता सारांश', 'दैनंदिन हालचाल सारांश', 'Daily Routine Summary')}
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
                {tr(`आज की दिनचर्या: ${completedInPlan} / ${totalInPlan} पूर्ण`, `आजची दिनचर्या: ${completedInPlan} / ${totalInPlan} पूर्ण`, `Today's Plan: ${completedInPlan} of ${totalInPlan} Completed`)}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
                {tr(
                  'अपने शरीर की सुनें। यदि आज थकान महसूस हो तो बिना किसी झिझक के विश्राम करें। मातृत्व में जबरदस्ती कोई लक्ष्य नहीं होता।',
                  'आपल्या शरीराचे ऐका. आज थकवा जाणवत असल्यास कोणतीही भीती न बाळगता विश्रांती घ्या. मातृत्वामध्ये सक्तीचे कोणतेही ध्येय नसते.',
                  'Listen to your body. Rest without hesitation if fatigued. Consistency and comfort always precede targets.'
                )}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={resetExercisePlan}
                className="px-3.5 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{tr('डिफ़ॉल्ट रीसेट करें', 'मूळ स्थितीत आणा', 'Reset to Default')}</span>
              </button>
              <button
                onClick={() => setActiveTab('month_all')}
                className="px-4 py-2 rounded-2xl bg-[#157F66] hover:bg-teal-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{tr('और आसन जोड़ें', 'आणखी आसने जोडा', 'Add More Poses')}</span>
              </button>
            </div>
          </div>

          {/* Routine Exercises Checklist */}
          {dailyPlanExercises.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="text-4xl">🌸</div>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                {tr('आपकी दिनचर्या खाली है', 'आपली दिनचर्या रिकामी आहे', 'Your Daily Plan is Empty')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {tr(
                  'अपनी गर्भावस्था माह की सूची से उपयुक्त आसन जोड़ें या डिफ़ॉल्ट अनुशंसित योजना बहाल करें।',
                  'आपल्या गर्भधारणा महिन्याच्या यादीतून योग्य आसने जोडा किंवा शिफारस केलेली योजना लागू करा.',
                  'Explore exercises from your pregnancy month library and add them to your daily self-care plan.'
                )}
              </p>
              <button
                onClick={resetExercisePlan}
                className="px-4 py-2 rounded-2xl bg-[#157F66] text-white font-bold text-xs shadow-md"
              >
                {tr('अनुशंसित 4 आसन लोड करें', 'शिफारस केलेली ४ आसने जोडा', 'Load Recommended Plan')}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {dailyPlanExercises.map((ex, index) => {
                const isCompleted = exerciseCompletions[ex.id]?.completed;
                const isSkipped = exerciseCompletions[ex.id]?.skipped;

                return (
                  <div
                    key={ex.id}
                    className={`p-5 rounded-3xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isCompleted 
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60' 
                        : isSkipped 
                          ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-60' 
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    {/* Left: Checkmark & Exercise Meta */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <button
                        onClick={() => toggleExerciseCompleted(ex.id)}
                        className={`w-9 h-9 rounded-2xl flex items-center justify-center transition shrink-0 cursor-pointer ${
                          isCompleted
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500 border border-slate-200 dark:border-slate-700'
                        }`}
                        title={isCompleted ? 'Mark Pending' : 'Mark Completed'}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                      </button>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-slate-400">
                            #{index + 1}
                          </span>
                          <h4 className={`font-black text-sm text-slate-900 dark:text-slate-100 truncate ${
                            isCompleted ? 'line-through text-slate-400' : ''
                          }`}>
                            {isMarathi ? (ex.titleMr || ex.titleHi) : (isHindi ? ex.titleHi : ex.title)}
                          </h4>
                          <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full">
                            {ex.duration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {isMarathi ? (ex.primaryBenefitMr || ex.primaryBenefitHi) : (isHindi ? ex.primaryBenefitHi : ex.primaryBenefit)}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => {
                          setActiveExerciseId(ex.id);
                          setActiveTab('month_all');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>{tr('3D गाइड देखें', '3D मार्गदर्शक पहा', 'View 3D')}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {!isCompleted && !isSkipped && (
                        <button
                          onClick={() => skipExerciseInPlan(ex.id)}
                          className="px-2.5 py-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-semibold"
                          title="Skip for today"
                        >
                          {tr('आज छोड़ें', 'आज वगळा', 'Skip')}
                        </button>
                      )}

                      <button
                        onClick={() => removeFromExercisePlan(ex.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                        title="Remove from routine"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* TAB 3: BOOKMARKED / SAVED EXERCISES */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-rose-500 fill-rose-500" />
                <span>{tr('सहेजे गए आसन (मेरी पसंदीदा सूची)', 'जतन केलेली आसने (पसंतीची यादी)', 'Saved Exercises (My Favorites)')}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {tr(
                  'अपनी पसंद के आसन जिन्हें आप कभी भी त्वरित रूप से अभ्यास करना चाहती हैं।',
                  'आपल्या आवडीची आसने ज्यांचा तुम्ही कधीही त्वरित सराव करू शकता.',
                  'Quickly access poses you have bookmarked for easy reference across all trimesters.'
                )}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 font-extrabold text-xs">
              {bookmarkedExercises.length} {tr('आसन', 'आसने', 'Saved')}
            </span>
          </div>

          {bookmarkedExercises.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                {tr('कोई सहेजा गया आसन नहीं है', 'कोणतेही जतन केलेले आसन नाही', 'No Bookmarked Exercises')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {tr('व्यायाम सूची में बुकमार्क आइकन दबाकर आसनों को यहां जोड़ें।', 'व्यायाम यादीतील बुकमार्क आयकॉन दाबून आसने येथे जोडा.', 'Bookmark any exercise from the library to save it here.')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedExercises.map(ex => (
                <div 
                  key={ex.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase">
                        {ex.category} • {ex.duration}
                      </span>
                      <h4 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
                        {isMarathi ? (ex.titleMr || ex.titleHi) : (isHindi ? ex.titleHi : ex.title)}
                      </h4>
                    </div>
                    <button
                      onClick={() => toggleSaveExercise(ex.id)}
                      className="text-rose-500 p-1.5 hover:bg-rose-50 rounded-xl"
                      title="Remove Bookmark"
                    >
                      <Bookmark className="w-4 h-4 fill-rose-500" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {isMarathi ? (ex.summaryMr || ex.summaryHi) : (isHindi ? ex.summaryHi : ex.summary)}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setActiveExerciseId(ex.id);
                        setActiveTab('month_all');
                      }}
                      className="text-xs font-bold text-[#157F66] dark:text-teal-400 hover:underline flex items-center gap-1"
                    >
                      <span>{tr('3D देखें', '3D पहा', 'View 3D')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToExercisePlan(ex.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 text-xs font-bold"
                    >
                      {dailyExercisePlan.includes(ex.id) ? tr('दिनचर्या में है', 'दिनचर्येत समाविष्ट', 'In Routine') : tr('+ दिनचर्या में जोड़ें', '+ दिनचर्येत जोडा', '+ Add to Plan')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SAFETY RED FLAGS & CLINICAL REVIEW PANEL */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          
          {/* Immediate Stop Panel */}
          <div className="p-6 sm:p-8 rounded-3xl bg-red-600 text-white shadow-xl shadow-red-950/20 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-7 h-7 text-white" />
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {tr('व्यायाम तुरंत रोकने के लक्षण (Stop Exercise Signs)', 'व्यायाम तातडीने थांबवण्याची लक्षणे (Red Flags)', 'Stop Exercise Immediately — Clinical Red Flags')}
                </h3>
                <span className="text-xs font-semibold text-red-100">
                  {tr('ACOG एवं FOGSI मातृत्व सुरक्षा दिशा-निर्देश', 'ACOG व FOGSI मातृत्व सुरक्षा मार्गदर्शक तत्त्वे', 'ACOG & FOGSI Emergency Advisory Guidelines')}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-red-100 leading-relaxed max-w-3xl">
              {tr(
                'यदि व्यायाम के दौरान या बाद में निम्नलिखित में से कोई भी लक्षण दिखाई दे, तो तुरंत सारी शारीरिक गतिविधियां रोक दें, बाईं करवट बैठें या लेटें और फौरन डॉक्टर या 108 पर संपर्क करें:',
                'व्यायामादरम्यान किंवा नंतर खालीलपैकी कोणतेही लक्षण आढळल्यास, सर्व शारीरिक हालचाली त्वरित थांबवा, डाव्या कुशीवर झोपा आणि लगेच डॉक्टरांशी किंवा १०८ शी संपर्क साधा:',
                'If you experience any of the following symptoms during or following exercise, cease activity immediately, rest on your left side, and contact your healthcare provider or emergency response:'
              )}
            </p>

            {/* Red Flags Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {CLINICAL_RED_FLAGS.map((flag) => (
                <div 
                  key={flag.id}
                  className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-black text-xs sm:text-sm flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0" />
                      <span>{isMarathi ? (flag.titleMr || flag.titleHi) : (isHindi ? flag.titleHi : flag.title)}</span>
                    </h5>
                    <span className="px-2 py-0.5 rounded-full bg-red-900/60 text-amber-200 text-[10px] font-black uppercase">
                      {isMarathi ? (flag.urgencyMr || flag.urgencyHi) : (isHindi ? flag.urgencyHi : flag.urgency)}
                    </span>
                  </div>
                  <p className="text-[11px] text-red-100 leading-relaxed">
                    {isMarathi ? (flag.descriptionMr || flag.descriptionHi) : (isHindi ? flag.descriptionHi : flag.description)}
                  </p>
                </div>
              ))}
            </div>

            {/* Emergency Hotline Buttons */}
            <div className="pt-4 border-t border-red-500/80 flex items-center gap-4 flex-wrap">
              <a
                href="tel:108"
                className="px-6 py-3 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-black text-xs shadow-md transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-red-600" />
                <span>{tr('108 राष्ट्रीय एम्बुलेंस (कॉल करें)', '१०८ रुग्णवाहिका (कॉल करा)', 'Call 108 Emergency Ambulance')}</span>
              </a>
              <a
                href="tel:102"
                className="px-5 py-3 rounded-2xl bg-red-700/80 hover:bg-red-700 text-white font-bold text-xs border border-white/20 transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{tr('102 जननी सेवा', '१०२ जननी सेवा', '102 Maternal Transport')}</span>
              </a>
            </div>
          </div>

          {/* Clinical Review Board & References */}
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#157F66] dark:text-teal-400" />
                <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                  {CLINICAL_REVIEW_METADATA.reviewBoard}
                </h4>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                {tr('समीक्षा तिथि:', 'पुनरावलोकन तारीख:', 'Last Reviewed:')} {CLINICAL_REVIEW_METADATA.lastReviewedDate}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {tr('संदर्भित चिकित्सीय गाइडलाइन्स:', 'वैद्यकीय संदर्भ मार्गदर्शक तत्त्वे:', 'Referenced Clinical Guidelines:')}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {CLINICAL_REVIEW_METADATA.guidelinesReferenced.map((g, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="font-black text-xs text-[#157F66] dark:text-teal-400 block">{g.source}</span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-tight">{g.title}</p>
                    <span className="text-[10px] text-slate-400 block">{g.year}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
              <p>
                <strong>{tr('चिकित्सीय अस्वीकरण: ', 'वैद्यकीय अस्वीकरण: ', 'Medical Disclaimer: ')}</strong>
                {CLINICAL_REVIEW_METADATA.generalMedicalDisclaimer}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ── 6. Bottom Sticky Quick SOS / Safety Floating Pill ── */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <ShieldAlert className="w-4 h-4 text-red-500 shrink-0" />
          <span>
            {tr(
              'क्या आप चक्कर या असहजता महसूस कर रही हैं? तुरंत रुकें और बाईं करवट लेटें।',
              'चक्कर किंवा त्रास जाणवत आहे का? लगेच थांबा आणि डाव्या कुशीवर झोपा.',
              'Feeling any lightheadedness or pelvic pain? Stop immediately and rest on your left side.'
            )}
          </span>
        </div>
        <button
          onClick={() => setActiveTab('safety')}
          className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline shrink-0"
        >
          {tr('सभी आपातकालीन लक्षण देखें →', 'सर्व धोक्याची लक्षणे पहा →', 'View All Clinical Red Flags →')}
        </button>
      </div>

    </div>
  );
}
