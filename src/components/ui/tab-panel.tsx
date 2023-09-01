import { TabPanel as MuiTabPanel } from "@mui/lab";
import { styled } from "@mui/material";

export const TabPanel = styled(MuiTabPanel)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));
