import type { Order } from "@/types/order";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getOrder = async (orderId: Order["orderId"]): Promise<Order> => {
  const res = await axios.get(`/orders/${orderId}`);
  return res.data;
};

export const useOrder = (orderId: Order["orderId"]) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
  });
};

export default useOrder;
