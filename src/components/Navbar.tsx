import { useChatrooms } from "@/hooks/api/useChatrooms";
import { useChatroomStore } from "@/store/ui/useChatroomStore";
import { useNavbarStore } from "@/store/ui/useNavbarStore";
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
  Stack,
  SwipeableDrawer,
  Toolbar,
  styled,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { ChatroomList } from "./ChatroomList";
import { Search } from "./Search";
import { Link } from "./ui/Link";
import { Typography } from "./ui/Typography";

const drawerWidth = 270;

type NavbarButtonsProps = {
  onMailClick?: () => void;
};

const NavbarButtons = ({ onMailClick }: NavbarButtonsProps) => {
  const router = useRouter();

  const { status } = useSession();

  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  useChatrooms(undefined, {
    enabled: status === "authenticated",
    refetchOnWindowFocus: false,
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
