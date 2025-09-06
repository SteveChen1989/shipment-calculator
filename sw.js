
const CACHE_NAME = "pwa-cache-20250906";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "sw.js",
  "icon-192.png",
  "icon-512.png"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(networkRes => {
        const copy = networkRes.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
        return networkRes;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
