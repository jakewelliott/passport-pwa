const CACHE_NAME = 'nc-dpr-digital-passport-v0.1';

import { cachedFiles } from '../src/cached-files';

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(cachedFiles);
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Log all cache keys for debugging
      const keys = await cache.keys();
      console.log(
        'Cache keys:',
        keys.map((key) => key.url),
      );

      // Get the resource from the cache.
      const cachedResponse = await cache.match(event.request.url, { ignoreVary: true });
      if (cachedResponse) {
        console.log('getting from cache');
        return cachedResponse;
      }
      try {
        // If the resource was not in the cache, try the network.
        const fetchResponse = await fetch(event.request);
        console.log("not getting from cache");
        // Save the resource in the cache and return it.
        cache.add(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        // The network failed.
      }
    })(),
  );
});
