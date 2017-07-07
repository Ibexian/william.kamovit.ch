var staticCacheName = 'kamovitch-static-v4';
self.addEventListener('install', function(event) {
  var urlsToCache = [
    '/',
    '/img/galaxy_starfield.png',
    '/img/logo.png',
    '/img/terraformed.png',
    '/img/marsbump1k.jpg',
    '/img/marsmap1k.jpg',
    '/js/app.bundle.js',
    '/js/index.bundle.js',
    '/css/index.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic',
    'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800'
  ];

  event.waitUntil(
    // Add cache the urls from urlsToCache
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('kamovitch-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
