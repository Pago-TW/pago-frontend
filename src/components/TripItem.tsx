import { useLocale } from "@/hooks/useLocale";
import type { Trip } from "@/types/trip";
import { formatDate } from "@/utils/formatDateTime";
import { Stack } from "@mui/material";
import { Typography } from "./ui/Typography";

export type TripItemProps = Trip;

export const TripItem = ({
  fromCountry,
  toCountry,
  arrivalDate,
}: TripItemProps) => {
  const locale = useLocale();

  const formattedArrivalDate = formatDate({
    date: arrivalDate,
    locale,
  });

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
      <Typography variant="h4">
        {fromCountry} → {toCountry}
      </Typography>
      <Typography variant="h6">抵達時間: {formattedArrivalDate}</Typography>
    </Stack>
  );
};

export default TripItem;
