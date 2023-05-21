import { axios } from "@/libs/axios";
import type { Bid } from "@/types/bid";
import { useMutation } from "@tanstack/react-query";

const chooseBid = async (bidId: Bid["bidId"]) => {
  const res = await axios.patch<string>(`/bids/${bidId}/choose`);
  return res.data;
};

export const useChooseBid = () => {
  return useMutation({ mutationFn: chooseBid });
};
