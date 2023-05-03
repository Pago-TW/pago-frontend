import type { Review } from "@/types/review";
import { Stack } from "@mui/material";
import type { FC } from "react";
import { ReviewItem } from "./ReviewItem";

export type ReviewListProps = {
  items: Review[];
};

export const ReviewList: FC<ReviewListProps> = ({ items }) => {
  return (
    <Stack spacing={{ xs: 2, md: 4 }}>
      {items.map((item) => (
        <ReviewItem key={item.reviewId} {...item} />
      ))}
    </Stack>
  );
};
