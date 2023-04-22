import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import { useQuery } from "@tanstack/react-query";

const getOrder = async (orderId: Order["orderId"]) => {
  const res = await axios.get<Order>(`/orders/${orderId}`);
  return res.data;
};

export const useOrder = (orderId: Order["orderId"]) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId),
  });
};

export default useOrder;
