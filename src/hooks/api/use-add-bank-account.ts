import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { BankAccount } from "@/types/bank";

interface AddBankAccountData {
  legalName: string;
  birthDate: Date;
  zipCode: string;
  bankCode: string;
  branchCode: string;
  accountHolderName: string;
  accountNumber: string;
}

const addBankAccount = async (data: AddBankAccountData) => {
  const res = await axios.post<BankAccount>("/bank-accounts", data);

  return res.data;
};

export const useAddBankAccount = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addBankAccount,
    onSuccess: () => qc.invalidateQueries(["bank-accounts"]),
  });
};
