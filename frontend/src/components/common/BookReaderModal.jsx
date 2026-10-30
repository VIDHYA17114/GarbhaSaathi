import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { WELLNESS_BOOKS_AND_STORIES } from '../../data/wellnessContentLibrary';
import { krishnaFluteAudio } from '../../utils/krishnaFluteAudio';
import { 
  X, 
  Volume2, 
  VolumeX, 
  ZoomIn, 
  ZoomOut, 
  Bookmark, 
  Heart, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  Music,
  Sparkles,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

/**
 * Procedural gentle temple bell / singing bowl chime for shloka transitions
 */
function playTempleChime(freq = 432) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') ctx.resume();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.9);
  } catch { /* ignore */ }
}

/**
 * Universal voice selector with safe fallbacks for Windows / Chrome / Edge
 */
function selectBestVoice(targetLang) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices() || [];
  if (voices.length === 0) return null;

  // 1. Exact match (e.g. 'hi-IN' or 'mr-IN' or 'en-IN')
  const exact = voices.find(v => v.lang.toLowerCase() === targetLang.toLowerCase());
  if (exact) return exact;

  // 2. Prefix match (e.g. 'hi', 'mr', 'en')
  const prefix = targetLang.split('-')[0].toLowerCase();
  const prefMatch = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
  if (prefMatch) return prefMatch;

  // 3. Indian English or any India voice
  const indVoice = voices.find(v => 
    v.lang.toLowerCase().includes('in') || 
    v.name.toLowerCase().includes('india') || 
    v.name.toLowerCase().includes('hindi')
  );
  if (indVoice) return indVoice;

  // 4. Browser default or first available voice
  return voices.find(v => v.default) || voices[0] || null;
}

export default function BookReaderModal() {
  const { activeModal, setActiveModal, modalData, language, setLanguage } = useApp();
  const [fontSize, setFontSize] = useState(18);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [readingPhase, setReadingPhase] = useState(null); // 'sanskrit' | 'meaning' | null
  const [audioMode, setAudioMode] = useState('full'); // 'full' | 'sanskrit' | 'meaning'
  const [audioSpeed, setAudioSpeed] = useState(0.85); // 0.85 (Peaceful) or 1.0 (Normal)
  const [isFlutePlaying, setIsFlutePlaying] = useState(false); // Default OFF - do NOT auto play
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Active book/story selection
  const [selectedBookId, setSelectedBookId] = useState(() => modalData?.id || 'book-gita-sadness');
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

  const readingActiveRef = useRef(isReadingAloud);
  readingActiveRef.current = isReadingAloud;

  // Pre-load voices list for Chrome / Edge
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const onVoicesChanged = () => window.speechSynthesis.getVoices();
      window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
    }
  }, []);

  // Find exact matching book or fallback
  const currentBook = WELLNESS_BOOKS_AND_STORIES.find(b => b.id === selectedBookId) 
    || WELLNESS_BOOKS_AND_STORIES.find(b => b.id === modalData?.id)
    || WELLNESS_BOOKS_AND_STORIES.find(b => modalData?.id && b.id.includes(modalData.id))
    || WELLNESS_BOOKS_AND_STORIES[0];

  const totalVerses = currentBook?.shlokas?.length || 1;
  const currentVerse = currentBook?.shlokas?.[currentVerseIndex] || currentBook?.shlokas?.[0];

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  // Direct contentBody fallback if no structured book matched
  const isDirectContent = !currentVerse && modalData?.contentBody;

  // Sync selected book when modal opens with new data
  useEffect(() => {
    if (activeModal === 'bookReader' && modalData?.id) {
      stopAllSpeech();
      setIsFlutePlaying(false);
      krishnaFluteAudio.stop();

      const exactMatch = WELLNESS_BOOKS_AND_STORIES.find(b => b.id === modalData.id);
      if (exactMatch) {
        setSelectedBookId(exactMatch.id);
        setCurrentVerseIndex(0);
        return;
      }
      const catMatch = WELLNESS_BOOKS_AND_STORIES.find(b => modalData.id.includes(b.category));
      if (catMatch) {
        setSelectedBookId(catMatch.id);
        setCurrentVerseIndex(0);
      }
    }
  }, [activeModal, modalData]);

  // Handle ambient Krishna flute audio inside book reader (only if user explicitly enables it)
  useEffect(() => {
    if (activeModal === 'bookReader') {
      if (isFlutePlaying) {
        krishnaFluteAudio.start({ volume: 0.25 });
      } else {
        krishnaFluteAudio.stop();
      }
    } else {
      krishnaFluteAudio.stop();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    return () => {
      krishnaFluteAudio.stop();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [activeModal, isFlutePlaying]);

  if (activeModal !== 'bookReader' || !modalData) return null;

  // ── Robust Speech Synthesis Audio Engine ──
  const stopAllSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsReadingAloud(false);
    setReadingPhase(null);
  };

  const startAudioRecitation = (mode = audioMode) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Play a gentle sacred chime first
    playTempleChime(432);

    // Unblock Chrome paused speech engine
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();

    setIsReadingAloud(true);

    const langCode = isMarathi ? 'mr-IN' : (isHindi ? 'hi-IN' : 'en-IN');
    const steps = [];

    if (currentVerse) {
      // 1. Sanskrit Chanting Step
      if (mode === 'full' || mode === 'sanskrit') {
        const cleanSanskrit = currentVerse.sanskrit.replace(/[॥।\n]/g, ' . ');
        steps.push({
          phase: 'sanskrit',
          text: cleanSanskrit,
          lang: 'hi-IN',
          rate: audioSpeed * 0.92,
          pitch: 0.95
        });
      }

      // 2. Meaning & Guidance Step
      if (mode === 'full' || mode === 'meaning') {
        let meaningText = '';
        if (isMarathi) {
          meaningText = `${currentVerse.meaningMr || currentVerse.meaningHi}. ${currentVerse.maternalGuidanceMr || currentVerse.maternalGuidance || ''}`;
        } else if (isHindi) {
          meaningText = `${currentVerse.meaningHi}. ${currentVerse.maternalGuidance || ''}`;
        } else {
          meaningText = `${currentVerse.meaningEn || currentVerse.meaningHi}. ${currentVerse.maternalGuidanceEn || currentVerse.maternalGuidance || ''}`;
        }

        steps.push({
          phase: 'meaning',
          text: meaningText,
          lang: langCode,
          rate: audioSpeed,
          pitch: 1.0
        });
      }
    } else if (modalData.contentBody) {
      steps.push({
        phase: 'meaning',
        text: modalData.contentBody,
        lang: langCode,
        rate: audioSpeed,
        pitch: 1.0
      });
    }

    if (steps.length === 0) {
      setIsReadingAloud(false);
      return;
    }

    let stepIdx = 0;

    // Small delay to allow cancel() to settle in Chrome
    setTimeout(() => {
      const playNextStep = () => {
        if (!readingActiveRef.current || stepIdx >= steps.length) {
          setIsReadingAloud(false);
          setReadingPhase(null);
          return;
        }

        const cur = steps[stepIdx];
        setReadingPhase(cur.phase);

        // Resume engine if Chrome put it to sleep
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }

        const utterance = new SpeechSynthesisUtterance(cur.text);
        
        // Find the best voice supported on this computer
        const voice = selectBestVoice(cur.lang);
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = cur.lang;
        }

        utterance.rate = cur.rate;
        utterance.pitch = cur.pitch;

        utterance.onend = () => {
          stepIdx++;
          playTempleChime(523.25); // Sa harmonic chime between sections
          setTimeout(playNextStep, 500);
        };

        utterance.onerror = (e) => {
          console.warn('SpeechSynthesis step error:', e?.error);
          stepIdx++;
          setTimeout(playNextStep, 300);
        };

        try {
          window.speechSynthesis.speak(utterance);
        } catch (err) {
          console.warn('Speak error:', err);
          setIsReadingAloud(false);
        }
      };

      playNextStep();
    }, 100);
  };

  const handleToggleAudio = () => {
    if (isReadingAloud) {
      stopAllSpeech();
    } else {
      startAudioRecitation(audioMode);
    }
  };

  const handleNextVerse = () => {
    if (currentVerseIndex < totalVerses - 1) {
      stopAllSpeech();
      setCurrentVerseIndex(i => i + 1);
    }
  };

  const handlePrevVerse = () => {
    if (currentVerseIndex > 0) {
      stopAllSpeech();
      setCurrentVerseIndex(i => i - 1);
    }
  };

  const bookTitle = isMarathi 
    ? (currentBook?.titleMr || currentBook?.titleHi) 
    : (isHindi ? currentBook?.titleHi : currentBook?.titleEn);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] dark:bg-slate-900 rounded-[32px] max-w-3xl w-full p-4 sm:p-7 shadow-2xl relative border-2 border-amber-300 dark:border-amber-900/60 flex flex-col max-h-[95vh] text-left transition-colors">
        
        {/* ── 1. Top Header Bar ── */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-amber-200/80 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-900/50 flex items-center justify-center text-2xl shadow-xs shrink-0">
              {currentBook?.icon || modalData.icon || '🕉️'}
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-extrabold text-[#157F66] dark:text-teal-400 uppercase tracking-wider block">
                {isMarathi 
                  ? '🌸 पवित्र धर्मग्रंथ व मनःशांती' 
                  : (isHindi ? '🌸 पवित्र धर्मग्रंथ व आध्यात्मिक शांति' : '🌸 Sacred Scripture & Inner Peace')}
              </span>
              <h3 className="font-extrabold text-amber-950 dark:text-slate-100 text-base sm:text-lg truncate">
                {bookTitle || modalData.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Open Real Digital Library Button */}
            <a
              href={currentBook?.onlineLibraryUrl || modalData?.onlineLibraryUrl || 'https://www.gitasupersite.iitk.ac.in/'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-200/90 hover:bg-amber-300 dark:bg-amber-950/70 dark:hover:bg-amber-900 text-amber-950 dark:text-amber-200 text-xs font-bold transition border border-amber-400/60 shadow-xs cursor-pointer shrink-0"
              title={currentBook?.onlineLibraryName || modalData?.onlineLibraryName || 'Open Online Digital Library'}
            >
              <span>🌐</span>
              <span className="hidden sm:inline">{isMarathi ? 'ऑनलाइन ग्रंथालय' : (isHindi ? 'ऑनलाइन पुस्तकालय' : 'Online Library')}</span>
              <span className="sm:hidden">ग्रंथालय</span>
              <span>↗</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-amber-100/90 dark:bg-slate-800 rounded-xl p-0.5 border border-amber-300/70 dark:border-slate-700">
              {[
                { code: 'mr', label: 'मराठी' },
                { code: 'hi', label: 'हिंदी' },
                { code: 'en', label: 'English' }
              ].map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => {
                    stopAllSpeech();
                    setLanguage(code);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    language === code 
                      ? 'bg-[#157F66] text-white shadow-xs' 
                      : 'text-amber-950 dark:text-slate-300 hover:bg-amber-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                stopAllSpeech();
                krishnaFluteAudio.stop();
                setActiveModal(null);
              }}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 rounded-full bg-amber-100 dark:bg-slate-800 hover:bg-amber-200 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── 2. Dedicated Sacred Audio Listening Deck (Easy Listen) ── */}
        <div className="my-3 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-orange-50 to-amber-50 dark:from-slate-800 dark:via-amber-950/30 dark:to-slate-800 border-2 border-amber-300/80 dark:border-amber-900/60 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Main Listen Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleToggleAudio}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl font-black text-sm transition shadow-md cursor-pointer ${
                isReadingAloud
                  ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                  : 'bg-[#157F66] hover:bg-[#116752] text-white shadow-teal-700/20'
              }`}
            >
              {isReadingAloud ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
              <span>
                {isReadingAloud 
                  ? (isMarathi ? 'ऑडिओ थांबवा' : (isHindi ? 'ऑडियो रोकें' : 'Pause Audio'))
                  : (isMarathi ? 'श्लोक ऑडिओ ऐका' : (isHindi ? 'श्लोक ऑडियो सुनें' : 'Listen to Shloka Audio'))}
              </span>
            </button>

            {/* Active Status Badge */}
            {isReadingAloud && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>
                  {readingPhase === 'sanskrit'
                    ? (isMarathi ? 'संस्कृत श्लोक सुरू आहे...' : (isHindi ? 'संस्कृत श्लोक जारी है...' : 'Chanting Sanskrit...'))
                    : (isMarathi ? 'भावार्थ वाचन सुरू...' : (isHindi ? 'भावार्थ वाचन जारी...' : 'Reading Meaning...'))}
                </span>
              </span>
            )}
          </div>

          {/* Mode Selector & Flute Ambient Sound */}
          <div className="flex items-center gap-2 flex-wrap justify-end w-full sm:w-auto">
            
            {/* Audio Mode Tabs */}
            <div className="flex items-center bg-white/90 dark:bg-slate-900 p-1 rounded-xl border border-amber-200 dark:border-slate-700 text-xs font-bold">
              {[
                { id: 'full', label: isMarathi ? '✨ संपूर्ण' : (isHindi ? '✨ संपूर्ण' : '✨ Full') },
                { id: 'sanskrit', label: isMarathi ? '🪈 केवळ श्लोक' : (isHindi ? '🪈 सिर्फ श्लोक' : '🪈 Chant Only') },
                { id: 'meaning', label: isMarathi ? '🗣️ केवळ भावार्थ' : (isHindi ? '🗣️ सिर्फ भावार्थ' : '🗣️ Meaning') }
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => {
                    stopAllSpeech();
                    setAudioMode(mode.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                    audioMode === mode.id 
                      ? 'bg-[#157F66] text-white shadow-2xs' 
                      : 'text-amber-950 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Background Flute Toggle */}
            <button
              onClick={() => setIsFlutePlaying(!isFlutePlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                isFlutePlaying
                  ? 'bg-amber-200 dark:bg-amber-900/60 border-amber-400 text-amber-950 dark:text-amber-200 shadow-2xs'
                  : 'bg-white/80 dark:bg-slate-900 border-amber-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
              title="Toggle Background Flute Sound"
            >
              <Music className={`w-3.5 h-3.5 ${isFlutePlaying ? 'text-amber-700 dark:text-amber-300 animate-spin' : ''}`} />
              <span>{isFlutePlaying ? (isMarathi ? 'बासरी चालू' : 'बांसुरी चालू') : (isMarathi ? 'बासरी संगीत' : 'बांसुरी संगीत')}</span>
            </button>

            {/* Font Zoom Controls */}
            <div className="flex items-center gap-1 bg-white/80 dark:bg-slate-900 px-1.5 py-1 rounded-xl border border-amber-200 dark:border-slate-700">
              <button
                onClick={() => setFontSize(s => Math.max(14, s - 2))}
                className="p-1 hover:bg-amber-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 cursor-pointer"
                title="Decrease font size"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">{fontSize}px</span>
              <button
                onClick={() => setFontSize(s => Math.min(26, s + 2))}
                className="p-1 hover:bg-amber-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 cursor-pointer"
                title="Increase font size"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

        {/* ── 3. Scrollable Clean Readable Shloka & Meaning Body ── */}
        <div 
          className="flex-1 overflow-y-auto py-2 px-1 sm:px-3 space-y-4 no-scrollbar"
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
        >
          {currentVerse ? (
            <div className="space-y-4">
              
              {/* Box 1: Sacred Sanskrit Shloka Frame */}
              <div className={`p-6 sm:p-7 rounded-3xl border-2 text-center transition-all duration-300 shadow-sm ${
                readingPhase === 'sanskrit'
                  ? 'bg-amber-200/80 dark:bg-amber-950/80 border-amber-500 ring-4 ring-amber-300/50 scale-[1.01]'
                  : 'bg-white/95 dark:bg-slate-800/90 border-amber-300/80 dark:border-amber-900/60'
              }`}>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-[#157F66] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-full border border-teal-200 dark:border-teal-900/50">
                    ॥ {isMarathi ? (currentBook.categoryNameMr || 'पवित्र श्लोक') : (isHindi ? (currentBook.categoryNameHi || 'पवित्र श्लोक') : 'Sacred Shloka')} • {isMarathi ? 'श्लोक' : (isHindi ? 'श्लोक' : 'Verse')} {currentVerse.number} ॥
                  </span>
                </div>

                <p className="font-extrabold text-amber-950 dark:text-amber-200 text-lg sm:text-2xl whitespace-pre-line leading-relaxed font-serif tracking-wide drop-shadow-2xs">
                  {currentVerse.sanskrit}
                </p>

                {currentVerse.transliteration && (
                  <p className="text-xs italic text-amber-800/80 dark:text-amber-400/80 mt-3 font-sans">
                    "{currentVerse.transliteration}"
                  </p>
                )}
              </div>

              {/* Box 2: Simple Meaning / Bhaavarth */}
              <div className={`p-5 sm:p-6 rounded-3xl border shadow-xs transition-all duration-300 ${
                readingPhase === 'meaning'
                  ? 'bg-teal-50 dark:bg-teal-950/70 border-teal-500 ring-4 ring-teal-200/50 scale-[1.01]'
                  : 'bg-white/90 dark:bg-slate-800/80 border-amber-200/70 dark:border-slate-700'
              }`}>
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-[#157F66] dark:text-teal-400 flex items-center gap-1.5 mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {isMarathi 
                      ? 'सरल भावार्थ (मराठी अनुवाद):' 
                      : (isHindi ? 'सरल भावार्थ (हिंदी अनुवाद):' : 'Easy Meaning (English):')}
                  </span>
                </h4>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-sans font-medium leading-relaxed whitespace-pre-line">
                  {isMarathi 
                    ? (currentVerse.meaningMr || currentVerse.meaningHi) 
                    : (isHindi ? currentVerse.meaningHi : (currentVerse.meaningEn || currentVerse.meaningHi))}
                </p>
              </div>

              {/* Box 3: Divine Maternal Guidance */}
              {(currentVerse.maternalGuidance || currentVerse.maternalGuidanceMr) && (
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-tr from-rose-50/80 to-amber-50/60 dark:from-slate-800/90 dark:to-rose-950/40 border border-rose-200/70 dark:border-rose-900/50 shadow-xs">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-rose-700 dark:text-rose-300 flex items-center gap-1.5 mb-2">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>
                      {isMarathi 
                        ? 'गर्भवती मातेसाठी दिव्य संस्कार संदेश:' 
                        : (isHindi ? 'गर्भवती माँ के लिए दिव्य आत्मिक संदेश:' : 'Divine Guidance for Expecting Mother:')}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                    {isMarathi 
                      ? (currentVerse.maternalGuidanceMr || currentVerse.maternalGuidance) 
                      : (isHindi ? currentVerse.maternalGuidance : (currentVerse.maternalGuidanceEn || currentVerse.maternalGuidance))}
                  </p>
                </div>
              )}

            </div>
          ) : isDirectContent ? (
            <div className="p-6 rounded-3xl bg-white/90 dark:bg-slate-800/90 border border-amber-200/80 dark:border-slate-700 whitespace-pre-line font-sans text-sm sm:text-base leading-relaxed text-slate-800 dark:text-slate-200">
              {modalData.contentBody}
            </div>
          ) : null}
        </div>

        {/* ── 4. Bottom Footer Navigation Bar ── */}
        <div className="pt-3 border-t border-amber-200/80 dark:border-slate-800 flex items-center justify-between gap-3 text-xs text-amber-950 dark:text-slate-300">
          
          {/* Author Name */}
          <span className="font-bold truncate max-w-[200px] sm:max-w-xs text-amber-900 dark:text-amber-400">
            {isMarathi ? (currentBook?.authorMr || currentBook?.authorHi) : (isHindi ? currentBook?.authorHi : currentBook?.authorEn)}
          </span>

          {/* Verse Pagination (if multi-verse) */}
          {totalVerses > 1 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevVerse}
                disabled={currentVerseIndex === 0}
                className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-slate-800 hover:bg-amber-200 dark:hover:bg-slate-700 disabled:opacity-40 font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{isMarathi ? 'मागील श्लोक' : (isHindi ? 'पिछला श्लोक' : 'Prev')}</span>
              </button>

              <span className="font-mono font-bold px-2">
                {currentVerseIndex + 1} / {totalVerses}
              </span>

              <button
                onClick={handleNextVerse}
                disabled={currentVerseIndex === totalVerses - 1}
                className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-slate-800 hover:bg-amber-200 dark:hover:bg-slate-700 disabled:opacity-40 font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <span className="hidden sm:inline">{isMarathi ? 'पुढील श्लोक' : (isHindi ? 'अगला श्लोक' : 'Next')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <span className="flex items-center gap-1.5 text-[#157F66] dark:text-teal-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'मनःशांती व सकारात्मक ऊर्जा' : (isHindi ? 'शांति व सकारात्मक ऊर्जा' : 'Inner Peace & Strength')}</span>
            </span>
          )}

        </div>

      </div>
    </div>
  );
}
