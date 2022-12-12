import type { CheckboxProps as MUICheckboxProps } from "@mui/material";
import { Checkbox as MuiCheckbox } from "@mui/material";

export const Checkbox = (props: MUICheckboxProps) => {
  return <MuiCheckbox {...props} />;
};
