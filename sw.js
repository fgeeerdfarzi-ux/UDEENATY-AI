// Меняй этот номер (например, на v1.91, v2.0), когда выпускаешь обновление!
const CACHE_NAME = 'uin-bot-v2.0'; // Поменяли версию для сброса кэша!

const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Принудительно активируем новый воркера сразу же
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Насильно обновляем
  );
});

// Чистим старый кэш, если версия изменилась
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
