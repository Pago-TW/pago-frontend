import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serialize } from "object-to-formdata";

import { axios } from "@/libs/axios";
import type { Order } from "@/types/order";

export interface AddOrderData {
  file: File[];
  data: {
    orderItem: {
      name: string;
      description?: string;
      quantity: number | string;
      unitPrice: number | string;
      purchaseCountry: string;
      purchaseCity: string;
      purchaseRoad: string;
    };
    isPackagingRequired: boolean;
    isVerificationRequired: boolean;
    destinationCountry: string;
    destinationCity: string;
    travelerFee: number | string;
    currency: string;
    note?: string;
    latestReceiveItemDate: Date;
  };
}

const addOrder = async (data: AddOrderData) => {
  const { file, data: orderData } = data;

  const serializedPostData = serialize(
    {
      file,
      data: JSON.stringify(orderData),
    },
    { noFilesWithArrayNotation: true }
  );
  const res = await axios.post<Order>("/orders", serializedPostData);

  return res.data;
};

export const useAddOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => qc.invalidateQueries(["orders"]),
  });
};
