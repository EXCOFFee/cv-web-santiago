/**
 * Service Worker para CV Web
 * Proporciona funcionalidades PWA básicas
 */

const CACHE_NAME = 'cv-web-v1.0.0';
const urlsToCache = [
  '/',
  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('SW: Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('SW: Error al abrir cache:', error);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('SW: Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes de red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Si hay una respuesta en cache, la devolvemos
        if (response) {
          return response;
        }
        
        // Si no, hacemos la solicitud de red
        return fetch(event.request)
          .catch((error) => {
            console.log('SW: Error en fetch:', error);
          });
      })
  );
});

// Manejo de mensajes desde la aplicación
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
