import type { CountryCityOption } from "@/components/inputs/CountryCitySelect";
import { axios } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

const getCountryCity = async () => {
  const res = await axios.get<CountryCityOption[]>("/countries-and-cities");
  return res.data;
};

export const useCountryCity = () => {
  return useQuery({
    queryKey: ["countryCityOptions"],
    queryFn: getCountryCity,
    refetchOnWindowFocus: false,
  });
};
