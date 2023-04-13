import type { DialogProps } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import type { FC } from "react";

export type ConfirmDialogProps = Pick<
  DialogProps,
  "open" | "maxWidth" | "fullWidth"
> & {
  open: boolean;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog: FC<ConfirmDialogProps> = (props) => {
  const {
    open,
    maxWidth = "xs",
    fullWidth = true,
    text,
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
      <DialogContent>
        <DialogContentText>
          <DialogContentText component="span">{text}</DialogContentText>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>是</Button>
        <Button onClick={onCancel}>否</Button>
      </DialogActions>
    </Dialog>
  );
};
