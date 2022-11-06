const CACHE_NAME = "SW-001";
const toCache = [
  "/",
  "assets/js/web.webmanifest",
  "assets/js/register.js",
  "assets/icons/idebisnis-icon-48x48.png",
  "assets/icons/idebisnis-icon-72x72.png",
  "assets/icons/idebisnis-icon-96x96.png",
  "assets/icons/idebisnis-icon-144x144.png",
  "assets/icons/idebisnis-icon-192x192.png",
  "assets/icons/favicon-16x16.png",
  "assets/icons/favicon-32x32.png",
  "assets/icons/favicon-96x96.png",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(toCache);
      })
      .then(self.skipWaiting())
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request);
      });
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key !== CACHE_NAME) {
              console.log("[ServiceWorker] Hapus cache lama", key);
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});
