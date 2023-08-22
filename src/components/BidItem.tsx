import dynamic from "next/dynamic";

import { Star } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack } from "@mui/material";
import { intlFormatDistance, parseISO } from "date-fns";

import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { useLocale } from "@/hooks/useLocale";
import { useOpen } from "@/hooks/useOpen";
import type { Bid } from "@/types/bid";
import { formatDateTime } from "@/utils/formatDateTime";

const DynamicAcceptBidDialog = dynamic(() =>
  import("./AcceptBidDialog").then((mod) => mod.AcceptBidDialog)
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

  const locale = useLocale();

  const { open, handleOpen, handleClose } = useOpen();

  const handleAcceptClick = () => {
    handleOpen();
  };

  const formattedDistance = intlFormatDistance(
    parseISO(createdAt),
    new Date(),
    { locale }
  );
  const formattedEstDeliveryDate = formatDateTime({
    date: estDeliveryDate,
    locale,
  });

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
