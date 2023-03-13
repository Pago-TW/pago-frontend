import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Order } from "../../components/OrderItem";

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
