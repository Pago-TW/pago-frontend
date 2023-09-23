import { useMutation } from "@tanstack/react-query";

import { axios } from "@/libs/axios";

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

const changePassword = async (data: ChangePasswordData) => {
  const res = await axios.patch<{ message: string }>(
    "/auth/change-password",
    data
  );
  return res.data;
};

export const useChangePassword = () => {
  return useMutation({ mutationFn: changePassword });
};
