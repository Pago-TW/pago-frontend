import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";

const getCities = async () => {
  const res = await axios.get<string[]>("/administrative-divisions");
  return res.data;
};

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: () => getCities(),
    refetchOnWindowFocus: false,
  });
};
