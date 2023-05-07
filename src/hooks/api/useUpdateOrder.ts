import { axios } from "@/libs/axios";
import type { Order, OrderStatus } from "@/types/order";
import type { AtLeastOneRequired } from "@/types/util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

  const res = await axios.patch(`/orders/${orderId}`, data);
  return res.data;
};

export const useUpdateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateOrder,
    onSuccess: () => qc.refetchQueries(["orders"]),
  });
};
