'use strict';

// Static Files as version
var staticCache = 'v1.2.0';

// Files to cache
var files = [
  './',
  './index.html',
  './js/manifest.json',
  './js/index.js',
  './js/sw.js',
  'https://tegorinternational.github.io/GitHub.io/css/sidenav.css',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiX_EW1z1EAiqibSeW3pw1kvTa9XFV0xhoQK8ucHzYdUeV9ArqEGq1TqoU3oOmkn1_wtb1iFtxr8gbTyhjfic0V4dGeuLgHlS7QFYqxLUY42i6L0hfloTfyDqvdxBaA9lysTJ0zix2FTXI6vW1kGhxZ6U5CX25RabCuDNKyK9SD7rcrZanybbmQ2zUf9w/s3264/20220325_152337.png',
  'https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css',
  'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
  'https://cdn.jsdelivr.net/npm/toastify-js',
];

// Install
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(staticCache).then(cache => {
      return cache
        .addAll(files)
        .then(() => console.log('App Version: ' + staticCache))
        .catch(err => console.error('Error adding files to cache', err));
    }),
  );
});

// Activate
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== staticCache) {
            console.info('Deleting Old Cache', cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
  return self.clients.claim();
});

// Fetch
self.addEventListener('fetch', e => {
  const req = e.request;
  const url = new URL(req.url);
  if (url.origin === location.origin) return e.respondWith(cacheFirst(req));
  else return e.respondWith(networkFirst(req));
});

async function cacheFirst(req) {
  let cacheRes = await caches.match(req);
  return cacheRes || fetch(req);
}

async function networkFirst(req) {
  const dynamicCache = await caches.open('dynamic');
  try {
    const networkResponse = await fetch(req);
    if (req.method !== 'POST') dynamicCache.put(req, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    const cacheResponse = await caches.match(req);
    return cacheResponse;
  }
}