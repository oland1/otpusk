import {useEffect, useState} from 'react';
import {HotelService} from "@/entities/hotel";
import {aggregateTourData, type FullTourData, type HotelFromApi, type Tour} from "@/entities/tour";

export const useEnrichedTours = (prices: Tour[], countryId: string | null, active: boolean) => {
  const [fullTours, setFullTours] = useState<FullTourData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!active || !prices.length || !countryId) {
      setFullTours([]);
      return;
    }

    let aborted = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const hotels = await HotelService.getHotelsByCountry(countryId);
        if (!aborted) {
          setFullTours(aggregateTourData(prices, hotels as HotelFromApi));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!aborted) setIsLoading(false);
      }
    };

    load();
    return () => {
      aborted = true;
    };
  }, [prices, countryId, active]);

  return {fullTours, isHotelsLoading: isLoading};
};