import { axios } from "@/libs/axios";
import type { Bank } from "@/types/bank";
import { useQuery } from "@tanstack/react-query";

const getBanks = async () => {
  const res = await axios.get<Bank[]>("/banks");
  return res.data;
};

export const useBanks = () => {
  return useQuery({ queryKey: ["banks"], queryFn: getBanks });
};
