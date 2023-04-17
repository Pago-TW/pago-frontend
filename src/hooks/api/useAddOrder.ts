import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { serialize } from "object-to-formdata";

export type AddOrderData = {
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
    packaging: boolean;
    verification: boolean;
    destinationCountry: string;
    destinationCity: string;
    travelerFee: number | string;
    currency: string;
    note?: string;
    latestReceiveItemDate: Date;
  };
};

const addOrder = async (data: AddOrderData) => {
  const serializedData = serialize(
    {
      file: data.file,
      data: JSON.stringify(data.data),
    },
    {
      noFilesWithArrayNotation: true,
    }
  );
  const res = await axios.post("/orders", serializedData);
  return res.data;
};

export const useAddOrder = () => {
  return useMutation({ mutationFn: addOrder });
};
