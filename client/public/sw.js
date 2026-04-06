const CACHE_NAME = 'logos-protocol-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// The Installation: Priming the cache with the illusion
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Aristotle\'s Service Worker: Form cached successfully.');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// The Interception: Serving the mirage if the physical network fails
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached asset or fallback to fetching from network
      return response || fetch(event.request).catch(() => {
        console.log('The Network failed. Serving cached illusion...');
      });
    })
  );
});