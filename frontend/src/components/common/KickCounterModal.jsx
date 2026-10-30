import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Heart, 
  Clock, 
  AlertCircle, 
  RotateCcw, 
  CheckCircle2, 
  Play, 
  History 
} from 'lucide-react';
import confetti from 'canvas-confetti';

function formatTimer(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function KickCounterModal() {
  const {
    activeModal,
    setActiveModal,
    language,
    activeKickSession,
    startKickSession,
    recordKick,
    undoLastKick,
    finishKickSession,
    cancelKickSession,
    kickSessions,
    todayTotalKicks
  } = useApp();

  const [notes, setNotes] = useState('');
  const [showNotesInput, setShowNotesInput] = useState(false);

  if (activeModal !== 'kickCounter') return null;

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const isRunning = Boolean(activeKickSession);
  const currentKicks = activeKickSession?.kicksCount || 0;
  const elapsedSecs = activeKickSession?.durationSeconds || 0;

  const handleAddKick = () => {
    if (!isRunning) {
      startKickSession();
    } else {
      recordKick();
    }
  };

  const handleFinish = () => {
    const entry = finishKickSession(notes);
    setNotes('');
    setShowNotesInput(false);
    if (entry && entry.kicksCount > 0) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch { /* ignore */ }
    }
    setActiveModal(null);
  };

  const lastSession = kickSessions.length > 0 ? kickSessions[0] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-rose-100 dark:border-slate-700 flex flex-col items-center text-left transition-colors duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-700 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2 w-full pr-8">
          <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-500 shrink-0">
            <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">
              {isHindi ? "शिशु हलचल काउंटर" : (isMarathi ? "बाळाच्या हालचाली मोजा" : "Baby Kick Counter")}
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {tr(`आज की कुल किक्स: ${todayTotalKicks}`, `आजच्या एकूण हालचाली: ${todayTotalKicks}`, `Today's total kicks: ${todayTotalKicks}`)}
            </p>
          </div>
        </div>

        {/* Timer Display */}
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-full text-amber-700 dark:text-amber-300 text-xs font-medium my-2">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-mono font-bold">{formatTimer(elapsedSecs)}</span>
          <span className="text-amber-500">•</span>
          <span>
            {isRunning 
              ? tr("सत्र चालू है", "सत्र सुरू आहे", "Session Active") 
              : tr("शुरू करने के लिए टैप करें", "सुरू करण्यासाठी टॅप करा", "Tap circle to start")}
          </span>
        </div>

        {/* Big Tap Kick Circle */}
        <div className="my-3 relative flex items-center justify-center">
          <button
            onClick={handleAddKick}
            className="w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-95 shadow-xl bg-gradient-to-tr from-[#157F66] via-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white cursor-pointer select-none"
          >
            <span className="text-4xl font-extrabold">{currentKicks}</span>
            <span className="text-xs opacity-90 mt-0.5">
              {isRunning 
                ? tr("टैप करें (+1 किक)", "टॅप करा (+१ हालचाल)", "Count Kick (+1)") 
                : tr("सत्र शुरू करें", "सत्र सुरू करा", "Start Session")}
            </span>
          </button>
        </div>

        {/* Undo and Finish Buttons while session is active */}
        {isRunning && (
          <div className="flex items-center gap-2 w-full mb-3">
            <button
              onClick={undoLastKick}
              disabled={currentKicks === 0}
              className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
              <span>{tr("हटाएं", "मागे घ्या", "Undo")}</span>
            </button>
            <button
              onClick={() => setShowNotesInput(!showNotesInput)}
              className="flex-1 py-2 px-3 rounded-xl bg-[#157F66] hover:bg-[#0e5947] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{tr("पूर्ण करें", "पूर्ण करा", "Finish")}</span>
            </button>
          </div>
        )}

        {/* Optional Notes before finishing */}
        {showNotesInput && (
          <div className="w-full space-y-2 mb-3 p-3 bg-slate-50 dark:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-600">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={tr("वैकल्पिक टिप्पणी (जैसे: भोजन बाद)", "पर्यायी नोंद (उदा: जेवणानंतर)", "Optional note (e.g. after lunch)")}
              className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl outline-none"
            />
            <button
              onClick={handleFinish}
              className="w-full py-1.5 bg-[#157F66] text-white rounded-xl text-xs font-bold"
            >
              {tr("सहेजें और बंद करें", "जतन करा आणि बंद करा", "Save & Close Session")}
            </button>
          </div>
        )}

        {/* Health Advisory Note */}
        <div className="w-full bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-3 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed">
            {tr(
              "शिशु की हलचल की निगरानी के लिए अपने डॉक्टर के निर्देशों का पालन करें। हलचल में कमी महसूस होने पर तुरंत प्रसूति केंद्र से संपर्क करें।",
              "बाळाच्या हालचालींवर लक्ष ठेवण्यासाठी डॉक्टरांच्या सूचनांचे पालन करा. हालचाली कमी जाणवल्यास त्वरित प्रसूती केंद्राशी संपर्क साधा.",
              "Follow your maternity care professional's guidance for monitoring movements. If you notice reduced or changed movements, contact your hospital unit promptly."
            )}
          </p>
        </div>

        {/* Last session info */}
        {lastSession && (
          <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-2.5">
            <span>
              {tr(`पिछला: ${lastSession.kicksCount} किक्स (${lastSession.durationFormatted})`, `मागील: ${lastSession.kicksCount} हालचाली (${lastSession.durationFormatted})`, `Last: ${lastSession.kicksCount} kicks (${lastSession.durationFormatted})`)}
            </span>
            {isRunning && (
              <button
                onClick={cancelKickSession}
                className="text-rose-600 dark:text-rose-400 font-bold hover:underline"
              >
                {tr("रद्द करें", "रद्द करा", "Cancel")}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
