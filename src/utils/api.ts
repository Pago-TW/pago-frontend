import type { InfiniteData } from "@tanstack/react-query";

import type { PaginatedResponse } from "@/types/api";
import type {
  CityOption,
  CountryCityOption,
  CountryOption,
} from "@/types/misc";

type ExtractedCountries = Record<string, CountryOption>;

const extractCountries = (countryCityOptions: CountryCityOption[]) => {
  return countryCityOptions.reduce((obj, opt) => {
    obj[opt.country.countryCode] = opt.country;
    return obj;
  }, {} as ExtractedCountries);
};

type ExtractedCities = Record<string, CityOption>;

const extractCities = (countryCityOptions: CountryCityOption[]) => {
  return countryCityOptions.reduce((obj, opt) => {
    obj[opt.country.countryCode] = opt.city;
    return obj;
  }, {} as ExtractedCities);
};

interface ExtractedCountriesCities {
  countries: ExtractedCountries;
  cities: ExtractedCities;
}

const extractCountriesCities = (countryCityOptions: CountryCityOption[]) => {
  return countryCityOptions.reduce(
    (obj, opt) => {
      obj.countries[opt.country.countryCode] = opt.country;
      obj.cities[opt.city.cityCode] = opt.city;
      return obj;
    },
    { countries: {}, cities: {} } as ExtractedCountriesCities
  );
};

const flattenInfinitePaginatedData = <T extends object>(
  data?: InfiniteData<PaginatedResponse<T[]>>
) => {
  return data?.pages?.flatMap((page) => page.data) ?? [];
};

const getInfinitePaginatedDataTotal = <T extends object>(
  data?: InfiniteData<PaginatedResponse<T[]>>
) => {
  return data?.pages?.[0]?.total ?? 0;
};

const getLastIndex = <T extends object>(page: PaginatedResponse<T>) => {
  return page.startIndex + page.size - 1;
};

export {
  extractCountries,
  extractCities,
  extractCountriesCities,
  flattenInfinitePaginatedData,
  getInfinitePaginatedDataTotal,
  getLastIndex,
};
