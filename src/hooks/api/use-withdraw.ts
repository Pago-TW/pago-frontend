import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { BankAccount } from "@/types/bank";

interface RequestData {
  withdrawalAmount: number;
  bankAccountId: BankAccount["bankAccountId"];
  otpCode: string;
}

interface Options {
  data: RequestData;
}

type ResponseData = {
  error: string;
  message: string;
  timestamp: string;
  status: 400 | 422;
} | null;

const withdraw = async ({ data }: Options) => {
  const res = await axios.post<ResponseData>("/wallet/withdraw", data);
  return res.data;
};

export const useWithdraw = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: withdraw,
    onSuccess: () => {
      void qc.invalidateQueries(["wallet"]);
    },
  });
};
