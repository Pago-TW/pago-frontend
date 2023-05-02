import { axios } from "@/libs/axios";
import type { PublicUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const getUser = async (userId: PublicUser["userId"]) => {
  const res = await axios.get<PublicUser>(`/users/${userId}`);
  return res.data;
};

export const useUser = (userId: PublicUser["userId"]) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
  });
};
