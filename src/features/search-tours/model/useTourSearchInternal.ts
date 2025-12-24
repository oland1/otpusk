import {useCallback, useState} from "react";
import {useTourPrices} from "./useTourPrices";
import {useEnrichedTours} from "./useEnrichedTours";
import type {GeoOption} from "@/entities/geo";

export const useTourSearchInternal = () => {
  const [selectedItem, setSelectedItem] = useState<GeoOption | null>(null);
  const [query, setQuery] = useState('');
  const [geoOptions, setGeoOptions] = useState<GeoOption[]>([]);
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const {startSearch, prices, setPrices, isLoading: isPricesLoading, error} = useTourPrices();

  const currentCountryId = selectedItem ? String(selectedItem.countryId || selectedItem.id) : null;

  const {fullTours, isHotelsLoading} = useEnrichedTours(prices, currentCountryId, hasSearched);

  const handleSelectItem = useCallback((item: GeoOption | null) => {
    setSelectedItem(item);
    setHasSearched(false);
    setPrices([]);
  }, [setPrices]);

  const executeSearch = useCallback(async () => {
    if (currentCountryId) {
      setHasSearched(true);
      await startSearch(currentCountryId);
    }
  }, [currentCountryId, startSearch]);

  return {
    selectedItem,
    setSelectedItem: handleSelectItem,
    query, setQuery,
    geoOptions, setGeoOptions,
    isGeoLoading,
    setIsGeoLoading,
    tours: fullTours,
    hasSearched,
    isLoading: isPricesLoading || isHotelsLoading,
    error,
    executeSearch,
  };
};