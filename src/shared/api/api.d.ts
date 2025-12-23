declare module '@/shared/api/api.js' {
  export function getCountries(): Promise<Response>;

  export function searchGeo(query: string): Promise<Response>;
}