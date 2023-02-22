import type { RadioProps as MuiRadioProps } from "@mui/material/Radio";
import MuiRadio from "@mui/material/Radio";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

type RadioProps = MuiRadioProps;

const radioSizes: {
  [k in NonNullable<RadioProps["size"]>]: { fontSize: number };
} = {
  small: { fontSize: 20 },
  medium: { fontSize: 24 },
};

const StyledRadio = styled(MuiRadio, {
  shouldForwardProp: (prop) => prop !== "size",
})<RadioProps>(({ size = "small", theme }) => ({
  "& .MuiSvgIcon-root": {
    fontSize: radioSizes[size].fontSize,
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

export const Radio = ({
  size = "small",
  disabled = false,
  ...rest
}: RadioProps) => {
  return <StyledRadio size={size} disabled={disabled} {...rest} />;
};

Radio.propTypes = {
  /**
   * The size of the checkbox.
   * @default "small"
   */
  size: PropTypes.oneOf(["small", "medium"]),
  /**
   * Whether the checkbox is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
};
