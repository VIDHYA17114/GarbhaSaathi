import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  Calendar, 
  Heart, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles,
  ChevronRight,
  CheckCircle2,
  PhoneCall,
  Activity,
  Info,
  AlertTriangle,
  Clock,
  LogOut
} from 'lucide-react';
import { getDevelopmentForWeek } from '../../data/babyDevelopmentData';
import BabyKickCounterCard from './BabyKickCounterCard';
import ThisWeekDevelopmentCard from './ThisWeekDevelopmentCard';
import TrimesterCareCard from './TrimesterCareCard';
import DailyWalkingStepsCard from './DailyWalkingStepsCard';
import DailyFoodTrackerCard from './DailyFoodTrackerCard';
import DailyHealthStatusCard from './DailyHealthStatusCard';
import DailyNeedsChecklistCard from './DailyNeedsChecklistCard';
import DailyHistoryViewerCard from './DailyHistoryViewerCard';

export default function WebHomeDashboard({ setActivePage, onLogout }) {
  const { user, setActiveModal, language, t, pregnancyProgress, eddConflict, tasks, logout } = useApp();
  const handleLogoutAction = onLogout || logout;

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  // ── Pregnancy data ──
  const preg = pregnancyProgress;
  const hasDateData = preg?.week != null;
  const development = hasDateData ? getDevelopmentForWeek(preg.week, language) : null;

  // ── Task quick-stats ──
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;
  const taskPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 space-y-6 animate-in fade-in duration-300 text-left">
      
      {/* EDD Conflict Warning */}
      {eddConflict && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <div>
            <p className="font-bold">
              {tr('आपकी LMP और EDD तिथियां मेल नहीं खाती', 'आपल्या LMP आणि EDD तारखांमध्ये तफावत दिसते', 'Your LMP and EDD dates seem inconsistent')}
            </p>
            <p className="mt-0.5 text-amber-800">
              {tr(
                'कृपया Settings में जाकर तिथियों की जांच करें। अपने डॉक्टर से सही तिथि की पुष्टि करें।',
                'कृपया Settings मध्ये जाऊन तारखा तपासा. आपल्या डॉक्टरांकडून योग्य तारखेची खात्री करा.',
                'Please review them in Settings and confirm the correct dates with your healthcare provider.'
              )}
            </p>
          </div>
          <button
            onClick={() => setActivePage('settings')}
            className="shrink-0 px-3 py-1.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition"
          >
            {tr('ठीक करें', 'तपासा', 'Review')}
          </button>
        </div>
      )}

      {/* 1. Welcome & Pregnancy Summary */}
      <div className="w-full bg-gradient-to-r from-[#FFF5F1] via-[#FAF9F5] to-[#E9F5F1] dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 border border-rose-200/70 dark:border-slate-700 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Left: Details */}
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            {hasDateData ? (
              <>
                <span className="px-3 py-1 rounded-full bg-[#157F66]/10 text-[#157F66] dark:text-teal-400 text-xs font-bold flex items-center gap-1.5 border border-teal-100 dark:border-teal-900/60">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isMarathi ? (preg.trimesterLabels?.mr || preg.trimesterLabels?.hi) : (isHindi ? preg.trimesterLabels?.hi : preg.trimesterLabels?.en)}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-900/60">
                  {preg.formattedText}
                </span>
              </>
            ) : (
              <button
                onClick={() => setActivePage('settings')}
                className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 flex items-center gap-1.5"
              >
                <Info className="w-3 h-3" />
                {tr('Settings में LMP तिथि डालें', 'Settings मध्ये LMP तारीख भरा', 'Add LMP date in Settings')}
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
            {t.goodMorning}, {user.name || 'Priya Sharma'}! 🌸
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1.5 max-w-xl leading-relaxed">
            {t.doingGreat}
          </p>

          {/* Pregnancy Stats Bar with Daily Countdown */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-7 mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[11px] uppercase font-bold tracking-wider">
                {tr('आज की तारीख', 'आजची तारीख', "Today's Date")}
              </span>
              <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-1">
                <span>🗓️</span>
                <span>{new Date().toLocaleDateString(isMarathi ? 'mr-IN' : (isHindi ? 'hi-IN' : 'en-IN'), { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[11px] uppercase font-bold tracking-wider">
                {tr('अंतिम माहवारी (LMP)', 'शेवटची पाळी (LMP)', 'LMP Date')}
              </span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                {preg?.lmpFormatted || (user.lmpDate ? user.lmpDate : tr('अज्ञात', 'नोंद नाही', 'Not set'))}
              </span>
            </div>
            <div>
              <span className="text-slate-400 dark:text-slate-500 block text-[11px] uppercase font-bold tracking-wider">
                {tr('शिशु जन्म तिथि (EDD)', 'अपेक्षित प्रसूती तारीख (EDD)', 'Expected Due Date')}
              </span>
              <span className="font-bold text-[#157F66] dark:text-teal-400 text-sm">
                {preg?.eddFormatted || (user.eddDate ? user.eddDate : tr('अज्ञात', 'नोंद नाही', 'Not set'))}
              </span>
            </div>
            {hasDateData && preg.daysRemaining != null && (
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px] uppercase font-bold tracking-wider">
                  {tr('जन्म तक शेष दिन', 'जन्मापर्यंत दिवस शिल्लक', 'Days Until Baby Born')}
                </span>
                <span className="font-extrabold text-rose-600 dark:text-rose-400 text-sm flex items-center gap-1">
                  <span>⏳</span>
                  <span>{preg.daysRemaining} {tr('दिन शेष', 'दिवस बाकी', 'days left')}</span>
                </span>
              </div>
            )}
            {development && !development.isEarly && (
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-[11px] uppercase font-bold tracking-wider">
                  {tr('अनुमानित आकार', 'अंदाजे आकार', 'Approx. Baby Size')}
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  ~{development.size} ({development.comparison})
                </span>
              </div>
            )}
          </div>

          {hasDateData && (
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 italic">
              {tr(
                '* ये अनुमानित मान हैं और चिकित्सकीय मूल्यांकन का स्थान नहीं लेते।',
                '* ही अंदाजे मूल्ये आहेत आणि वैद्यकीय मूल्यमापनाचा पर्याय नाहीत.',
                '* Estimated values only. Does not replace clinical assessment.'
              )}
            </p>
          )}
        </div>

        {/* Right: Illustration & CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-sm border-2 border-white dark:border-slate-700 bg-teal-50 dark:bg-slate-800 shrink-0 relative group">
            <img 
              src="/landing_hero_mother.png" 
              alt="GarbhaSaathi Expectant Mother" 
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => setActivePage('journey')}
              className="py-3 px-5 bg-[#157F66] hover:bg-[#0e5947] text-white rounded-2xl font-bold text-xs shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition active:scale-[0.98]"
            >
              <span>{tr('माह-वार विकास देखें', 'महिनानिहाय प्रवास पहा', 'View Month-wise Journey')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('tasks')}
              className="py-3 px-5 bg-white dark:bg-slate-800 border border-[#157F66] text-[#157F66] dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>{tr('दैनिक कार्य सूची', 'दैनंदिन कार्य सूची', 'Daily Tasks')}</span>
              {taskPct > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#157F66] text-white text-[10px] font-black">
                  {taskPct}%
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Gestational Progress — Daily & Weekwise Timeline till Baby Born */}
      <div className="w-full bg-white dark:bg-slate-800/90 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm text-left space-y-6">
        
        {/* Header with Today's Date & Countdown */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-[#157F66] dark:text-teal-400 border border-teal-100 dark:border-teal-900 shadow-2xs">
              <Calendar className="w-5 h-5 text-[#157F66] dark:text-teal-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                  {tr('दैनिक गर्भावस्था प्रगति व प्रसव उल्टी गिनती', 'दैनिक गर्भधारणा प्रगती व प्रसूती उलटी गणना', 'Daily Pregnancy Progress & Delivery Countdown')}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold">
                  {tr('प्रतिदिन लाइव', 'दररोज लाईव्ह', 'Live Daily')}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {tr(
                  `आज: ${new Date().toLocaleDateString('hi-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} • शिशु के जन्म तक प्रतिदिन प्रगति`,
                  `आज: ${new Date().toLocaleDateString('mr-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} • बाळाच्या जन्मापर्यंत दररोज प्रगती`,
                  `Today: ${new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} • Daily progress till baby is born`
                )}
              </p>
            </div>
          </div>

          {hasDateData && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-3 py-1.5 rounded-full border border-teal-100 dark:border-teal-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isMarathi ? (preg.trimesterLabels?.mr || preg.trimesterLabels?.hi) : (isHindi ? preg.trimesterLabels?.hi : preg.trimesterLabels?.en)}</span>
              </span>
            </div>
          )}
        </div>

        {hasDateData ? (
          <>
            {/* 4 Interactive Daily Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Card 1: Today's Date */}
              <div className="p-3.5 rounded-2xl bg-[#FAF9F5] dark:bg-slate-750/70 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                  {tr('आज की तारीख (Today)', 'आजची तारीख (Today)', "Today's Date")}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
                    {new Date().toLocaleDateString(isMarathi ? 'mr-IN' : (isHindi ? 'hi-IN' : 'en-IN'), { day: 'numeric', month: 'short' })}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {new Date().getFullYear()}
                  </span>
                </div>
                <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold block mt-1">
                  {new Date().toLocaleDateString(isMarathi ? 'mr-IN' : (isHindi ? 'hi-IN' : 'en-IN'), { weekday: 'long' })}
                </span>
              </div>

              {/* Card 2: Daily Progress till birth */}
              <div className="p-3.5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800">
                <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider block mb-1">
                  {tr('दैनिक प्रगति (Daily)', 'दैनिक प्रवास (Daily)', 'Daily Journey')}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-black text-[#157F66] dark:text-teal-300">
                    {isMarathi ? `दिवस ${preg.daysElapsed || 1}` : (isHindi ? `दिन ${preg.daysElapsed || 1}` : `Day ${preg.daysElapsed || 1}`)}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    / 280 {tr('दिन', 'दिवस', 'days')}
                  </span>
                </div>
                <span className="text-[10px] text-teal-800 dark:text-teal-400 font-semibold block mt-1">
                  {preg.dailyProgress || 0}% {tr('गर्भकाल पूर्ण', 'प्रवास पूर्ण', 'completed')}
                </span>
              </div>

              {/* Card 3: Countdown till Baby Born */}
              <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900">
                <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider block mb-1">
                  {tr('जन्म तक शेष दिन', 'प्रसूतीपर्यंत दिवस शिल्लक', 'Days Until Delivery')}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-black text-rose-600 dark:text-rose-400">
                    ~{preg.daysRemaining != null ? preg.daysRemaining : 280}
                  </span>
                  <span className="text-xs font-bold text-rose-700 dark:text-rose-300">
                    {tr('दिन बाकी', 'दिवस बाकी', 'days left')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block mt-1 truncate" title={preg.eddFormatted}>
                  {isMarathi ? `प्रसूती: ${preg.eddFormatted}` : (isHindi ? `प्रसव: ${preg.eddFormatted}` : `EDD: ${preg.eddFormatted}`)}
                </span>
              </div>

              {/* Card 4: Gestational Week & Day */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900">
                <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider block mb-1">
                  {tr('वर्तमान सप्ताह', 'सध्याचा आठवडा', 'Gestational Stage')}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-300">
                    {preg.formattedText || `${preg.week} W`}
                  </span>
                </div>
                <span className="text-[10px] text-amber-800 dark:text-amber-400 font-semibold block mt-1">
                  {isMarathi ? `आठवडा ${preg.week} / 40 आठवडे` : (isHindi ? `सप्ताह ${preg.week} / 40 सप्ताह` : `Week ${preg.week} of 40`)}
                </span>
              </div>
            </div>

            {/* TRACK 1: Day-by-Day Progress till Baby Born (280 Days) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <span>👣</span>
                  <span>{tr('दिन-प्रतिदिन उल्टी गिनती (Daily Progress till Birth)', 'दिवसनिहाय उलटी गणना (Daily Progress till Birth)', 'Day-by-Day Timeline till Birth')}</span>
                </span>
                <span className="text-xs font-bold text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2.5 py-0.5 rounded-full border border-teal-100 dark:border-teal-900">
                  {isMarathi ? `दिवस ${preg.daysElapsed || 1} of 280 • ${preg.daysRemaining} दिवस बाकी` : (isHindi ? `दिन ${preg.daysElapsed || 1} of 280 • ${preg.daysRemaining} दिन शेष` : `Day ${preg.daysElapsed || 1} of 280 • ${preg.daysRemaining} days left`)}
                </span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-700 h-4 rounded-full overflow-hidden relative shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-[#157F66] via-teal-500 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(2, preg.dailyProgress || 0)}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-semibold pt-0.5">
                <span>{tr('दिन 1 (गर्भधारण/LMP)', 'दिवस 1 (गर्भधारणा/LMP)', 'Day 1 (LMP)')}</span>
                <span className="text-[#157F66] dark:text-teal-400 font-extrabold">
                  {isMarathi ? `📍 आज: दिवस ${preg.daysElapsed || 1} (~${preg.daysRemaining} दिवस बाकी)` : (isHindi ? `📍 आज: दिन ${preg.daysElapsed || 1} (~${preg.daysRemaining} दिन शेष)` : `📍 Today: Day ${preg.daysElapsed || 1} (~${preg.daysRemaining} days left)`)}
                </span>
                <span>{tr('दिन 140 (आधा सफर)', 'दिवस 140 (अर्धा प्रवास)', 'Day 140 (Halfway)')}</span>
                <span className="text-rose-600 dark:text-rose-400 font-bold">
                  {tr('दिन 280 (शिशु जन्म 👶)', 'दिवस 280 (बाळाचा जन्म 👶)', 'Day 280 (Baby Born 👶)')}
                </span>
              </div>
            </div>

            {/* TRACK 2: Week-wise Medical Milestone Progress (40 Weeks) */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-[#157F66] dark:text-teal-400" />
                  <span>{tr('सप्ताह-वार त्रैमास मील के पत्थर (Week-by-Week Milestones)', 'आठवडेनिहाय त्रैमासिक टप्पे (Week-by-Week Milestones)', 'Week-by-Week Trimester Milestones')}</span>
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {isMarathi ? `आठवडा ${preg.week} / 40 (${preg.progress}% पूर्ण)` : (isHindi ? `सप्ताह ${preg.week} / 40 (${preg.progress}% पूर्ण)` : `Week ${preg.week} of 40 (${preg.progress}% complete)`)}
                </span>
              </div>

              <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-teal-600 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(2, preg.progress || 0)}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                <span>W1 (Conception)</span>
                <span>W13 (Trimester 1)</span>
                <span className="text-[#157F66] dark:text-teal-400 font-bold">W{preg.week} (Today) 📍</span>
                <span>W27 (Trimester 2)</span>
                <span>W40 (Full Term Delivery)</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-slate-400 gap-2.5">
            <Clock className="w-10 h-10 opacity-30 text-[#157F66]" />
            <p className="text-sm font-semibold text-slate-700">
              {tr('गर्भावस्था की तिथि अभी सेट नहीं की गई है।', 'गर्भधारणेची तारीख अद्याप नोंदवलेली नाही.', 'Pregnancy dates are not set yet.')}
            </p>
            <p className="text-xs text-slate-500 max-w-sm text-center">
              {tr(
                'अपनी LMP या EDD तिथि Settings में दर्ज करें ताकि प्रतिदिन शिशु जन्म तक की प्रगति देखी जा सके।',
                'आपली LMP किंवा EDD तारीख Settings मध्ये भरा जेणेकरून बाळाच्या जन्मापर्यंतची दैनिक प्रगती पाहता येईल.',
                'Enter your LMP or EDD date in Settings to see daily countdown and progress until delivery.'
              )}
            </p>
            <button
              onClick={() => setActivePage('settings')}
              className="mt-1 px-4 py-2 bg-[#157F66] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#0e5947] transition"
            >
              {tr('Settings में LMP/EDD दर्ज करें', 'Settings मध्ये LMP/EDD भरा', 'Set LMP/EDD in Settings')}
            </button>
          </div>
        )}
      </div>

      {/* 3. Top Dashboard Widgets — 4 Responsive Compact Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <BabyKickCounterCard />
        <ThisWeekDevelopmentCard setActivePage={setActivePage} />
        <TrimesterCareCard setActivePage={setActivePage} />
        <DailyWalkingStepsCard />
      </div>

      {/* 4. Daily Food & Meal Log (with compact summary & Read more) */}
      <DailyFoodTrackerCard />

      {/* 5. Daily Health Status (with concise summary & Read more) */}
      <DailyHealthStatusCard />

      {/* 6. Daily Needs & Essentials Checklist (with count summary & Read more) */}
      <DailyNeedsChecklistCard />

      {/* 7. Today's History & Records */}
      <DailyHistoryViewerCard />

      {/* 6. Quick Navigation Links */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        {[
          { id: 'journey',   emoji: '🌿', labelHi: 'गर्भावस्था यात्रा', labelMr: 'माझा प्रवास',        labelEn: 'My Journey' },
          { id: 'nutrition', emoji: '🍽️', labelHi: 'पोषण योजना',        labelMr: 'पोषण योजना',        labelEn: 'Nutrition Plan' },
          { id: 'tasks',     emoji: '✅', labelHi: 'दैनिक कार्य',        labelMr: 'दैनंदिन कार्ये',      labelEn: 'Daily Tasks' },
          { id: 'exercise',  emoji: '🧘‍♀️', labelHi: 'दैनिक व्यायाम',      labelMr: 'दैनंदिन व्यायाम',    labelEn: 'Daily Exercise' },
          { id: 'wellness',  emoji: '🌱', labelHi: 'लर्निंग गार्डन',    labelMr: 'लर्निंग गार्डन',    labelEn: 'Learning Garden' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className="p-4 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-teal-300 dark:hover:border-teal-500 hover:shadow-sm transition text-left group cursor-pointer"
          >
            <span className="text-2xl block mb-2">{item.emoji}</span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-[#157F66] dark:group-hover:text-teal-400 transition">
              {tr(item.labelHi, item.labelMr, item.labelEn)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
