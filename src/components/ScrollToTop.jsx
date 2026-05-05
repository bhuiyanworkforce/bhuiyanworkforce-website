import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const attempt = (tries) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (tries > 0) {
          setTimeout(() => attempt(tries - 1), 100);
        }
      };
      setTimeout(() => attempt(10), 50);
    } else {
      globalThis.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
