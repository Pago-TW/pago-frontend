import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Button, IconButton, styled, Toolbar } from "@mui/material";
import { Typography } from "./ui/Typography";

const LoginButton = styled(Button)(({}) => ({
  width: 128,
  color: "white",
  borderColor: "white",
  "&:hover": {
    borderColor: "white",
  },
}));

export const Header = () => {
  return (
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
        <LoginButton variant="outlined">登入</LoginButton>
      </Toolbar>
    </AppBar>
  );
};
