export type GeoType = 'country' | 'city' | 'hotel';

export interface GeoOption {
  id: string | number;
  name: string;
  type: GeoType;
  flag?: string;
  countryId?: string;
}