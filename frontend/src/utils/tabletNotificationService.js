/**
 * tabletNotificationService.js
 * 
 * Provides background phone/browser notifications for:
 * 1. On-Time Tablet Reminder (fires when it is time to take the prescribed tablet)
 * 2. Missed Dose Alert (fires if tablet was not marked as taken after scheduled time)
 * 
 * Works across desktop and mobile browsers using Service Worker + HTML5 Notification API.
 */

let swRegistration = null;

// Gentle 2-tone melodic notification chime using Web Audio API
export function playChimeSound(isUrgent = false) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    if (isUrgent) {
      // Urgent double beep for missed dose (784Hz -> 659Hz)
      osc1.frequency.setValueAtTime(784, now);
      osc1.frequency.setValueAtTime(659, now + 0.15);
      osc2.frequency.setValueAtTime(523.25, now + 0.3);
    } else {
      // Gentle reminder chime (587.33Hz D5 -> 880Hz A5)
      osc1.frequency.setValueAtTime(587.33, now);
      osc1.frequency.setValueAtTime(880, now + 0.12);
    }

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + (isUrgent ? 0.6 : 0.45));

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.5);
    if (isUrgent) {
      osc2.start(now + 0.25);
      osc2.stop(now + 0.6);
    }
  } catch {
    // AudioContext blocked or not allowed prior to user interaction
  }
}

/**
 * Register Service Worker for background notifications
 */
export async function initServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }
  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    swRegistration = reg;
    return reg;
  } catch (err) {
    console.warn('GarbhaSaathi Service Worker registration notice:', err.message);
    return null;
  }
}

/**
 * Check current notification permission
 */
export function getNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  try {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      await initServiceWorker();
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Display a phone/browser notification
 */
export async function dispatchPhoneAlert({
  title,
  body,
  tag = 'garbhasaathi-tablet',
  isMissed = false,
  actions = []
}) {
  playChimeSound(isMissed);

  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }

  if (Notification.permission !== 'granted') {
    return false;
  }

  const notificationOptions = {
    body,
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag,
    renotify: true,
    requireInteraction: isMissed, // Stays on screen if missed dose
    vibrate: isMissed ? [300, 150, 300, 150, 300] : [200, 100, 200],
    data: {
      date: new Date().toISOString(),
      isMissed
    }
  };

  try {
    // 1. Try Service Worker registration for persistent background alert
    if (!swRegistration && 'serviceWorker' in navigator) {
      swRegistration = await navigator.serviceWorker.getRegistration();
    }

    if (swRegistration && 'showNotification' in swRegistration) {
      await swRegistration.showNotification(title, notificationOptions);
      return true;
    }

    // 2. Fallback to standard Notification
    new Notification(title, notificationOptions);
    return true;
  } catch (err) {
    console.warn('Dispatch notification warning:', err.message);
    return false;
  }
}

/**
 * Parse time string (e.g. "02:00 PM", "8:00 AM", "14:30") to minutes from midnight
 */
export function parseTimeToMinutes(timeStr) {
  if (!timeStr) return null;
  const str = timeStr.trim().toUpperCase();
  
  // Format: "02:00 PM" or "8:00 AM"
  const ampmMatch = str.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/);
  if (ampmMatch) {
    let hours = parseInt(ampmMatch[1], 10);
    const minutes = parseInt(ampmMatch[2], 10);
    const meridian = ampmMatch[3];

    if (meridian === 'PM' && hours < 12) hours += 12;
    if (meridian === 'AM' && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  return null;
}

/**
 * Determine tablet status for today given reminder and adherence
 */
export function getTabletAdherenceStatus(reminder, adherenceForToday) {
  const isTaken = adherenceForToday && adherenceForToday.status === 'taken';
  if (isTaken) {
    return {
      status: 'taken',
      label: 'Taken',
      takenAt: adherenceForToday.takenAt
    };
  }

  const targetMinutes = parseTimeToMinutes(reminder.time);
  if (targetMinutes == null) {
    return { status: 'upcoming', label: 'Upcoming' };
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const diff = currentMinutes - targetMinutes;

  if (diff >= 15) {
    // 15+ minutes past scheduled time and not taken -> Missed / Overdue
    return {
      status: 'missed',
      label: 'Missed / Overdue',
      diffMinutes: diff
    };
  } else if (diff >= -5 && diff < 15) {
    // Within 5 minutes before to 15 minutes after -> Due Now
    return {
      status: 'due',
      label: 'Due Now',
      diffMinutes: diff
    };
  } else {
    // Future time today
    return {
      status: 'upcoming',
      label: 'Upcoming',
      diffMinutes: diff
    };
  }
}

/**
 * Trigger immediate test alerts for verification
 */
export async function testOnTimeReminderAlert(tabletTitle = 'Folic Acid & Iron Tablet', time = '02:00 PM') {
  return await dispatchPhoneAlert({
    title: `💊 Time for your tablet: ${tabletTitle}`,
    body: `It is ${time}. Please take your prescribed tablet with a glass of water as directed.`,
    tag: `test-ontime-${Date.now()}`,
    isMissed: false
  });
}

export async function testMissedDoseAlert(tabletTitle = 'Folic Acid & Iron Tablet', time = '02:00 PM') {
  return await dispatchPhoneAlert({
    title: `⚠️ Missed Tablet Alert: ${tabletTitle}`,
    body: `Follow-up alert: You scheduled ${tabletTitle} for ${time}, but it has not been marked as taken. Please check if you took your dose!`,
    tag: `test-missed-${Date.now()}`,
    isMissed: true
  });
}

