import type { Trip } from "@/types/trip";
import type { StackProps } from "@mui/material";
import { Stack } from "@mui/material";
import { TripItem } from "./TripItem";
import { Link } from "./ui/Link";

export type TripListProps = {
  items: Trip[];
  spacing?: StackProps["spacing"];
};

export const TripList = ({ spacing = 3, items }: TripListProps) => {
  return (
    <Stack spacing={spacing}>
      {items.map((item) => (
        <Link key={item.tripId} href={`/trips/${item.tripId}`}>
          <TripItem key={item.tripId} {...item} />
        </Link>
      ))}
    </Stack>
  );
};

export default TripList;
