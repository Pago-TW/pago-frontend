import { concatStrings } from "@/utils/concatStrings";
import { Stack } from "@mui/material";
import { Typography } from "./ui/Typography";

export type Trip = {
  tripId: string;
  travelerId: string;
  profit: number;
  fromCountry: string;
  fromCity: string;
  toCountry: string;
  toCity: string;
  arrivalDate: string;
  createDate: string;
  updateDate: string;
};

export type TripItemProps = Trip;

export const TripItem = ({
  fromCountry,
  fromCity,
  toCountry,
  toCity,
  arrivalDate,
}: TripItemProps) => {
  const from = concatStrings([fromCountry, fromCity]);
  const to = concatStrings([toCountry, toCity]);

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
        {from} → {to}
      </Typography>
      <Typography variant="h6">抵達時間: {arrivalDate}</Typography>
    </Stack>
  );
};

export default TripItem;
