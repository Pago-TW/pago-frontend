import { Stack } from "@mui/material";

import { TripCollectionItem } from "@/components/trip-collection-item";
import type { TripCollection } from "@/types/trip";

interface TripCollectionListProps {
  data: TripCollection[];
}

export const TripCollectionList = ({ data }: TripCollectionListProps) => {
  return (
    <Stack gap={2}>
      {data.map((collection) => (
        <TripCollectionItem key={collection.tripCollectionId} {...collection} />
      ))}
    </Stack>
  );
};
