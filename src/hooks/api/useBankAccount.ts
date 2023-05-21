import { axios } from "@/libs/axios";
import type { BankAccount } from "@/types/bank";
import { useQuery } from "@tanstack/react-query";

const getBankAccount = async (bankAccountId: BankAccount["bankAccountId"]) => {
  const res = await axios.get<BankAccount>(`/bank-accounts/${bankAccountId}`);
  return res.data;
};

export const useBankAccount = (
  bankAccountId: BankAccount["bankAccountId"],
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["bank-accounts", bankAccountId],
    queryFn: () => getBankAccount(bankAccountId),
    ...options,
  });
};
