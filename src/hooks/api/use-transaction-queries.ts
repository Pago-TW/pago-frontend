import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";

export interface TransactionQuery {
  startDate: string;
  endDate: string;
  tabViewName: string;
}

type ResponseData = Record<string, TransactionQuery[]>;

const getTransactionQueries = async () => {
  const res = await axios.get<ResponseData>("/wallet/transactions/tab-view");
  return res.data;
};

export const useTransactionQueries = () => {
  return useQuery({
    queryKey: ["wallet", "transactions", "queries"],
    queryFn: getTransactionQueries,
  });
};
