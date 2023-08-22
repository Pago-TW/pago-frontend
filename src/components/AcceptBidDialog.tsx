import { useEffect, useRef, useState, type FC } from "react";

import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { useCharge } from "@/hooks/api/useCharge";
import { useChooseBid } from "@/hooks/api/useChooseBid";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Bid } from "@/types/bid";

interface AcceptBidDialogProps {
  bidId: Bid["bidId"];
  open: boolean;
  onClose: () => void;
}

export const AcceptBidDialog: FC<AcceptBidDialogProps> = ({
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
            代購者報價: {charge?.travelerFee} {charge?.currency}
          </Typography>
          <Typography variant={isTablet ? "h5" : "h6"} as="p">
            即將付款總金額: {charge?.totalAmount} {charge?.currency}
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
