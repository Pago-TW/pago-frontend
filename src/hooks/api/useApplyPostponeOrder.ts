import { axios } from "@/libs/axios";
import type { Order, OrderStatus } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ApplyPostponeOrderParams = {
  orderId: Order["orderId"];

  data: { postponeReason: string; note?: string };
};

type ApplyPostponeResponse = {
  postponeRecordId: string;
  orderId: string;
  userId: string;
  postponeReason: string;
  note: string;
  createDate: string;
  updateDate: string;
  originalOrderStatus: OrderStatus;
  isPostponed: boolean;
};

const applyPostponeOrder = async (params: ApplyPostponeOrderParams) => {
  const { orderId, data } = params;

  const res = await axios.post<ApplyPostponeResponse>(
    `/orders/${orderId}/postpone-record`,
    data
  );
  return res.data;
};

export const useApplyPostponeOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: applyPostponeOrder,
    onSuccess: () => qc.refetchQueries(["orders"]),
  });
};
