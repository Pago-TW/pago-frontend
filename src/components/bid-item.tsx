import dynamic from "next/dynamic";

import { Star } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack } from "@mui/material";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useOpen } from "@/hooks/use-open";
import type { Bid } from "@/types/bid";
import { formatDateTime, fromNow } from "@/utils/date";

const DynamicAcceptBidDialog = dynamic(() =>
  import("@/components/accept-bid-dialog").then((mod) => mod.AcceptBidDialog)
);
interface BidItemProps {
  id: Bid["bidId"];
  amount: Bid["bidAmount"];
  currency: Bid["currency"];
  bidderName: Bid["creator"]["fullName"];
  bidderAvatar: Bid["creator"]["avatarUrl"];
  avgRating: Bid["creator"]["review"]["averageRating"];
  reviewCount: Bid["creator"]["review"]["totalReview"];
  createdAt: Bid["createDate"];
  estDeliveryDate: Bid["latestDeliveryDate"];
  isOwner: boolean;
}

export const BidItem = (props: BidItemProps) => {
  const {
    id,
    amount,
    currency,
    bidderName,
    bidderAvatar,
    avgRating,
    reviewCount,
    createdAt,
    estDeliveryDate,
    isOwner,
  } = props;

  const { open, handleOpen, handleClose } = useOpen();

  const handleAcceptClick = () => {
    handleOpen();
  };

  const formattedDistance = fromNow(createdAt);
  const formattedEstDeliveryDate = formatDateTime(estDeliveryDate);

  return (
    <>
      <Paper elevation={3} component={Stack} spacing={2} sx={{ p: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={bidderAvatar} />
          <Box display="flex" flexDirection="column" flexGrow={1} ml={2}>
            <Typography variant="h5" noWrap>
              {bidderName}
            </Typography>
            <Box
              color="pago.main"
              display="flex"
              alignItems="center"
              fontSize={14}
            >
              <Star fontSize="inherit" />
              <Typography ml={0.5} fontSize="inherit">
                {avgRating} ({reviewCount}筆評價)
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" color="pago.main">
            {formattedDistance}
          </Typography>
        </Box>
        <Stack spacing={1}>
          <Typography>
            出價: {amount} {currency}
          </Typography>
          <Typography>預計送達時間: {formattedEstDeliveryDate}</Typography>
        </Stack>
        {isOwner && (
          <>
            <Button variant="outlined" size="small" onClick={handleAcceptClick}>
              接受報價
            </Button>
            <DynamicAcceptBidDialog
              bidId={id}
              open={open}
              onClose={handleClose}
            />
          </>
        )}
      </Paper>
    </>
  );
};
