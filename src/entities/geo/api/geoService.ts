import {getCountries, searchGeo} from '@/shared/api/api.js';
import type {GeoOption} from '../model/types';

export const GeoService = {
  async fetchCountries(): Promise<GeoOption[]> {
    const res = await getCountries();
    const data = await res.json();
    return Object.values(data);
  },
  
  async search(query: string): Promise<GeoOption[]> {
    const res = await searchGeo(query);
    const data = await res.json();
    return Object.values(data);
  },
};