import type { TabProps } from "@mui/material";
import { Tab as MuiTab, styled } from "@mui/material";

const StyledTab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    minWidth: "fit-content",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "calc(100% / 3)",
  },
  fontSize: 18,
  flex: 1,
}));

export const Tab = (props: TabProps) => <StyledTab {...props} />;
