import { Flight } from "@mui/icons-material";

import { Typography } from "@/components/ui/typography";
import type { TripCollection } from "@/types/trip";

const statusMap: Record<
  TripCollection["tripCollectionStatus"],
  { color: string; text: string }
> = {
  PAST: {
    color: "base.500",
    text: "已結束",
  },
  UPCOMING: {
    color: "pagoYellow.dark",
    text: "即將出發",
  },
  ONGOING: {
    color: "pagoGreen.800",
    text: "正在途中",
  },
};

export const TripCollectionStatus = ({
  status,
}: {
  status: TripCollection["tripCollectionStatus"];
}) => {
  const { color, text } = statusMap[status];

  return (
    <Typography
      as="span"
      variant="h5"
      display="flex"
      alignItems="center"
      flexShrink={0}
    >
      <Flight sx={{ color, transform: "rotate(45deg)" }} /> {text}
    </Typography>
  );
};
