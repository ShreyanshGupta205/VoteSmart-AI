const CACHE_NAME = 'votesmart-v1';
const STATIC_ASSETS = [
  '/',
  '/solve',
  '/status',
  '/recover',
  '/documents',
  '/polling',
  '/first-time',
  '/impact',
  '/checklist',
  '/decision-tree',
  '/learn',
  '/simulate',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests for navigation/static assets
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('/api/')) return; // Skip API calls

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || new Response('Offline', { status: 503 })))
  );
});
