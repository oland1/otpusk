import {useCallback, useRef, useState} from 'react';
import {stopSearchPrices} from '@/shared/api/api.js';
import type {Tour, TourApiResponse} from '@/entities/tour';
import {mapTourPrices, TourService} from '@/entities/tour';


export const useTourPrices = () => {
  const [prices, setPrices] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cache = useRef<Record<string, Tour[]>>({});
  const activeToken = useRef<string | null>(null);
  const currentSearchId = useRef(0);

  const startSearch = useCallback(async (countryId: string) => {

    if (cache.current[countryId]) {
      setPrices(cache.current[countryId]);
      setError(null);
      return;
    }

    if (activeToken.current) {
      const tokenToStop = activeToken.current;
      stopSearchPrices(tokenToStop).catch(() => {
      });
      activeToken.current = null;
    }

    const searchId = ++currentSearchId.current;
    setIsLoading(true);
    setError(null);
    setPrices([]);

    try {
      const {token, waitUntil: initialWait} = await TourService.initSearch(countryId);
      activeToken.current = token;

      let nextWaitUntil = initialWait;
      let retryCount = 0;

      while (searchId === currentSearchId.current) {
        const delay = Math.max(0, new Date(nextWaitUntil).getTime() - Date.now());
        await new Promise(res => setTimeout(res, delay));

        if (searchId !== currentSearchId.current) break;

        try {
          const res = await TourService.getPrices(token) as {
            prices?: Record<string, TourApiResponse>,
            waitUntil: string
          };

          if (searchId !== currentSearchId.current) break;
          if (res.prices) {
            const mapped = mapTourPrices(res.prices);
            cache.current[countryId] = mapped;
            setPrices(mapped);
            setIsLoading(false);
            activeToken.current = null;
            return;
          }

          nextWaitUntil = res.waitUntil;
          retryCount = 0;
        } catch (err) {
          retryCount++;
          if (retryCount > 2) throw err;

          nextWaitUntil = new Date(Date.now() + 2000).toISOString();
        }
      }
    } catch {
      if (searchId === currentSearchId.current) {
        setError('Не вдалося завантажити ціни. Спробуйте пізніше.');
        setIsLoading(false);
      }
    }
  }, []);

  return {prices, setPrices, isLoading, error, startSearch};
};