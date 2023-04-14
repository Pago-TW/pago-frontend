import type { Trip } from "@/types/types";
import { Stack } from "@mui/material";
import { Typography } from "./ui/Typography";

export type TripItemProps = Trip;

export const TripItem = ({
  fromCountry,
  fromCity,
  toCountry,
  toCity,
  arrivalDate,
}: TripItemProps) => {
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
      <Typography variant="h6">抵達時間: {arrivalDate}</Typography>
    </Stack>
  );
};

export default TripItem;
