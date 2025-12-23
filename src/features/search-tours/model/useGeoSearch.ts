import {useRef, useState} from 'react';
import {GeoService} from '@/entities/geo/api/geoService';
import type {GeoOption} from '@/entities/geo/model/types';

export const useGeoSearch = () => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<GeoOption[]>([]);
  const [selectedItem, setSelectedItem] = useState<GeoOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestIdRef = useRef(0);

  const safeRequest = async (fn: () => Promise<GeoOption[]>) => {
    const requestId = ++requestIdRef.current;
    setIsLoading(true);

    const data = await fn();

    if (requestId === requestIdRef.current) {
      setOptions(data);
      setIsLoading(false);
    }
  };

  const handleFocus = async () => {
    if (!query) {
      await safeRequest(() => GeoService.fetchCountries());
      return;
    }

    if (selectedItem) {
      if (selectedItem.type === 'country') {
        await safeRequest(() => GeoService.fetchCountries());
      } else {
        await safeRequest(() => GeoService.search(selectedItem.name));
      }
      return;
    }

    await safeRequest(() => GeoService.search(query));
  };

  const handleChange = async (text: string) => {
    setQuery(text);

    if (selectedItem && text !== selectedItem.name) {
      setSelectedItem(null);
    }

    if (!text) {
      await safeRequest(() => GeoService.fetchCountries());
      return;
    }

    await safeRequest(() => GeoService.search(text));
  };

  const handleSelect = (option: GeoOption) => {
    setQuery(option.name);
    setSelectedItem(option);
  };

  const handleClear = () => {
    setQuery('');
    setOptions([]);
    setSelectedItem(null);
  };

  return {
    query,
    options,
    selectedItem,
    isLoading,
    handleFocus,
    handleChange,
    handleClear,
    handleSelect,
  };
};