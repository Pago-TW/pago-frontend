import { axios } from "@/libs/axios";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const getUser = async (userId: User["userId"]) => {
  const res = await axios.get<User>(`/users/${userId}`);
  return res.data;
};

export const useUser = (userId: User["userId"]) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};
