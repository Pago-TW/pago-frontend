import { useMemo } from "react";

import { ChevronRight } from "@mui/icons-material";
import { Grid, Stack } from "@mui/material";

import { Typography } from "@/components/ui/typography";
import { useCountryCity } from "@/hooks/api/use-country-city";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Trip } from "@/types/trip";
import { extractCountriesCities } from "@/utils/api";
import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/misc";

export type TripItemProps = Trip;

const TripItemStat = ({
  displayName: stat,
  value,
}: {
  displayName: string;
  value: number;
}) => {
  return (
    <Stack alignItems="center">
      <Typography as="span" variant="h5" color="pago.main">
        {value}
      </Typography>
      <Typography as="span" variant="h6" color="pago.main">
        {stat}
      </Typography>
    </Stack>
  );
};

const TripItemStats = ({
  requested,
  toBePurchased,
  toBeDelivered,
}: Trip["dashboard"]) => {
  return (
    <Stack direction="row" gap={6} sx={{ display: { xs: "none", md: "flex" } }}>
      <TripItemStat displayName="待確認" value={requested} />
      <TripItemStat displayName="待購買" value={toBePurchased} />
      <TripItemStat displayName="待面交" value={toBeDelivered} />
    </Stack>
  );
};

const TripItemProfit = ({
  profit,
  currency,
}: Pick<Trip, "profit" | "currency">) => {
  const formattedProfit = formatCurrency({ value: profit, currency });

  return (
    <Stack height="100%" justifyContent="center" alignItems="center">
      <Typography as="span" variant="h5">
        淨賺
      </Typography>
      <Typography as="span" variant="h4" color="pago.main" weightPreset="bold">
        {formattedProfit}
      </Typography>
    </Stack>
  );
};

export const TripItem = ({
  fromCountry,
  fromCity,
  toCountry,
  toCity,
  profit,
  currency,
  arrivalDate,
  dashboard,
}: TripItemProps) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

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

  const formattedArrivalDate = formatDate(arrivalDate);

  return (
    <Grid
      container
      sx={{
        p: (theme) => ({ xs: 2, md: theme.spacing(3, 4, 3, 10) }),
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "base.800",
        borderRadius: 1,
        bgcolor: "white",
      }}
    >
      <Grid item xs md={6}>
        <Stack spacing={{ xs: 1, md: 2 }}>
          <Typography
            as="h3"
            variant={isDesktop ? "h3" : "h4"}
            textAlign={{ xs: "center", md: "start" }}
          >
            {fromToText}
          </Typography>
          <Typography
            as="span"
            variant={isDesktop ? "h5" : "h6"}
            textAlign={{ xs: "center", md: "start" }}
            sx={{ color: { md: "base.500" } }}
          >
            抵達時間: {formattedArrivalDate}
          </Typography>
          <TripItemStats {...dashboard} />
        </Stack>
      </Grid>
      <Grid item md={5} sx={{ display: { xs: "none", md: "block" } }}>
        <TripItemProfit profit={profit} currency={currency} />
      </Grid>
      <Grid item md={1} sx={{ display: { xs: "none", md: "block" } }}>
        <Stack height="100%" justifyContent="center" alignItems="center">
          <ChevronRight />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TripItem;
