import type { FC, ReactNode } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  type DialogProps,
} from "@mui/material";

export type ConfirmDialogProps = Pick<
  DialogProps,
  "open" | "maxWidth" | "fullWidth"
> & {
  title?: ReactNode;
  content?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const {
    open,
    maxWidth = "xs",
    fullWidth = true,
    title,
    content,
    onClose,
    onConfirm,
    onCancel,
  } = props;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      {title ? <DialogTitle fontSize={18}>{title}</DialogTitle> : null}
      {content ? <DialogContent>{content}</DialogContent> : null}
      <DialogActions>
        <Button onClick={onConfirm}>是</Button>
        <Button onClick={onCancel}>否</Button>
      </DialogActions>
    </Dialog>
  );
};
