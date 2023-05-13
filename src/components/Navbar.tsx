import { useChatrooms } from "@/hooks/api/useChatrooms";
import { useNotifications } from "@/hooks/api/useNotifications";
import { useOpen } from "@/hooks/useOpen";
import { useChatroomStore } from "@/store/ui/useChatroomStore";
import { useNavbarStore } from "@/store/ui/useNavbarStore";
import { ClickAwayListener } from "@mui/base";
import {
  ChevronLeft,
  Error,
  Forum,
  Logout,
  Menu,
  Notifications,
  Place,
  Receipt,
  Settings,
  ShoppingBag,
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
import type { FC } from "react";
import { useCallback, useState } from "react";
import { ChatroomList } from "./ChatroomList";
import { NotificationtList } from "./NotificationList";
import { Search } from "./Search";
import { Divider } from "./ui/Divider";
import { Link } from "./ui/Link";
import { Paper } from "./ui/Paper";
import { Typography } from "./ui/Typography";

const leftNavbarDrawerWidth = 270;

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
                    <ListItemButton
                      onClick={() => signOut({ callbackUrl: "/" })}
                    >
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
  onMessageClick?: () => void;
  onNotificationClick?: () => void;
};

const NavbarButtons = ({
  onMessageClick: onMailClick,
  onNotificationClick,
}: NavbarButtonsProps) => {
  const router = useRouter();

  const { status } = useSession();

  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

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

  useNotifications(undefined, {
    enabled: status === "authenticated" && !hasUnreadMessages,
    refetchInterval: 10000,
    refetchIntervalInBackground: true,
    onSuccess: (data) => {
      const hasUnread = data.pages.some((page) =>
        page.data.some((notification) => !notification.isRead)
      );
      setHasUnreadNotifications(hasUnread);
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
            <Forum />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={onNotificationClick}
        >
          <Badge
            color="error"
            variant="dot"
            invisible={!hasUnreadNotifications}
          >
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
  { href: "/marketplace", text: "瀏覽商品", icon: <ShoppingBag /> },
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

type SideDrawerProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const LeftNavbarDrawer: FC<SideDrawerProps> = ({ open, onOpen, onClose }) => {
  return (
    <SwipeableDrawer
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: leftNavbarDrawerWidth,
          backgroundColor: "pago.500",
          color: "common.white",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
      }}
    >
      <DrawerToolbar>
        <IconButton
          onClick={onClose}
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
    </SwipeableDrawer>
  );
};

const RightChatroomDrawer: FC<SideDrawerProps> = ({
  open,
  onOpen,
  onClose,
}) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableSwipeToOpen
      PaperProps={{
        sx: {
          width: "100%",
          height: "100%",
          backgroundColor: "pago.500",
          color: "common.white",
        },
      }}
    >
      <ChatroomList onBackClick={onClose} />
    </SwipeableDrawer>
  );
};

const RightNotificationDrawer: FC<SideDrawerProps> = ({
  open,
  onOpen,
  onClose,
}) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableSwipeToOpen
      PaperProps={{
        sx: {
          width: "100%",
          height: "100%",
          backgroundColor: "pago.500",
          color: "common.white",
        },
      }}
    >
      <NotificationtList onBackClick={onClose} />
    </SwipeableDrawer>
  );
};

export const Navbar = () => {
  const {
    open: leftNavbarOpen,
    handleOpen: handleLeftNavbarOpen,
    handleClose: handleLeftNavbarClose,
  } = useOpen();
  const {
    open: rightNotificationOpen,
    handleOpen: handleRightNotificationOpen,
    handleClose: handleRightNotificationClose,
  } = useOpen();

  const searchExpand = useNavbarStore((state) => state.searchExpand);
  const chatroomListOpen = useChatroomStore((state) => state.open);
  const setChatroomListOpen = useChatroomStore((state) => state.setOpen);

  const handleRightChatroomOpen = () => {
    setChatroomListOpen(true);
  };
  const handleRightChatroomClose = useCallback(() => {
    setChatroomListOpen(false);
  }, [setChatroomListOpen]);

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
            onClick={handleLeftNavbarOpen}
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
            <NavbarButtons
              onMessageClick={handleRightChatroomOpen}
              onNotificationClick={handleRightNotificationOpen}
            />
          </Stack>
        </Toolbar>
      </AppBar>
      <LeftNavbarDrawer
        open={leftNavbarOpen}
        onOpen={handleLeftNavbarOpen}
        onClose={handleLeftNavbarClose}
      />
      <RightChatroomDrawer
        open={chatroomListOpen}
        onOpen={handleRightChatroomOpen}
        onClose={handleRightChatroomClose}
      />
      <RightNotificationDrawer
        open={rightNotificationOpen}
        onOpen={handleRightNotificationOpen}
        onClose={handleRightNotificationClose}
      />
    </Box>
  );
};
