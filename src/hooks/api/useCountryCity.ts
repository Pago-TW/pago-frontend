import type { CountryCityOption } from "@/components/inputs/CountryCitySelect";
import { axios } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

type Params = {
  includeAny?: boolean;
};

const getCountryCity = async (params?: Params) => {
  const res = await axios.get<CountryCityOption[]>("/countries-and-cities", {
    params,
  });
  return res.data;
};
1;
export const useCountryCity = (
  params?: Params,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["countryCityOptions"],
    queryFn: () => getCountryCity(params),
    refetchOnWindowFocus: false,
    ...options,
  });
};
