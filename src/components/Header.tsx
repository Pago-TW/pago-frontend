import {
  ChevronLeft,
  Error,
  Menu,
  Place,
  Receipt,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

const drawerWidth = 270;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type DrawerListItem = {
  href: `/${string}`;
  text: string;
  icon: React.ReactNode;
};

const drawerListItems: DrawerListItem[] = [
  { href: "/orders", text: "我的委託", icon: <Receipt /> },
  { href: "/trips", text: "旅途管理", icon: <Place /> },
  { href: "/help", text: "幫助中心", icon: <Error /> },
  { href: "/settings", text: "設定", icon: <Settings /> },
];

const DrawerList = () => {
  return (
    <List>
      {drawerListItems.map(({ href, text, icon }) => (
        <ListItem
          key={href}
          component={Link}
          href={href}
          disablePadding
          sx={{
            mb: 1,
            transition: (theme) => theme.transitions.create("background-color"),
            "&:hover": { backgroundColor: "pago.300" },
          }}
        >
          <ListItemButton>
            <ListItemText primary={text} />
            <ListItemIcon
              sx={{
                justifyContent: "end",
                color: "inherit",
              }}
            >
              {icon}
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleOpen}
          >
            <Menu />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h3"
              weightPreset="bold"
              component={Link}
              href="/"
              sx={{ userSelect: "none" }}
            >
              Pago
            </Typography>
          </Box>
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
      <SwipeableDrawer
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: drawerWidth,
            backgroundColor: "pago.500",
            color: "common.white",
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          },
        }}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleClose}
            sx={{
              color: "inherit",
              transition: (theme) =>
                theme.transitions.create("background-color"),
              "&:hover": { backgroundColor: "pago.300" },
            }}
          >
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <DrawerList />
      </SwipeableDrawer>
    </Box>
  );
};
