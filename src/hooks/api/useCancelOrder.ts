import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type CancelOrderData = {
  cancelReason: string;
  note?: string;
};

type CancelResponse = {
  cancellationRecordId: string;
  orderId: string;
  userId: string;
  cancelReason: string;
  note: string;
  createDate: string;
  updateDate: string;
  isCanceled: boolean;
};

const cancelOrder = async (
  orderId: Order["orderId"],
  data: CancelOrderData
) => {
  const res = await axios.post<CancelResponse>(
    `/orders/${orderId}/cancel-record`,
    data
  );
  return res.data;
};

export const useCancelOrder = (
  orderId: Order["orderId"],
  data: CancelOrderData
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => cancelOrder(orderId, data),
    onSuccess: () => qc.invalidateQueries(["orders"]),
  });
};
