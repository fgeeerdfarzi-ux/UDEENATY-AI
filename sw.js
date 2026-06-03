const CACHE_NAME = 'uin-bot-v1.7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Установка воркера и кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Работа в офлайне: отдаем файлы из кэша
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
