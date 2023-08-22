import type { FC } from "react";

import { Stack } from "@mui/material";

import { ReviewItem } from "@/components/ReviewItem";
import type { Review } from "@/types/review";

export interface ReviewListProps {
  items: Review[];
}

export const ReviewList: FC<ReviewListProps> = ({ items }) => {
  return (
    <Stack spacing={{ xs: 2, md: 4 }}>
      {items.map((item) => (
        <ReviewItem key={item.reviewId} {...item} />
      ))}
    </Stack>
  );
};
