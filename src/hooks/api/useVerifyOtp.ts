import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axios } from "@/libs/axios";

interface VerifyOtpData {
  phone: string;
  otpCode: string;
}

const verifyOtp = async (data: VerifyOtpData) => {
  const res = await axios.post<boolean>("/otp/validate", data);
  return res.data;
};

export const useVerifyOtp = () => {
  const { update } = useSession();

  const qc = useQueryClient();
  return useMutation({
    mutationFn: verifyOtp,
    onSettled: () => {
      qc.invalidateQueries(["users", "me"]);
      update();
    },
  });
};
