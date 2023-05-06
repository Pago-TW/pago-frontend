import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export type CancellationRecord = {
  cancellationRecordId: string;
  orderId: Order["orderId"];
  userId: User["userId"];
  cancelReason: string;
  note?: string;
  createDate: string;
  updateDate: string;
  isCancelled: boolean;
};

const getCancellationRecord = async (orderId: Order["orderId"]) => {
  const res = await axios<CancellationRecord>(
    `/orders/${orderId}/cancellation-record`
  );
  return res.data;
};

export const useCancellationRecord = (
  orderId: Order["orderId"],
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
  }
) => {
  return useQuery({
    queryKey: ["orders", orderId, "cancellation-record"],
    queryFn: () => getCancellationRecord(orderId),
    ...options,
  });
};
