import type {
  ButtonProps as MuiButtonProps,
  CircularProgressProps as MuiCircularProgressProps,
} from "@mui/material";
import { Button as MuiButton, CircularProgress, styled } from "@mui/material";
import PropTypes from "prop-types";

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
  medium: { width: 20, height: 20 },
  large: { width: 30, height: 30 },
};

const StyledCircularProgress = styled(CircularProgress)<CircularProgressProps>(
  ({ size }) => ({
    ...(size && circularProgressSizes[size]),
  })
);

const buttonSizes: {
  [key in NonNullable<ButtonProps["size"]>]: {
    height: number;
    minWidth: number;
    fontSize: number;
  };
} = {
  small: { height: 33, minWidth: 128, fontSize: 14 },
  medium: { height: 39, minWidth: 144, fontSize: 18 },
  large: { height: 46, minWidth: 304, fontSize: 20 },
};

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "loading",
})<ButtonProps>(({ size = "small", theme }) => ({
  ...(size && buttonSizes[size]),
  textTransform: "none",
  "& .MuiButton-endIcon": {
    position: "absolute",
    ...(size === "small" && {
      right: 10,
    }),
    ...(size === "medium" && {
      right: 12,
    }),
    ...(size === "large" && {
      right: 24,
    }),
  },
  "&.MuiButton-contained": {
    backgroundColor: theme.palette.pago[500],
    "&:hover": {
      backgroundColor: theme.palette.pago[900],
    },
    "&:active": {
      backgroundColor: theme.palette.pago[100],
      "& .MuiButton-endIcon > *:first-of-type": {
        color: theme.palette.pago[500],
      },
    },
    "&.Mui-disabled": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.base[300],
    },
    "& .MuiButton-endIcon > *:first-of-type": {
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
    "& .MuiButton-endIcon > *:first-of-type": {
      color: theme.palette.pago[500],
    },
  },
}));

export const Button = ({
  size = "small",
  variant = "contained",
  endIcon,
  loading = false,
  disabled = false,
  disableRipple = true,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      variant={variant}
      disabled={disabled}
      disableRipple={disableRipple}
      endIcon={endIcon || (loading && <StyledCircularProgress size={size} />)}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  /**
   * The size of the button.
   * @default "small"
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * The variant to use.
   * @default "contained"
   */
  variant: PropTypes.oneOf(["contained", "outlined"]),
  /**
   * Whether the button is loading.
   * @default false
   */
  loading: PropTypes.bool,
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The content of the button.
   */
  children: PropTypes.node,
};
