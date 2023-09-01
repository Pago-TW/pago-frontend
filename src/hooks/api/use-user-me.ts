import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { User } from "@/types/user";

const getUserMe = async () => {
  const res = await axios.get<User>("/users/me");
  return res.data;
};

export const useUserMe = () => {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: getUserMe,
  });
};
