import {
  Alert,
  AlertTitle,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  styled,
} from "@mui/material";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import type { CancellationRecord } from "@/hooks/api/use-cancellation-record";
import type { PostponeRecord } from "@/hooks/api/use-postpone-record";
import type { Perspective } from "@/types/misc";

const DialogButton = styled(Button)(({ theme }) => ({
  minWidth: "fit-content",
  fontSize: theme.typography.pxToRem(16),
  fontWeight: 700,
}));

export interface ReplyDialogProps<ApplyFor extends "postpone" | "cancel"> {
  open: boolean;
  onClose: () => void;
  perspective: Perspective;
  applyFor: ApplyFor;
  reason?: ApplyFor extends "postpone"
    ? PostponeRecord["postponeReason"]
    : CancellationRecord["cancelReason"];
  note?: ApplyFor extends "postpone"
    ? PostponeRecord["note"]
    : CancellationRecord["note"];
  isLoading: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const ReplyDialog = <ApplyFor extends "postpone" | "cancel">({
  open,
  onClose,
  perspective,
  applyFor,
  reason,
  note,
  isLoading,
  onConfirm,
  onCancel,
}: ReplyDialogProps<ApplyFor>) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const applyForText = applyFor === "postpone" ? "延期" : "取消委託";
  const applicant = perspective === "consumer" ? "代購者" : "委託者";

  const title = `${applicant}申請${applyForText}，是否接受？`;
  const alertSeverity = applyFor === "postpone" ? "warning" : "error";
  const alertDesc =
    applyFor === "postpone"
      ? "接受後請重新與代購者更改面交時間"
      : "接受後此訂單將不成立";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Box>
          <Typography variant="h5" as="p" color="base.900">
            {isLoading ? <Skeleton /> : `原因: ${reason}`}
          </Typography>
          <Typography variant="h6" as="p" color="base.500" mt={2}>
            {isLoading ? <Skeleton /> : `說明: ${note ?? "(無)"}`}
          </Typography>
        </Box>
        <Alert variant="filled" severity={alertSeverity} sx={{ mt: 2 }}>
          <AlertTitle sx={{ fontWeight: 700 }}>此項操作無法返回</AlertTitle>
          {alertDesc}
        </Alert>
      </DialogContent>
      <DialogActions sx={{ px: 2 }}>
        <DialogButton variant="text" onClick={onConfirm}>
          是
        </DialogButton>
        <DialogButton variant="text" onClick={handleCancel}>
          否
        </DialogButton>
        <DialogButton variant="text" onClick={onClose}>
          稍後再說
        </DialogButton>
      </DialogActions>
    </Dialog>
  );
};
