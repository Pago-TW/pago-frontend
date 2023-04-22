import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ApplyCancelOrderData = {
  cancelReason: string;
  note?: string;
};

type ApplyCancelResponse = {
  cancellationRecordId: string;
  orderId: string;
  userId: string;
  cancelReason: string;
  note: string;
  createDate: string;
  updateDate: string;
  isCanceled: boolean;
};

const ApplyCancelOrder = async (
  orderId: Order["orderId"],
  data: ApplyCancelOrderData
) => {
  const res = await axios.post<ApplyCancelResponse>(
    `/orders/${orderId}/cancel-record`,
    data
  );
  return res.data;
};

export const useApplyCancelOrder = (
  orderId: Order["orderId"],
  data: ApplyCancelOrderData
) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => ApplyCancelOrder(orderId, data),
    onSuccess: () => qc.invalidateQueries(["orders"]),
  });
};
