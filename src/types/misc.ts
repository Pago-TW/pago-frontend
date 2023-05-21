export type Perspective = "consumer" | "shopper";

export interface CountryCityOption {
  country: CountryOption;
  city: CityOption;
}

export interface CountryOption {
  countryCode: string;
  englishName: string;
  chineseName: string;
}

export interface CityOption {
  cityCode: string;
  englishName: string;
  chineseName: string;
}
