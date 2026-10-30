import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  X,
  History,
  Trash2,
  ChevronRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import confetti from 'canvas-confetti';

function formatTimer(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  if (hrs > 0) {
    return `${hrs}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
  }
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export default function BabyKickCounterCard() {
  const {
    language,
    kickSessions,
    activeKickSession,
    startKickSession,
    recordKick,
    undoLastKick,
    finishKickSession,
    cancelKickSession,
    deleteKickSession,
    todayTotalKicks,
    todaySessionsCount
  } = useApp();

  const [isCounterOpen, setIsCounterOpen] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [justTapped, setJustTapped] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const isSessionActive = Boolean(activeKickSession);
  const currentKicks = activeKickSession?.kicksCount || 0;
  const elapsedSecs = activeKickSession?.durationSeconds || 0;

  const handleStartOrOpen = (e) => {
    e?.stopPropagation();
    if (!isSessionActive) {
      startKickSession();
    }
    setIsCounterOpen(true);
  };

  const handleKickTap = () => {
    if (!isSessionActive) {
      startKickSession();
    }
    recordKick();
    setJustTapped(true);
    setTimeout(() => setJustTapped(false), 250);
  };

  const handleConfirmFinish = () => {
    const entry = finishKickSession(sessionNotes);
    setSessionNotes('');
    setShowFinishConfirm(false);
    setIsCounterOpen(false);

    if (entry && entry.kicksCount > 0) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch { /* ignore */ }
    }
  };

  const handleCancelSession = () => {
    if (window.confirm(tr('क्या आप इस सत्र को रद्द करना चाहती हैं? दर्ज की गई किक्स सुरक्षित नहीं होंगी।', 'तुम्हाला हे सत्र रद्द करायचे आहे का? मोजलेल्या किक्स जतन केल्या जाणार नाहीत.', 'Are you sure you want to cancel this session? Unsaved kicks will be discarded.'))) {
      cancelKickSession();
      setIsCounterOpen(false);
    }
  };

  return (
    <>
      {/* ── Compact Card (Grid Item) ── */}
      <div
        onClick={handleStartOrOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleStartOrOpen(); } }}
        className="w-full bg-white dark:bg-slate-800/90 rounded-3xl border border-rose-200/70 dark:border-slate-700/80 shadow-xs hover:shadow-md hover:border-rose-300 dark:hover:border-rose-900/60 p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 cursor-pointer group text-left relative overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top: Icon + Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-100 to-rose-50 dark:from-rose-950/70 dark:to-rose-900/40 border border-rose-200/80 dark:border-rose-800/60 flex items-center justify-center text-2xl shadow-2xs group-hover:scale-105 transition-transform shrink-0">
            👣
          </div>
          {isSessionActive ? (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black uppercase tracking-wider animate-pulse flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>{tr('चालू है', 'सुरू आहे', 'Live')}</span>
            </span>
          ) : (
            <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-100 dark:border-rose-900/60">
              {todayTotalKicks} {tr('किक्स आज', 'हालचाली आज', 'kicks today')}
            </span>
          )}
        </div>

        {/* Middle: Title & Quick Status */}
        <div className="space-y-1 mb-3">
          <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            {tr('शिशु हलचल काउंटर', 'बाळाच्या हालचाली', 'Baby Kick Counter')}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-1">
            {isSessionActive
              ? `${currentKicks} ${tr('किक्स दर्ज', 'हालचाली नोंदवल्या', 'kicks logged')} • ${formatTimer(elapsedSecs)}`
              : tr('शिशु की दैनिक हलचल रिकॉर्ड करें', 'बाळाच्या हालचाली मोजा', 'Track active baby movement')}
          </p>
        </div>

        {/* Bottom: Play/Start Button + History Link */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-rose-100/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={handleStartOrOpen}
            className="flex-1 py-1.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition active:scale-95"
          >
            {isSessionActive ? (
              <>
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>{tr('गिनती जारी रखें', 'मोजणे सुरू ठेवा', 'Count Kicks')}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{tr('सत्र शुरू करें', 'सत्र सुरू करा', 'Start Session')}</span>
              </>
            )}
          </button>
          {kickSessions.length > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowHistoryModal(true);
              }}
              title={tr('इतिहास देखें', 'इतिहास पहा', 'View History')}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-750 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 border border-slate-200/80 dark:border-slate-700 transition shrink-0"
            >
              <History className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Kick Counting Modal / Panel ── */}
      {isCounterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-5 sm:p-6 shadow-2xl border border-rose-200/70 dark:border-slate-700 relative flex flex-col items-center text-left transition-all"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsCounterOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-750 rounded-full transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-3 w-full pr-8">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center text-xl shrink-0">
                👣
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">
                  {tr('शिशु हलचल काउंटर', 'बाळाच्या हालचाली मोजा', 'Baby Kick Counter')}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {tr(`आज: ${todayTotalKicks} किक्स (${todaySessionsCount} सत्र)`, `आज: ${todayTotalKicks} हालचाली (${todaySessionsCount} सत्रे)`, `Today: ${todayTotalKicks} kicks (${todaySessionsCount} sessions)`)}
                </p>
              </div>
            </div>

            {/* Live Session Timer */}
            <div className="flex items-center gap-2 px-3 py-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900 rounded-full text-rose-700 dark:text-rose-300 text-xs font-semibold my-2">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono font-bold text-sm">{formatTimer(elapsedSecs)}</span>
              <span className="text-rose-300">•</span>
              <span>
                {isSessionActive
                  ? tr('सत्र सक्रिय है', 'सत्र सुरू आहे', 'Active Session')
                  : tr('शुरू करने के लिए टैप करें', 'सुरू करण्यासाठी टॅप करा', 'Tap circle to start')}
              </span>
            </div>

            {/* Big Tap Kick Circle */}
            <div className="my-3 flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={handleKickTap}
                className={`w-36 h-36 rounded-full flex flex-col items-center justify-center text-white cursor-pointer select-none shadow-xl transition-all duration-150 ${justTapped ? 'scale-90 bg-rose-600' : 'hover:scale-105 active:scale-95 bg-gradient-to-tr from-rose-500 via-rose-600 to-pink-500'
                  }`}
              >
                <Heart className={`w-6 h-6 mb-1 fill-white ${justTapped ? 'animate-ping' : 'animate-pulse'}`} />
                <span className="text-4xl font-black">{currentKicks}</span>
                <span className="text-[11px] font-bold opacity-90 mt-0.5">
                  {isSessionActive
                    ? tr('+1 किक दर्ज करें', '+१ हालचाल जोडा', '+1 Kick Tap')
                    : tr('सत्र शुरू करें', 'सत्र सुरू करा', 'Start Counting')}
                </span>
              </button>
            </div>

            {/* Action Buttons */}
            {isSessionActive && (
              <div className="flex items-center gap-2 w-full mt-2 mb-2">
                <button
                  type="button"
                  onClick={undoLastKick}
                  disabled={currentKicks === 0}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 hover:bg-slate-100 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                  <span>{tr('हटाएं', 'मागे घ्या', 'Undo')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowFinishConfirm(true)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#157F66] hover:bg-[#0e5947] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{tr('सत्र समाप्त करें', 'सत्र पूर्ण करा', 'Finish & Save')}</span>
                </button>
              </div>
            )}

            {/* Safety Guideline Note */}
            <div className="w-full bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-2.5 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2 mt-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p>
                {tr(
                  'शिशु की हलचल पर नियमित ध्यान दें। हलचल में असामान्य कमी महसूस होने पर तुरंत अपने डॉक्टर से संपर्क करें।',
                  'बाळाच्या हालचालींवर दररोज लक्ष ठेवा. हालचाली कमी जाणवल्यास त्वरित डॉक्टरांशी संपर्क साधा.',
                  'Monitor movement patterns daily. Contact your maternity care provider immediately if you perceive a decrease in movements.'
                )}
              </p>
            </div>

            {/* Footer with Cancel link */}
            {isSessionActive && (
              <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700 mt-2">
                <button
                  type="button"
                  onClick={handleCancelSession}
                  className="text-rose-600 dark:text-rose-400 text-xs font-bold hover:underline"
                >
                  {tr('सत्र रद्द करें', 'सत्र रद्द करा', 'Discard Session')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsCounterOpen(false);
                    setShowHistoryModal(true);
                  }}
                  className="text-teal-700 dark:text-teal-400 text-xs font-bold hover:underline"
                >
                  {tr('इतिहास देखें', 'इतिहास पहा', 'View History')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Finish Confirmation Dialog ── */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900 text-[#157F66] dark:text-teal-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                  {tr('सत्र पूरा करें', 'सत्र पूर्ण करा', 'Save Kick Session')}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {currentKicks} {tr('किक्स', 'हालचाली', 'kicks')} • {formatTimer(elapsedSecs)}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                {tr('टिप्पणी (वैकल्पिक)', 'नोंद (पर्यायी)', 'Notes (Optional)')}
              </label>
              <input
                type="text"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder={tr('उदा: भोजन के बाद, बाईं करवट', 'उदा: जेवणानंतर, डाव्या कुशीवर', 'e.g., after lunch, resting on left side')}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishConfirm(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {tr('वापस', 'मागे', 'Back')}
              </button>
              <button
                type="button"
                onClick={handleConfirmFinish}
                className="px-4 py-2 rounded-xl bg-[#157F66] hover:bg-[#0e5947] text-white text-xs font-bold shadow-xs"
              >
                {tr('सहेजें', 'जतन करा', 'Confirm & Save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Kick History Modal ── */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4 text-left max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                    {tr('किक सत्र इतिहास', 'हालचालींचे मागील सत्र', 'Kick Sessions History')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {kickSessions.length} {tr('सत्र दर्ज', 'सत्रे नोंदवली', 'sessions recorded')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {kickSessions.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  {tr('कोई किक सत्र दर्ज नहीं है।', 'अद्याप कोणतेही सत्र नोंदवलेले नाही.', 'No kick sessions recorded yet.')}
                </div>
              ) : (
                kickSessions.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-750/70 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-800 dark:text-slate-100">
                          {s.kicksCount} {tr('किक्स', 'हालचाली', 'kicks')}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          ({s.durationFormatted})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {s.dateFormatted || s.date} • {s.startTime} {s.endTime ? `- ${s.endTime}` : ''}
                      </p>
                      {s.notes && (
                        <p className="text-[10px] text-slate-600 dark:text-slate-300 italic mt-0.5">
                          "{s.notes}"
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => deleteKickSession(s.id)}
                      title={tr('हटाएं', 'हटवा', 'Delete')}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setShowHistoryModal(false)}
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
