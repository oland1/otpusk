import {getHotels} from '@/shared/api/api.js';

const hotelCache: Record<string, unknown[]> = {};

export const HotelService = {
  async getHotelsByCountry(countryId: string) {
    if (hotelCache[countryId]) {
      return hotelCache[countryId];
    }

    const res = await getHotels(countryId);
    if (!res.ok) throw new Error('Failed to fetch hotels');

    const data = await res.json();
    hotelCache[countryId] = data;
    return data;
  }
};