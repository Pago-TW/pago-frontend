import { axios } from "@/libs/axios";
import type { Order, StatusCode } from "@/types/order";
import { useMutation } from "@tanstack/react-query";

type PostponeOrderData = {
  postponeReason: string;
  note?: string;
};

type PostponeResponse = {
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

const postponeOrder = async (
  orderId: Order["orderId"],
  data: PostponeOrderData
) => {
  const res = await axios.post<PostponeResponse>(
    `/orders/${orderId}/postpone-record`,
    data
  );
  return res.data;
};

export const usePostponeOrder = (
  orderId: Order["orderId"],
  data: PostponeOrderData
) => {
  return useMutation({
    mutationFn: () => postponeOrder(orderId, data),
  });
};
