import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { SnackbarKey } from "notistack";
import { closeSnackbar } from "notistack";

export type CloseSnackbarButtonProps = { key: SnackbarKey };

export const CloseSnackbarButton = ({ key }: CloseSnackbarButtonProps) => {
  return (
    <IconButton onClick={() => closeSnackbar(key)} color="inherit">
      <Close />
    </IconButton>
  );
};
