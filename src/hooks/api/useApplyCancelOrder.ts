import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ApplyCancelOrderParams = {
  orderId: Order["orderId"];
  data: {
    cancelReason: string;
    note?: string;
  };
};

type ApplyCancelResponse = {
  cancellationRecordId: string;
  orderId: string;
  userId: string;
  cancelReason: string;
  note: string;
  createDate: string;
  updateDate: string;
  isCancelled: boolean;
};

const applyCancelOrder = async (params: ApplyCancelOrderParams) => {
  const { orderId, data } = params;

  const res = await axios.post<ApplyCancelResponse>(
    `/orders/${orderId}/cancel-record`,
    data
  );
  return res.data;
};

export const useApplyCancelOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: applyCancelOrder,
    onSuccess: () => qc.invalidateQueries(["orders"]),
  });
};
