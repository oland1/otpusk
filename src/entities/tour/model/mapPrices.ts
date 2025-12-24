import type {Tour, TourApiResponse} from "@/entities/tour";


export const mapTourPrices = (rawPrices: Record<string, TourApiResponse>): Tour[] => {
  return Object.values(rawPrices).map((item) => {

    return {
      id: item.id,
      hotelId: Number(item.hotelID),
      amount: item.amount,
      currency: item.currency.toUpperCase(),
      dateStart: item.startDate,
      dateEnd: item.endDate,
    };
  });
};