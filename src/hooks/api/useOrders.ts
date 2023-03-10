import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Order } from "../../components/OrderCard";

const getOrders = async (): Promise<Order[]> => {
  const res = await axios.get("/orders", {
    params: { size: 10 },
  });
  return res.data.data;
};

export const useOrders = () => {
  return useQuery({ queryKey: ["orders"], queryFn: getOrders });
};

export default useOrders;
