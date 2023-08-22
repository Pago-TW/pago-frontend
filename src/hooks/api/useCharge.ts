import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Bid, BidCreator } from "@/types/bid";

import type { AddOrderData } from "./useAddOrder";

export interface OrderCharge {
  travelerFee: number;
  platformFee: number;
  totalAmount: number;
  currency: string;
}

export interface BidCharge extends OrderCharge {
  bidder: BidCreator;
}

const getCharge = async <
  DataType extends AddOrderData["data"] | Pick<Bid, "bidId">,
  ResponseType extends DataType extends AddOrderData["data"]
    ? OrderCharge
    : BidCharge,
>(
  data: DataType
) => {
  const res = await axios.post<ResponseType>("/calculate-order-amount", data);
  return res.data;
};

export const useCharge = <
  DataType extends AddOrderData["data"] | Pick<Bid, "bidId">,
>(
  data: DataType,
  options?: { enabled?: boolean; refetchOnWindowFocus?: boolean }
) => {
  return useQuery({
    queryKey: ["charge", data],
    queryFn: () => getCharge(data),
    ...options,
  });
};
