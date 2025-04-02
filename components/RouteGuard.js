import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '../store';
import { getFavourites, getHistory } from '../lib/userData';
import { readToken } from '../lib/authenticate';

const PUBLIC_PATHS = ['/login', '/register', '/'];

export default function RouteGuard(props) {
  const router = useRouter();
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [isMounted, setIsMounted] = useState(false);

  async function updateAtoms() {
    try {
      const favourites = await getFavourites();
      const history = await getHistory();
      setFavouritesList(favourites);
      setSearchHistory(history);
    } catch (err) {
      console.error("Error updating atoms:", err);
    }
  }

  useEffect(() => {
    setIsMounted(true);
    const token = readToken();

    const authCheck = (url) => {
      const path = url.split('?')[0];
      const isPublic = PUBLIC_PATHS.includes(path);
      
      if (!token && !isPublic) {
        router.push('/login');
      }
      if (token && isPublic) {
        router.push('/favourites');
      }
    };

    // Initial check
    authCheck(router.pathname);

    // Setup router event listener
    router.events.on('routeChangeComplete', authCheck);

    // Cleanup function
    return () => {
      router.events.off('routeChangeComplete', authCheck);
      setIsMounted(false);
    };
  }, [router]);

  useEffect(() => {
    const token = readToken();
    if (token && isMounted) {
      updateAtoms();
    }
  }, [router.pathname, isMounted]);

  if (!isMounted) return null;

  return <>{props.children}</>;
}