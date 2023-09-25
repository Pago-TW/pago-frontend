import { useMutation } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { Otp } from "@/types/bank";

interface RequestData {
  phone: string;
}

const requestPhoneVerificationOtp = async (data: RequestData) => {
  const res = await axios.post<Otp>("/phone/otp", data);
  return res.data;
};

export const useRequestPhoneVerificationOtp = () => {
  return useMutation({ mutationFn: requestPhoneVerificationOtp });
};
