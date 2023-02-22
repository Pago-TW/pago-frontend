import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "./ui/Typography";

export const Header = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" weightPreset="bold" sx={{ flexGrow: 1 }}>
            Pago
          </Typography>
          <Button
            variant="outlined"
            sx={{
              width: 128,
              color: "white",
              borderColor: "white",
              "&:hover": { borderColor: "white" },
            }}
          >
            登入
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
