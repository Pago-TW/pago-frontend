import type { PostponeReason } from "@/components/actions/ApplyPostponeModal";
import { axios } from "@/libs/axios";
import type { Order, OrderStatus } from "@/types/order";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export type PostponeRecord = {
  postponeRecordId: string;
  orderId: Order["orderId"];
  userId: User["userId"];
  postponeReason: PostponeReason;
  note?: string;
  createDate: string;
  updateDate: string;
  originalOrderStatus: OrderStatus;
  isPostponed: boolean;
};

const getPostponeRecord = async (orderId: Order["orderId"]) => {
  const res = await axios<PostponeRecord>(`/orders/${orderId}/postpone-record`);
  return res.data;
};

export const usePostponeRecord = (
  orderId: Order["orderId"],
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  }
) => {
  return useQuery({
    queryKey: ["orders", orderId, "postpone-record"],
    queryFn: () => getPostponeRecord(orderId),
    ...options,
  });
};
