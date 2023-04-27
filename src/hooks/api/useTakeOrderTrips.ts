import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import type { Trip } from "@/types/trip";
import { useQuery } from "@tanstack/react-query";

const getTakeOrderTrips = async (orderId: Order["orderId"]) => {
  const res = await axios.get<Trip[]>("/trips", { params: { orderId } });
  return res.data;
};
export const useTakeOrderTrips = (orderId: Order["orderId"]) => {
  return useQuery({
    queryKey: ["take-order", orderId],
    queryFn: () => getTakeOrderTrips(orderId),
  });
};
