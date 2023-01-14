import { styled } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import type { TypographyProps } from "./Typography";
import { Typography } from "./Typography";
type HeadingVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = {
  weightPreset?: TypographyProps["weightPreset"];
  variant?: HeadingVariants;
  children: React.ReactNode;
};

const headingSizes: {
  [k in HeadingVariants]: { fontSize: number };
} = {
  h1: { fontSize: 32 },
  h2: { fontSize: 28 },
  h3: { fontSize: 24 },
  h4: { fontSize: 20 },
  h5: { fontSize: 18 },
  h6: { fontSize: 14 },
};

const StyledHeading = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "variant",
})<HeadingProps>(({ variant = "h1", theme }) => ({
  fontSize: theme.typography.pxToRem(headingSizes[variant].fontSize),
}));

export const Heading = ({
  variant = "h1",
  weightPreset = "normal",
  children,
}: HeadingProps) => {
  return (
    <StyledHeading variant={variant} weightPreset={weightPreset}>
      {children}
    </StyledHeading>
  );
};

Heading.propTypes = {
  /**
   * The variant to use.
   * @default "h1"
   */
  variant: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  /**
   * The weight preset to use.
   * @default "normal"
   */
  weightPreset: PropTypes.oneOf(["light", "normal", "bold"]),
  /**
   * The content of the heading.
   */
  children: PropTypes.node,
};
