import { Stack } from "@mui/material";
import { PaperLayout } from "./layouts/PaperLayout";
import type { Trip } from "./TripItem";
import { TripItem } from "./TripItem";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

export type TripListProps = {
  category: string;
  items: Trip[];
};

export const TripList = ({ category, items }: TripListProps) => {
  return (
    <PaperLayout>
      <Stack spacing={3}>
        <Typography variant="h5">{category}</Typography>
        {items.map((item) => (
          <Link
            key={item.tripId}
            href={`/trips/${item.tripId}`}
          >
            <TripItem key={item.tripId} {...item} />
          </Link>
        ))}
      </Stack>
    </PaperLayout>
  );
};

export default TripList;
