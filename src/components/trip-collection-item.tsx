import { Box, Stack } from "@mui/material";

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
    <Paper sx={{ p: { xs: 2, md: 4 } }}>
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography as="span" variant="h4" noWrap>
            {tripCollectionName}
          </Typography>
          <TripCollectionStatus status={tripCollectionStatus} />
        </Stack>
        <Box sx={{ px: { xs: 0, md: 10 } }}>
          <TripList spacing={{ xs: 3, md: 4 }} items={trips} />
        </Box>
      </Stack>
    </Paper>
  );
};
