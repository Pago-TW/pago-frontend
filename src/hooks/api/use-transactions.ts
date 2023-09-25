import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Transaction } from "@/types/transaction";

interface Params {
  startDate: string;
  endDate: string;
}

interface Options {
  params?: Params;
}

interface GroupedTransactions {
  year: string;
  month: string;
  transactions: Transaction[];
}

type ResponseData = GroupedTransactions[];

const getTransactions = async ({ params }: Options) => {
  const res = await axios.get<ResponseData>("/wallet/transactions", {
    params,
  });
  return res.data;
};

export const useTransactions = (params?: Params) => {
  return useQuery({
    queryKey: ["wallet", "transactions", params],
    queryFn: () => getTransactions({ params }),
  });
};
