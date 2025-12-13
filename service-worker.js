const CACHE_NAME = "juraganbuah-v6";

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",

  "./pages/login.html",
  "./pages/dashboard.html",
  "./pages/items.html",
  "./pages/sales.html",
  "./pages/invoice.html",

  "./css/styles.css",

  "./js/data.js",
  "./js/auth.js",
  "./js/barcode.js",
  "./js/invoice.js",

  "./assets/logo.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
