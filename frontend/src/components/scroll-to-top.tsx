import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollableContainer = document.querySelector('.layout');
    if (scrollableContainer) {
      scrollableContainer.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
