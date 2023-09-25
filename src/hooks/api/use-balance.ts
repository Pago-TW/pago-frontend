import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";

const getBalance = async () => {
  const res = await axios.get<number>("/wallet/balance");
  return res.data;
};

export const useBalance = () => {
  return useQuery({
    queryKey: ["wallet", "balance"],
    queryFn: getBalance,
  });
};
