import { Stack } from "@mui/material";

import { TripCollectionStatus } from "@/components/trip-collection-status";
import { TripList } from "@/components/trip-list";
import { Paper } from "@/components/ui/paper";
import { Typography } from "@/components/ui/typography";
import type { TripCollection } from "@/types/trip";

export const TripCollectionItem = ({
  tripCollectionName,
  tripCollectionStatus,
  trips,
}: TripCollection) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography as="span" variant="h4" noWrap>
            {tripCollectionName}
          </Typography>
          <TripCollectionStatus status={tripCollectionStatus} />
        </Stack>
        <TripList items={trips} />
      </Stack>
    </Paper>
  );
};
