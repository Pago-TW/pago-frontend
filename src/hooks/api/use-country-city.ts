import { useQuery } from "@tanstack/react-query";

import type { CountryCityOption } from "@/components/inputs/country-city-select";
import { axios } from "@/libs/axios";

interface Params {
  includeAny?: boolean;
}

const getCountryCity = async (params?: Params) => {
  const res = await axios.get<CountryCityOption[]>("/countries-and-cities", {
    params,
  });
  return res.data;
};
1;
export const useCountryCity = (
  params?: Params,
  options?: { enabled?: boolean; refetchOnWindowFocus?: boolean }
) => {
  return useQuery({
    queryKey: ["countryCityOptions", params],
    queryFn: () => getCountryCity(params),
    refetchOnWindowFocus: false,
    ...options,
  });
};
