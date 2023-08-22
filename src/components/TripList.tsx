import { Stack, type StackProps } from "@mui/material";

import { TripItem } from "@/components/TripItem";
import { Link } from "@/components/ui/Link";
import type { Trip } from "@/types/trip";

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
