import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteOrder = async (orderId: Order["orderId"]) => {
  return await axios.delete<void>(`/orders/${orderId}`);
};

export const useDeleteOrder = (orderId: Order["orderId"]) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deleteOrder(orderId),
    onSuccess: () => qc.invalidateQueries(["orders"]),
  });
};
