
/**
 * GarbhaSaathi API Service
 * Resilient HTTP client connecting React frontend to FastAPI backend,
 * with full seamless Offline-First LocalStorage fallback for all daily wellness features.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Core HTTP request handler
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Accept': 'application/json',
    ...(options.headers || {})
  };

  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout for fast offline fallback
    config.signal = controller.signal;

    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMsg = (data && data.detail) || `Request failed with status ${response.status}`;
      throw new ApiError(errorMsg, response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(error.message || 'Network error connecting to GarbhaSaathi backend', 0, null);
  }
}

// ── LocalStorage Helpers for Resilient Offline Wellness Tracking ──

function getLocalItem(key, defaultVal) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setLocalItem(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch { /* ignore */ }
}

function getTodayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const api = {
  // Generic methods
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),
  post: (endpoint, body, options) => request(endpoint, {
    method: 'POST',
    body: body instanceof FormData ? body : JSON.stringify(body),
    ...options
  }),
  patch: (endpoint, body, options) => request(endpoint, {
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
    ...options
  }),

  // Health checks
  checkHealth: () => request('/'),
  checkDbHealth: () => request('/api/health/db'),

  // 1. Daily Check-ins
  getCheckins: async () => {
    try {
      return await request('/api/checkins');
    } catch {
      return getLocalItem('garbhasaathi_checkins', []);
    }
  },
  saveCheckin: async (checkinData) => {
    try {
      return await request('/api/checkins', {
        method: 'POST',
        body: JSON.stringify(checkinData)
      });
    } catch {
      const all = getLocalItem('garbhasaathi_checkins', []);
      all.unshift({ ...checkinData, id: Date.now() });
      setLocalItem('garbhasaathi_checkins', all);
      return { success: true, checkin: checkinData };
    }
  },

  // 2. Nutrition Suggestions
  getNutritionSuggestions: (reqData) => request('/api/nutrition/suggestions', {
    method: 'POST',
    body: JSON.stringify(reqData)
  }),

  // 3. Pregnancy Journey
  getJourney: () => request('/api/journey'),

  // 4. Medical Records
  getRecords: () => request('/api/records'),
  uploadRecord: (type = 'blood') => request(`/api/records/upload?type=${encodeURIComponent(type)}`, {
    method: 'POST'
  }),
  confirmRecord: (id) => request(`/api/records/${id}/confirm`, {
    method: 'POST'
  }),

  // 5. Smart Reminders
  createReminder: (reminderData) => request('/api/reminders', {
    method: 'POST',
    body: JSON.stringify(reminderData)
  }),
  toggleReminder: (id) => request(`/api/reminders/${id}`, {
    method: 'PATCH'
  }),

  // 6. Dashboard Summary
  getDashboardSummary: () => request('/api/dashboard/summary'),

  // 7. Mood-based Content Recommendations
  getContentRecommendations: (mood = 'calm') => request(`/api/content/recommendations?mood=${encodeURIComponent(mood)}`),

  // 8. Baby Kick Tracker
  recordKickSession: (sessionData) => request('/api/kicks', {
    method: 'POST',
    body: JSON.stringify(sessionData)
  }),

  // 9. Danger Signs & Helplines
  getDangerSigns: () => request('/api/safety/danger-signs'),

  // ── 10. Daily Food Records (Resilient Offline-First) ──
  getFoodRecords: async (date) => {
    try {
      const res = await request(`/api/food/records${date ? `?date=${encodeURIComponent(date)}` : ''}`);
      if (res?.records) return res;
    } catch (err) {
      console.warn('Backend food records unavailable, using local storage:', err.message);
    }
    const all = getLocalItem('garbhasaathi_food_records', []);
    const filtered = date ? all.filter(r => r.date === date) : all;
    return { success: true, count: filtered.length, records: filtered };
  },

  saveFoodRecord: async (foodData) => {
    let serverRes = null;
    try {
      serverRes = await request('/api/food/records', {
        method: 'POST',
        body: JSON.stringify(foodData)
      });
    } catch (err) {
      console.warn('Backend save food record unavailable, saving to local storage:', err.message);
    }

    const all = getLocalItem('garbhasaathi_food_records', []);
    const newRecord = {
      id: serverRes?.record?.id || `food_${Date.now()}`,
      date: foodData.date || getTodayStr(),
      meal_type: foodData.meal_type || 'breakfast',
      food_name: foodData.food_name,
      portion: foodData.portion || '1 serving',
      meal_time: foodData.meal_time || '10:00 AM',
      completed: foodData.completed !== false,
      created_at: new Date().toISOString()
    };
    all.push(newRecord);
    setLocalItem('garbhasaathi_food_records', all);

    return serverRes || { success: true, record: newRecord };
  },

  toggleFoodRecord: async (id) => {
    try {
      await request(`/api/food/records/${id}/toggle`, { method: 'PATCH' });
    } catch { /* fallback to local below */ }

    const all = getLocalItem('garbhasaathi_food_records', []);
    const updated = all.map(r => r.id === id ? { ...r, completed: !r.completed } : r);
    setLocalItem('garbhasaathi_food_records', updated);
    return { success: true };
  },

  deleteFoodRecord: async (id) => {
    try {
      await request(`/api/food/records/${id}`, { method: 'DELETE' });
    } catch { /* fallback to local below */ }

    const all = getLocalItem('garbhasaathi_food_records', []);
    const filtered = all.filter(r => r.id !== id);
    setLocalItem('garbhasaathi_food_records', filtered);
    return { success: true };
  },

  // ── 11. Daily Health Status (Resilient Offline-First) ──
  getHealthStatus: async (date) => {
    try {
      const res = await request(`/api/health-status${date ? `?date=${encodeURIComponent(date)}` : ''}`);
      if (res) return res;
    } catch (err) {
      console.warn('Backend health status unavailable, using local storage:', err.message);
    }

    const all = getLocalItem('garbhasaathi_health_status', {});
    const targetDate = date || getTodayStr();
    if (all[targetDate]) {
      return { found: true, date: targetDate, data: all[targetDate] };
    }
    return { found: false, date: targetDate, data: null };
  },

  saveHealthStatus: async (healthData) => {
    let serverRes = null;
    try {
      serverRes = await request('/api/health-status', {
        method: 'POST',
        body: JSON.stringify(healthData)
      });
    } catch (err) {
      console.warn('Backend save health status unavailable, saving to local storage:', err.message);
    }

    const all = getLocalItem('garbhasaathi_health_status', {});
    const targetDate = healthData.date || getTodayStr();
    all[targetDate] = {
      ...healthData,
      date: targetDate,
      saved_at: new Date().toISOString()
    };
    setLocalItem('garbhasaathi_health_status', all);

    return serverRes || { success: true, date: targetDate, data: all[targetDate] };
  },

  // ── 12. Daily Needs Checklist (Resilient Offline-First) ──
  getDailyNeeds: async (date) => {
    try {
      const res = await request(`/api/daily-needs${date ? `?date=${encodeURIComponent(date)}` : ''}`);
      if (res) return res;
    } catch (err) {
      console.warn('Backend daily needs unavailable, using local storage:', err.message);
    }

    const all = getLocalItem('garbhasaathi_daily_needs', {});
    const targetDate = date || getTodayStr();
    if (all[targetDate]) {
      return { found: true, date: targetDate, items: all[targetDate] };
    }
    return { found: false, date: targetDate, items: null };
  },

  saveDailyNeeds: async (needsData) => {
    let serverRes = null;
    try {
      serverRes = await request('/api/daily-needs', {
        method: 'POST',
        body: JSON.stringify(needsData)
      });
    } catch (err) {
      console.warn('Backend save daily needs unavailable, saving to local storage:', err.message);
    }

    const all = getLocalItem('garbhasaathi_daily_needs', {});
    const targetDate = needsData.date || getTodayStr();
    all[targetDate] = needsData.items;
    setLocalItem('garbhasaathi_daily_needs', all);

    return serverRes || { success: true, date: targetDate, items: needsData.items };
  },

  // ── 13. Daily Walking Steps (Resilient Offline-First) ──
  getActivitySteps: async (date) => {
    try {
      const res = await request(`/api/activity/steps${date ? `?date=${encodeURIComponent(date)}` : ''}`);
      if (res && res.found) return res;
    } catch { /* ignore */ }

    const all = getLocalItem('garbhasaathi_activity_steps', {});
    const targetDate = date || getTodayStr();
    const stored = all[targetDate] || {};
    return {
      found: Boolean(all[targetDate]),
      date: targetDate,
      step_count: stored.step_count || stored.steps || 0,
      step_goal: stored.step_goal || 4000,
      distance_km: stored.distance_km || '0.0',
      active_minutes: stored.active_minutes || 0,
      data: stored
    };
  },

  saveActivitySteps: async (stepsData) => {
    try {
      await request('/api/activity/steps', {
        method: 'POST',
        body: JSON.stringify(stepsData)
      });
    } catch { /* ignore */ }

    const all = getLocalItem('garbhasaathi_activity_steps', {});
    const targetDate = stepsData.date || getTodayStr();
    const normalized = {
      ...stepsData,
      step_count: stepsData.step_count !== undefined ? stepsData.step_count : (stepsData.steps || 0),
      step_goal: stepsData.step_goal || 4000,
      distance_km: stepsData.distance_km || '0.0',
      active_minutes: stepsData.active_minutes || 0,
      date: targetDate
    };
    all[targetDate] = normalized;
    setLocalItem('garbhasaathi_activity_steps', all);
    return { success: true, data: normalized };
  },

  // ── 14. Date-Specific Daily Wellness History (Resilient Aggregator) ──
  getHistoryDates: async () => {
    try {
      const res = await request('/api/history/dates');
      if (res?.dates && res.dates.length > 0) return res;
    } catch { /* fallback below */ }

    // Aggregate all unique dates from local storage
    const datesSet = new Set();
    datesSet.add(getTodayStr());

    const foods = getLocalItem('garbhasaathi_food_records', []);
    foods.forEach(f => { if (f.date) datesSet.add(f.date); });

    const healths = getLocalItem('garbhasaathi_health_status', {});
    Object.keys(healths).forEach(d => datesSet.add(d));

    const needs = getLocalItem('garbhasaathi_daily_needs', {});
    Object.keys(needs).forEach(d => datesSet.add(d));

    const steps = getLocalItem('garbhasaathi_activity_steps', {});
    Object.keys(steps).forEach(d => datesSet.add(d));

    const sortedDates = Array.from(datesSet).sort().reverse();
    return { success: true, count: sortedDates.length, dates: sortedDates };
  },

  getDayHistory: async (date) => {
    try {
      const res = await request(`/api/history/day?date=${encodeURIComponent(date)}`);
      if (res && res.has_data !== undefined) return res;
    } catch { /* fallback below */ }

    const targetDate = date || getTodayStr();

    // Food records for date
    const allFoods = getLocalItem('garbhasaathi_food_records', []);
    const foodRecords = allFoods.filter(r => r.date === targetDate);

    // Health status for date
    const allHealth = getLocalItem('garbhasaathi_health_status', {});
    const healthStatus = allHealth[targetDate] || null;

    // Daily needs for date
    const allNeeds = getLocalItem('garbhasaathi_daily_needs', {});
    const dailyNeeds = allNeeds[targetDate] ? { items: allNeeds[targetDate] } : null;

    // Activity steps for date
    const allSteps = getLocalItem('garbhasaathi_activity_steps', {});
    const activitySteps = allSteps[targetDate] || null;

    // Kick sessions for date
    const allKicks = getLocalItem('garbhasaathi_kick_sessions', []);
    const kickSessions = allKicks.filter(k => (k.date === targetDate || k.session_date === targetDate));

    // Walking sessions for date
    const allWalks = getLocalItem('garbhasaathi_walking_sessions', []);
    const walkingSessions = allWalks.filter(w => w.date === targetDate);

    // Medical reports
    const allReports = getLocalItem('garbhasaathi_medical_reports', []);
    const medicalReports = allReports.filter(r => r.date === targetDate);

    const hasData = (foodRecords && foodRecords.length > 0) || 
      Boolean(healthStatus) || 
      Boolean(dailyNeeds) || 
      Boolean(activitySteps && activitySteps.step_count > 0) ||
      (kickSessions && kickSessions.length > 0) ||
      (walkingSessions && walkingSessions.length > 0) ||
      (medicalReports && medicalReports.length > 0);

    return {
      success: true,
      date: targetDate,
      has_data: hasData,
      food_records: foodRecords,
      health_log: healthStatus,
      health_status: healthStatus,
      daily_needs: dailyNeeds,
      activity_steps: activitySteps,
      kick_sessions: kickSessions,
      walking_sessions: walkingSessions,
      medical_reports: medicalReports
    };
  },

  syncSystematicDailyHistory: async (date) => {
    const targetDate = date || getTodayStr();
    try {
      // 1. Trigger day history re-fetch / verify
      const history = await api.getDayHistory(targetDate);
      return { success: true, date: targetDate, data: history };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};

export default api;
