export interface Tour {
  id: string;
  hotelId: number;
  amount: number;
  currency: string;
  dateStart: string;
  dateEnd: string;
}

export interface TourApiResponse {
  id: string;
  hotelID: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
}

export interface HotelFromApi {
  id: number | string;
  name: string;
  img: string;
  countryName: string;
}

export interface FullTourData extends Tour {
  hotelName: string;
  hotelImage: string;
  hotelRegion: string;
}