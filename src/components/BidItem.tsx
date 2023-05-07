import { useCharge } from "@/hooks/api/useCharge";
import { useChooseBid } from "@/hooks/api/useChooseBid";
import { useLocale } from "@/hooks/useLocale";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useOpen } from "@/hooks/useOpen";
import { useTimezone } from "@/hooks/useTimezone";
import type { Bid } from "@/types/bid";
import { formatDateTime } from "@/utils/formatDateTime";
import { Star } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
} from "@mui/material";
import { intlFormatDistance, parseISO } from "date-fns";
import { useEffect, useRef, useState, type FC } from "react";
import { Button } from "./ui/Button";
import { Typography } from "./ui/Typography";

type ConfirmChosenBidProps = {
  bidId: Bid["bidId"];
  open: boolean;
  onClose: () => void;
};

const ConfirmAcceptBidDialog: FC<ConfirmChosenBidProps> = ({
  bidId,
  open,
  onClose,
}) => {
  const isTablet = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const [formHtml, setFormHtml] = useState("");
  const formContainerRef = useRef<HTMLDivElement>(null);

  const { data: charge } = useCharge(
    { bidId },
    { refetchOnWindowFocus: false }
  );

  const { mutate: chooseBid } = useChooseBid();

  const handleConfirm = async () => {
    chooseBid(bidId, {
      onSuccess: (data) => setFormHtml(data),
    });
  };

  useEffect(() => {
    if (formContainerRef && formHtml)
      formContainerRef.current?.querySelector("form")?.submit();
  }, [formHtml]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle fontSize={{ xs: 18, sm: 20 }}>
        是否接受報價並選擇此代購者？
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={charge?.bidder.avatarUrl} />
          <Typography variant={isTablet ? "h4" : "h5"} as="p">
            {charge?.bidder.fullName}
          </Typography>
        </Box>
        <Stack spacing={1} mt={2} color="base.500">
          <Typography variant={isTablet ? "h5" : "h6"} as="p">
            代購者報價: {charge?.travelerFee}
          </Typography>
          <Typography variant={isTablet ? "h5" : "h6"} as="p">
            即將付款總金額: {charge?.totalAmount}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          sx={{ minWidth: "fit-content" }}
          onClick={handleConfirm}
        >
          是
        </Button>
        <Button
          variant="text"
          sx={{ minWidth: "fit-content" }}
          onClick={onClose}
        >
          否
        </Button>
      </DialogActions>
      <div
        ref={formContainerRef}
        dangerouslySetInnerHTML={{ __html: formHtml }}
      ></div>
    </Dialog>
  );
};

type BidItemProps = {
  id: Bid["bidId"];
  amount: Bid["bidAmount"];
  currency: Bid["currency"];
  bidderName: Bid["creator"]["fullName"];
  bidderAvatar: Bid["creator"]["avatarUrl"];
  avgRating: Bid["creator"]["review"]["averageRating"];
  reviewCount: Bid["creator"]["review"]["totalReview"];
  createdAt: Bid["createDate"];
  estDeliveryDate: Bid["latestDeliveryDate"];
};

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
  } = props;

  const locale = useLocale();
  const timezone = useTimezone();

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
    timezone,
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
        <Button variant="outlined" size="small" onClick={handleAcceptClick}>
          接受報價
        </Button>
      </Paper>
      <ConfirmAcceptBidDialog bidId={id} open={open} onClose={handleClose} />
    </>
  );
};
