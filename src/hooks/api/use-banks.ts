import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Bank } from "@/types/bank";

const getBanks = async () => {
  const res = await axios.get<Bank[]>("/banks");
  return res.data;
};

export const useBanks = () => {
  return useQuery({
    queryKey: ["banks"],
    queryFn: () => getBanks(),
    refetchOnWindowFocus: false,
  });
};
