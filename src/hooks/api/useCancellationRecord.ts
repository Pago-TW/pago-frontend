import { useQuery } from "@tanstack/react-query";

import type { CancelReason } from "@/components/actions/ApplyCancelModal";
import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import type { User } from "@/types/user";

export interface CancellationRecord {
  cancellationRecordId: string;
  orderId: Order["orderId"];
  userId: User["userId"];
  cancelReason: CancelReason;
  note?: string;
  createDate: string;
  updateDate: string;
  isCancelled: boolean;
}

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
