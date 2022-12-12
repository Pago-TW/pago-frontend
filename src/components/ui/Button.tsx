import type { ButtonProps as MuiButtonProps } from "@mui/material";
import { Button as MuiButton } from "@mui/material";

export const Button = ({ children, ...props }: MuiButtonProps) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};
