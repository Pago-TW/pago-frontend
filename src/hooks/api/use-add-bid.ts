import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Bid } from "@/types/bid";
import type { Order } from "@/types/order";
import type { Trip } from "@/types/trip";

interface AddBidParams {
  orderId: Trip["tripId"];
  data: {
    tripId: Trip["tripId"];
    bidAmount: number;
    currency: string;
    latestDeliveryDate: Date;
  };
}

interface AddBidResponse {
  bidId: Bid["bidId"];
  orderId: Order["orderId"];
  tripId: Trip["tripId"];
  bidAmount: number;
  currency: string;
  createDate: string;
  updateDate: string;
  latestDeliveryDate: string;
  bidStatus: Bid["bidStatus"];
}

const addBid = async (params: AddBidParams) => {
  const { orderId, data } = params;

  const res = await axios.post<AddBidResponse>(`/orders/${orderId}/bids`, data);

  return res.data;
};

export const useAddBid = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addBid,
    onSuccess: (_data, variables) =>
      qc.invalidateQueries(["orders", variables.orderId]),
  });
};
