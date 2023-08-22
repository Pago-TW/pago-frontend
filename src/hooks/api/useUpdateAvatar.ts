import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { serialize } from "object-to-formdata";

import { axios } from "@/libs/axios";
import type { User } from "@/types/user";

interface UpdateAvatarData {
  file: File;
}

const updateAvatar = async (data: UpdateAvatarData) => {
  const postData = serialize(data, { noFilesWithArrayNotation: true });
  const res = await axios.patch<User>("/users/me/avatar", postData);

  return res.data;
};

export const useUpdateAvatar = () => {
  const { update } = useSession();

  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateAvatar,
    onSettled: () => {
      qc.invalidateQueries(["users", "me"]);
      update();
    },
  });
};
