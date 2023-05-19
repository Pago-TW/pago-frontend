import { axios } from "@/libs/axios";
import type { Bank, BankBranch } from "@/types/bank";
import { useQuery } from "@tanstack/react-query";

type Params = {
  administrativeDivision: string;
  bankCode: Bank["bankCode"];
};

const getBankBranches = async (params: Params) => {
  const res = await axios.get<BankBranch[]>("/bank-branches", { params });
  return res.data;
};

export const useBankBranches = (
  params: Params,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["banks", params],
    queryFn: () => getBankBranches({ ...params }),
    refetchOnWindowFocus: false,
    ...options,
  });
};
