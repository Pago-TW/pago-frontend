import { useMutation } from "@tanstack/react-query";

import { axios } from "@/libs/axios";

interface RequestPasswordResetData {
  email: string;
}

interface RequestPasswordResetResponse {
  passwordResetTokenId: string;
  userId: string;
  token: string;
  expiryDate: string;
  createDate: string;
}

const requestPasswordReset = async (
  data: RequestPasswordResetData
): Promise<RequestPasswordResetResponse> => {
  const res = await axios.post<RequestPasswordResetResponse>(
    "/auth/request-password-reset",
    data
  );
  return res.data;
};

export const useRequestPasswordReset = () => {
  return useMutation({ mutationFn: requestPasswordReset });
};
