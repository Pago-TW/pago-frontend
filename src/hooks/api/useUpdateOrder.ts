import { axios } from "@/libs/axios";
import type { Order, OrderStatus } from "@/types/order";
import type { AtLeastOneRequired } from "@/types/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zonedTimeToUtc } from "date-fns-tz";
import type { AddOrderData } from "./useAddOrder";

export type UpdateOrderData = AtLeastOneRequired<
  AddOrderData["data"] & { orderStatus: OrderStatus }
>;

type UpdateOrderParams = {
  orderId: Order["orderId"];
  data: UpdateOrderData;
};

const updateOrder = async (params: UpdateOrderParams) => {
  const { orderId, data } = params;

  const patchData = data.latestReceiveItemDate
    ? {
        ...data,
        latestReceiveItemDate: zonedTimeToUtc(
          data.latestReceiveItemDate,
          "UTC"
        ),
      }
    : data;
  const res = await axios.patch<Order>(`/orders/${orderId}`, patchData);

  return res.data;
};

export const useUpdateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => qc.refetchQueries(["orders"]),
  });
};
