import type { BoxProps } from "@mui/material";
import { Box, styled } from "@mui/material";

type FlexCenterProps = BoxProps & {
  main?: boolean;
  cross?: boolean;
};

export const FlexCenter = styled(Box, {
  shouldForwardProp: (prop) => prop !== "main" && prop !== "cross",
})<FlexCenterProps>(({ main, cross }) => ({
  display: "flex",
  justifyContent: main ? "center" : "flex-start",
  alignItems: cross ? "center" : "flex-start",
}));
