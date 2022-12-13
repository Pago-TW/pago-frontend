import type { CheckboxProps as MUICheckboxProps } from "@mui/material";
import { Checkbox as MuiCheckbox, styled } from "@mui/material";

type CheckboxProps = MUICheckboxProps;

const checkboxSizes = {
  small: { fontSize: 20 },
  medium: { fontSize: 24 },
  large: { fontSize: 28 },
};

const StyledCheckbox = styled(MuiCheckbox, {
  shouldForwardProp: (prop) => prop !== "size",
})<CheckboxProps>(({ size = "small", theme }) => ({
  "& .MuiSvgIcon-root": {
    fontSize: checkboxSizes[size].fontSize,
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
}));

export const Checkbox = ({ ...props }: CheckboxProps) => {
  return <StyledCheckbox {...props} />;
};
