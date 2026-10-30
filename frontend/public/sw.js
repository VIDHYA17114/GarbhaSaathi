// GarbhaSaathi Background Service Worker for Tablet & Health Reminders
const CACHE_NAME = 'garbhasaathi-sw-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle incoming messages from the frontend
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, options } = event.data;
    event.waitUntil(
      self.registration.showNotification(title, {
        icon: '/favicon.svg',
        badge: '/favicon.svg',
        vibrate: [200, 100, 200, 100, 200],
        requireInteraction: true,
        ...options
      })
    );
  }
});

// Handle notification click: Bring window into focus or open GarbhaSaathi
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

