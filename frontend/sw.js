const CACHE_NAME = 'nc-dpr-digital-passport-v0.1';

import { cachedFiles } from './src/cached-files';

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            cache.addAll(cachedFiles);
        })(),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ('navigationPreload' in self.registration) {
                await self.registration.navigationPreload.enable();
            }
        })(),
    );

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            // only cache images
            if (IMAGE_EXTENSIONS.some((ext) => event.request.url.endsWith(ext))) {
                const cache = await caches.open(CACHE_NAME);

                // Get the resource from the cache.
                const cachedResponse = await cache.match(event.request.url, { ignoreVary: true });
                if (cachedResponse) {
                    return cachedResponse;
                }
                try {
                    // If the resource was not in the cache, try the network.
                    const fetchResponse = await fetch(event.request);
                    // Only cache GET requests
                    if (event.request.method === 'GET') {
                        cache.add(event.request, fetchResponse.clone());
                    }
                    return fetchResponse;
                } catch (e) {
                    // The network failed.
                }
            } else {
                return fetch(event.request);
            }
        })(),
    );
});
