import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { axios } from "@/libs/axios";
import type { User } from "@/types/user";

type UpdateUserData = Partial<{
  name: string;
  phone: string;
  country: string | null;
  aboutMe: string | null;
}>;

const updateUser = async (data: UpdateUserData) => {
  const res = await axios.patch<User>("/users/me", data);
  return res.data;
};

export const useUpdateUser = () => {
  const { update } = useSession();

  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSettled: () => {
      void qc.invalidateQueries(["users", "me"]);
      void update();
    },
  });
};
