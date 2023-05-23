import { Check } from "@mui/icons-material";
import { alpha } from "@mui/material";
import type { FC, ReactNode } from "react";
import type { ButtonProps } from "./ui/Button";
import { Button } from "./ui/Button";

type SubmitButtonProps = ButtonProps & {
  successIcon?: ReactNode;
  success?: boolean;
};

export const SubmitButton: FC<SubmitButtonProps> = ({
  success,
  successIcon,
  disabled,
  fullWidth,
  onClick,
  sx,
  children,
  ...rest
}) => {
  return (
    <Button
      type={onClick ? "button" : "submit"}
      endIcon={success ? successIcon ?? <Check /> : null}
      disabled={disabled || success}
      fullWidth={fullWidth}
      onClick={onClick}
      sx={{
        minWidth: 0,
        ...(success && {
          "&&.Mui-disabled": {
            backgroundColor: (theme) => alpha(theme.palette.success.main, 0.5),
            "& .MuiButton-endIcon .MuiSvgIcon-root": {
              color: (theme) => alpha(theme.palette.common.white, 0.75),
            },
          },
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
