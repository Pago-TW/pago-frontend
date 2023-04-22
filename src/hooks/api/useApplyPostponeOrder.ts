import { axios } from "@/libs/axios";
import type { Order, StatusCode } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

type ApplyPostponeOrderData = {
  postponeReason: string;
  note?: string;
};

type ApplyPostponeResponse = {
  postponeRecordId: string;
  orderId: string;
  userId: string;
  postponeReason: string;
  note: string;
  createDate: string;
  updateDate: string;
  originalOrderStatus: StatusCode;
  isPostponed: boolean;
};

const applyPostponeOrder = async (
  orderId: Order["orderId"],
  data: ApplyPostponeOrderData
) => {
  const res = await axios.post<ApplyPostponeResponse>(
    `/orders/${orderId}/postpone-record`,
    data
  );
  return res.data;
};

export const useApplyPostponeOrder = (
  orderId: Order["orderId"],
  data: ApplyPostponeOrderData
) => {
  return useMutation({
    mutationFn: () => applyPostponeOrder(orderId, data),
  });
};
