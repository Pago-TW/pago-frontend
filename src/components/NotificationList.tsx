import { HorizontalCenterTabList, StyledTab } from "@/components/UserTabs";
import { TabPanel } from "@/components/ui/TabPanel";
import { useNotifications } from "@/hooks/api/useNotifications";
import { useMarkNotificationAsRead } from "@/hooks/api/useMarkNotificationAsRead";
import { useChatroomStore } from "@/store/ui/useChatroomStore";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { TabContext } from "@mui/lab";
import { Box, Divider, Drawer, List, Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { Chatroom } from "./Chatroom";
import { Header } from "./Header";
import { NotificationListItem } from "./NotificationListItem";
import { Typography } from "./ui/Typography";
import { Link } from "./ui/Link";

const PAGE_TABS = [
  { label: "委託", value: "ORDER" },
  { label: "旅途", value: "TRIP" },
] as const;

type PageTabValue = (typeof PAGE_TABS)[number]["value"];

const hideScrollbar = {
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
};

type ChatroomListProps = {
  onBackClick?: () => void;
};

export const NotificationtList = ({ onBackClick }: ChatroomListProps) => {
  const { status } = useSession();

  const chatroomListOpen = useChatroomStore((state) => state.open);
  const chatWith = useChatroomStore((state) => state.chatWith);
  const setChatWith = useChatroomStore((state) => state.setChatWith);
  const clearChatWith = useChatroomStore((state) => state.clearChatWith);
  const [tab, setTab] = useState<PageTabValue>("ORDER");
  const markNotificationAsReadMutation = useMarkNotificationAsRead();

  const handleNotificationClick = (notificationId: string) => {
    markNotificationAsReadMutation.mutate({ notificationId });
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTab: PageTabValue
  ) => setTab(newTab);

  const { data: notificationData, refetch } = useNotifications(undefined, {
    enabled: status === "authenticated",
    refetchOnWindowFocus: false,
  });

  const notifications = useMemo(
    () => flattenInfinitePaginatedData(notificationData),
    [notificationData]
  );

  useEffect(() => {
    if (chatroomListOpen) refetch();
  }, [chatroomListOpen, refetch]);

  const handleChatroomOpen = (chatWith: string) => {
    setChatWith(chatWith);
  };

  return (
    <>
      <Paper
        square
        sx={{
          overflowY: "scroll",
          height: "100%",
          ...hideScrollbar,
        }}
      >
        <Header title="通知" onBackClick={onBackClick} />
        <List sx={{ pt: "56px" }}>
          <Box mt={3}>
            <TabContext value={tab}>
              <HorizontalCenterTabList onChange={handleTabChange}>
                {PAGE_TABS.map((tab) => (
                  <StyledTab key={tab.value} {...tab} sx={{ fontSize: 18 }} />
                ))}
              </HorizontalCenterTabList>
              <TabPanel value="ORDER">
                {notifications.filter(
                  (notification) => notification.notificationType === "ORDER"
                ).length > 0 ? (
                  notifications
                    .filter(
                      (notification) =>
                        notification.notificationType === "ORDER"
                    )
                    .map((notification, index) => (
                      <Link
                        key={notification.notificationId}
                        onClick={() =>
                          (window.location.href = notification.redirectUrl)
                        }
                      >
                        <NotificationListItem
                          notificationId={notification.notificationId}
                          content={notification.content}
                          imageUrl={notification.imageUrl || ""}
                          createDate={notification.createDate}
                          isRead={notification.isRead}
                          notificationType={
                            notification.notificationType as
                              | "TRIP"
                              | "ORDER"
                              | "SYSTEM"
                          }
                          onClick={() =>
                            handleNotificationClick(notification.notificationId)
                          }
                        />
                        {index !== notifications.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </Link>
                    ))
                ) : (
                  <Typography
                    variant="body1"
                    color="base.500"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    目前沒有通知
                  </Typography>
                )}
              </TabPanel>

              <TabPanel value="TRIP">
                {notifications.filter(
                  (notification) => notification.notificationType === "TRIP"
                ).length > 0 ? (
                  notifications
                    .filter(
                      (notification) => notification.notificationType === "TRIP"
                    )
                    .map((notification, index) => (
                      <Link
                        key={notification.notificationId}
                        onClick={() =>
                          (window.location.href = notification.redirectUrl)
                        }
                      >
                        <NotificationListItem
                          notificationId={notification.notificationId}
                          content={notification.content}
                          imageUrl={notification.imageUrl || ""}
                          createDate={notification.updateDate}
                          isRead={notification.isRead}
                          notificationType={
                            notification.notificationType as
                              | "TRIP"
                              | "ORDER"
                              | "SYSTEM"
                          }
                          onClick={() =>
                            handleNotificationClick(notification.notificationId)
                          }
                        />
                        {index !== notifications.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </Link>
                    ))
                ) : (
                  <Typography
                    variant="body1"
                    color="base.500"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    目前沒有通知
                  </Typography>
                )}
              </TabPanel>
              <TabPanel value="PERSONAL_REVIEWS"></TabPanel>
            </TabContext>
          </Box>
        </List>
      </Paper>
      <Drawer
        anchor="right"
        open={!!chatWith}
        onClose={clearChatWith}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            backgroundColor: "#f5f5f5",
            color: "common.white",
          },
        }}
      >
        <Chatroom chatWith={chatWith} />
      </Drawer>
    </>
  );
};

export default NotificationtList;
