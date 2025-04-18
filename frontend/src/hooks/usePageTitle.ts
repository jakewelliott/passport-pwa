import { useLocation as usePathLocation } from 'react-router';

const DEFAULT_TITLE = 'NC Parks Passport';

const routeTitles: Record<string, string> = {
    '/login': 'Login',
    '/logout': 'Logout',
    '/locations': 'Locations',
    '/stamps': 'Stamps',
    '/more': 'More',
    '/more/app-info': 'App Information',
    '/more/bucket-list': 'Bucket List',
    '/more/icon-legend': 'Icon Legend',
    '/more/trails': 'Trails',
    '/more/welcome-message': 'Welcome',
    '/more/staying-safe': 'Staying Safe',
    '/more/hiking-essentials': 'Hiking Essentials',
    '/more/my-notes': 'My Notes',
    '/more/my-notes/general-notes': 'General Notes',
    '/more/my-profile': 'My Profile',
};

const topLevelCheck = (path: string) => path.split('/').length - 1 > 1; // /stamps will split into ['', 'stamps']

const getTitle = (pathname: string) => {
    if (pathname.startsWith('/locations') && !routeTitles[pathname]) return 'Park Details';
    return routeTitles[pathname] || DEFAULT_TITLE;
};

export function usePageTitle() {
    const location = usePathLocation();
    // const [pageTitle, setPageTitle] = useState(DEFAULT_TITLE);
    const showBackButton = topLevelCheck(location.pathname);

    const pageTitle = getTitle(location.pathname);

    return { pageTitle, showBackButton };
}
