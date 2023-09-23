import { alpha, styled } from "@mui/material";
import { MaterialDesignContent } from "notistack";

export const NotistackSnackbar = styled(MaterialDesignContent)(({ theme }) => ({
  "&.notistack-MuiContent": {
    userSelect: "none",
    "&:not(.notistack-MuiContent-default)": {
      color: alpha(theme.palette.common.black, 0.85),
    },
    "&.notistack-MuiContent-default": {
      color: alpha(theme.palette.common.white, 0.85),
    },
    "& .MuiButtonBase-root": {
      minWidth: "fit-content",
      marginLeft: 4,
      borderRadius: 4,
    },
    "& *": {
      fontSize: theme.typography.pxToRem(16),
    },
  },
  "&.notistack-MuiContent-success": {
    backgroundColor: theme.palette.pagoGreen[200],
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: theme.palette.pagoRed[200],
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: theme.palette.pagoYellow[200],
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: theme.palette.pago[25],
  },
}));
