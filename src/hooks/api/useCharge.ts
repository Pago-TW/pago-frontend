import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AddOrderData } from "./useAddOrder";

interface Charge {
  travelerFee: number;
  tariffFee: number;
  platformFee: number;
  totalAmount: number;
  currency: string;
}

const getCharge = async (data: AddOrderData["data"]): Promise<Charge> => {
  const res = await axios.post("/calculate-order-amount", data);
  return res.data;
};

export const useCharge = (data: AddOrderData["data"]) => {
  return useQuery({
    queryKey: ["charge", data],
    queryFn: () => getCharge(data),
  });
};
