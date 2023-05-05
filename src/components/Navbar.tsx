import { useChatrooms } from "@/hooks/api/useChatrooms";
import { useChatroomStore } from "@/store/ui/useChatroomStore";
import { useNavbarStore } from "@/store/ui/useNavbarStore";
import { ClickAwayListener } from "@mui/base";
import {
  ChevronLeft,
  Error,
  Logout,
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
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popper,
  Stack,
  SwipeableDrawer,
  Toolbar,
  alpha,
  styled,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ChatroomList } from "./ChatroomList";
import { Search } from "./Search";
import { Divider } from "./ui/Divider";
import { Link } from "./ui/Link";
import { Paper } from "./ui/Paper";
import { Typography } from "./ui/Typography";

const drawerWidth = 270;

const UserButton = () => {
  const { data: session } = useSession();

  const [anchorAvatar, setAnchorAvatar] = useState<HTMLElement | null>(null);

  const handleToggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorAvatar((prev) => (!prev ? event.currentTarget : null));
  };

  const handleCloseUserMenu = () => {
    setAnchorAvatar(null);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleCloseUserMenu}>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
          onClick={handleToggleUserMenu}
        >
          <Avatar
            src={session?.user?.image || undefined}
            sx={{ width: 24, height: 24 }}
          />
        </IconButton>
      </ClickAwayListener>
      <Popper
        open={!!anchorAvatar}
        anchorEl={anchorAvatar}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper
              sx={{
                py: 2,
                width: 300,
                boxShadow: (theme) =>
                  `0 2px 10px 2px ${alpha(theme.palette.pago.main, 0.5)}`,
              }}
            >
              <Stack spacing={2}>
                <Paper
                  sx={{
                    p: 2,
                    mx: 2,
                    boxShadow: (theme) =>
                      `0 2px 4px ${alpha(theme.palette.pago.main, 0.5)}`,
                  }}
                >
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={session?.user?.image || undefined}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Typography variant="h5" fontWeight="bold" as="p">
                        {session?.user?.name}
                      </Typography>
                    </Box>
                    <Divider />
                    <Link href="/users/me" color="pago.main">
                      查看詳細會員資訊
                    </Link>
                  </Stack>
                </Paper>
                <List disablePadding>
                  <ListItem disablePadding sx={{ color: "pago.main" }}>
                    <ListItemButton
                      LinkComponent={Link}
                      href="/users/me/settings"
                    >
                      <ListItemIcon
                        sx={{ justifyContent: "center", color: "inherit" }}
                      >
                        <Settings />
                      </ListItemIcon>
                      <ListItemText primary="設定" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding sx={{ color: "pago.main" }}>
                    <ListItemButton onClick={() => signOut()}>
                      <ListItemIcon
                        sx={{ justifyContent: "center", color: "inherit" }}
                      >
                        <Logout />
                      </ListItemIcon>
                      <ListItemText primary="登出" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Stack>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

type NavbarButtonsProps = {
  onMailClick?: () => void;
};

const NavbarButtons = ({ onMailClick }: NavbarButtonsProps) => {
  const router = useRouter();

  const { status } = useSession();

  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  useChatrooms(undefined, {
    enabled: status === "authenticated" && !hasUnreadMessages,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    onSuccess: (data) => {
      const hasUnread = data.pages.some((page) =>
        page.data.some((chatroom) => chatroom.totalUnreadMessage)
      );
      setHasUnreadMessages(hasUnread);
    },
  });

  const content =
    status === "authenticated" ? (
      <>
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          onClick={onMailClick}
        >
          <Badge color="error" variant="dot" invisible={!hasUnreadMessages}>
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
        <UserButton />
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
    ) : null;

  return <Box display="flex">{content}</Box>;
};

const NavbarSearch = () => {
  const expand = useNavbarStore((state) => state.searchExpand);
  const setExpand = useNavbarStore((state) => state.setSearchExpand);

  const query = useNavbarStore((state) => state.searchQuery);
  const setQuery = useNavbarStore((state) => state.setSearchQuery);
  const clearQuery = useNavbarStore((state) => state.clearSearchQuery);

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

  const searchExpand = useNavbarStore((state) => state.searchExpand);
  const chatroomListOpen = useChatroomStore((state) => state.open);
  const setChatroomListOpen = useChatroomStore((state) => state.setOpen);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChatroomListOpen = () => {
    setChatroomListOpen(true);
  };
  const handleChatroomListClose = () => {
    setChatroomListOpen(false);
  };

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
            in={!searchExpand}
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
            <NavbarButtons onMailClick={handleChatroomListOpen} />
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
      <SwipeableDrawer
        anchor="right"
        open={chatroomListOpen}
        onOpen={handleChatroomListOpen}
        onClose={handleChatroomListClose}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            backgroundColor: "pago.500",
            color: "common.white",
          },
        }}
      >
        <ChatroomList onBackClick={handleChatroomListClose} />
      </SwipeableDrawer>
    </Box>
  );
};
