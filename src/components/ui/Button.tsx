import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { Button as MuiButton, styled } from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

const buttonSizes = {
  small: { height: 33, width: 128, fontSize: 14 },
  medium: { height: 39, width: 144, fontSize: 18 },
  large: { height: 46, width: 304, fontSize: 20 },
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "size",
})<ButtonProps>(({ size = "small", theme }) => ({
  width: buttonSizes[size].width,
  height: buttonSizes[size].height,
  fontSize: buttonSizes[size].fontSize,
  "& > .MuiButton-endIcon": {
    position: "absolute",
    right: "1rem",
  },
  "&.MuiButton-contained": {
    backgroundColor: theme.palette.pago[500],
    "&:hover": {
      backgroundColor: theme.palette.pago[900],
    },
    "&:active": {
      backgroundColor: theme.palette.pago[100],
    },
    "&.Mui-disabled": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.base[300],
    },
    "& .MuiButton-endIcon .MuiCircularProgress-root": {
      color: theme.palette.pago[500],
    },
  },
  "&.MuiButton-outlined": {
    color: theme.palette.pago[500],
    borderColor: theme.palette.pago[500],
    "&:hover": {
      backgroundColor: theme.palette.pago[25],
    },
    "&:active": {
      backgroundColor: theme.palette.pago[100],
    },
    "&.Mui-disabled": {
      color: theme.palette.base[300],
      borderColor: theme.palette.base[300],
      backgroundColor: theme.palette.common.white,
    },
    "& .MuiButton-endIcon .MuiCircularProgress-root": {
      color: theme.palette.pago[500],
    },
  },
}));

// TODO: deal with loading state
export const Button = ({
  size = "small",
  variant = "contained",
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton size={size} variant={variant} {...rest}>
      {children}
    </StyledButton>
  );
};
