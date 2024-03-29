import { useQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { AdministrativeDivision } from "@/types/bank";

interface Params {
  administrativeDivision?: string;
}

interface Options {
  params?: Params;
}

const getDistricts = async (options: Options = {}) => {
  const { params } = options;

  const res = await axios.get<AdministrativeDivision[]>("/districts", {
    params,
  });
  return res.data;
};

export const useDistricts = (
  params?: Params,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["districts", params],
    queryFn: () => getDistricts({ params }),
    refetchOnWindowFocus: false,
    ...options,
  });
};
