import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Play, 
  Pause, 
  Square,
  Volume2, 
  VolumeX, 
  SkipBack, 
  SkipForward, 
  Wind, 
  Music,
  ExternalLink,
  BookOpen,
  Sparkles,
  Headphones,
  Gauge
} from 'lucide-react';
import { krishnaFluteAudio } from '../../utils/krishnaFluteAudio';
import { maternalNarrator } from '../../utils/maternalSpeechHelper';

export default function AudioPlayerModal() {
  const { activeModal, setActiveModal, modalData, language } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);
  const [breathPhase, setBreathPhase] = useState('Inhale (श्वास लें)');
  const [volume, setVolume] = useState(70);
  
  // Audio playback mode: 'youtube' | 'synth' | 'narration'
  const [playbackMode, setPlaybackMode] = useState('narration');
  
  // Narration Voice State
  const [narrationLang, setNarrationLang] = useState(language || 'mr');
  const [narrationProgress, setNarrationProgress] = useState(0);
  const [currentSentence, setCurrentSentence] = useState('');
  const [narrationSpeed, setNarrationSpeed] = useState(0.9);
  const [isNarrating, setIsNarrating] = useState(false);
  const [isNarrationPaused, setIsNarrationPaused] = useState(false);

  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';

  // Get active content to read for the selected voice language
  const getContentToRead = (targetLang) => {
    if (!modalData) return '';
    const l = targetLang || narrationLang;
    if (l === 'mr') {
      return modalData.contentMr || modalData.content || modalData.descriptionMr || modalData.description || modalData.titleMr || modalData.title;
    }
    if (l === 'hi') {
      return modalData.contentHi || modalData.content || modalData.descriptionHi || modalData.description || modalData.titleHi || modalData.title;
    }
    return modalData.contentEn || modalData.content || modalData.descriptionEn || modalData.description || modalData.titleEn || modalData.title;
  };

  // Sync mode when modalData changes
  useEffect(() => {
    if (activeModal === 'audioPlayer' && modalData) {
      setIsPlaying(true);
      const defaultLang = language || 'mr';
      setNarrationLang(defaultLang);
      
      // Determine initial playback mode
      if (modalData.preferredMode === 'narration' || modalData.content || modalData.contentMr) {
        setPlaybackMode('narration');
        krishnaFluteAudio.stop();
        startNarration(defaultLang, narrationSpeed);
      } else if (modalData.youtubeId) {
        setPlaybackMode('youtube');
        krishnaFluteAudio.stop();
        maternalNarrator.stop();
      } else {
        setPlaybackMode('synth');
        krishnaFluteAudio.start({ volume: volume / 100 });
        maternalNarrator.stop();
      }
    } else {
      krishnaFluteAudio.stop();
      maternalNarrator.stop();
      setIsNarrating(false);
    }

    return () => {
      krishnaFluteAudio.stop();
      maternalNarrator.stop();
      setIsNarrating(false);
    };
  }, [activeModal, modalData]);

  // Handle synth playback when in 'synth' mode
  useEffect(() => {
    if (activeModal === 'audioPlayer' && modalData) {
      if (playbackMode === 'synth') {
        if (isPlaying) {
          krishnaFluteAudio.start({ volume: volume / 100 });
        } else {
          krishnaFluteAudio.stop();
        }
      } else {
        krishnaFluteAudio.stop();
      }
    }
  }, [activeModal, modalData, playbackMode, isPlaying]);

  // Sync volume with synth
  useEffect(() => {
    krishnaFluteAudio.setVolume(volume / 100);
  }, [volume]);

  // Start Voice Narration
  const startNarration = (langToUse, speedToUse) => {
    const l = langToUse || narrationLang;
    const spd = speedToUse || narrationSpeed;
    const textToSpeak = getContentToRead(l);

    if (!textToSpeak) return;

    krishnaFluteAudio.stop();
    setIsNarrating(true);
    setIsNarrationPaused(false);

    maternalNarrator.speak({
      text: textToSpeak,
      language: l,
      rate: spd,
      onProgress: ({ progress, currentChunk }) => {
        setNarrationProgress(progress);
        setCurrentSentence(currentChunk);
      },
      onEnd: () => {
        setIsNarrating(false);
        setIsNarrationPaused(false);
        setNarrationProgress(100);
      }
    });
  };

  const pauseNarration = () => {
    maternalNarrator.pause();
    setIsNarrationPaused(true);
  };

  const resumeNarration = () => {
    maternalNarrator.resume();
    setIsNarrationPaused(false);
  };

  const stopNarration = () => {
    maternalNarrator.stop();
    setIsNarrating(false);
    setIsNarrationPaused(false);
    setNarrationProgress(0);
    setCurrentSentence('');
  };

  const handleSpeedChange = (speed) => {
    setNarrationSpeed(speed);
    maternalNarrator.setRate(speed);
  };

  // Breathing cycle animation text for breathing type
  useEffect(() => {
    if (modalData?.type === 'breathing') {
      const breathInterval = setInterval(() => {
        setBreathPhase(prev => {
          if (prev.includes('Inhale')) {
            return isMarathi ? 'Hold (श्वास रोखून धरा)' : (isHindi ? 'Hold (श्वास रोकें)' : 'Hold breath');
          }
          if (prev.includes('Hold')) {
            return isMarathi ? 'Exhale (हळूच श्वास सोडा)' : (isHindi ? 'Exhale (श्वास धीरे-धीरे छोड़ें)' : 'Exhale slowly');
          }
          return isMarathi ? 'Inhale (दीर्घ श्वास घ्या)' : (isHindi ? 'Inhale (गहरी श्वास लें)' : 'Inhale deeply');
        });
      }, 4000);
      return () => clearInterval(breathInterval);
    }
  }, [modalData, language, isHindi, isMarathi]);

  if (activeModal !== 'audioPlayer' || !modalData) return null;

  const isBreathing = modalData.type === 'breathing';

  const modalTitle = isMarathi 
    ? (modalData.titleMr || modalData.titleHi || modalData.title) 
    : (isHindi ? (modalData.titleHi || modalData.title) : modalData.title);

  const modalDesc = isMarathi 
    ? (modalData.descriptionMr || modalData.descriptionHi || modalData.description) 
    : (isHindi ? (modalData.descriptionHi || modalData.description) : modalData.description);

  const handleClose = () => {
    setIsPlaying(false);
    krishnaFluteAudio.stop();
    maternalNarrator.stop();
    setIsNarrating(false);
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-[32px] max-w-lg w-full p-5 sm:p-6 shadow-2xl relative border border-teal-100 dark:border-slate-800 flex flex-col items-center transition-colors text-left max-h-[92vh] overflow-y-auto">
        
        {/* Top Header Status & Close */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-[#157F66] dark:text-teal-400">
              <Headphones className="w-4 h-4 animate-pulse" />
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-500 block">
                {isMarathi ? 'लर्निंग गार्डन ऑडिओ' : (isHindi ? 'लर्निंग गार्डन ऑडियो' : 'Learning Garden Audio')}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {modalData.type === 'breathing' 
                  ? (isMarathi ? 'श्वासोच्छ्वास ध्यान' : 'प्राणायाम ध्यान') 
                  : (isMarathi ? 'मराठी व त्रिभाषी ऑडिओ केंद्र' : 'बहुभाषी ऑडियो केंद्र')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {modalData.youtubeUrl && (
              <a
                href={modalData.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 px-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold flex items-center gap-1 transition shadow-xs"
                title="Open on YouTube"
              >
                <span>YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <button
              onClick={handleClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Source Mode Switcher Tabs ── */}
        <div className="w-full grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl my-3 text-xs font-bold">
          
          {/* 1. Marathi Voice Narration Mode */}
          <button
            onClick={() => {
              setPlaybackMode('narration');
              krishnaFluteAudio.stop();
              startNarration(narrationLang, narrationSpeed);
            }}
            className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1 text-[11px] cursor-pointer ${
              playbackMode === 'narration'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <span>🎙️</span>
            <span>{isMarathi ? 'मराठी आवाज' : 'आवाज वाचन'}</span>
          </button>

          {/* 2. Flute / Soothing Synth Mode */}
          <button
            onClick={() => {
              setPlaybackMode('synth');
              setIsPlaying(true);
              maternalNarrator.stop();
              setIsNarrating(false);
              krishnaFluteAudio.start({ volume: volume / 100 });
            }}
            className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1 text-[11px] cursor-pointer ${
              playbackMode === 'synth'
                ? 'bg-[#157F66] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <span>🪈</span>
            <span>{isMarathi ? 'बासरी धून' : 'बांसुरी धून'}</span>
          </button>

          {/* 3. YouTube Stream Mode */}
          <button
            onClick={() => {
              setPlaybackMode('youtube');
              krishnaFluteAudio.stop();
              maternalNarrator.stop();
              setIsNarrating(false);
            }}
            className={`py-2 px-2 rounded-xl transition flex items-center justify-center gap-1 text-[11px] cursor-pointer ${
              playbackMode === 'youtube'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            <span>YouTube</span>
          </button>
        </div>

        {/* ── Mode 1: VOICE NARRATION (मराठी आवाज वाचन) ── */}
        {playbackMode === 'narration' && (
          <div className="w-full bg-rose-50/50 dark:bg-slate-800/60 p-4 rounded-3xl border border-rose-100 dark:border-slate-700 my-2 space-y-3">
            
            {/* Language Selector for Voice */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-rose-500" />
                <span>{isMarathi ? 'वाचनाची भाषा निवडा:' : 'Voice Language:'}</span>
              </span>
              <div className="flex items-center gap-1">
                {[
                  { code: 'mr', label: 'मराठी' },
                  { code: 'hi', label: 'हिंदी' },
                  { code: 'en', label: 'English' }
                ].map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setNarrationLang(l.code);
                      startNarration(l.code, narrationSpeed);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                      narrationLang === l.code
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Speaking Status Banner */}
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full bg-rose-500 ${isNarrating && !isNarrationPaused ? 'animate-ping' : ''}`} />
                  <span>
                    {isNarrating 
                      ? (isNarrationPaused ? (isMarathi ? 'वाचन थांबवले आहे (Paused)' : 'Paused') : (isMarathi ? 'मराठी आवाज वाचन सुरू आहे...' : 'Speaking content...'))
                      : (isMarathi ? 'वाचन पूर्ण झाले' : 'Ready to listen')}
                  </span>
                </span>
                <span className="font-mono text-[11px] font-bold text-slate-500">
                  {narrationProgress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full transition-all duration-300"
                  style={{ width: `${narrationProgress}%` }}
                />
              </div>

              {/* Live sentence reading snippet */}
              <p className="text-[11px] text-slate-600 dark:text-slate-400 italic line-clamp-2 min-h-[30px] pt-1">
                {currentSentence || modalDesc || (isMarathi ? 'मराठीत ऑडिओ ऐकण्यासाठी खालील प्ले बटण दाबा.' : 'Press play to listen.')}
              </p>
            </div>

            {/* Narration Controls: Play/Pause/Stop & Speed */}
            <div className="flex items-center justify-between gap-3 pt-1">
              
              <div className="flex items-center gap-2">
                {!isNarrating ? (
                  <button
                    onClick={() => startNarration(narrationLang, narrationSpeed)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-600/20 transition cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isMarathi ? 'मराठीत ऐका' : 'Play Voice'}</span>
                  </button>
                ) : isNarrationPaused ? (
                  <button
                    onClick={resumeNarration}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>{isMarathi ? 'सुरू ठेवा' : 'Resume'}</span>
                  </button>
                ) : (
                  <button
                    onClick={pauseNarration}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer"
                  >
                    <Pause className="w-4 h-4" />
                    <span>{isMarathi ? 'थांबवा' : 'Pause'}</span>
                  </button>
                )}

                <button
                  onClick={stopNarration}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-red-600 transition cursor-pointer"
                  title="Stop Narration"
                >
                  <Square className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Buttons */}
              <div className="flex items-center gap-1 text-[10px] font-bold">
                {[
                  { speed: 0.85, label: isMarathi ? 'शांत' : 'Slow' },
                  { speed: 1.0, label: '1.0x' },
                  { speed: 1.15, label: isMarathi ? 'जलद' : 'Fast' }
                ].map(s => (
                  <button
                    key={s.speed}
                    onClick={() => handleSpeedChange(s.speed)}
                    className={`px-2 py-1 rounded-lg border transition cursor-pointer ${
                      narrationSpeed === s.speed
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ── Mode 2: Real YouTube Player Embed ── */}
        {playbackMode === 'youtube' && modalData.youtubeId && (
          <div className="w-full my-2 rounded-2xl overflow-hidden bg-black shadow-lg aspect-video relative">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${modalData.youtubeId}?autoplay=1&controls=1&modestbranding=1&rel=0&playsinline=1`}
              title={modalTitle}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        {/* ── Mode 3: Flute / Synth Visual ── */}
        {playbackMode === 'synth' && (
          <div className="w-full flex flex-col items-center">
            <div className={`w-28 h-28 rounded-3xl bg-linear-to-br ${modalData.bgGradient || 'from-teal-500 to-emerald-600'} flex flex-col items-center justify-center text-white text-4xl shadow-xl shadow-teal-100 dark:shadow-none my-3 relative overflow-hidden`}>
              <span>{modalData.icon || '🌸'}</span>
              {isPlaying && (
                <div className="absolute inset-0 bg-white/20 animate-ping opacity-30 rounded-3xl pointer-events-none" />
              )}
            </div>

            {/* Audio Mode Active Indicator */}
            <div className="mb-2 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900/60 rounded-full text-[11px] font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>
                {isMarathi ? '🪈 श्रीकृष्णाची बासरी व तानपुरा धून' : '🪈 श्रीकृष्ण बांसुरी व तानपुरा संगीत'}
              </span>
            </div>

            {/* Play/Pause Buttons */}
            <div className="flex items-center justify-center gap-6 my-2">
              <button
                onClick={() => setProgress(p => Math.max(0, p - 10))}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-[#157F66] hover:bg-[#0e5947] text-white flex items-center justify-center shadow-lg shadow-teal-200 dark:shadow-none transition transform active:scale-95"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              <button
                onClick={() => setProgress(p => Math.min(100, p + 10))}
                className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Volume Slider */}
            <div className="w-full flex items-center justify-between gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 mt-2">
              <Volume2 className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#157F66]"
              />
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 w-8 text-right">{volume}%</span>
            </div>
          </div>
        )}

        {/* Breathing Guide Cue */}
        {isBreathing && (
          <div className="my-2 px-4 py-1.5 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900/50 rounded-full text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-spin" />
            <span>{breathPhase}</span>
          </div>
        )}

        {/* Track Title */}
        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-center text-base line-clamp-1 w-full mt-2">
          {modalTitle}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-0.5">
          {modalData.author || "GarbhaSaathi Wellness Audio"}
        </p>

        {/* Online Library External Link */}
        {modalData.onlineLibraryUrl && (
          <div className="w-full flex justify-center mt-3">
            <a
              href={modalData.onlineLibraryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1.5 px-3 rounded-full text-xs font-bold flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 transition"
            >
              <span>🌐</span>
              <span>{isMarathi ? 'अधिकृत डिजिटल ग्रंथालय ↗' : 'डिजिटल पुस्तकालय ↗'}</span>
            </a>
          </div>
        )}

        {/* Description Excerpt */}
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3 line-clamp-2 px-2 bg-slate-50 dark:bg-slate-800/80 py-2 rounded-xl w-full">
          {modalDesc}
        </p>

      </div>
    </div>
  );
}
