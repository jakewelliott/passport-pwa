import { precachedFiles } from '@/lib/cache/precached-files';
import { dbg } from '@/lib/debug';

const CACHE_NAME = 'nc-dpr-digital-passport-v0.1';

dbg('SW', 'service worker entrypoint');

// NOTE: for some reason, importing this file causes the service worker to fail to register
// import { precachedRoutes } from '@/lib/cache/precached-routes';
// console.log(precachedRoutes);

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

// cache all images on install
self.addEventListener('install', (event) => {
    dbg('SW', 'installing');
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            cache.addAll(precachedFiles);
            dbg('SW', 'cached images');
        })(),
    );
});

self.addEventListener('activate', (event) => {
    dbg('SW', 'activating');
    event.waitUntil(
        (async () => {
            // Enable navigation preload if it's supported.
            // See https://developers.google.com/web/updates/2017/02/navigation-preload
            if ('navigationPreload' in self.registration) {
                await self.registration.navigationPreload.enable();
                dbg('SW', 'navigation preload enabled');
            }
        })(),
    );

    // Tell the active service worker to take control of the page immediately.
    self.clients.claim();
});

// service worker only handles image requests
self.addEventListener('fetch', (event) => {
    dbg('SW', 'fetching', event?.request?.url);
    event.respondWith(
        (async () => {
            if (IMAGE_EXTENSIONS.some((ext) => event.request.url.endsWith(ext))) {
                const cache = await caches.open(CACHE_NAME);

                // Get the resource from the cache.
                const cachedResponse = await cache.match(event.request.url, { ignoreVary: true });
                if (cachedResponse) {
                    dbg('SW', 'cache hit');
                    return cachedResponse;
                }
                try {
                    dbg('SW', 'cache miss');
                    // If the resource was not in the cache, try the network.
                    const fetchResponse = await fetch(event.request);
                    // Only cache GET requests
                    if (event.request.method === 'GET') {
                        cache.add(event.request, fetchResponse.clone());
                    }
                    return fetchResponse;
                } catch (e) {
                    // The network failed.
                    dbg('SW', 'network failed');
                }
            } else {
                return fetch(event.request);
            }
        })(),
    );
});
