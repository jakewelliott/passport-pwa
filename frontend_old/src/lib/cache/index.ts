// import { precachedFiles } from '@/lib/cache/precached-files';
// import { precachedRoutes } from '@/lib/cache/precached-routes';

// import { dbg } from '@/lib/debug';

const CACHE_VERSION = 'v0.1';
export const CACHE_NAME = `nc-dpr-digital-passport-${CACHE_VERSION}`;

// const precachedResources = [...precachedFiles, ...precachedRoutes];

// export const precache = async () => {
//     const cache = await caches.open(CACHE_NAME);
//     cache.addAll(precachedResources);
// };

// // NOTE: i was using this to test different caching strategies
// // on another branch (not pushed)

// export const cacheFirst = async (event: any) => {
//     event.respondWith(
//         (async () => {
//             const cache = await caches.open(CACHE_NAME);
//             const cachedResponse = await cache.match(event.request);

//             if (cachedResponse) {
//                 dbg('CACHE', 'cache hit', event.request.url);
//                 return cachedResponse;
//             }
//             try {
//                 const networkResponse = await fetch(event.request);
//                 if (networkResponse.ok) {
//                     // update the cache
//                     cache.put(event.request, networkResponse.clone());
//                 }
//                 return networkResponse;
//             } catch (error) {
//                 return Response.error();
//             }
//         })(),
//     );
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

// NOTE: this was when i was screwing around with workbox
// on another branch (not pushed)

// const workboxHelper = () => {
//     return precachedFiles.map((file) => {
//         return {
//             url: file,
//             revision: null,
//         };
//     });
// };

// export const staticAssets = workboxHelper();
