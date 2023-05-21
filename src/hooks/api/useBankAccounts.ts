import { axios } from "@/libs/axios";
import type { BankAccount } from "@/types/bank";
import { useQuery } from "@tanstack/react-query";

const getBankAccounts = async () => {
  const res = await axios.get<BankAccount[]>("/bank-accounts");
  return res.data;
};

export const useBankAccounts = () => {
  return useQuery({ queryKey: ["bank-accounts"], queryFn: getBankAccounts });
};
