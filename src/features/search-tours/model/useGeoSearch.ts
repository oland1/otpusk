import {useCallback, useEffect, useRef} from 'react';
import type {GeoOption} from "@/entities/geo";
import {GeoService} from '@/entities/geo';
import {useSearchTours} from './SearchToursContext';

export const useGeoSearch = () => {
  const {
    query, setQuery,
    selectedItem, setSelectedItem,
    geoOptions: options, setGeoOptions: setOptions,
    isGeoLoading: isLoading, setIsGeoLoading: setIsLoading
  } = useSearchTours();

  const requestIdRef = useRef(0);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, []);

  const safeRequest = useCallback(async (fn: () => Promise<GeoOption[]>) => {
    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    try {
      const data = await fn();
      if (requestId === requestIdRef.current) setOptions(data);
    } catch {
      if (requestId === requestIdRef.current) setOptions([]);
    } finally {
      if (requestId === requestIdRef.current) setIsLoading(false);
    }
  }, [setIsLoading, setOptions]);

  const handleFocus = () => {
    if (!query) return safeRequest(() => GeoService.fetchCountries());
    safeRequest(() => GeoService.search(query));
  };

  const handleChange = (text: string) => {
    setQuery(text);

    if (selectedItem && text !== selectedItem.name) {
      setSelectedItem(null);
    }

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      if (!text) safeRequest(() => GeoService.fetchCountries());
      else safeRequest(() => GeoService.search(text));
    }, 300);
  };

  const handleSelect = (option: GeoOption) => {
    setQuery(option.name);
    setSelectedItem(option);
    setOptions([]);
  };

  const handleClear = () => {
    setQuery('');
    setOptions([]);
    setSelectedItem(null);
  };

  return {
    query, options, isLoading, selectedItem,
    handleFocus, handleChange, handleClear, handleSelect,
  };
};