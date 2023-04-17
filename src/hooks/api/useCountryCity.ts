import type { CountryCityOption } from "@/components/inputs/CountryCitySelect";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCountryCity = async (): Promise<CountryCityOption[]> => {
  const res = await axios.get("/countries-and-cities");
  return res.data;
};

export const useCountryCity = () => {
  return useQuery({
    queryKey: ["countryCityOptions"],
    queryFn: getCountryCity,
    refetchOnWindowFocus: false,
  });
};
