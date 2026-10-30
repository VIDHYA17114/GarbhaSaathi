/**
 * pregnancyCalculator.js
 * 
 * Utility functions for estimating gestational age, trimester, and due date
 * from a user-entered LMP or EDD date.
 *
 * IMPORTANT DISCLAIMER:
 * These are educational estimates only. They do NOT confirm fetal health,
 * replace clinical assessment, or constitute medical advice.
 * All displayed values must be clearly labelled as "estimated."
 */

/**
 * Returns today's date at midnight in local time (no timezone shift).
 */
export function getLocalToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/**
 * Parse a date string (YYYY-MM-DD) into a local midnight Date.
 * Returns null if the string is empty or invalid.
 */
export function parseDateString(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  const dt = new Date(y, m - 1, d);
  // Validate: month and day must round-trip
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt;
}

/**
 * Format a Date object as "DD Month YYYY" (e.g. "15 March 2025").
 */
export function formatDisplayDate(dateObj) {
  if (!dateObj || isNaN(dateObj.getTime())) return '—';
  return dateObj.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Format a Date object as YYYY-MM-DD string (for <input type="date">).
 */
export function formatISODate(dateObj) {
  if (!dateObj || isNaN(dateObj.getTime())) return '';
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dd = String(dateObj.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Add a number of days to a Date object.
 */
function addDays(dateObj, days) {
  const result = new Date(dateObj);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Determine trimester from gestational week.
 */
function getTrimester(week) {
  if (week <= 13) return 1;
  if (week <= 27) return 2;
  return 3;
}

const TRIMESTER_LABELS = {
  1: {
    en: 'First Trimester (Weeks 1–13)',
    hi: 'पहला त्रैमास (सप्ताह 1–13)',
    mr: 'पहिले त्रैमासिक (आठवडे 1–13)',
    short: 'T1'
  },
  2: {
    en: 'Second Trimester (Weeks 14–27)',
    hi: 'दूसरा त्रैमास (सप्ताह 14–27)',
    mr: 'दुसरे त्रैमासिक (आठवडे 14–27)',
    short: 'T2'
  },
  3: {
    en: 'Third Trimester (Weeks 28–40)',
    hi: 'तीसरा त्रैमास (सप्ताह 28–40)',
    mr: 'तिसरे त्रैमासिक (आठवडे 28–40)',
    short: 'T3'
  }
};

/**
 * Calculate pregnancy progress from LMP date string.
 *
 * @param {string} lmpStr  - LMP date as "YYYY-MM-DD"
 * @param {Date}   today   - Optional override for current date (for testing)
 * @returns {object|null}  - Progress object or null if date is invalid/future
 */
export function calcFromLMP(lmpStr, today = getLocalToday()) {
  const lmp = parseDateString(lmpStr);
  if (!lmp) return null;
  if (lmp > today) return null; // LMP cannot be in the future

  const totalDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
  if (totalDays < 0) return null;

  const weeks = Math.floor(totalDays / 7);
  const days = totalDays % 7;

  // EDD = LMP + 280 days (Naegele's Rule)
  const edd = addDays(lmp, 280);
  const trimester = getTrimester(weeks);
  const progress = Math.min(Math.round((weeks / 40) * 100), 100);
  const daysElapsed = totalDays;
  const daysRemaining = Math.max(0, 280 - totalDays);
  const dailyProgress = Math.min(100, Math.max(0, Math.round((totalDays / 280) * 100)));

  return {
    source: 'lmp',
    totalDays,
    daysElapsed,
    daysRemaining,
    dailyProgress,
    today,
    todayFormatted: formatDisplayDate(today),
    week: weeks,
    days,
    trimester,
    trimesterLabels: TRIMESTER_LABELS[trimester],
    progress,
    lmp,
    edd,
    lmpFormatted: formatDisplayDate(lmp),
    eddFormatted: formatDisplayDate(edd),
    eddISO: formatISODate(edd),
    formattedText: days === 0
      ? `${weeks} Weeks`
      : `${weeks} Weeks ${days} Day${days !== 1 ? 's' : ''}`,
    isPreterm: weeks < 37,
    isTerm: weeks >= 37 && weeks <= 41,
    isPostTerm: weeks > 41,
    disclaimer: 'Estimated gestational age. Does not confirm fetal health. Consult your healthcare provider.'
  };
}

/**
 * Calculate pregnancy progress from EDD date string (backwards estimate).
 *
 * @param {string} eddStr  - EDD date as "YYYY-MM-DD"
 * @param {Date}   today   - Optional override for current date (for testing)
 * @returns {object|null}
 */
export function calcFromEDD(eddStr, today = getLocalToday()) {
  const edd = parseDateString(eddStr);
  if (!edd) return null;

  // Estimate LMP = EDD - 280 days
  const lmp = addDays(edd, -280);
  return calcFromLMP(formatISODate(lmp), today);
}

/**
 * Check if two date-derived EDDs conflict by more than 7 days.
 * Returns true if the dates conflict.
 */
export function doEDDsConflict(lmpStr, eddStr, toleranceDays = 7) {
  const lmp = parseDateString(lmpStr);
  const edd = parseDateString(eddStr);
  if (!lmp || !edd) return false;
  const estimatedEDD = addDays(lmp, 280);
  const diff = Math.abs(estimatedEDD - edd);
  return diff > toleranceDays * 24 * 60 * 60 * 1000;
}

/**
 * Get the best pregnancy progress estimate.
 * Prefers LMP if valid; falls back to EDD; returns a safe default if neither available.
 *
 * @param {string} lmpStr
 * @param {string} eddStr
 * @returns {object}
 */
export function getBestPregnancyProgress(lmpStr, eddStr) {
  const fromLMP = lmpStr ? calcFromLMP(lmpStr) : null;
  if (fromLMP && fromLMP.week <= 42) return fromLMP;

  const fromEDD = eddStr ? calcFromEDD(eddStr) : null;
  if (fromEDD && fromEDD.week <= 42) return fromEDD;

  // Safe fallback (no dates provided yet)
  return {
    source: 'none',
    week: null,
    days: null,
    trimester: null,
    trimesterLabels: null,
    progress: 0,
    dailyProgress: 0,
    daysElapsed: null,
    daysRemaining: null,
    todayFormatted: formatDisplayDate(getLocalToday()),
    lmp: null,
    edd: null,
    lmpFormatted: null,
    eddFormatted: null,
    eddISO: null,
    formattedText: null,
    disclaimer: 'Enter your LMP or EDD in Settings to see your pregnancy progress.'
  };
}
