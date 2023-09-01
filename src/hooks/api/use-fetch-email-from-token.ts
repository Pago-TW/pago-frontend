import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";

const fetchEmailFromToken = async (token: string) => {
  const res = await axios.get<string>(
    `/auth/fetch-email-from-token?token=${token}`
  );
  return res.data;
};

export const useFetchEmailFromToken = (token: string) => {
  return useQuery({
    queryKey: ["token", token],
    queryFn: () => fetchEmailFromToken(token),
    enabled: !!token,
  });
};

export default useFetchEmailFromToken;
