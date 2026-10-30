import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../i18n/translations';
import { sampleReports, initialReminders } from '../data/sampleReports';
import { getBestPregnancyProgress, doEDDsConflict } from '../utils/pregnancyCalculator';
import api from '../services/api';
import { 
  initServiceWorker, 
  dispatchPhoneAlert, 
  parseTimeToMinutes,
  requestNotificationPermission,
  getNotificationPermission
} from '../utils/tabletNotificationService';

const AppContext = createContext();

// ── Daily task templates (user can mark / skip / postpone / add / delete) ──
const DEFAULT_TASKS = [
  {
    id: 'dt1',
    text: 'Follow today\'s meal plan',
    textHi: 'आज की भोजन योजना का पालन करें',
    textMr: 'आजची जेवणाची योजना पाळा',
    category: 'nutrition',
    status: 'pending',    // 'pending' | 'done' | 'skipped' | 'postponed'
    isUserDefined: false
  },
  {
    id: 'dt2',
    text: 'Drink water as per personal needs',
    textHi: 'अपनी ज़रूरत के अनुसार पर्याप्त पानी पिएं',
    textMr: 'गरजेनुसार पुरेसे पाणी प्या',
    category: 'hydration',
    status: 'pending',
    isUserDefined: false
  },
  {
    id: 'dt3',
    text: 'Take prescribed supplements as directed',
    textHi: 'डॉक्टर द्वारा बताई गई दवाएं/सप्लीमेंट लें',
    textMr: 'डॉक्टरांनी सांगितलेले पूरक घ्या',
    category: 'medicine',
    status: 'pending',
    isUserDefined: false,
    note: 'Only medicines / supplements confirmed with your healthcare provider.'
  },
  {
    id: 'dt4',
    text: 'Complete an optional mood check-in',
    textHi: 'मन की स्थिति नोट करें (ऐच्छिक)',
    textMr: 'मनाची नोंद करा (पर्यायी)',
    category: 'wellness',
    status: 'pending',
    isUserDefined: false,
    isOptional: true
  },
  {
    id: 'dt5',
    text: 'Read today\'s pregnancy education',
    textHi: 'आज की गर्भावस्था शिक्षा पढ़ें',
    textMr: 'आजचे गर्भावस्था शिक्षण वाचा',
    category: 'education',
    status: 'pending',
    isUserDefined: false
  },
  {
    id: 'dt6',
    text: 'Attend or prepare for a scheduled appointment',
    textHi: 'अनुसूचित जांच / अपॉइंटमेंट की तैयारी करें',
    textMr: 'ठरलेल्या भेटीची तयारी करा',
    category: 'appointment',
    status: 'pending',
    isUserDefined: false,
    isOptional: true
  }
];

function getTodayStr() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function loadDailyTasks() {
  try {
    const saved = localStorage.getItem('garbhasaathi_daily_tasks_v2');
    if (!saved) return null;
    const { date, tasks } = JSON.parse(saved);
    // Reset statuses if a new day has begun
    if (date !== getTodayStr()) {
      const resetTasks = tasks.map(t => ({
        ...t,
        status: t.isUserDefined ? t.status : 'pending'
      }));
      return resetTasks;
    }
    return tasks;
  } catch {
    return null;
  }
}

function saveDailyTasks(tasks) {
  try {
    localStorage.setItem('garbhasaathi_daily_tasks_v2', JSON.stringify({
      date: getTodayStr(),
      tasks
    }));
  } catch { /* ignore */ }
}

// ── Ingredient storage ──
function loadIngredients() {
  try {
    const saved = localStorage.getItem('garbhasaathi_ingredients_v1');
    return saved ? JSON.parse(saved) : ['Rice', 'Dal', 'Wheat', 'Milk', 'Vegetables'];
  } catch {
    return ['Rice', 'Dal', 'Wheat', 'Milk', 'Vegetables'];
  }
}

// ── Kick Sessions User-Isolation Key ──
function getKickStorageKey(user) {
  const identifier = user?.id || user?.phone || user?.email || user?.name || 'default';
  return `garbhasaathi_kick_sessions_${String(identifier).replace(/[^a-zA-Z0-9_]/g, '_')}`;
}

function loadUserKickSessions(user) {
  try {
    const key = getKickStorageKey(user);
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  // Realistic initial sample sessions for the default user
  return [
    {
      id: 'ks_initial_1',
      date: getTodayStr(),
      dateFormatted: 'Today',
      startTime: '10:15 AM',
      endTime: '10:42 AM',
      durationSeconds: 1620,
      durationFormatted: '27m 00s',
      kicksCount: 10,
      notes: 'Active after warm breakfast'
    },
    {
      id: 'ks_initial_2',
      date: '2026-10-26',
      dateFormatted: 'Yesterday',
      startTime: '08:30 PM',
      endTime: '08:58 PM',
      durationSeconds: 1680,
      durationFormatted: '28m 00s',
      kicksCount: 9,
      notes: 'Relaxing on left side'
    }
  ];
}

// ── Exercise Storage (User-Isolated) ──
function getExerciseStorageKey(user, suffix) {
  const identifier = user?.id || user?.phone || user?.email || user?.name || 'default';
  return `garbhasaathi_exercise_${suffix}_${String(identifier).replace(/[^a-zA-Z0-9_]/g, '_')}`;
}

function loadSavedExercises(user) {
  try {
    const key = getExerciseStorageKey(user, 'saved');
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : ['m9_labor_malasana', 'm9_birth_ball_bouncing', 'm9_perineal_sigh'];
  } catch {
    return ['m9_labor_malasana', 'm9_birth_ball_bouncing', 'm9_perineal_sigh'];
  }
}

function loadDailyExercisePlan(user) {
  try {
    const key = getExerciseStorageKey(user, 'daily_plan');
    const saved = localStorage.getItem(key);
    if (!saved) return ['m9_labor_malasana', 'm9_birth_ball_bouncing', 'm9_tabletop_pelvic_tilts', 'm9_perineal_sigh'];
    const parsed = JSON.parse(saved);
    return parsed.plan || ['m9_labor_malasana', 'm9_birth_ball_bouncing', 'm9_tabletop_pelvic_tilts', 'm9_perineal_sigh'];
  } catch {
    return ['m9_labor_malasana', 'm9_birth_ball_bouncing', 'm9_tabletop_pelvic_tilts', 'm9_perineal_sigh'];
  }
}

function loadExerciseCompletions(user) {
  try {
    const key = getExerciseStorageKey(user, 'completions');
    const saved = localStorage.getItem(key);
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    if (parsed.date === getTodayStr()) {
      return parsed.completions || {};
    }
    return {};
  } catch {
    return {};
  }
}

export function AppProvider({ children }) {
  // Language
  const [language, setLanguage] = useState(() =>
    localStorage.getItem('garbhasaathi_lang') || 'hi'
  );

  // Mobile screen (kept for mobile mockup view)
  const [currentScreen, setCurrentScreen] = useState(1);
  const [activeTab, setActiveTab] = useState('home');

  // User profile
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('garbhasaathi_user');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return {
      name: 'Priya Sharma',
      age: 24,
      phone: '+91 98765 43210',
      email: 'priya.sharma@example.com',
      language: 'hi',
      stage: 'I am pregnant',
      lmpDate: '2025-03-15',
      eddDate: '2025-12-20',
      isLoggedIn: false
    };
  });

  const logout = useCallback(() => {
    setUser(prev => {
      const updated = { ...prev, isLoggedIn: false };
      try {
        localStorage.setItem('garbhasaathi_user', JSON.stringify(updated));
      } catch { /* ignore */ }
      return updated;
    });
  }, []);

  // ── Pregnancy progress (calculated from real LMP/EDD) ──
  const [pregnancyProgress, setPregnancyProgress] = useState(() =>
    getBestPregnancyProgress(user.lmpDate, user.eddDate)
  );

  // Recalculate when user profile changes
  useEffect(() => {
    setPregnancyProgress(getBestPregnancyProgress(user.lmpDate, user.eddDate));
  }, [user.lmpDate, user.eddDate]);

  // ── EDD conflict detection ──
  const eddConflict = user.lmpDate && user.eddDate
    ? doEDDsConflict(user.lmpDate, user.eddDate)
    : false;

  // ── Daily Tasks ──
  const [tasks, setTasks] = useState(() => loadDailyTasks() || DEFAULT_TASKS);

  useEffect(() => {
    saveDailyTasks(tasks);
  }, [tasks]);

  const setTaskStatus = useCallback((id, status) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
  }, []);

  // Legacy toggle compatibility
  const toggleTask = useCallback((id) => {
    setTasks(prev => prev.map(t =>
      t.id === id
        ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
        : t
    ));
  }, []);

  const addUserTask = useCallback((text) => {
    if (!text || !text.trim()) return;
    const newTask = {
      id: `ut_${Date.now()}`,
      text: text.trim(),
      textHi: text.trim(),
      textMr: text.trim(),
      category: 'custom',
      status: 'pending',
      isUserDefined: true
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const editUserTask = useCallback((id, newText) => {
    setTasks(prev => prev.map(t =>
      t.id === id && t.isUserDefined
        ? { ...t, text: newText.trim(), textHi: newText.trim(), textMr: newText.trim() }
        : t
    ));
  }, []);

  const deleteUserTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => !(t.id === id && t.isUserDefined)));
  }, []);

  const resetAllTasks = useCallback(() => {
    setTasks(DEFAULT_TASKS);
  }, []);

  // Daily check-in
  const [dailyCheckin, setDailyCheckinState] = useState({
    feeling: 'good',
    symptoms: [],
    waterGlasses: 5,
    kickCount: 10,
    mood: 'calm',
    date: getTodayStr()
  });

  const setDailyCheckin = useCallback((patch) => {
    setDailyCheckinState(prev => {
      const next = typeof patch === 'function' ? patch(prev) : (typeof patch === 'object' ? { ...prev, ...patch } : prev);
      api.saveCheckin({
        feeling: next.feeling || 'good',
        symptoms: Array.isArray(next.symptoms) ? next.symptoms : [],
        water_glasses: next.waterGlasses ?? 0,
        kicks_count: next.kickCount ?? 0,
        mood: next.mood || 'calm',
        missed_barrier: next.missedBarrier || null
      }).catch(err => console.warn('Backend saveCheckin sync notice:', err.message));
      return next;
    });
  }, []);

  // ── Budget & Nutrition ──
  const [budgetTier, setBudgetTier] = useState(() => {
    return localStorage.getItem('garbhasaathi_budget') || 'medium';
  });
  const [customBudget, setCustomBudget] = useState(() => {
    return parseInt(localStorage.getItem('garbhasaathi_custom_budget') || '0') || 0;
  });

  useEffect(() => {
    localStorage.setItem('garbhasaathi_budget', budgetTier);
  }, [budgetTier]);

  useEffect(() => {
    if (customBudget > 0) {
      localStorage.setItem('garbhasaathi_custom_budget', String(customBudget));
    }
  }, [customBudget]);

  // ── Ingredients ──
  const [ingredients, setIngredients] = useState(() => loadIngredients());

  useEffect(() => {
    try {
      localStorage.setItem('garbhasaathi_ingredients_v1', JSON.stringify(ingredients));
    } catch { /* ignore */ }
  }, [ingredients]);

  const addIngredient = useCallback((name) => {
    if (!name || !name.trim()) return false;
    const trimmed = name.trim();
    setIngredients(prev => {
      if (prev.some(i => i.toLowerCase() === trimmed.toLowerCase())) return prev;
      return [...prev, trimmed];
    });
    return true;
  }, []);

  const removeIngredient = useCallback((name) => {
    setIngredients(prev => prev.filter(i => i !== name));
  }, []);

  const clearIngredients = useCallback(() => {
    setIngredients([]);
  }, []);

  // Legacy compatibility
  const availableFoods = ingredients;
  const setAvailableFoods = setIngredients;

  // ── Reminders ──
  const [reminders, setReminders] = useState(() => {
    try {
      const saved = localStorage.getItem('garbhasaathi_reminders');
      return saved ? JSON.parse(saved) : initialReminders;
    } catch {
      return initialReminders;
    }
  });

  const toggleReminder = useCallback((id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
    api.toggleReminder(id).catch(err => console.warn('Backend toggleReminder sync notice:', err.message));
  }, []);

  const addReminder = useCallback((newRem) => {
    setReminders(prev => [newRem, ...prev]);
    api.createReminder({
      title: newRem.title || 'Reminder',
      detail: newRem.detail || newRem.dosage || '',
      time: newRem.time || '10:00 AM',
      category: newRem.category || 'medicine',
      is_active: newRem.isActive !== false
    }).catch(err => console.warn('Backend createReminder sync notice:', err.message));
  }, []);

  // ── Tablet Adherence Tracking ("is she take her tablets or not") ──
  const [tabletAdherence, setTabletAdherence] = useState(() => {
    try {
      const saved = localStorage.getItem('garbhasaathi_tablet_adherence');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });


  const [phoneAlertsEnabled, setPhoneAlertsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('garbhasaathi_phone_alerts');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const markTabletTaken = useCallback((reminderId, dateStr = null) => {
    const today = dateStr || getTodayStr();
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setTabletAdherence(prev => {
      const dayData = prev[today] || {};
      const updated = {
        ...prev,
        [today]: {
          ...dayData,
          [reminderId]: {
            status: 'taken',
            takenAt: timeFormatted,
            date: today,
            timestamp: now.getTime()
          }
        }
      };
      localStorage.setItem('garbhasaathi_tablet_adherence', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const unmarkTabletTaken = useCallback((reminderId, dateStr = null) => {
    const today = dateStr || getTodayStr();
    setTabletAdherence(prev => {
      const dayData = { ...(prev[today] || {}) };
      delete dayData[reminderId];
      const updated = {
        ...prev,
        [today]: dayData
      };
      localStorage.setItem('garbhasaathi_tablet_adherence', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Initialize service worker on mount
  useEffect(() => {
    initServiceWorker();
  }, []);

  // Sync phone alerts preference
  useEffect(() => {
    localStorage.setItem('garbhasaathi_phone_alerts', JSON.stringify(phoneAlertsEnabled));
  }, [phoneAlertsEnabled]);

  // Dual-Condition Background Tablet Reminder Engine
  useEffect(() => {
    if (!phoneAlertsEnabled) return;

    // Track which reminders have already fired today to avoid duplicates
    const alertedEvents = new Set();

    const checkTabletAlerts = () => {
      const today = getTodayStr();
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const dayAdherence = tabletAdherence[today] || {};

      reminders.forEach(rem => {
        if (!rem.isActive || rem.category !== 'medicine') return;

        const scheduledMinutes = parseTimeToMinutes(rem.time);
        if (scheduledMinutes == null) return;

        const isTaken = dayAdherence[rem.id]?.status === 'taken';
        const diff = currentMinutes - scheduledMinutes;

        // Condition 1: On-Time Reminder (within -1 to +2 minutes of scheduled time)
        const onTimeKey = `${today}-${rem.id}-ontime`;
        if (diff >= -1 && diff <= 2 && !isTaken && !alertedEvents.has(onTimeKey)) {
          alertedEvents.add(onTimeKey);
          dispatchPhoneAlert({
            title: `💊 Time for your tablet: ${rem.title}`,
            body: `It is ${rem.time}. Please take your prescribed dose (${rem.detail || 'as directed'}).`,
            tag: `tablet-ontime-${rem.id}`,
            isMissed: false
          });
        }

        // Condition 2: Missed Dose Alert (15+ minutes past scheduled time and still not taken)
        const missedKey = `${today}-${rem.id}-missed`;
        if (diff >= 15 && diff <= 180 && !isTaken && !alertedEvents.has(missedKey)) {
          alertedEvents.add(missedKey);
          dispatchPhoneAlert({
            title: `⚠️ Missed Tablet Alert: ${rem.title}`,
            body: `You scheduled ${rem.title} for ${rem.time}. It has not been recorded as taken yet. Please check your dose!`,
            tag: `tablet-missed-${rem.id}`,
            isMissed: true
          });
        }
      });
    };

    checkTabletAlerts();
    const interval = setInterval(checkTabletAlerts, 30000);
    return () => clearInterval(interval);
  }, [reminders, tabletAdherence, phoneAlertsEnabled]);

  // ── Reports ──
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('garbhasaathi_reports');
      return saved ? JSON.parse(saved) : sampleReports;
    } catch {
      return sampleReports;
    }
  });

  const addReport = useCallback((newRep) => {
    setReports(prev => [newRep, ...prev]);
  }, []);

  // ── Water Tracker ──
  const addWaterGlass = useCallback(() => {
    setDailyCheckin(prev => ({
      ...prev,
      waterGlasses: Math.min(prev.waterGlasses + 1, 12)
    }));
  }, []);

  // ── Theme State: 'light' | 'dark' | 'system' ──
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('garbhasaathi_theme') || 'system';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const isDarkMode = theme === 'dark' || (theme === 'system' && systemPrefersDark);

  useEffect(() => {
    try {
      localStorage.setItem('garbhasaathi_theme', theme);
    } catch { /* ignore */ }
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [theme, isDarkMode]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'dark';
      return systemPrefersDark ? 'light' : 'dark';
    });
  }, [systemPrefersDark]);

  // ── Kick Sessions State (isolated per user) ──
  const [kickSessions, setKickSessions] = useState(() => loadUserKickSessions(user));

  // Reload sessions if user switches
  useEffect(() => {
    setKickSessions(loadUserKickSessions(user));
  }, [user?.id, user?.phone, user?.email]);

  // Save kick sessions to isolated user storage
  useEffect(() => {
    try {
      const key = getKickStorageKey(user);
      localStorage.setItem(key, JSON.stringify(kickSessions));
    } catch { /* ignore */ }
  }, [kickSessions, user]);

  // Active counting session
  const [activeKickSession, setActiveKickSession] = useState(() => {
    try {
      const saved = sessionStorage.getItem('garbhasaathi_active_kick_session');
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return null;
  });

  // Keep live duration ticking while session is active
  useEffect(() => {
    let interval = null;
    if (activeKickSession) {
      interval = setInterval(() => {
        setActiveKickSession(prev => {
          if (!prev) return null;
          const elapsed = Math.floor((Date.now() - prev.startTimestamp) / 1000);
          return { ...prev, durationSeconds: elapsed };
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeKickSession ? activeKickSession.id : null]);

  // Sync active kick session to sessionStorage
  useEffect(() => {
    try {
      if (activeKickSession) {
        sessionStorage.setItem('garbhasaathi_active_kick_session', JSON.stringify(activeKickSession));
      } else {
        sessionStorage.removeItem('garbhasaathi_active_kick_session');
      }
    } catch { /* ignore */ }
  }, [activeKickSession]);

  const startKickSession = useCallback(() => {
    const now = new Date();
    const startTimeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newSession = {
      id: `ks_${Date.now()}`,
      startTimestamp: now.getTime(),
      dateStr: getTodayStr(),
      startTimeFormatted,
      kicksCount: 0,
      kickTimestamps: [],
      durationSeconds: 0
    };
    setActiveKickSession(newSession);
  }, []);

  const recordKick = useCallback(() => {
    setActiveKickSession(prev => {
      if (!prev) {
        const now = new Date();
        return {
          id: `ks_${Date.now()}`,
          startTimestamp: now.getTime(),
          dateStr: getTodayStr(),
          startTimeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          kicksCount: 1,
          kickTimestamps: [Date.now()],
          durationSeconds: 0
        };
      }
      return {
        ...prev,
        kicksCount: prev.kicksCount + 1,
        kickTimestamps: [...prev.kickTimestamps, Date.now()]
      };
    });
  }, []);

  const undoLastKick = useCallback(() => {
    setActiveKickSession(prev => {
      if (!prev || prev.kicksCount <= 0) return prev;
      const nextTimestamps = [...prev.kickTimestamps];
      nextTimestamps.pop();
      return {
        ...prev,
        kicksCount: Math.max(0, prev.kicksCount - 1),
        kickTimestamps: nextTimestamps
      };
    });
  }, []);

  const finishKickSession = useCallback((notes = '') => {
    if (!activeKickSession) return null;
    const now = new Date();
    const endTimeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const totalSecs = Math.max(1, Math.floor((now.getTime() - activeKickSession.startTimestamp) / 1000));
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const durationFormatted = `${mins}m ${String(secs).padStart(2, '0')}s`;

    const completedEntry = {
      id: activeKickSession.id,
      date: activeKickSession.dateStr || getTodayStr(),
      dateFormatted: new Date(activeKickSession.startTimestamp).toLocaleDateString([], { day: 'numeric', month: 'short' }),
      startTime: activeKickSession.startTimeFormatted,
      endTime: endTimeFormatted,
      durationSeconds: totalSecs,
      durationFormatted,
      kicksCount: activeKickSession.kicksCount,
      notes: notes || ''
    };

    setKickSessions(prev => [completedEntry, ...prev]);
    setActiveKickSession(null);
    api.recordKickSession({
      kicks: completedEntry.kicksCount,
      duration_minutes: Math.max(1, Math.round(completedEntry.durationSeconds / 60)),
      notes: completedEntry.notes || 'Recorded via Kick Counter'
    }).catch(err => console.warn('Backend recordKickSession sync notice:', err.message));
    return completedEntry;
  }, [activeKickSession]);

  const cancelKickSession = useCallback(() => {
    setActiveKickSession(null);
  }, []);

  const deleteKickSession = useCallback((id) => {
    setKickSessions(prev => prev.filter(s => s.id !== id));
  }, []);

  // Today's total kick counts
  const todayStr = getTodayStr();
  const todayFinishedKicks = kickSessions
    .filter(s => s.date === todayStr)
    .reduce((sum, s) => sum + (s.kicksCount || 0), 0);
  const todayTotalKicks = todayFinishedKicks + (activeKickSession ? activeKickSession.kicksCount : 0);
  const todaySessionsCount = kickSessions.filter(s => s.date === todayStr).length;

  // ── Modals ──
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  // ── Exercise & Yoga State (Isolated Per User) ──
  const [savedExercises, setSavedExercises] = useState(() => loadSavedExercises(user));
  const [dailyExercisePlan, setDailyExercisePlan] = useState(() => loadDailyExercisePlan(user));
  const [exerciseCompletions, setExerciseCompletions] = useState(() => loadExerciseCompletions(user));

  // Reload when user switches
  useEffect(() => {
    setSavedExercises(loadSavedExercises(user));
    setDailyExercisePlan(loadDailyExercisePlan(user));
    setExerciseCompletions(loadExerciseCompletions(user));
  }, [user?.id, user?.phone, user?.email]);

  // Persist saved exercises
  useEffect(() => {
    try {
      const key = getExerciseStorageKey(user, 'saved');
      localStorage.setItem(key, JSON.stringify(savedExercises));
    } catch { /* ignore */ }
  }, [savedExercises, user]);

  // Persist daily exercise plan
  useEffect(() => {
    try {
      const key = getExerciseStorageKey(user, 'daily_plan');
      localStorage.setItem(key, JSON.stringify({ date: getTodayStr(), plan: dailyExercisePlan }));
    } catch { /* ignore */ }
  }, [dailyExercisePlan, user]);

  // Persist completions
  useEffect(() => {
    try {
      const key = getExerciseStorageKey(user, 'completions');
      localStorage.setItem(key, JSON.stringify({ date: getTodayStr(), completions: exerciseCompletions }));
    } catch { /* ignore */ }
  }, [exerciseCompletions, user]);

  const toggleSaveExercise = useCallback((exerciseId) => {
    setSavedExercises(prev => 
      prev.includes(exerciseId) ? prev.filter(id => id !== exerciseId) : [...prev, exerciseId]
    );
  }, []);

  const isExerciseSaved = useCallback((exerciseId) => {
    return savedExercises.includes(exerciseId);
  }, [savedExercises]);

  const addToExercisePlan = useCallback((exerciseId) => {
    setDailyExercisePlan(prev => prev.includes(exerciseId) ? prev : [...prev, exerciseId]);
  }, []);

  const removeFromExercisePlan = useCallback((exerciseId) => {
    setDailyExercisePlan(prev => prev.filter(id => id !== exerciseId));
  }, []);

  const toggleExerciseCompleted = useCallback((exerciseId) => {
    setExerciseCompletions(prev => {
      const current = prev[exerciseId];
      if (current && current.completed) {
        const next = { ...prev };
        delete next[exerciseId];
        return next;
      }
      return {
        ...prev,
        [exerciseId]: {
          completed: true,
          completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      };
    });
  }, []);

  const skipExerciseInPlan = useCallback((exerciseId) => {
    setExerciseCompletions(prev => ({
      ...prev,
      [exerciseId]: {
        skipped: true,
        completed: false
      }
    }));
  }, []);

  const resetExercisePlan = useCallback(() => {
    setDailyExercisePlan(['m9_labor_malasana', 'm9_birth_ball_bouncing', 'm9_tabletop_pelvic_tilts', 'm9_perineal_sigh']);
    setExerciseCompletions({});
  }, []);

  // ── LocalStorage Sync ──
  useEffect(() => { localStorage.setItem('garbhasaathi_lang', language); }, [language]);
  useEffect(() => { localStorage.setItem('garbhasaathi_user', JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem('garbhasaathi_reminders', JSON.stringify(reminders)); }, [reminders]);
  useEffect(() => { localStorage.setItem('garbhasaathi_reports', JSON.stringify(reports)); }, [reports]);

  // Synchronize initial state with live PostgreSQL backend (without overwriting local unsaved work)
  useEffect(() => {
    let isMounted = true;
    async function syncBackendData() {
      try {
        const [remResp, recResp, chkResp] = await Promise.allSettled([
          api.get('/api/reminders'),
          api.getRecords(),
          api.getCheckins()
        ]);

        if (!isMounted) return;

        if (remResp.status === 'fulfilled' && remResp.value?.reminders?.length > 0) {
          const apiReminders = remResp.value.reminders.map(r => ({
            id: r.id,
            title: r.title,
            detail: r.detail,
            time: r.time,
            category: r.category,
            isActive: r.is_active
          }));
          setReminders(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newFromApi = apiReminders.filter(a => !existingIds.has(a.id));
            return [...prev, ...newFromApi];
          });
        }

        if (recResp.status === 'fulfilled' && recResp.value?.records?.length > 0) {
          const apiRecords = recResp.value.records.map(r => ({
            id: r.id,
            fileName: r.file_name,
            fileNameHi: r.file_name,
            date: r.date,
            type: r.type,
            badgeColor: r.type === 'pdf' ? 'bg-red-100 text-red-600 border-red-200' : 'bg-blue-100 text-blue-600 border-blue-200',
            extractedData: {
              patientName: 'Priya Sharma',
              testName: r.file_name,
              resultDate: r.date,
              findings: r.extracted_text,
              confirmed: r.confirmed,
              suggestedReminder: r.suggested_reminder
            }
          }));
          setReports(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newFromApi = apiRecords.filter(a => !existingIds.has(a.id));
            return [...prev, ...newFromApi];
          });
        }

        if (chkResp.status === 'fulfilled' && chkResp.value?.checkins?.length > 0) {
          const latest = chkResp.value.checkins[chkResp.value.checkins.length - 1];
          if (latest) {
            setDailyCheckinState(prev => ({
              ...prev,
              feeling: latest.feeling || prev.feeling,
              symptoms: latest.symptoms || prev.symptoms,
              waterGlasses: latest.water_glasses ?? prev.waterGlasses,
              kickCount: latest.kicks_count ?? prev.kickCount,
              mood: latest.mood || prev.mood,
              date: latest.date || prev.date
            }));
          }
        }
      } catch (err) {
        console.warn('Backend initial sync notice:', err.message);
      }
    }

    syncBackendData();
    return () => { isMounted = false; };
  }, []);

  const t = translations[language] || translations.hi;

  // Mobile navigation helpers (for mobile mockup)
  const navigateToScreen = (screenNumber) => {
    setCurrentScreen(screenNumber);
    if (screenNumber === 8) setActiveTab('home');
    if (screenNumber === 6 || screenNumber === 12) setActiveTab('journey');
    if (screenNumber === 10 || screenNumber === 11) setActiveTab('nutrition');
    if (screenNumber === 13) setActiveTab('wellness');
    if (screenNumber === 15 || screenNumber === 14) setActiveTab('more');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'home') setCurrentScreen(8);
    if (tab === 'journey') setCurrentScreen(6);
    if (tab === 'nutrition') setCurrentScreen(10);
    if (tab === 'wellness') setCurrentScreen(13);
    if (tab === 'more') setCurrentScreen(15);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentScreen,
        setCurrentScreen: navigateToScreen,
        activeTab,
        handleTabChange,
        user,
        setUser,
        pregnancyProgress,
        eddConflict,
        // Tasks
        tasks,
        toggleTask,
        setTaskStatus,
        addUserTask,
        editUserTask,
        deleteUserTask,
        resetAllTasks,
        // Check-in
        dailyCheckin,
        setDailyCheckin,
        addWaterGlass,
        // Budget
        budgetTier,
        setBudgetTier,
        customBudget,
        setCustomBudget,
        // Ingredients
        ingredients,
        setIngredients,
        addIngredient,
        removeIngredient,
        clearIngredients,
        // Legacy alias
        availableFoods,
        setAvailableFoods,
        // Reminders
        reminders,
        toggleReminder,
        addReminder,
        tabletAdherence,
        markTabletTaken,
        unmarkTabletTaken,
        phoneAlertsEnabled,
        setPhoneAlertsEnabled,
        // Reports
        reports,
        addReport,
        // Modals
        activeModal,
        setActiveModal,
        modalData,
        setModalData,
        // Theme
        theme,
        setTheme,
        isDarkMode,
        toggleTheme,
        // Kick Counter Sessions (User-isolated)
        kickSessions,
        activeKickSession,
        startKickSession,
        recordKick,
        undoLastKick,
        finishKickSession,
        cancelKickSession,
        deleteKickSession,
        todayTotalKicks,
        todaySessionsCount,
        logout,
        // Daily Exercise & Yoga (User-isolated)
        savedExercises,
        dailyExercisePlan,
        exerciseCompletions,
        toggleSaveExercise,
        isExerciseSaved,
        addToExercisePlan,
        removeFromExercisePlan,
        toggleExerciseCompleted,
        skipExerciseInPlan,
        resetExercisePlan
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
