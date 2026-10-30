import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Wind, 
  Sparkles,
  CheckCircle2,
  Clock,
  HeartHandshake
} from 'lucide-react';

/**
 * Returns authentic, high-quality photograph of a pregnant woman practicing the exercise
 */
export function getExerciseRealPhoto(exercise) {
  if (!exercise) return '/exercise_poses/real_seated_breath.jpg';
  const id = (exercise.id || '').toLowerCase();
  const cat = (exercise.category || '').toLowerCase();
  const title = (exercise.title || '').toLowerCase();

  // 1. Savasana, resting, cooling, sleep
  if (id.includes('savasana') || id.includes('rest') || id.includes('sleep') || id.includes('cool') || title.includes('savasana') || title.includes('shavasana')) {
    return '/exercise_poses/real_side_savasana.jpg';
  }

  // 2. Malasana, squats, pelvic opening, labor prep
  if (id.includes('malasana') || id.includes('squat') || id.includes('pelvic') || cat === 'pelvic' || title.includes('squat') || title.includes('malasana')) {
    return '/exercise_poses/real_supported_squat.jpg';
  }

  // 3. Cat-cow, spine work, back relief, table-top
  if (id.includes('cat') || id.includes('cow') || id.includes('marjary') || id.includes('back') || cat === 'stretch' || title.includes('cat') || title.includes('cow')) {
    return '/exercise_poses/real_cat_cow.jpg';
  }

  // 4. Butterfly pose, seated hip openers
  if (id.includes('butterfly') || id.includes('baddha') || id.includes('titli') || title.includes('butterfly') || title.includes('baddha')) {
    return '/exercise_poses/real_butterfly.jpg';
  }

  // 5. Standing balance, tadasana, walking, tree pose, side stretch
  if (id.includes('tadasana') || id.includes('stand') || id.includes('tree') || id.includes('walk') || cat === 'walking' || title.includes('tadasana') || title.includes('stroll') || title.includes('tree')) {
    return '/exercise_poses/real_standing_stretch.jpg';
  }

  // 6. Breathing, meditation, sukhasana, pranayama
  if (id.includes('breath') || id.includes('pranayama') || id.includes('sukhasana') || cat === 'breathing' || title.includes('breath') || title.includes('pranayama')) {
    return '/exercise_poses/real_seated_breath.jpg';
  }

  return '/exercise_poses/real_seated_breath.jpg';
}

/**
 * Synthesizes a soft, harmonic meditation chime for breath transitions
 */
function playGentleChime(isExhale = false) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle singing bowl tones: 432Hz (inhale) and 324Hz (exhale)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isExhale ? 324 : 432, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.3);
  } catch {
    // Audio context may be restricted by autoplay policy
  }
}

export default function Exercise3DVisualizer({ exercise, isHindi = false, isMarathi = false }) {
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [breathPhase, setBreathPhase] = useState('inhale'); // 'inhale' | 'exhale'
  const [cycleProgress, setCycleProgress] = useState(0);

  const animRef = useRef(null);
  const lastTimeRef = useRef(Date.now());
  const prevBreathPhaseRef = useRef('inhale');

  const steps = exercise?.instructions || [
    { step: 1, title: 'Gentle Setup', titleHi: 'शुरुआती मुद्रा', desc: 'Sit or stand comfortably with relaxed shoulders and neutral spine.', descHi: 'कंधे ढीले छोड़कर सीधी मुद्रा में आराम से बैठें।' },
    { step: 2, title: 'Inhale & Prepare', titleHi: 'धीमी सांस भरें', desc: 'Inhale softly through your nose, letting your belly expand gently without strain.', descHi: 'नाक से सहज श्वास लें और पेट को बिना तनाव के फैलने दें।' },
    { step: 3, title: 'Hold & Flow', titleHi: 'सहज गति', desc: 'Maintain the gentle stretch while keeping breathing continuous and natural.', descHi: 'आसन में रहते हुए धीमी सांसें लेते रहें, सांस न रोकें।' },
    { step: 4, title: 'Exhale & Release', titleHi: 'श्वास छोड़ें व विश्राम', desc: 'Exhale softly through parted lips or nose, returning smoothly to starting position.', descHi: 'धीमी सांस छोड़ते हुए वापस शांत स्थिति में आएं।' }
  ];

  const totalSteps = steps.length;

  // Reset step index when exercise changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setCycleProgress(0);
  }, [exercise?.id]);

  // Automated step progression when playing
  useEffect(() => {
    if (!isPlaying) return;

    let progress = cycleProgress;
    let stepDurationMs = 4500 / playbackSpeed;

    const step = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      progress += (delta / (stepDurationMs * totalSteps)) * 100;
      if (progress >= 100) {
        progress = 0;
      }
      setCycleProgress(progress);

      const stepIdx = Math.min(
        totalSteps - 1,
        Math.floor((progress / 100) * totalSteps)
      );
      setCurrentStepIndex(stepIdx);

      // Inhale on first half, Exhale on second half of step
      const stepFraction = (progress / 100) * totalSteps - stepIdx;
      const currentPhase = stepFraction < 0.5 ? 'inhale' : 'exhale';
      setBreathPhase(currentPhase);

      if (currentPhase !== prevBreathPhaseRef.current) {
        prevBreathPhaseRef.current = currentPhase;
        if (!isMuted) {
          playGentleChime(currentPhase === 'exhale');
        }
      }

      animRef.current = requestAnimationFrame(step);
    };

    lastTimeRef.current = Date.now();
    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, playbackSpeed, totalSteps, isMuted]);

  const activePhoto = getExerciseRealPhoto(exercise);
  const activeStep = steps[currentStepIndex] || steps[0];

  const handleStepClick = (index) => {
    setCurrentStepIndex(index);
    setCycleProgress((index / totalSteps) * 100);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCycleProgress(0);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-md border border-slate-200/80 dark:border-slate-800 flex flex-col text-left transition-all">
      
      {/* ── 1. Top Photo Display Viewport with Real Pregnant Woman ── */}
      <div className="relative w-full h-72 sm:h-84 bg-slate-950 flex items-center justify-center overflow-hidden group">
        <img
          src={activePhoto}
          alt={exercise?.title || "Pregnancy Exercise"}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/40 pointer-events-none" />

        {/* Top-Left: Month & Safety Verification Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
            <span>{tr(`माह ${exercise?.month || 1} सुरक्षित`, `महिना ${exercise?.month || 1} सुरक्षित`, `Month ${exercise?.month || 1} Safe`)}</span>
          </span>
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-teal-500/80 backdrop-blur-md text-white text-[11px] font-bold">
            {exercise?.difficulty || 'Gentle'}
          </span>
        </div>

        {/* Top-Right: Inhale / Exhale Breathing Guidance Pill */}
        <div 
          className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-2 transition-all duration-300 backdrop-blur-md ${
            breathPhase === 'inhale'
              ? 'bg-teal-600/90 text-white shadow-teal-500/30 scale-105'
              : 'bg-rose-500/90 text-white shadow-rose-500/30 scale-100'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>
            {breathPhase === 'inhale' 
              ? tr('श्वास लें (Inhale Gently)', 'श्वास घ्या (Inhale Gently)', 'Inhale Gently') 
              : tr('श्वास छोड़ें (Exhale Softly)', 'श्वास सोडा (Exhale Softly)', 'Exhale Softly')}
          </span>
        </div>

        {/* Bottom Bar inside photo: Exercise Title and Current Step Badge */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 text-white">
          <div className="max-w-[75%]">
            <span className="text-[11px] text-teal-300 font-bold uppercase tracking-wider block">
              {tr('वास्तविक योगासन मार्गदर्शन', 'प्रत्यक्ष योगासन मार्गदर्शन', 'Real Photographic Guide')}
            </span>
            <h4 className="text-base sm:text-lg font-black text-white truncate drop-shadow-md">
              {isMarathi ? (exercise?.titleMr || exercise?.titleHi) : (isHindi ? exercise?.titleHi : exercise?.title)}
            </h4>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30 shrink-0">
            {tr(`चरण ${currentStepIndex + 1}/${totalSteps}`, `चरण ${currentStepIndex + 1}/${totalSteps}`, `Step ${currentStepIndex + 1} of ${totalSteps}`)}
          </span>
        </div>

        {/* Animated Progress Timeline */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
          <div 
            className="h-full bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 transition-all duration-100 ease-linear shadow-xs"
            style={{ width: `${cycleProgress}%` }}
          />
        </div>
      </div>

      {/* ── 2. Controls & Step Sequence Selector ── */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 space-y-4">
        
        {/* Playback Controls & Speed Toggle */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          
          <div className="flex items-center gap-2">
            {/* Play / Pause */}
            <button
              onClick={() => setIsPlaying(prev => !prev)}
              className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs ${
                isPlaying 
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 hover:bg-amber-200' 
                  : 'bg-[#157F66] text-white hover:bg-teal-700 shadow-md shadow-teal-700/20'
              }`}
              title={isPlaying ? 'Pause' : 'Play Guided Steps'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? tr('विराम', 'थांबवा', 'Pause') : tr('मार्गदर्शन चालू करें', 'सुरू करा', 'Play Steps')}</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition cursor-pointer"
              title="Reset to Step 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Breath Chime Sound Bell */}
            <button
              onClick={() => setIsMuted(prev => !prev)}
              className={`p-2 rounded-2xl transition cursor-pointer ${
                !isMuted 
                  ? 'bg-teal-50 dark:bg-teal-950/60 text-[#157F66] dark:text-teal-300 border border-teal-300 dark:border-teal-700' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600'
              }`}
              title={isMuted ? 'Turn breath chime on' : 'Mute breath chime'}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
            <span className="text-[11px] text-slate-400 px-2">{tr('गति:', 'गती:', 'Speed:')}</span>
            {[0.75, 1, 1.25].map(spd => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2.5 py-1 rounded-xl transition cursor-pointer ${
                  playbackSpeed === spd 
                    ? 'bg-white dark:bg-slate-700 text-[#157F66] dark:text-teal-300 shadow-2xs font-black' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Step Buttons Row: [Step 1] [Step 2] [Step 3] [Step 4] */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          {steps.map((st, idx) => {
            const isCurrent = currentStepIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`p-2.5 rounded-2xl text-left border transition cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#157F66] text-white border-[#157F66] shadow-md shadow-teal-700/20 scale-[1.02]'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-teal-300 hover:bg-teal-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase ${isCurrent ? 'text-teal-100' : 'text-slate-400'}`}>
                    {tr(`चरण ${idx + 1}`, `चरण ${idx + 1}`, `Step ${idx + 1}`)}
                  </span>
                  {isCurrent && <CheckCircle2 className="w-3 h-3 text-teal-200" />}
                </div>
                <span className="text-xs font-extrabold truncate mt-0.5">
                  {isMarathi ? (st.titleMr || st.titleHi) : (isHindi ? st.titleHi : st.title)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. Step Instruction Detail Card ── */}
      <div className="p-4 sm:p-5 bg-teal-50/50 dark:bg-teal-950/20 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#157F66] text-white flex items-center justify-center text-xs font-black shrink-0">
            {currentStepIndex + 1}
          </div>
          <h5 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
            {isMarathi ? (activeStep.titleMr || activeStep.titleHi) : (isHindi ? activeStep.titleHi : activeStep.title)}
          </h5>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
          {isMarathi ? (activeStep.descMr || activeStep.descHi) : (isHindi ? activeStep.descHi : activeStep.desc)}
        </p>
      </div>

    </div>
  );
}
