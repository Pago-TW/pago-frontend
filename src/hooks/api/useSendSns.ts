import { axios } from "@/libs/axios";
import type { Otp } from "@/types/bank";
import { useMutation } from "@tanstack/react-query";

type SendSnsData = {
  phone: string;
};

const sendSns = async (data: SendSnsData) => {
  const res = await axios.post<Otp>("/otp/send-sns", data);
  return res.data;
};

export const useSendSns = () => {
  return useMutation({ mutationFn: sendSns });
};
