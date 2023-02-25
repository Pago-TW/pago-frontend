import type { CheckboxProps as MuiCheckboxProps } from "@mui/material";
import { Checkbox as MuiCheckbox } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsSizeOverrides {
    large: true;
  }
}

interface CheckboxProps extends Omit<MuiCheckboxProps, "size"> {
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

export const Checkbox = ({
  size = "small",
  disabled = false,
  ...rest
}: CheckboxProps) => {
  return <StyledCheckbox size={size} disabled={disabled} {...rest} />;
};

Checkbox.propTypes = {
  /**
   * The size of the checkbox.
   * @default "small"
   */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
};
