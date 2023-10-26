import { ArrowForward, ChevronRight, Star } from "@mui/icons-material";
import { Box, Grid, Stack } from "@mui/material";

import { Avatar } from "@/components/ui/avatar";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { SearchedTrip } from "@/types/trip";
import { formatDate } from "@/utils/date";
import { getUserProfileUrl } from "@/utils/user";

export const SearchedTripItem = ({
  tripId,
  fromCountryChineseName,
  fromCityChineseName,
  toCountryChineseName,
  toCityChineseName,
  arrivalDate,
  shopperId,
  userDetail: { avatarUrl, fullName, averageRating, totalReview },
}: SearchedTrip) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const from = isDesktop
    ? `${fromCountryChineseName} ${fromCityChineseName}`
    : `${fromCountryChineseName}`;
  const to = isDesktop
    ? `${toCountryChineseName} ${toCityChineseName}`
    : `${toCountryChineseName}`;

  const formattedArrivalDate = formatDate(arrivalDate);
  const profileLink = getUserProfileUrl(shopperId);

  const rating = (
    <Box color="pago.main" display="flex" alignItems="center" fontSize={14}>
      <Star fontSize="inherit" />
      <Typography ml={0.5} fontSize="inherit">
        {averageRating} ({totalReview}筆評價)
      </Typography>
    </Box>
  );
  const userInfo = (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      flexGrow={1}
      ml={{ xs: 1, md: 2 }}
    >
      <Typography variant="h5" noWrap>
        <Link href={profileLink}>{fullName}</Link>
      </Typography>
      {!isDesktop ? rating : null}
    </Box>
  );

  return (
    <Link
      href={`/trips/${tripId}`}
      sx={{ mx: "auto", maxWidth: 840, width: "100%" }}
    >
      <Grid
        container
        gap={1}
        alignItems="center"
        sx={{
          p: (theme) => ({
            xs: theme.spacing(2, 4),
            md: theme.spacing(7, 4, 7, 10),
          }),
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "base.800",
          borderRadius: 1,
          bgcolor: "white",
        }}
      >
        <Grid item xs={12} md>
          <Stack>
            <Box display="flex">
              <Avatar href={profileLink} src={avatarUrl} /> {userInfo}
            </Box>
            <Box ml={7}>{isDesktop ? rating : null}</Box>
          </Stack>
        </Grid>
        <Grid container item xs={12} md={7} gap={1}>
          <Grid item xs>
            <Stack spacing={{ xs: 1, md: 2 }}>
              <Typography
                as="span"
                variant={isDesktop ? "h3" : "h4"}
                sx={{
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {from} <ArrowForward sx={{ fontSize: 20 }} /> {to}
              </Typography>
              <Typography
                as="span"
                variant={isDesktop ? "h5" : "h6"}
                sx={{ color: "base.500" }}
              >
                抵達時間: {formattedArrivalDate}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={1} alignSelf={{ xs: "end", md: "center" }}>
            <Stack height="100%" justifyContent="center" alignItems="center">
              <ChevronRight sx={{ color: "pago.main" }} />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
};
