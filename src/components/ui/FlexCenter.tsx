import type { BoxProps } from "@mui/material/Box";
import MuiBox from "@mui/material/Box";
import { styled } from "@mui/material/styles";

type FlexCenterProps = BoxProps & {
  main?: boolean;
  cross?: boolean;
};

export const FlexCenter = styled(MuiBox, {
  shouldForwardProp: (prop) => prop !== "main" && prop !== "cross",
})<FlexCenterProps>(({ main, cross }) => ({
  display: "flex",
  justifyContent: main ? "center" : "flex-start",
  alignItems: cross ? "center" : "flex-start",
}));
