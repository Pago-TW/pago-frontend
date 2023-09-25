import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { BankAccount } from "@/types/bank";

type DeleteBankAccountData = Pick<BankAccount, "bankAccountId">;

const deleteBankAccount = async ({ bankAccountId }: DeleteBankAccountData) => {
  const res = await axios.delete<null>(`/bank-accounts/${bankAccountId}`);

  return res.data;
};

export const useDeleteBankAccount = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteBankAccount,
    onSuccess: () => qc.invalidateQueries(["bank-accounts"]),
  });
};
