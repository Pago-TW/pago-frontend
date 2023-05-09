import type {
  CityOption,
  CountryCityOption,
  CountryOption,
} from "@/types/misc";

type ExtractedCountries = { [key: string]: CountryOption };

export const extractCountries = (countryCityOptions: CountryCityOption[]) => {
  return countryCityOptions.reduce((obj, opt) => {
    obj[opt.country.countryCode] = opt.country;
    return obj;
  }, {} as ExtractedCountries);
};

type ExtractedCities = { [key: string]: CityOption };

export const extractCities = (countryCityOptions: CountryCityOption[]) => {
  return countryCityOptions.reduce((obj, opt) => {
    obj[opt.country.countryCode] = opt.city;
    return obj;
  }, {} as ExtractedCities);
};

type ExtractedCountriesCities = {
  countries: ExtractedCountries;
  cities: ExtractedCities;
};

export const extractCountriesCities = (
  countryCityOptions: CountryCityOption[]
) => {
  return countryCityOptions.reduce(
    (obj, opt) => {
      obj["countries"][opt.country.countryCode] = opt.country;
      obj["cities"][opt.city.cityCode] = opt.city;
      return obj;
    },
    { countries: {}, cities: {} } as ExtractedCountriesCities
  );
};
