import type {Tour} from "@/entities/tour";
import type {FullTourData, HotelFromApi} from "./types.ts";


export const aggregateTourData = (prices: Tour[], hotels: HotelFromApi): FullTourData[] => {
  const hotelsArray = Array.isArray(hotels)
    ? hotels
    : Object.values(hotels || {});

  const hotelMap = hotelsArray.reduce((acc, hotel) => {
    if (hotel && hotel.id) {
      acc[hotel.id.toString()] = hotel;
    }
    return acc;
  }, {} as Record<string, HotelFromApi>);

  return prices.map((price) => {
    const hotel = hotelMap[price.hotelId.toString()];

    return {
      ...price,
      hotelName: hotel?.name || "",
      hotelImage: hotel?.img || "",
      hotelRegion: hotel?.countryName || "",
    };
  });
};