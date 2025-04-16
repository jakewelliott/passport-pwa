import { routes } from '@/routes';
import type { RouteObject } from 'react-router';

// tells the service worker what routes to cache
const cachedRouteHelper = (routes: RouteObject[]): string[] => {
    const paths: string[] = [];

    const collectPaths = (routes: RouteObject[]) => {
        for (const route of routes) {
            if (route.path) {
                paths.push(route.path);
            }
            if (route.children) {
                collectPaths(route.children);
            }
        }
    };

    collectPaths(routes);

    // add a leading slash to all paths
    for (const path of paths) {
        if (path[0] !== '/') {
            paths[paths.indexOf(path)] = `/${path}`;
        }
    }

    return paths;
};

export const precachedRoutes = cachedRouteHelper(routes);
