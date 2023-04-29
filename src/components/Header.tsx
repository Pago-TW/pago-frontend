import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";

interface HeaderProps {
  roomName: string;
  onBackButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ roomName, onBackButtonClick }) => {
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
      <Grid container>
        <Grid item xs={4} display="flex" justifyContent="flex-start" pl={2}>
          <Button
            color="primary"
            onClick={onBackButtonClick}
            sx={{ textTransform: "none" }}
          >
            <ArrowBackIos sx={{ height: "15px", width: "20px" }} />
          </Button>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "text.primary", fontWeight: "extrabold" }}
          >
            {roomName}
          </Typography>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Box>
  );
};

export default Header;
