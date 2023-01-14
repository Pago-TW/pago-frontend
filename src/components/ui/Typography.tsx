import type { TypographyProps as MuiTypographyProps } from "@mui/material";
import { styled, Typography as MuiTypography } from "@mui/material";
import PropTypes from "prop-types";

export type TypographyProps = MuiTypographyProps & {
  weightPreset?: "light" | "normal" | "bold";
};

const typographyWeightPresets: {
  [k in NonNullable<TypographyProps["weightPreset"]>]: number;
} = {
  light: 300,
  normal: 400,
  bold: 700,
};

const StyledTypography = styled(MuiTypography, {
  shouldForwardProp: (prop) => prop !== "weightPreset",
})<TypographyProps>(({ weightPreset = "normal", theme }) => ({
  color: theme.palette.base[800],
  fontWeight: typographyWeightPresets[weightPreset],
}));

export const Typography = ({
  weightPreset = "normal",
  children,
  ...rest
}: TypographyProps) => {
  return (
    <StyledTypography weightPreset={weightPreset} {...rest}>
      {children}
    </StyledTypography>
  );
};

Typography.propTypes = {
  /**
   * The weight preset to use.
   * @default "normal"
   */
  weightPreset: PropTypes.oneOf(["light", "normal", "bold"]),
  /**
   * The content of the typography.
   */
  children: PropTypes.node,
};
