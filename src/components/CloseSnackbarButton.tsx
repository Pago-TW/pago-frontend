import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { SnackbarKey } from "notistack";
import { useSnackbar } from "notistack";

export type CloseSnackbarButtonProps = { snackbarKey: SnackbarKey };

export const CloseSnackbarButton = ({
  snackbarKey,
}: CloseSnackbarButtonProps) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      onClick={() => closeSnackbar(snackbarKey)}
      color="inherit"
      sx={{ borderRadius: 1 }}
    >
      <Close />
    </IconButton>
  );
};
