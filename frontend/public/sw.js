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
  const requestURL = new URL(event.request.url);
  const cacheKey = new Request(requestURL.pathname, event.request);
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Get the resource from the cache.
      const cachedResponse = await cache.match(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
      try {
        // If the resource was not in the cache, try the network.
        const fetchResponse = await fetch(event.request);

        // Save the resource in the cache and return it.
        cache.add(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        // The network failed.
      }
    })(),
  );
});
