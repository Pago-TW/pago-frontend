import type { RadioProps as MuiRadioProps } from "@mui/material";
import { Radio as MuiRadio, styled } from "@mui/material";

type RadioProps = MuiRadioProps;

const radioSizes = {
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

export const Radio = (props: RadioProps) => {
  return <StyledRadio {...props} />;
};
