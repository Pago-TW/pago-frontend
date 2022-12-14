import type { CheckboxProps as MUICheckboxProps } from "@mui/material";
import { Checkbox as MuiCheckbox, styled } from "@mui/material";

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsSizeOverrides {
    large: true;
  }
}

interface CheckboxProps extends Omit<MUICheckboxProps, "size"> {
  size?: "small" | "medium" | "large";
}

const checkboxSizes: {
  [k in NonNullable<CheckboxProps["size"]>]: { fontSize: number };
} = {
  small: { fontSize: 20 },
  medium: { fontSize: 24 },
  large: { fontSize: 28 },
};

const StyledCheckbox = styled(MuiCheckbox)<CheckboxProps>(
  ({ size = "small", theme }) => ({
    "& .MuiSvgIcon-root": {
      ...(size && checkboxSizes[size]),
    },
    "&:hover": {
      backgroundColor: theme.palette.base[100],
    },
    "&.Mui-checked": {
      color: theme.palette.pago[500],
    },
    "&.Mui-disabled": {
      color: theme.palette.base[300],
    },
  })
);

export const Checkbox = ({ size = "small", ...rest }: CheckboxProps) => {
  return <StyledCheckbox size={size} {...rest} />;
};
