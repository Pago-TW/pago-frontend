import { useMemo } from "react";

import { Stack } from "@mui/material";

import { Typography } from "@/components/ui/typography";
import { useCountryCity } from "@/hooks/api/use-country-city";
import type { Trip } from "@/types/trip";
import { extractCountriesCities } from "@/utils/api";
import { formatDate } from "@/utils/date";

export type TripItemProps = Trip;

export const TripItem = ({
  fromCountry,
  fromCity,
  toCountry,
  toCity,
  arrivalDate,
}: TripItemProps) => {
  const formattedArrivalDate = formatDate(arrivalDate);

  const { data: countriesAndCitiesData = [] } = useCountryCity({
    includeAny: false,
  });

  const fromToText = useMemo(() => {
    const { countries, cities } = extractCountriesCities(
      countriesAndCitiesData
    );

    const fromCountryName = countries[fromCountry]?.chineseName ?? fromCountry;
    const fromCityName = cities[fromCity]?.chineseName ?? fromCity;
    const toCountryName = countries[toCountry]?.chineseName ?? toCountry;
    const toCityName = cities[toCity]?.chineseName ?? toCity;

    return `${fromCountryName} ${fromCityName} → ${toCountryName} ${toCityName}`;
  }, [countriesAndCitiesData, fromCity, fromCountry, toCity, toCountry]);

  return (
    <Stack
      sx={{
        p: 2,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "base.800",
        borderRadius: 1,
      }}
      spacing={1}
      alignItems="center"
    >
      <Typography variant="h4">{fromToText}</Typography>
      <Typography variant="h6">抵達時間: {formattedArrivalDate}</Typography>
    </Stack>
  );
};

export default TripItem;
