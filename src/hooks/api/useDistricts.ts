import { axios } from "@/libs/axios";
import type { AdministrativeDivision } from "@/types/bank";
import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

type Params = {
  administrativeDivision?: string;
};

type Options = {
  params?: Params;
};

const getDistricts = async (options: Options = {}) => {
  const { params } = options;

  const res = await axios.get<AdministrativeDivision[]>("/districts", {
    params,
  });
  return res.data;
};

export const useDistricts = (
  params?: Params,
  options?: UseQueryOptions<AdministrativeDivision[]>
) => {
  return useQuery({
    queryKey: ["districts"],
    queryFn: () => getDistricts({ params }),
    ...options,
  });
};
