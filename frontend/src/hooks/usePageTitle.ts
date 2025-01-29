import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
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
};

export function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'NC Parks Passport';
    document.title = `NC Parks Passport | ${title}`;
  }, [location]);
}
