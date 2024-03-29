import { useMemo } from "react";
import Image from "next/image";

import { ChevronRight } from "@mui/icons-material";
import { Box, Paper, Skeleton, Stack } from "@mui/material";

import { PackagingText } from "@/components/packaging-text";
import { StatusText } from "@/components/status-text";
import { Divider } from "@/components/ui/divider";
import { Typography } from "@/components/ui/typography";
import { useCountryCity } from "@/hooks/api/use-country-city";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Order } from "@/types/order";
import { extractCountriesCities } from "@/utils/api";
import { formatDate, fromNow } from "@/utils/date";

export type OrderItemProps = Pick<
  Order,
  | "orderStatus"
  | "currency"
  | "travelerFee"
  | "totalAmount"
  | "latestReceiveItemDate"
  | "destinationCountryCode"
  | "destinationCityCode"
  | "destinationCountryName"
  | "destinationCityName"
  | "isPackagingRequired"
  | "createDate"
> &
  Pick<
    Order["orderItem"],
    | "name"
    | "description"
    | "quantity"
    | "fileUrls"
    | "purchaseCountryCode"
    | "purchaseCityCode"
    | "purchaseCountryName"
    | "purchaseCityName"
  > & {
    variant?: "default" | "detailed";
  };

export const OrderItem = ({
  orderStatus,
  currency,
  travelerFee,
  totalAmount,
  latestReceiveItemDate,
  destinationCountryCode,
  destinationCityCode,
  destinationCountryName,
  destinationCityName,
  isPackagingRequired,
  createDate,
  name,
  description,
  quantity,
  fileUrls,
  purchaseCountryCode,
  purchaseCityCode,
  purchaseCountryName,
  purchaseCityName,
  variant = "default",
}: OrderItemProps) => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { data: countriesAndCities = [] } = useCountryCity({
    includeAny: true,
  });
  const { countries, cities } = useMemo(
    () => extractCountriesCities(countriesAndCities),
    [countriesAndCities]
  );

  const formattedLatestReceiveItemDate = formatDate(latestReceiveItemDate);
  const firstImageUrl = fileUrls?.[0];

  const getCountryChineseName = (countryCode: string, fallback?: string) =>
    countries[countryCode]?.chineseName ?? fallback ?? countryCode;
  const getCityChineseName = (cityCode: string, fallback?: string) =>
    cities[cityCode]?.chineseName ?? fallback ?? cityCode;

  const purchaseLocation = [
    getCountryChineseName(purchaseCountryCode, purchaseCountryName),
    getCityChineseName(purchaseCityCode, purchaseCityName),
  ].join(",");
  const destinationLocation = [
    getCountryChineseName(destinationCountryCode, destinationCountryName),
    getCityChineseName(destinationCityCode, destinationCityName),
  ].join(",");

  return (
    <Paper elevation={3} sx={{ p: { xs: 1, md: 2 } }}>
      <Stack spacing={mdDown ? 1 : 2}>
        <Stack direction="row" spacing={2} flexGrow={1}>
          {/* Upper left image area */}
          <Box
            sx={{
              position: "relative",
              width: { xs: 74, md: 200 },
              height: { xs: 74, md: 200 },
              flexShrink: 0,
            }}
          >
            {firstImageUrl ? (
              <Image
                src={firstImageUrl}
                alt={`Image of ${name}`}
                fill
                sizes="(max-width: 600px) 74px, 200px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            ) : (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            )}
          </Box>
          {/* Upper right info area */}
          <Stack
            flexGrow={1}
            justifyContent="space-between"
            sx={{ minWidth: 0 }}
          >
            <Box display="flex" justifyContent="space-between">
              {/* Name */}
              <Typography
                variant={mdDown ? "h5" : "h2"}
                weightPreset={mdDown ? "normal" : "bold"}
                noWrap
              >
                {name}
              </Typography>
              {/* Status/Packaging text */}
              {variant === "default" ? (
                <StatusText status={orderStatus} />
              ) : (
                <PackagingText isPackagingRequired={isPackagingRequired} />
              )}
            </Box>
            <Box display="flex" justifyContent="space-between">
              {/* Description/Purchase location text */}
              {variant === "default" ? (
                <Typography variant={mdDown ? "h6" : "h4"} color="base.main">
                  {description}
                </Typography>
              ) : (
                <Typography variant={mdDown ? "h6" : "h4"} color="base.main">
                  從 {purchaseLocation} 送到 {destinationLocation}
                </Typography>
              )}
              {/* Quantity */}
              <Typography variant={mdDown ? "h6" : "h3"}>{quantity}</Typography>
            </Box>
          </Stack>
        </Stack>
        <Divider sx={{ borderColor: (theme) => theme.palette.pago[100] }} />
        <Box display="flex" justifyContent="space-between">
          <Stack spacing={mdDown ? 1 : 2}>
            {variant === "detailed" ? (
              <Typography variant={mdDown ? "h6" : "h4"} color="base.main">
                代購費:{" "}
                <Typography
                  as="span"
                  variant={mdDown ? "h6" : "h4"}
                  weightPreset="bold"
                  color="primary.main"
                >
                  {travelerFee.toLocaleString()} {currency}
                </Typography>
              </Typography>
            ) : null}
            <Typography variant={mdDown ? "h6" : "h4"} color="base.main">
              訂單金額:{" "}
              <Typography
                as="span"
                variant={mdDown ? "h6" : "h4"}
                color="primary.main"
              >
                {totalAmount.toLocaleString()} {currency}
              </Typography>
            </Typography>
          </Stack>
          <Typography variant={mdDown ? "h6" : "h5"} color="base.main">
            {fromNow(createDate)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant={mdDown ? "h6" : "h4"} color="base.main">
            最晚收到商品時間: {formattedLatestReceiveItemDate}
          </Typography>
          <ChevronRight sx={{ color: (theme) => theme.palette.pago.main }} />
        </Box>
      </Stack>
    </Paper>
  );
};
