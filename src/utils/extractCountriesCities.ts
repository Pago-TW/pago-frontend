import type {
  CityOption,
  CountryCityOption,
  CountryOption,
} from "@/types/misc";

export const extractCountries = (countryCityOptions: CountryCityOption[]) => {
  return countryCityOptions.reduce((obj, opt) => {
    obj[opt.country.countryCode] = opt.country;
    return obj;
  }, {} as { [key: string]: CountryOption });
};

export const extractCities = (countryCityOptions: CountryCityOption[]) => {
  return countryCityOptions.reduce((obj, opt) => {
    obj[opt.country.countryCode] = opt.city;
    return obj;
  }, {} as { [key: string]: CityOption });
};
