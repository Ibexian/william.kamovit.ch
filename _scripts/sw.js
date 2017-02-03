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
    '/css/index.css'
  ];

  event.waitUntil(
    // Add cache the urls from urlsToCache
    caches.open('kamovitch-static-v2').then(function(cache){
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.response)
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) {
        console.log(response);
        return response;
      }
      return fetch(event.request);
    })
  );
});
