import { useEffect, useRef, useState, type FC } from "react";

import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { useCharge } from "@/hooks/api/use-charge";
import { useChooseBid } from "@/hooks/api/use-choose-bid";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Bid } from "@/types/bid";
import { getUserProfileUrl } from "@/utils/user";

interface AcceptBidDialogProps {
  bidId: Bid["bidId"];
  userId: Bid["creator"]["userId"];
  fullName: Bid["creator"]["fullName"];
  avatarUrl: Bid["creator"]["avatarUrl"];
  open: boolean;
  onClose: () => void;
}

export const AcceptBidDialog: FC<AcceptBidDialogProps> = ({
  bidId,
  userId,
  fullName,
  avatarUrl,
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

  const handleConfirm = () => {
    chooseBid(bidId, {
      onSuccess: (data) => setFormHtml(data),
    });
  };

  useEffect(() => {
    if (formContainerRef && formHtml)
      formContainerRef.current?.querySelector("form")?.submit();
  }, [formHtml]);

  const userProfileUrl = getUserProfileUrl(userId);

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle fontSize={{ xs: 18, sm: 20 }}>
        是否接受報價並選擇此代購者？
      </DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={avatarUrl} href={userProfileUrl} />
          <Typography variant={isTablet ? "h4" : "h5"} as="p">
            <Link href={userProfileUrl}>{fullName}</Link>
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
