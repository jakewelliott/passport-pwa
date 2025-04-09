import { precachedFiles } from './precached-files';
import { precachedRoutes } from './precached-routes';

const CACHE_VERSION = 'v0.1';
export const CACHE_NAME = `nc-dpr-digital-passport-${CACHE_VERSION}`;

const precachedResources = [...precachedFiles, ...precachedRoutes];

const workboxHelper = () => {
    return precachedFiles.map((file) => {
        return {
            url: file,
            revision: null,
        };
    });
};

export const staticAssets = workboxHelper();

export const precache = async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(precachedResources);
};

// export const cacheFirst = async (request: Request) => {
//     const cachedResponse = await caches.match(request);
//     if (cachedResponse) {
//         dbg('CACHE', 'cache hit', { request });
//         return cachedResponse;
//     }
//     try {
//         const networkResponse = await fetch(request);
//         if (networkResponse.ok) {
//             // update the cache
//             const cache = await caches.open(CACHE_NAME);
//             cache.put(request, networkResponse.clone());
//         }
//         return networkResponse;
//     } catch (error) {
//         return Response.error();
//     }
// };

// export const cacheFirstWithRefresh = async (request: Request) => {
//     const fetchResponsePromise = fetch(request).then(async (networkResponse) => {
//         // only cache GET requests
//         if (request.method === 'GET' && networkResponse.ok) {
//             const cache = await caches.open(CACHE_NAME);
//             cache.put(request, networkResponse.clone());
//         }
//         return networkResponse;
//     });
//     return (await caches.match(request)) || (await fetchResponsePromise);
// };

// export const registerServiceWorker = () => {
//     if ('serviceWorker' in navigator) {
//         window.addEventListener('load', () => {
//             navigator.serviceWorker
//                 .register('/sw.js', {
//                     type: 'module',
//                 })
//                 .then((registration) => {
//                     dbg('SW', 'registered', { scope: registration.scope });
//                 })
//                 .catch((error) => {
//                     dbg('SW', 'registration failed');
//                     console.error(error);
//                 });
//         });
//     } else {
//         dbg('SW', 'service worker not supported');
//     }
// };
