import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSnackbar, type SnackbarKey } from "notistack";

export interface CloseSnackbarButtonProps {
  snackbarKey: SnackbarKey;
}

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
