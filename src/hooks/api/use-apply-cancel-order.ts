import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";

interface ApplyCancelOrderParams {
  orderId: Order["orderId"];
  data: {
    cancelReason: string;
    note?: string;
  };
}

interface ApplyCancelResponse {
  cancellationRecordId: string;
  orderId: string;
  userId: string;
  cancelReason: string;
  note: string;
  createDate: string;
  updateDate: string;
  isCancelled: boolean;
}

const applyCancelOrder = async (params: ApplyCancelOrderParams) => {
  const { orderId, data } = params;

  const res = await axios.post<ApplyCancelResponse>(
    `/orders/${orderId}/cancellation-record`,
    data
  );
  return res.data;
};

export const useApplyCancelOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: applyCancelOrder,
    onSuccess: (_data, variables) =>
      qc.invalidateQueries(["orders", variables.orderId]),
  });
};
