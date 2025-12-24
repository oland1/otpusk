declare module '@/shared/api/api.js' {
  export function getCountries(): Promise<Response>;

  export function searchGeo(query: string): Promise<Response>;

  export function startSearchPrices(countryId: string): Promise<Response>;

  export function getSearchPrices(token: string): Promise<Response>;

  export function getHotels(countryId: string): Promise<Response>;

  export function stopSearchPrices(token: string): Promise<Response>;
}