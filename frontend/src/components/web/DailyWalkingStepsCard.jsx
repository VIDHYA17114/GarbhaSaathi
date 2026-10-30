import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import api from '../../services/api';
import { 
  Footprints, 
  Play, 
  Pause, 
  Square, 
  RotateCcw, 
  CheckCircle2, 
  Flame, 
  Clock, 
  MapPin, 
  Sparkles, 
  X, 
  Target, 
  Heart, 
  Droplet,
  History,
  TrendingUp,
  AlertCircle,
  Satellite,
  Compass,
  Smartphone,
  Trash2,
  Settings2,
  Zap,
  Award,
  BatteryCharging,
  Activity,
  BarChart2,
  ShieldCheck
} from 'lucide-react';

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDuration(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  
  const pad = (n) => String(n).padStart(2, '0');
  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

function calculateHaversineMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function playCompletionChime() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') ctx.resume();

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + i * 0.12 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.12 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.7);
    });
  } catch { /* ignore */ }
}

export default function DailyWalkingStepsCard() {
  const { language } = useApp();
  const isHindi = language === 'hi';
  const isMarathi = language === 'mr';
  const tr = (hi, mr, en) => isMarathi ? (mr || hi) : (isHindi ? hi : en);

  const todayStr = getTodayStr();

  // ── Cumulative Daily Data (Leap Fitness Group Step Counter) ──
  const [totalStepsToday, setTotalStepsToday] = useState(0);
  const [totalKmToday, setTotalKmToday] = useState('0.00');
  const [totalMinutesToday, setTotalMinutesToday] = useState(0);
  const [stepGoal, setStepGoal] = useState(4000);
  const [todaySessions, setTodaySessions] = useState([]);
  
  // Modal & Goal Settings
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGoalPicker, setShowGoalPicker] = useState(false);
  const [completionBanner, setCompletionBanner] = useState(null);

  // ── Live Active Workout Session (Step Counter - Pedometer) ──
  const [isWalking, setIsWalking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sessionSteps, setSessionSteps] = useState(0);
  const [sessionKm, setSessionKm] = useState('0.00');
  const [sessionCalories, setSessionCalories] = useState(0);
  const [sessionSpeedKmh, setSessionSpeedKmh] = useState('0.0');
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [stepFlash, setStepFlash] = useState(false);

  // ── True Human Physical Motion Sensing State ──
  // isHumanWalking is true ONLY when physical footsteps are actively being sensed
  const [isHumanWalking, setIsHumanWalking] = useState(false);
  const [motionEnergy, setMotionEnergy] = useState('0.00');
  const [sensorStatus, setSensorStatus] = useState('standby'); // 'standby' | 'sensing' | 'no_hardware'
  const [sensorSensitivity, setSensorSensitivity] = useState('normal'); // 'normal' | 'high' | 'low'

  // ── Battery-Friendly Built-in Sensor vs GPS ──
  const [enableGps, setEnableGps] = useState(false);
  const [gpsStatus, setGpsStatus] = useState('idle');
  const [gpsAccuracy, setGpsAccuracy] = useState(null);
  const [lastCoords, setLastCoords] = useState(null);

  const timerRef = useRef(null);
  const watchIdRef = useRef(null);
  const lastPositionRef = useRef(null);
  const totalGpsMetersRef = useRef(0);
  const sessionStepsRef = useRef(0);
  const lastStepTimeRef = useRef(0);
  const hasValleyRef = useRef(false);
  const gravityBaselineRef = useRef(9.8);
  const motionEventCountRef = useRef(0);

  // Keep ref synchronized
  useEffect(() => {
    sessionStepsRef.current = sessionSteps;
  }, [sessionSteps]);

  // Load Today's Data
  const loadTodayData = useCallback(async () => {
    try {
      const res = await api.getActivitySteps(todayStr);
      if (res?.data) {
        setTotalStepsToday(res.data.step_count || res.data.steps || 0);
        setTotalKmToday(res.data.distance_km || '0.00');
        setTotalMinutesToday(res.data.active_minutes || 0);
        setStepGoal(res.data.step_goal || 4000);
      }
    } catch { /* ignore */ }

    try {
      const saved = localStorage.getItem('garbhasaathi_walking_sessions');
      if (saved) {
        const all = JSON.parse(saved);
        const forToday = all.filter(s => s.date === todayStr);
        setTodaySessions(forToday);
      }
    } catch { /* ignore */ }
  }, [todayStr]);

  useEffect(() => {
    loadTodayData();
  }, [loadTodayData]);

  // ── Sensed Step Handler (Called ONLY when physical human footstep is sensed!) ──
  const registerSensedStep = useCallback((count = 1) => {
    const now = Date.now();
    lastStepTimeRef.current = now;
    setIsHumanWalking(true);

    setSessionSteps(prev => {
      const next = prev + count;
      const distKm = Math.max(totalGpsMetersRef.current / 1000, next * 0.00075).toFixed(2);
      setSessionKm(distKm);
      return next;
    });

    setStepFlash(true);
    setTimeout(() => setStepFlash(false), 220);

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try { navigator.vibrate(25); } catch { /* ignore */ }
    }
  }, []);

  // ── Physical Accelerometer Sensor (Senses Actual Human Walking Motion) ──
  useEffect(() => {
    if (!isWalking || isPaused) return;

    motionEventCountRef.current = 0;
    // Peak threshold (impact of foot strike)
    const peakThreshold = sensorSensitivity === 'high' ? 1.15 : sensorSensitivity === 'low' ? 2.2 : 1.45;
    // Valley threshold (foot lift / weight transfer)
    const valleyThreshold = sensorSensitivity === 'high' ? 0.6 : 0.85;

    const handleDeviceMotion = (e) => {
      const accLin = e.acceleration;
      const accWithG = e.accelerationIncludingGravity;

      motionEventCountRef.current += 1;
      if (motionEventCountRef.current >= 2) {
        setSensorStatus('sensing');
      }

      let dynamicForce = 0;

      // Prefer linear acceleration (pure motion without gravity)
      if (accLin && accLin.x != null && (accLin.x !== 0 || accLin.y !== 0 || accLin.z !== 0)) {
        dynamicForce = Math.sqrt(accLin.x * accLin.x + accLin.y * accLin.y + accLin.z * accLin.z);
      } 
      // Otherwise calculate deviation from low-pass filtered gravity baseline (~9.8 m/s²)
      else if (accWithG && accWithG.x != null) {
        const rawMag = Math.sqrt(accWithG.x * accWithG.x + accWithG.y * accWithG.y + accWithG.z * accWithG.z);
        gravityBaselineRef.current = 0.88 * gravityBaselineRef.current + 0.12 * rawMag;
        dynamicForce = Math.abs(rawMag - gravityBaselineRef.current);
      } else {
        return;
      }

      setMotionEnergy(dynamicForce.toFixed(2));

      const now = Date.now();

      // Footstep Valley: Weight transfer dip during stride
      if (dynamicForce < valleyThreshold) {
        hasValleyRef.current = true;
      }

      // Footstep Peak: Heel strike ground impact
      if (dynamicForce > peakThreshold && hasValleyRef.current) {
        const dt = now - lastStepTimeRef.current;
        // Natural human walking cadence: ~280ms to 2000ms per step
        if (dt >= 280) {
          hasValleyRef.current = false;
          registerSensedStep(1);
        }
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion, { passive: true });

    // Check if device lacks hardware accelerometer (e.g. desktop PC without motion sensor)
    const hwTimeout = setTimeout(() => {
      if (motionEventCountRef.current === 0) {
        setSensorStatus('no_hardware');
      }
    }, 2500);

    return () => {
      clearTimeout(hwTimeout);
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [isWalking, isPaused, sensorSensitivity, registerSensedStep]);

  // ── Optional GPS Watcher (Senses real physical displacement outdoors) ──
  useEffect(() => {
    if (!enableGps || !isWalking || isPaused) {
      if (watchIdRef.current != null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
      return;
    }

    if (typeof window === 'undefined' || !navigator.geolocation) {
      setGpsStatus('unavailable');
      return;
    }

    setGpsStatus('requesting');
    lastPositionRef.current = null;

    try {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          setGpsStatus('active');
          const { latitude, longitude, accuracy } = pos.coords;
          setGpsAccuracy(Math.round(accuracy));
          setLastCoords({ lat: latitude.toFixed(4), lng: longitude.toFixed(4) });

          if (isWalking && !isPaused && lastPositionRef.current) {
            const prevLat = lastPositionRef.current.lat;
            const prevLng = lastPositionRef.current.lng;
            const distMeters = calculateHaversineMeters(prevLat, prevLng, latitude, longitude);

            if (distMeters >= 2.0 && distMeters < 120 && accuracy <= 50) {
              totalGpsMetersRef.current += distMeters;
              const gpsKm = (totalGpsMetersRef.current / 1000).toFixed(2);
              setSessionKm(gpsKm);

              // Register steps from actual physical displacement over ground
              const realGpsSteps = Math.round(distMeters / 0.74);
              if (realGpsSteps > 0) {
                registerSensedStep(realGpsSteps);
              }
            }
          }
          lastPositionRef.current = { lat: latitude, lng: longitude, time: pos.timestamp };
        },
        () => setGpsStatus('denied'),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
      );
      watchIdRef.current = id;
    } catch {
      setGpsStatus('unavailable');
    }

    return () => {
      if (watchIdRef.current != null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
      }
    };
  }, [enableGps, isWalking, isPaused, registerSensedStep]);

  // ── Master Session Timer Engine ──
  // 1. Time ALWAYS proceeds continuously (records total active duration).
  // 2. Steps are NEVER incremented by the timer! Steps are ONLY counted by the sensor above.
  // 3. If human stops walking (no step sensed in last 2.2 seconds):
  //    - isHumanWalking becomes false
  //    - speed drops to 0.0 km/h
  //    - steps remain completely frozen
  //    - session timer keeps running!
  useEffect(() => {
    if (isWalking && !isPaused) {
      timerRef.current = setInterval(() => {
        // Active walk duration ALWAYS proceeds!
        setSessionSeconds(prevSec => {
          const nextSec = prevSec + 1;
          
          // Accurate calorie burn (approx 3.4 kcal / min for walking)
          const cals = Math.round((nextSec / 60) * 3.4);
          setSessionCalories(cals);

          return nextSec;
        });

        // Stillness Check: Has human stopped walking?
        const now = Date.now();
        const timeSinceLastStep = now - lastStepTimeRef.current;

        if (lastStepTimeRef.current > 0 && timeSinceLastStep > 2200) {
          // No steps sensed for over 2.2s -> User is standing still!
          setIsHumanWalking(false);
          setSessionSpeedKmh('0.0');
        } else if (lastStepTimeRef.current > 0) {
          // Actively walking!
          setIsHumanWalking(true);
          const currentKm = Math.max(totalGpsMetersRef.current / 1000, sessionStepsRef.current * 0.00075);
          const hrs = sessionSeconds / 3600;
          if (hrs > 0) {
            const spd = Math.min(6.0, Math.max(2.0, (currentKm / hrs))).toFixed(1);
            setSessionSpeedKmh(spd);
          } else {
            setSessionSpeedKmh('3.2');
          }
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isWalking, isPaused, sessionSeconds]);

  // Spacebar keyboard listener: simulates physical footstep (useful for testing on desktop)
  useEffect(() => {
    if (!isWalking || isPaused || !isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        registerSensedStep(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWalking, isPaused, isModalOpen, registerSensedStep]);

  // ── Session Controls ──

  const handleStartWalk = async () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      try { 
        const state = await DeviceMotionEvent.requestPermission();
        if (state === 'granted') setSensorStatus('sensing');
      } catch { /* ignore */ }
    }

    const now = new Date();
    setSessionStartTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setSessionSeconds(0);
    setSessionSteps(0);
    setSessionKm('0.00');
    setSessionCalories(0);
    setSessionSpeedKmh('0.0');
    totalGpsMetersRef.current = 0;
    lastPositionRef.current = null;
    lastStepTimeRef.current = 0;
    hasValleyRef.current = false;
    gravityBaselineRef.current = 9.8;
    motionEventCountRef.current = 0;
    setIsHumanWalking(false);
    setIsWalking(true);
    setIsPaused(false);
    setIsModalOpen(true);
  };

  const handlePauseWalk = () => {
    setIsPaused(true);
    setIsHumanWalking(false);
  };

  const handleResumeWalk = () => {
    setIsPaused(false);
  };

  const handleFinishWalk = async () => {
    if (!isWalking) return;

    setIsWalking(false);
    setIsPaused(false);
    setIsHumanWalking(false);
    if (timerRef.current) clearInterval(timerRef.current);

    const now = new Date();
    const endTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const finalSteps = sessionSteps;
    const finalKm = parseFloat(sessionKm) || 0;
    const finalMins = Math.max(1, Math.round(sessionSeconds / 60));

    const newTotalSteps = totalStepsToday + finalSteps;
    const newTotalKm = (parseFloat(totalKmToday) + finalKm).toFixed(2);
    const newTotalMins = totalMinutesToday + finalMins;

    setTotalStepsToday(newTotalSteps);
    setTotalKmToday(newTotalKm);
    setTotalMinutesToday(newTotalMins);

    const newSession = {
      id: `walk_${Date.now()}`,
      date: todayStr,
      startTime: sessionStartTime || endTime,
      endTime,
      durationSeconds: sessionSeconds,
      durationFormatted: formatDuration(sessionSeconds),
      durationMinutes: finalMins,
      steps: finalSteps,
      distanceKm: sessionKm,
      calories: sessionCalories,
      speedKmh: sessionSpeedKmh,
      created_at: new Date().toISOString()
    };

    try {
      const saved = localStorage.getItem('garbhasaathi_walking_sessions');
      const all = saved ? JSON.parse(saved) : [];
      all.unshift(newSession);
      localStorage.setItem('garbhasaathi_walking_sessions', JSON.stringify(all));
      setTodaySessions(prev => [newSession, ...prev]);
    } catch { /* ignore */ }

    try {
      await api.saveActivitySteps({
        date: todayStr,
        step_count: newTotalSteps,
        step_goal: stepGoal,
        distance_km: newTotalKm,
        active_minutes: newTotalMins
      });
    } catch { /* ignore */ }

    playCompletionChime();
    setCompletionBanner({
      durationFormatted: formatDuration(sessionSeconds),
      distanceKm: sessionKm,
      steps: finalSteps
    });

    setTimeout(() => {
      setCompletionBanner(null);
    }, 6000);
  };

  const handleCancelWalk = () => {
    if (window.confirm(tr('क्या आप इस वॉक सत्र को रद्द करना चाहती हैं?', 'तुम्हाला हे सत्र रद्द करायचे आहे का?', 'Cancel this walking session?'))) {
      setIsWalking(false);
      setIsPaused(false);
      setIsHumanWalking(false);
      if (timerRef.current) clearInterval(timerRef.current);
      setSessionSeconds(0);
      setSessionSteps(0);
      setSessionKm('0.00');
    }
  };

  const handleClearHistory = () => {
    if (window.confirm(tr('क्या आप आज के सभी वॉक सत्र और कदम रीसेट करना चाहती हैं?', 'तुम्हाला आजचे सर्व चालण्याचे सत्र रीसेट करायचे आहेत का?', "Reset today's activity history and steps?"))) {
      try {
        localStorage.removeItem('garbhasaathi_walking_sessions');
        setTodaySessions([]);
        setTotalStepsToday(0);
        setTotalKmToday('0.00');
        setTotalMinutesToday(0);
        api.saveActivitySteps({
          date: todayStr,
          step_count: 0,
          step_goal: stepGoal,
          distance_km: '0.00',
          active_minutes: 0
        });
      } catch { /* ignore */ }
    }
  };

  const handleSetGoal = (goal) => {
    setStepGoal(goal);
    setShowGoalPicker(false);
    api.saveActivitySteps({
      date: todayStr,
      step_count: totalStepsToday,
      step_goal: goal,
      distance_km: totalKmToday,
      active_minutes: totalMinutesToday
    });
  };

  // ── Leap Fitness Group Arc Calculations ──
  const displaySteps = isWalking ? (totalStepsToday + sessionSteps) : totalStepsToday;
  const currentTotalMins = isWalking ? (totalMinutesToday + Math.round(sessionSeconds / 60)) : totalMinutesToday;
  const pct = stepGoal > 0 ? Math.min(100, Math.round((displaySteps / stepGoal) * 100)) : 0;

  // Leap Fitness Circular Gauge (r = 92)
  const radius = 92;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <>
      {/* ── 1. Compact Dashboard Card View (Step Counter - Pedometer) ── */}
      <div 
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsModalOpen(true); } }}
        className={`w-full rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative overflow-hidden shadow-xs hover:shadow-md ${
          isWalking 
            ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-white dark:from-slate-800 dark:via-emerald-950/30 dark:to-slate-800 border-2 border-emerald-400 dark:border-emerald-500 ring-4 ring-emerald-200/50 dark:ring-emerald-900/40' 
            : 'bg-white dark:bg-slate-800/90 border border-teal-200/80 dark:border-slate-700/80 hover:border-teal-300'
        }`}
      >
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs transition-transform ${
              isWalking 
                ? (isHumanWalking ? 'bg-[#00E676] text-slate-900 font-bold animate-bounce' : 'bg-amber-400 text-slate-900 font-bold')
                : 'bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900 text-[#157F66] dark:text-teal-400'
            }`}>
              <Footprints className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-snug">
                  {tr('स्टेप काउंटर – पेडोमीटर', 'स्टेप काउंटर – पेडोमीटर', 'Step Counter - Pedometer')}
                </h4>
                <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-800 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300">
                  <Zap className="w-2.5 h-2.5 text-emerald-600 fill-current" />
                  <span>Leap Fitness</span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {tr('बिल्ट-इन मोशन सेंसर आधारित वास्तविक कदम ट्रैकर', 'अंगभूत सेन्सर आधारित पावले ट्रॅकर', 'Built-in Sensor Physical Step Tracker')}
              </p>
            </div>
          </div>

          {isWalking ? (
            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-slate-950 text-[11px] font-black shadow-xs ${
              isPaused 
                ? 'bg-amber-400' 
                : (isHumanWalking ? 'bg-[#00E676] animate-pulse' : 'bg-amber-300')
            }`}>
              <span className="w-2 h-2 rounded-full bg-slate-950" />
              <span>
                {isPaused 
                  ? 'Paused' 
                  : (isHumanWalking ? tr('🟢 कदम सेंस हो रहे हैं', '🟢 पावले मोजत आहे', '🟢 Sensed Walking') : tr('⏸️ रुके हैं (समय चालू)', '⏸️ थांबले', '⏸️ Still (Time Running)'))}
              </span>
            </span>
          ) : (
            <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-100 dark:border-teal-900/60">
              {pct}% {tr('पूर्ण', 'पूर्ण', 'done')}
            </span>
          )}
        </div>

        {isWalking && (
          <div className="mb-3 p-3 rounded-2xl bg-emerald-100/80 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-950 dark:text-emerald-200 font-bold">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700 animate-spin" />
              <span className="font-mono text-sm font-black">{formatDuration(sessionSeconds)}</span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span>📍 {sessionKm} km</span>
              <span className={`px-2 py-0.5 rounded-md transition-colors ${stepFlash ? 'bg-emerald-400 text-white' : ''}`}>
                👣 {sessionSteps} {tr('कदम', 'पावले', 'steps')}
              </span>
            </div>
          </div>
        )}

        {/* Middle Stats */}
        <div className="space-y-2 mb-4">
          <div className="flex items-baseline justify-between text-slate-900 dark:text-slate-100">
            <div>
              <span className="text-2xl sm:text-3xl font-black text-[#157F66] dark:text-teal-300 tracking-tight">
                {displaySteps.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold ml-1.5">
                / {stepGoal.toLocaleString()} {tr('कदम लक्ष्य', 'पावले ध्येय', 'goal')}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {totalKmToday} km
              </span>
              <span className="text-[10px] text-slate-400 block font-medium">
                {currentTotalMins} {tr('मिनट वॉक', 'मिनिटे चालणे', 'mins active')}
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#157F66] via-teal-500 to-[#00E676] rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-700/70 flex items-center gap-2">
          {isWalking ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <span>{tr('वॉक सत्र देखें (कदम व गति)', 'सत्र पहा', 'View Live Step Counter')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleStartWalk();
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#157F66] to-teal-700 hover:from-[#116752] hover:to-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-teal-700/25 transition cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{tr('कदम शुरू करें (Start Walk)', 'पावले सुरू करा (Start Walk)', 'Start Walk (Live Counter)')}</span>
            </button>
          )}
        </div>
      </div>

      {/* ── 2. Full Leap Fitness Group "Step Counter - Pedometer" Experience Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-[38px] max-w-lg w-full p-6 sm:p-7 shadow-2xl border-2 border-teal-200 dark:border-teal-900/60 relative flex flex-col text-left space-y-4 max-h-[96vh] overflow-y-auto no-scrollbar"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-full transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Exact Leap Fitness Group Header Banner */}
            <div className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-[#157F66] dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                  <Footprints className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-slate-100 text-xl tracking-tight leading-none">
                    Step Counter - Pedometer
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
                      Leap Fitness Group
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-800 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      <BatteryCharging className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{tr('100% फ्री • नो GPS जरूरी', 'कमी बॅटरी', 'No GPS • Low Battery')}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Goal Button */}
              <button
                type="button"
                onClick={() => setShowGoalPicker(!showGoalPicker)}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer hover:bg-slate-200 transition"
              >
                <Target className="w-3.5 h-3.5 text-[#157F66]" />
                <span>{stepGoal.toLocaleString()}</span>
              </button>
            </div>

            {/* Quick Goal Selector Popover */}
            {showGoalPicker && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2 animate-in slide-in-from-top-2 duration-150">
                <span className="text-[11px] font-extrabold text-slate-600 dark:text-slate-300 block">
                  {tr('दैनिक कदम लक्ष्य चुनें (Daily Goal):', 'दैनिक पावले ध्येय निवडा:', 'Choose Daily Step Goal:')}
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[3000, 4000, 5000, 6000].map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleSetGoal(g)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-black transition cursor-pointer ${
                        stepGoal === g 
                          ? 'bg-[#157F66] text-white shadow-xs' 
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {g.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Completion Celebration Banner */}
            {completionBanner && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-400 text-emerald-950 dark:text-emerald-200 text-center space-y-0.5 animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-black text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{tr('🎉 वॉक सत्र दर्ज हुआ!', '🎉 सत्र नोंद झाले!', '🎉 Workout Recorded!')}</span>
                </div>
                <p className="text-[11px]">
                  {completionBanner.durationFormatted} • {completionBanner.steps} steps • {completionBanner.distanceKm} km
                </p>
              </div>
            )}

            {/* ── 3. Central Leap Fitness Style Circular Arc Dial ── */}
            <div className="flex flex-col items-center justify-center py-2 relative">
              <div className="relative w-60 h-60 flex items-center justify-center">
                {/* SVG Circular Progress Arc */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
                  <circle
                    cx="120"
                    cy="120"
                    r={radius}
                    className="text-slate-100 dark:text-slate-800"
                    strokeWidth="16"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r={radius}
                    className="text-[#157F66] transition-all duration-500 ease-out"
                    strokeWidth="16"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>

                {/* Center Content Inside Leap Fitness Dial */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  {/* Footprints Icon */}
                  <div className={`p-2 rounded-2xl mb-1 transition-all ${
                    stepFlash ? 'scale-125 bg-emerald-100 dark:bg-emerald-900/60' : 'bg-teal-50 dark:bg-teal-950/50'
                  }`}>
                    <Footprints className={`w-6 h-6 transition-colors ${
                      stepFlash ? 'text-emerald-500' : 'text-[#157F66] dark:text-teal-400'
                    }`} />
                  </div>

                  {/* Huge Bold Step Number (Leap Fitness Style) */}
                  <div className={`font-mono text-4xl sm:text-5xl font-black tracking-tight leading-none transition-colors ${
                    stepFlash ? 'text-emerald-500' : 'text-slate-900 dark:text-slate-100'
                  }`}>
                    {sessionSteps.toLocaleString()}
                  </div>

                  {/* Goal Subtitle */}
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 mt-1">
                    {tr('सत्र कदम (Steps Walked)', 'सत्राची पावले', 'Steps Walked')}
                  </span>

                  {/* Live Status Tag */}
                  <div className="mt-2">
                    {isWalking ? (
                      isPaused ? (
                        <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-full">
                          ⏸️ Paused
                        </span>
                      ) : (
                        isHumanWalking ? (
                          <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <span>{tr('🟢 कदम सेंस हो रहे हैं', 'पावले आपोआप मोजत आहे', '🟢 Sensed Walking (Counting Steps)')}</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 dark:bg-amber-950 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <span>⏸️ {tr('रुके हुए हैं (कदम रुके, समय चालू)', 'थांबले (वेळ चालू)', 'Still (Steps Paused, Time Running)')}</span>
                          </span>
                        )
                      )
                    ) : (
                      <span className="text-[10px] font-extrabold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 px-2.5 py-0.5 rounded-full">
                        {pct}% {tr('दैनिक लक्ष्य पूर्ण', 'दैनिक ध्येय', 'of daily goal')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── 4. The 4 Key Vital Metric Cards (Leap Fitness Signature Layout) ── */}
            <div className="grid grid-cols-4 gap-2">
              {/* 1. Distance */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{tr('दूरी', 'अंतर', 'Distance')}</span>
                </div>
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono">
                  {sessionKm} <span className="text-[9px] font-bold text-slate-400">km</span>
                </div>
              </div>

              {/* 2. Calories */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>{tr('ऊर्जा', 'ऊर्जा', 'Calories')}</span>
                </div>
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono">
                  {sessionCalories} <span className="text-[9px] font-bold text-slate-400">kcal</span>
                </div>
              </div>

              {/* 3. Time */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                  <Clock className="w-3 h-3 text-[#157F66]" />
                  <span>{tr('समय', 'वेळ', 'Time')}</span>
                </div>
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
                  {formatDuration(sessionSeconds)}
                </div>
              </div>

              {/* 4. Speed */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-center shadow-2xs">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px] font-bold uppercase mb-0.5">
                  <Zap className="w-3 h-3 text-teal-600" />
                  <span>{tr('गति', 'वेग', 'Speed')}</span>
                </div>
                <div className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 font-mono">
                  {isWalking && !isHumanWalking ? '0.0' : sessionSpeedKmh} <span className="text-[9px] font-bold text-slate-400">km/h</span>
                </div>
              </div>
            </div>

            {/* ── 5. Live Physical Motion Sensing Status & Diagnostics ── */}
            {isWalking && !isPaused && (
              <div className="space-y-2 pt-1">
                {/* Live Real-time Sensor Feedback */}
                <div className={`p-3 rounded-2xl border flex items-center justify-between text-xs transition-colors ${
                  isHumanWalking 
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200' 
                    : 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full shrink-0 ${
                      isHumanWalking ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
                    }`} />
                    <span className="font-extrabold">
                      {isHumanWalking 
                        ? tr('🟢 चालना सेंस हुआ (कदम गिने जा रहे हैं)', 'चालणे सेंस झाले (पावले मोजत आहे)', '🟢 Motion Sensed: Counting Steps')
                        : tr('⏸️ आप रुकी हुई हैं (कदम रुके हैं, समय चल रहा है)', 'तुम्ही थांबले (पावले थांबली, वेळ चालू)', '⏸️ Standing Still: Steps Frozen, Time Running')
                      }
                    </span>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400">
                    {motionEnergy} m/s²
                  </span>
                </div>

                {/* Notice for Desktop Users */}
                {sensorStatus === 'no_hardware' && (
                  <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-900 text-[11px] text-teal-900 dark:text-teal-200 flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-[#157F66] dark:text-teal-300">
                      <Smartphone className="w-4 h-4 shrink-0" />
                      <span>{tr('शारीरिक चालने का सेंसर (Phone Sensor)', 'फोन सेन्सर', 'Mobile Accelerometer Sensor')}</span>
                    </div>
                    <p className="leading-snug">
                      {tr(
                        'कदम केवल वास्तविक चलने पर ही गिने जाते हैं। फोन पर http://192.168.0.104:5173/ खोलें और जेब में रखकर चलें, या पीसी पर स्पेसबार (Spacebar) दबाकर कदम टेस्ट करें।',
                        'खरोखर चालल्यावरच पावले मोजली जातील. फोनवर http://192.168.0.104:5173/ उघडा किंवा स्पेसबार दाबा.',
                        'Steps count ONLY when physical motion is sensed. Open http://192.168.0.104:5173/ on your phone & walk with it in pocket, or press Spacebar to test on PC.'
                      )}
                    </p>
                  </div>
                )}

                {/* Sensitivity Selector & Test Step */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-400">{tr('सेंसिटिविटी:', 'संवेदनशीलता:', 'Sensitivity:')}</span>
                    {['high', 'normal', 'low'].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSensorSensitivity(s)}
                        className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer capitalize ${
                          sensorSensitivity === s 
                            ? 'bg-[#157F66] text-white shadow-2xs' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => registerSensedStep(1)}
                    className="text-teal-700 dark:text-teal-400 font-extrabold hover:underline cursor-pointer flex items-center gap-1"
                    title="Simulate 1 step (or press Spacebar)"
                  >
                    <span>+1 Step (Spacebar)</span>
                  </button>
                </div>
              </div>
            )}

            {/* ── 6. Primary Action Buttons (Start / Pause / Finish) ── */}
            <div className="space-y-2 pt-1">
              {!isWalking ? (
                <button
                  type="button"
                  onClick={handleStartWalk}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-[#157F66] hover:from-emerald-700 hover:to-teal-800 text-white font-black text-lg tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-emerald-700/30 transition cursor-pointer active:scale-95"
                >
                  <Play className="w-6 h-6 fill-white" />
                  <span className="uppercase">START</span>
                  <span className="text-xs font-semibold normal-case opacity-90 border-l border-white/30 pl-3">
                    {tr('वास्तविक चालने पर ही कदम गिनेगा', 'खरोखर चालल्यावरच पावले मोजेल', 'Physical Motion Sensing')}
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-2.5">
                  {isPaused ? (
                    <button
                      type="button"
                      onClick={handleResumeWalk}
                      className="flex-1 py-3 px-4 rounded-2xl bg-[#157F66] hover:bg-[#116752] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>{tr('पुनः चालू करें', 'चालू ठेवा', 'Resume')}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePauseWalk}
                      className="flex-1 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-extrabold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>{tr('सत्र रोकें', 'थांबवा', 'Pause Session')}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleFinishWalk}
                    className="flex-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{tr('समाप्त करें व इतिहास में सहेजें', 'थांबवा व जतन करा', 'Finish & Save to History')}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelWalk}
                    className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-400 hover:text-rose-500 transition cursor-pointer"
                    title="Cancel Walk"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* ── 7. Today's Cumulative Summary ── */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#157F66]" />
                <span className="font-extrabold text-slate-700 dark:text-slate-200">
                  {tr('आज का कुल:', 'आजचा एकूण:', "Today's Total:")}
                </span>
                <span className="font-mono font-black text-[#157F66] dark:text-teal-400">
                  {displaySteps.toLocaleString()} {tr('कदम', 'पावले', 'steps')}
                </span>
              </div>
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                {totalKmToday} km • {currentTotalMins} mins
              </span>
            </div>

            {/* ── 8. Leap Fitness Activity History ── */}
            <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h5 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-teal-600" />
                  <span>{tr('आज के वॉक सत्र (इतिहास)', 'आजची सत्रे', "Today's Walking History")}</span>
                </h5>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-400">
                    {todaySessions.length} {tr('सत्र', 'सत्रे', 'sessions')}
                  </span>
                  {todaySessions.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="text-[10px] font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                      title="Clear History"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>{tr('रीसेट', 'रीसेट', 'Reset')}</span>
                    </button>
                  )}
                </div>
              </div>

              {todaySessions.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-1.5 text-center">
                  {tr('आज अभी तक कोई सत्र समाप्त नहीं हुआ है।', 'अद्याप सत्र पूर्ण झालेले नाही.', 'No completed sessions today yet.')}
                </p>
              ) : (
                <div className="space-y-2 max-h-36 overflow-y-auto no-scrollbar">
                  {todaySessions.map((session, idx) => (
                    <div 
                      key={session.id || idx}
                      className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-teal-50 dark:bg-teal-950 text-[#157F66] dark:text-teal-400 flex items-center justify-center font-bold text-[11px] shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-800 dark:text-slate-200 block text-xs">
                            {session.startTime} - {session.endTime}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            ⏱ {session.durationFormatted}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 block text-xs">
                          {session.distanceKm} km
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold block">
                          👣 {session.steps.toLocaleString()} {tr('कदम', 'पावले', 'steps')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Maternal Safety Tip */}
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2 text-[11px] text-amber-900 dark:text-amber-200">
              <Droplet className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <p className="leading-snug">
                {tr(
                  'सुरक्षित मातृत्व टहलना: थोड़ा पानी पिएं, सहज गति बनाए रखें और थकान महसूस होने पर "मैं रुक गई हूँ" दबाकर विश्राम करें।',
                  'सुरक्षित चालणे: थोडे पाणी प्या आणि थकवा जाणवल्यास विश्रांती घ्या.',
                  'Safe Prenatal Walking: Stroll comfortably. When resting, tap "I Stopped / Resting" to pause steps while your session timer continues.'
                )}
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
