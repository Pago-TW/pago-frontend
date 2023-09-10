import dynamic from "next/dynamic";

import { Star } from "@mui/icons-material";
import { Avatar, Box, Paper, Stack } from "@mui/material";

import { Button } from "@/components/ui/button";
import { FilledTextarea } from "@/components/ui/filled-textarea";
import { Typography } from "@/components/ui/typography";
import { useOpen } from "@/hooks/use-open";
import type { Bid } from "@/types/bid";
import { formatDate, fromNow } from "@/utils/date";
import { formatCurrency } from "@/utils/misc";

const DynamicAcceptBidDialog = dynamic(() =>
  import("@/components/accept-bid-dialog").then((mod) => mod.AcceptBidDialog)
);

type BidItemProps = Bid & {
  isOwner: boolean;
};

export const BidItem = ({
  bidId,
  bidAmount,
  currency,
  creator: {
    fullName,
    avatarUrl,
    review: { averageRating, totalReview },
  },
  createDate,
  latestDeliveryDate,
  bidComment,
  isOwner,
}: BidItemProps) => {
  const { open, handleOpen, handleClose } = useOpen();

  const handleAcceptClick = () => {
    handleOpen();
  };

  const formattedBidAmount = formatCurrency({ currency, value: bidAmount });
  const formattedDistance = fromNow(createDate);
  const formattedLatestDeliveryDate = formatDate(latestDeliveryDate);

  return (
    <>
      <Paper elevation={3} component={Stack} spacing={2} sx={{ p: 2 }}>
        <Box display="flex" alignItems="center">
          <Avatar src={avatarUrl} />
          <Box display="flex" flexDirection="column" flexGrow={1} ml={2}>
            <Typography variant="h5" noWrap>
              {fullName}
            </Typography>
            <Box
              color="pago.main"
              display="flex"
              alignItems="center"
              fontSize={14}
            >
              <Star fontSize="inherit" />
              <Typography ml={0.5} fontSize="inherit">
                {averageRating} ({totalReview}筆評價)
              </Typography>
            </Box>
          </Box>
          <Typography variant="h6" color="pago.main">
            {formattedDistance}
          </Typography>
        </Box>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography as="span" variant="h5" color="base.500">
              最晚送達日期
            </Typography>
            <Typography as="span" variant="h5">
              {formattedLatestDeliveryDate}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography as="span" variant="h5" color="base.500">
              出價
            </Typography>
            <Typography as="span" variant="h5" weightPreset="bold">
              {formattedBidAmount}
            </Typography>
          </Stack>
          <FilledTextarea
            minRows={1}
            value={bidComment}
            readOnly
            sx={{
              color: "base.500",
              "&:hover": { cursor: "default", bgcolor: "base.50" },
              "& .MuiFilledInput-input:hover": { cursor: "default" },
            }}
          />
        </Stack>
        {isOwner && (
          <>
            <Button variant="outlined" size="small" onClick={handleAcceptClick}>
              接受報價
            </Button>
            <DynamicAcceptBidDialog
              bidId={bidId}
              open={open}
              onClose={handleClose}
            />
          </>
        )}
      </Paper>
    </>
  );
};
