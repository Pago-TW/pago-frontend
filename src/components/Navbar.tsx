import { useAppbarStore } from "@/store/ui/appbar";
import {
  AccountCircle,
  ChevronLeft,
  Error,
  Mail,
  Menu,
  Notifications,
  Place,
  Receipt,
  Settings,
} from "@mui/icons-material";
import type { ListItemIconProps, ListItemProps } from "@mui/material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  SwipeableDrawer,
  Toolbar,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Search } from "./Search";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

const drawerWidth = 270;

const NavbarButtons = () => {
  const router = useRouter();

  const { status } = useSession();

  const content =
    status === "authenticated" ? (
      <>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
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
    ) : status === "unauthenticated" ? (
      <Button
        variant="outlined"
        LinkComponent={Link}
        href={`/auth/signin?callbackUrl=${router.asPath}`}
        sx={{
          width: { xs: 96, sm: 128 },
          color: "white",
          borderColor: "white",
          flexShrink: 0,
          "&:hover": { borderColor: "white" },
        }}
      >
        登入
      </Button>
    ) : (
      <Skeleton variant="rounded" animation="wave" width={128} height="100%" />
    );

  return <Box display="flex">{content}</Box>;
};

const NavbarSearch = () => {
  const expand = useAppbarStore((state) => state.searchBarExpand);
  const setExpand = useAppbarStore((state) => state.setSearchBarExpand);

  const query = useAppbarStore((state) => state.searchQuery);
  const setQuery = useAppbarStore((state) => state.setSearchQuery);
  const clearQuery = useAppbarStore((state) => state.clearSearchQuery);

  return (
    <Search
      expand={expand}
      onExpand={setExpand}
      query={query}
      onQueryChange={setQuery}
      onQueryClear={clearQuery}
    />
  );
};

const DrawerToolbar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type DrawerListItem = {
  href: string;
  text: string;
  icon: React.ReactNode;
};

const drawerListItems: DrawerListItem[] = [
  { href: "/orders", text: "我的委託", icon: <Receipt /> },
  { href: "/trips", text: "旅途管理", icon: <Place /> },
  { href: "/help", text: "幫助中心", icon: <Error /> },
  { href: "/settings", text: "設定", icon: <Settings /> },
];

const drawerItemSx: ListItemProps["sx"] = {
  mb: 1,
  transition: (theme) => theme.transitions.create("background-color"),
  "&:hover": {
    backgroundColor: "pago.400",
  },
};

const drawerIconSx: ListItemIconProps["sx"] = {
  justifyContent: "end",
  color: "inherit",
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  const expandSearchBar = useAppbarStore((state) => state.searchBarExpand);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const drawerContent = (
    <>
      <DrawerToolbar>
        <IconButton
          onClick={handleClose}
          sx={{
            color: "inherit",
            transition: (theme) => theme.transitions.create("background-color"),
            "&:hover": { backgroundColor: "pago.300" },
          }}
        >
          <ChevronLeft />
        </IconButton>
      </DrawerToolbar>
      <List>
        {drawerListItems.map(({ href, text, icon }) => (
          <ListItem
            key={href}
            component={Link}
            href={href}
            disablePadding
            sx={drawerItemSx}
          >
            <ListItemButton>
              <ListItemText primary={text} />
              <ListItemIcon sx={drawerIconSx}>{icon}</ListItemIcon>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

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
            spacing={0}
            justifyContent="end"
            alignItems="center"
            flexGrow={1}
          >
            <NavbarSearch />
            <NavbarButtons />
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
        {drawerContent}
      </SwipeableDrawer>
    </Box>
  );
};
