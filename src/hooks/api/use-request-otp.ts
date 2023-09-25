import { useMutation } from "@tanstack/react-query";

import { axios } from "@/libs/axios";

interface RequestOtpResponse {
  expiryDate: string;
  createDate: string;
}

const requestOtp = async () => {
  const res = await axios.post<RequestOtpResponse>("/otp");
  return res.data;
};

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: requestOtp,
  });
};
