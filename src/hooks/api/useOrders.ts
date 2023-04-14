import type { Order } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getOrders = async (): Promise<Order[]> => {
  const res = await axios.get("/orders");
  return res.data.data;
};

export const useOrders = () => {
  return useQuery({ queryKey: ["orders"], queryFn: getOrders });
};

export default useOrders;
