import { axios } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type VerifyOtpData = {
  phone: string;
  otpCode: string;
};

const verifyOtp = async (data: VerifyOtpData) => {
  const res = await axios.post<boolean>("/otp/validate", data);
  return res.data;
};

export const useVerifyOtp = () => {
  const { update } = useSession();
  return useMutation({
    mutationFn: verifyOtp,
    onSettled: () => update(),
  });
};
