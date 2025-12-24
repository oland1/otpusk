import {getSearchPrices, startSearchPrices} from '@/shared/api/api.js';

export const TourService = {
  async initSearch(countryId: string) {
    const res = await startSearchPrices(countryId);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },

  async getPrices(token: string, retryCount = 0): Promise<unknown> {
    try {
      const res = await getSearchPrices(token);

      if (res.status === 425 || res.ok) {
        return await res.json();
      }

      throw new Error(`Error, status: ${res.status}`);

    } catch (error) {
      if (retryCount < 2) {
        console.warn(`Retry attempt ${retryCount + 1} for token: ${token}`);
        return this.getPrices(token, retryCount + 1);
      }

      console.error('All retry attempts failed');
      throw error;
    }
  }
};