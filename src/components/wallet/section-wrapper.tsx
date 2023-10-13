import { Paper, styled } from "@mui/material";

export const SectionWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 6,
  height: "100%",
  minHeight: 67,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4, 6),
    minHeight: 80,
  },
}));
