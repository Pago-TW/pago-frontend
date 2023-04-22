import { axios } from "@/libs/axios";
import type { PaginatedResponse } from "@/types/api";
import type { Order } from "@/types/order";
import type { Trip } from "@/types/trip";
import { useQuery } from "@tanstack/react-query";

const getTripMatches = async (tripId: Trip["tripId"]) => {
  const res = await axios.get<PaginatedResponse<Order[]>>(
    `/trips/${tripId}/matching-orders`
  );
  return res.data.data;
};

export const useTripMatches = (tripId: Trip["tripId"]) => {
  return useQuery({
    queryKey: ["trip", tripId, "matches"],
    queryFn: () => getTripMatches(tripId),
  });
};
