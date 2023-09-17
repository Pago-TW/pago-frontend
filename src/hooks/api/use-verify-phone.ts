import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axios } from "@/libs/axios";

interface VerifyPhoneData {
  phone: string;
  otpCode: string;
}

const verifyPhone = async (data: VerifyPhoneData) => {
  const res = await axios.post<boolean>("/phone/validate", data);
  return res.data;
};

export const useVerifyPhone = () => {
  const { update } = useSession();

  const qc = useQueryClient();
  return useMutation({
    mutationFn: verifyPhone,
    onSettled: () => {
      void qc.invalidateQueries(["users", "me"]);
      void update();
    },
  });
};
