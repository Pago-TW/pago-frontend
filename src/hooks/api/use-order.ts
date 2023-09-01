import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";

const getOrder = async (orderId: Order["orderId"]) => {
  const res = await axios.get<Order>(`/orders/${orderId}`);
  return res.data;
};

export const useOrder = (orderId: Order["orderId"]) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });
};

export default useOrder;
