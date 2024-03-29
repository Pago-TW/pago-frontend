import { forwardRef } from "react";

import {
  CircularProgress,
  Button as MuiButton,
  type ButtonProps as MuiButtonProps,
  type CircularProgressProps as MuiCircularProgressProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

import { useMediaQuery } from "@/hooks/use-media-query";

export interface ButtonProps
  extends MuiButtonProps<"button", { component?: "label" }> {
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
})<ButtonProps>(({ size = "large", color, loading, theme }) => ({
  ...(size && buttonSizes[size]),
  textTransform: "none",
  "& .MuiButton-startIcon": {
    position: "absolute",
    left: 16,
  },
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
  ...(!color && {
    "&.MuiButton-contained": {
      backgroundColor: theme.palette.pago.main,
      "&:hover": {
        backgroundColor: theme.palette.pago[900],
      },
      "&:active": {
        backgroundColor: theme.palette.pago[100],
        "& .MuiButton-endIcon > *:first-of-type": {
          color: theme.palette.pago.main,
        },
      },
      "&.Mui-disabled": {
        color: theme.palette.common.white,
        backgroundColor: loading
          ? theme.palette.pago[100]
          : theme.palette.base[300],
      },
      "& .MuiButton-endIcon > *:first-of-type": {
        color: theme.palette.pago.main,
      },
    },
    "&.MuiButton-outlined": {
      color: theme.palette.pago.main,
      borderColor: theme.palette.pago.main,
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: theme.palette.pago[25],
      },
      "&:active": {
        backgroundColor: theme.palette.pago[100],
      },
      "&.Mui-disabled": {
        color: loading ? theme.palette.pago.main : theme.palette.base[300],
        borderColor: loading
          ? theme.palette.pago.main
          : theme.palette.base[300],
        ...(loading && {
          backgroundColor: theme.palette.pago[100],
        }),
      },
      "& .MuiButton-endIcon > *:first-of-type": {
        color: theme.palette.pago.main,
      },
    },
  }),
}));

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      size = "large",
      variant = "contained",
      endIcon,
      loading = false,
      disabled = false,
      disableRipple = true,
      children,
      ...rest
    },
    ref
  ) {
    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const _disabled = disabled || loading;

    const loadingIcon = <StyledCircularProgress size={size} />;
    return (
      <StyledButton
        size={size}
        variant={variant}
        disabled={_disabled}
        loading={loading}
        disableRipple={disableRipple}
        endIcon={endIcon ?? (loading && !isMobile && loadingIcon)}
        ref={ref}
        {...rest}
      >
        {loading && isMobile ? loadingIcon : children}
      </StyledButton>
    );
  }
);

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
  variant: PropTypes.oneOf(["text", "contained", "outlined"]),
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
