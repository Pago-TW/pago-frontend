import { useHydrated } from "@/hooks/useHydrated";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useAuthStore } from "@/store/auth";
import { useAppbarStore } from "@/store/ui/appbar";
import {
  AccountCircle,
  ChevronLeft,
  Close,
  Error,
  Mail,
  Menu,
  Notifications,
  Place,
  Receipt,
  Search,
  Settings,
} from "@mui/icons-material";
import {
  alpha,
  AppBar,
  Badge,
  Box,
  Button,
  Collapse,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  styled,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material";
import type { ChangeEvent } from "react";
import { useCallback, useRef, useState } from "react";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

const drawerWidth = 270;

const SearchBarBase = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.2),
  },
  transition: theme.transitions.create(["background-color", "width"]),
  width: "100%",
  overflowX: "hidden",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
}));

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
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  top: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: theme.typography.pxToRem(18),
  color: alpha(theme.palette.common.white, 0.75),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  height: 36,
  "& .MuiInputBase-input": {
    height: "100%",
    padding: theme.spacing(0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(2)})`,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "24ch",
    },
  },
}));

const SearchBar = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const expand = useAppbarStore((state) => state.searchBarExpand);
  const setExpand = useAppbarStore((state) => state.setSearchBarExpand);

  const query = useAppbarStore((state) => state.searchQuery);
  const setQuery = useAppbarStore((state) => state.setSearchQuery);
  const clearQuery = useAppbarStore((state) => state.clearSearchQuery);

  const hasSearch = query.length > 0;

  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value),
    [setQuery]
  );
  const handleClear = useCallback(() => {
    clearQuery();
    inputRef.current?.focus();
  }, [clearQuery]);
  const handleExpand = useCallback(() => {
    setExpand(true);
    inputRef.current?.focus();
  }, [setExpand]);
  const handleBlur = () => {
    if (!hasSearch) setExpand(false);
  };

  const showSearchBar = smUp || expand;

  return (
    <Stack direction="row" width="100%" justifyContent="end">
      {!showSearchBar ? (
        <IconButton
          onClick={handleExpand}
          sx={{ color: (theme) => theme.palette.common.white }}
        >
          <Search />
        </IconButton>
      ) : null}
      <SearchBarBase sx={[!showSearchBar ? { opacity: 0, width: 0 } : null]}>
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
                <Close
                  onClick={handleClear}
                  sx={{ cursor: "pointer" }}
                  fontSize="inherit"
                  color="inherit"
                />
              </ClearIconWrapper>
            ) : null
          }
          onChange={handleChange}
          onBlur={handleBlur}
          value={query}
          inputRef={inputRef}
        />
      </SearchBarBase>
    </Stack>
  );
};

const HeaderButtons = () => {
  const hydrated = useHydrated();

  const authenticated = useAuthStore((state) => state.authenticated);

  return (
    <Box display="flex" alignSelf="stretch">
      {hydrated ? (
        authenticated ? (
          <>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="error">
                <Mail />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </>
        ) : (
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
        )
      ) : (
        <Skeleton
          variant="rounded"
          animation="wave"
          width={128}
          height="100%"
        />
      )}
    </Box>
  );
};

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

  const expandSearchBar = useAppbarStore((state) => state.searchBarExpand);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

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
          <Collapse
            in={!expandSearchBar}
            orientation="horizontal"
            timeout={100}
            easing="ease-in-out"
          >
            <Typography
              variant="h3"
              weightPreset="bold"
              sx={{ userSelect: "none" }}
            >
              <Link href="/">Pago</Link>
            </Typography>
          </Collapse>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            alignItems="center"
            flexGrow={1}
            ml="auto"
          >
            <SearchBar />
            <HeaderButtons />
          </Stack>
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
