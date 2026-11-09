import { useState, useEffect, useCallback } from 'react';

export function useNavigation() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );
  const [searchParams, setSearchParams] = useState<URLSearchParams>(() =>
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams()
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((path: string) => {
    const [pathname, queryString] = path.split('?');
    window.history.pushState({}, '', path);
    setCurrentPath(pathname || '/');
    setSearchParams(new URLSearchParams(queryString || ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { currentPath, searchParams, navigate };
}
