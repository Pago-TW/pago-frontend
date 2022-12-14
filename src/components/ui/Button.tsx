import type {
  ButtonProps as MuiButtonProps,
  CircularProgressProps as MuiCircularProgressProps,
} from "@mui/material";
import { Button as MuiButton, CircularProgress, styled } from "@mui/material";

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
}

interface CircularProgressProps extends Omit<MuiCircularProgressProps, "size"> {
  size?: "small" | "medium" | "large";
}

const circularProgressSizes: {
  [key in NonNullable<CircularProgressProps["size"]>]: {
    width: number;
    height: number;
  };
} = {
  small: { width: 20, height: 20 },
  medium: { width: 24, height: 24 },
  large: { width: 32, height: 32 },
};

const StyledCircularProgress = styled(CircularProgress)<CircularProgressProps>(
  ({ size }) => ({
    ...(size && circularProgressSizes[size]),
  })
);

const buttonSizes: {
  [key in NonNullable<ButtonProps["size"]>]: {
    height: number;
    width: number;
    fontSize: number;
  };
} = {
  small: { height: 33, width: 128, fontSize: 14 },
  medium: { height: 39, width: 144, fontSize: 18 },
  large: { height: 46, width: 304, fontSize: 20 },
};

const StyledButton = styled(MuiButton)<ButtonProps>(
  ({ size = "small", theme }) => ({
    ...(size && buttonSizes[size]),
    textTransform: "none",
    "& .MuiButton-endIcon": {
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
        "& .MuiButton-endIcon > *:first-child": {
          color: theme.palette.pago[500],
        },
      },
      "&.Mui-disabled": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.base[300],
      },
      "& .MuiButton-endIcon > *:first-child": {
        color: theme.palette.pago[100],
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
      "& .MuiButton-endIcon > *:first-child": {
        color: theme.palette.pago[500],
      },
    },
  })
);

export const Button = ({
  size = "small",
  variant = "contained",
  endIcon,
  loading,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      variant={variant}
      endIcon={endIcon || (loading && <StyledCircularProgress size={size} />)}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};
