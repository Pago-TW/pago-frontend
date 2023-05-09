import { useChatrooms } from "@/hooks/api/useChatrooms";
import { useNotifications } from "@/hooks/api/useNotifications";
import { useChatroomStore } from "@/store/ui/useChatroomStore";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { Divider, Drawer, List, Paper, Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { Chatroom } from "./Chatroom";
import { ChatroomListItem } from "./ChatroomListItem";
import { NotificationListItem } from "./NotificationListItem";
import { Header } from "./Header";
import { TabContext } from "@mui/lab";
import { TabPanel } from "@/components/ui/TabPanel";
import {
  HorizontalCenterTabList,
  RequestedCommissions,
  StyledTab,
} from "@/components/UserTabs";

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

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTab: PageTabValue
  ) => setTab(newTab);

  //   const { data: chatroomsData, refetch } = useChatrooms(undefined, {
  //     enabled: status === "authenticated",
  //     refetchOnWindowFocus: false,
  //   });

  const { data: notificationData, refetch } = useNotifications(undefined, {
    enabled: status === "authenticated",
    refetchOnWindowFocus: false,
  });

  const notifications = useMemo(
    () => flattenInfinitePaginatedData(notificationData),
    [notificationData]
  );

  //   const chatrooms = useMemo(
  //     () => flattenInfinitePaginatedData(chatroomsData),
  //     [chatroomsData]
  //   );

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
                {notifications.map((notification, index) => (
                  <div key={notification.notificationId}>
                    <NotificationListItem
                      notificationId={notification.notificationId}
                      content={notification.content}
                      imageUrl={notification.imageUrl || ""}
                      updateDate={notification.updateDate}
                      isRead={1}
                      notificationType={
                        notification.notificationType as
                          | "TRIP"
                          | "ORDER"
                          | "SYSTEM"
                      }
                      //   onClick={() =>
                      //     handleChatroomOpen(chatRoom.otherUser.userId)
                      //   }
                    />
                    {index !== notifications.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                ))}
              </TabPanel>

              <TabPanel value="TRIP"></TabPanel>
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
