import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import type { AtLeastOneRequired } from "@/types/util";

import type { PostponeRecord } from "./usePostponeRecord";

export type ReplyPostponeData = AtLeastOneRequired<{ isPostponed: boolean }>;

type ReplyPostponeParams = {
  orderId: Order["orderId"];
  data: ReplyPostponeData;
};

const replyPostpone = async (params: ReplyPostponeParams) => {
  const { orderId, data } = params;

  const res = await axios.patch<PostponeRecord>(
    `/orders/${orderId}/postpone-record`,
    data
  );
  return res.data;
};

export const useReplyPostpone = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: replyPostpone,
    onSuccess: (_data, variables) =>
      qc.invalidateQueries(["orders", variables.orderId]),
  });
};
