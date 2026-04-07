
const CACHE_NAME = 'desafio-10-v2'; // Incrementado para v2 para forçar atualização
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação e Cache
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força o novo SW a assumir o controle imediatamente
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação e Limpeza de Caches Antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Estratégia Fetch
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
