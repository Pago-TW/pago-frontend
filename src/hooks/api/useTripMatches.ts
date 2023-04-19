import type { Order } from "@/types/order";
import type { Trip } from "@/types/trip";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getTripMatches = async (tripId: Trip["tripId"]): Promise<Order[]> => {
  const res = await axios.get(`/trips/${tripId}/matching-orders`);
  return res.data.data;
};

export const useTripMatches = (tripId: Trip["tripId"]) => {
  return useQuery({
    queryKey: ["trip", tripId, "matches"],
    queryFn: () => getTripMatches(tripId),
  });
};
