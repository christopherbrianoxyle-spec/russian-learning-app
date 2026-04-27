/* ============================================================
   SERVICE WORKER — CLEAN VERSION
   ============================================================ */

const CACHE_NAME = "russian-app-cache-v1";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./app.js",
  "./styles.css"
];

/* ── INSTALL ─────────────────────────────────────────────── */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

/* ── ACTIVATE ────────────────────────────────────────────── */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

/* ── FETCH ───────────────────────────────────────────────── */
self.addEventListener("fetch", event => {
  const req = event.request;

  // ❌ Ignore les requêtes non HTTP (chrome-extension, etc.)
  if (!req.url.startsWith("http")) return;

  event.respondWith(
    caches.match(req).then(cachedRes => {
      if (cachedRes) return cachedRes;

      return fetch(req)
        .then(networkRes => {
          // Clone obligatoire
          const resClone = networkRes.clone();

          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, resClone);
          });

          return networkRes;
        })
        .catch(() => {
          // fallback offline (optionnel)
          return caches.match("./index.html");
        });
    })
  );
});
