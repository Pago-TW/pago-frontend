import { Box, Stack, type SxProps } from "@mui/material";

import { BidItem } from "@/components/bid-item";
import { ShowMoreButton } from "@/components/show-more-button";
import { Typography } from "@/components/ui/typography";
import type { Bid } from "@/types/bid";

interface BidListProps {
  bids?: Bid[];
  hasMore?: boolean;
  onShowMore: () => void;
  isOwner: boolean;
  sx?: SxProps;
}

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
            return <BidItem key={bid.bidId} {...bid} isOwner={isOwner} />;
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
