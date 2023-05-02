import React from "react";
import { Box, Grid } from "@mui/material";
import { BackButtonIos } from "./BackButtonIos";
import { Typography } from "./ui/Typography";

interface HeaderProps {
  title: string | any;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackClick }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Box pl={2}>
            <BackButtonIos onClick={onBackClick} />
          </Box>
        </Grid>
        <Grid item xs={10} display="flex" justifyContent="center">
          <Typography
            variant="h4"
            sx={{ color: "text.primary", fontWeight: "extrabold" }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </Box>
  );
};

export default Header;
