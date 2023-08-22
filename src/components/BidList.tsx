import { Box, Stack, type SxProps } from "@mui/material";

import { BidItem } from "@/components/BidItem";
import { ShowMoreButton } from "@/components/ShowMoreButton";
import { Typography } from "@/components/ui/Typography";
import type { Bid } from "@/types/bid";

type BidListProps = {
  bids?: Bid[];
  hasMore?: boolean;
  onShowMore: () => void;
  isOwner: boolean;
  sx?: SxProps;
};

export const BidList = (props: BidListProps) => {
  const { bids, hasMore, onShowMore, isOwner, sx } = props;

  const hasBids = bids && bids.length !== 0;

  return (
    <Box sx={sx}>
      <Stack spacing={3} sx={{ width: "100%" }}>
        <Typography variant="h3" textAlign="center" mt={1}>
          已出價代購者
        </Typography>
        {hasBids ? (
          bids.map((bid) => {
            return (
              <BidItem
                key={bid.bidId}
                id={bid.bidId}
                currency={bid.currency}
                amount={bid.bidAmount}
                bidderName={bid.creator.fullName}
                bidderAvatar={bid.creator.avatarUrl}
                avgRating={bid.creator.review.averageRating}
                reviewCount={bid.creator.review.totalReview}
                createdAt={bid.createDate}
                estDeliveryDate={bid.latestDeliveryDate}
                isOwner={isOwner}
              />
            );
          })
        ) : (
          <Typography
            as="span"
            textAlign="center"
            color="base.400"
            sx={{ fontStyle: "italic", fontSize: 16 }}
          >
            當前還沒有使用者出價
          </Typography>
        )}
        {hasMore ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <ShowMoreButton
              variant="text"
              size="small"
              onClick={onShowMore}
              hasMore={hasMore}
            />
          </Box>
        ) : null}
      </Stack>
    </Box>
  );
};
