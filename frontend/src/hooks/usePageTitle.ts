import { useEffect, useState } from 'react';
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

const getTitle = (pathname: string) => {
  const title = routeTitles[pathname] || 'NC Parks Passport';
  return `NC Parks Passport | ${title}`;
};

export function usePageTitle() {
  const location = useLocation();
  const [title, setTitle] = useState(getTitle(location.pathname));

  useEffect(() => {
    const title = getTitle(location.pathname);
    document.title = title;
    setTitle(title);
  }, [location]);

  return title;
}
