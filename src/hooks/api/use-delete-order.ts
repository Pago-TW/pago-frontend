import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";

interface DeleteOrderParams {
  orderId: Order["orderId"];
}

const deleteOrder = async (params: DeleteOrderParams) => {
  const { orderId } = params;

  return await axios.delete<void>(`/orders/${orderId}`);
};

export const useDeleteOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => qc.invalidateQueries(["orders"]),
  });
};
