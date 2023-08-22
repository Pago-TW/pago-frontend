import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import type { AtLeastOneRequired } from "@/types/util";

import type { CancellationRecord } from "./useCancellationRecord";

export type ReplyCancellationData = AtLeastOneRequired<{
  isCancelled: boolean;
}>;

interface ReplyCancellationParams {
  orderId: Order["orderId"];
  data: ReplyCancellationData;
}

const replyCancellation = async (params: ReplyCancellationParams) => {
  const { orderId, data } = params;

  const res = await axios.patch<CancellationRecord>(
    `/orders/${orderId}/cancellation-record`,
    data
  );
  return res.data;
};

export const useReplyCancellation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: replyCancellation,
    onSuccess: (_data, variables) =>
      qc.invalidateQueries(["orders", variables.orderId]),
  });
};
