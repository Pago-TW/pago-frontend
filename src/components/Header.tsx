import { useAppbarStore } from "@/store/ui/appbar";
import {
  ChevronLeft,
  Close,
  Error,
  Menu,
  Place,
  Receipt,
  Search,
  Settings,
} from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { useFirstMountState } from "react-use";
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

// const SearchBar = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ClearIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  top: 0,
  right: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  color: "inherit",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 0, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   width: "12ch",
    //   "&:focus": {
    //     width: "20ch",
    //   },
    // },
  },
}));

const SearchBar = () => {
  const [search, setSearch] = useState<string>("");

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );
  const handleClear = useCallback(() => setSearch(""), []);

  const hasSearch = search.length > 0;

  return (
    <StyledInputBase
      placeholder="Search…"
      inputProps={{ "aria-label": "search" }}
      startAdornment={
        <SearchIconWrapper>
          <Search />
        </SearchIconWrapper>
      }
      endAdornment={
        hasSearch ? (
          <ClearIconWrapper>
            <Close onClick={handleClear} />
          </ClearIconWrapper>
        ) : null
      }
      onChange={handleChange}
      value={search}
    />
  );
};

export const Header = () => {
  const isFirstMount = useFirstMountState();

  const open = useAppbarStore((state) => state.drawerOpen);
  const setOpen = useAppbarStore((state) => state.setDrawerOpen);

  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const disableBackdropTransition = isFirstMount && open;

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: { xs: 1, sx: 2 } }}
            onClick={handleOpen}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h3"
            weightPreset="bold"
            sx={{ userSelect: "none", display: { xs: "none", sm: "inline" } }}
          >
            <Link href="/">Pago</Link>
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            ml={{ xs: 0, sm: "auto" }}
            flexGrow={{ xs: 1, sm: 0 }}
          >
            <SearchBar />
            <Button
              component={Link}
              variant="outlined"
              sx={{
                width: 128,
                color: "white",
                borderColor: "white",
                flexShrink: 0,
                "&:hover": { borderColor: "white" },
              }}
              href="/auth/signin"
            >
              登入
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        // the `disableBackdropTransition` doesn't work so I just monkey patch it
        transitionDuration={disableBackdropTransition ? 0 : undefined}
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
