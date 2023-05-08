import { axios } from "@/libs/axios";
import type { Bid } from "@/types/bid";
import type { Order } from "@/types/order";
import type { Trip } from "@/types/trip";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zonedTimeToUtc } from "date-fns-tz";

type AddBidParams = {
  orderId: Trip["tripId"];
  data: {
    tripId: Trip["tripId"];
    bidAmount: number;
    currency: string;
    latestDeliveryDate: Date;
  };
};

type AddBidResponse = {
  bidId: Bid["bidId"];
  orderId: Order["orderId"];
  tripId: Trip["tripId"];
  bidAmount: number;
  currency: string;
  createDate: string;
  updateDate: string;
  latestDeliveryDate: string;
  bidStatus: Bid["bidStatus"];
};

const addBid = async (params: AddBidParams) => {
  const { orderId, data } = params;

  const postData = {
    ...data,
    latestDeliveryDate: zonedTimeToUtc(data.latestDeliveryDate, "UTC"),
  };
  const res = await axios.post<AddBidResponse>(
    `/orders/${orderId}/bids`,
    postData
  );

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
