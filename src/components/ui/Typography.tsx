import type { TypographyProps as MuiTypographyProps } from "@mui/material";
import { Typography as MuiTypography } from "@mui/material";
import { styled } from "@mui/material/styles";
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
})<TypographyProps>(({ variant, weightPreset = "normal", theme }) => ({
  fontWeight: typographyWeightPresets[weightPreset],
  ...(variant === "h1" && {
    fontSize: theme.typography.pxToRem(32),
  }),
  ...(variant === "h2" && {
    fontSize: theme.typography.pxToRem(28),
  }),
  ...(variant === "h3" && {
    fontSize: theme.typography.pxToRem(24),
  }),
  ...(variant === "h4" && {
    fontSize: theme.typography.pxToRem(20),
  }),
  ...(variant === "h5" && {
    fontSize: theme.typography.pxToRem(18),
  }),
  ...(variant === "h6" && {
    fontSize: theme.typography.pxToRem(14),
  }),
}));

export const Typography = StyledTypography;

Typography.propTypes = {
  /**
   * The variant to use.
   * @default "body1"
   */
  variant: PropTypes.oneOf([
    "body1",
    "body2",
    "button",
    "caption",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "inherit",
    "overline",
    "subtitle1",
    "subtitle2",
  ]),
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
