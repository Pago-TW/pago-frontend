import { Stack, Typography } from "@mui/material";

import { TripCollectionItem } from "@/components/trip-collection-item";
import type { TripCollection } from "@/types/trip";

interface TripCollectionListProps {
  data: TripCollection[];
}

export const TripCollectionList = ({ data }: TripCollectionListProps) => {
  if (data.length === 0)
    return (
      <Typography variant="body1" color="base.500" sx={{ textAlign: "center" }}>
        沒有可顯示的旅途
      </Typography>
    );

  return (
    <Stack gap={{ xs: 2, md: 4 }}>
      {data.map((collection) => (
        <TripCollectionItem key={collection.tripCollectionId} {...collection} />
      ))}
    </Stack>
  );
};
