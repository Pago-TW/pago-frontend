import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { TabContext } from "@mui/lab";
import { Box, Divider, List, Paper } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Header } from "@/components/header";
import { NotificationListItem } from "@/components/notification-list-item";
import { TabPanel } from "@/components/ui/tab-panel";
import { Typography } from "@/components/ui/typography";
import { HorizontalCenterTabList, StyledTab } from "@/components/user-tabs";
import { useMarkNotificationAsRead } from "@/hooks/api/use-mark-notification-as-read";
import { useNotifications } from "@/hooks/api/use-notifications";
import { flattenInfinitePaginatedData } from "@/utils/api";

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

interface ChatroomListProps {
  onBackClick?: () => void;
}

export const NotificationtList = ({ onBackClick }: ChatroomListProps) => {
  const router = useRouter();

  const { status } = useSession();

  const [tab, setTab] = useState<PageTabValue>("ORDER");
  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const qc = useQueryClient();
  const handleNotificationClick = (
    notificationId: string,
    redirectUrl: string
  ) => {
    markAsRead(
      { notificationId },
      {
        onSuccess: () => {
          // Invalidate both orders and trips query since the notification doesn't  contain the explicit target type
          const targetId = redirectUrl.split("/").pop();

          void Promise.all([
            qc.invalidateQueries(["orders", targetId]),
            qc.invalidateQueries(["trips", targetId]),
          ]).then(() => {
            void router.push(redirectUrl);
            if (onBackClick) onBackClick();
          });
        },
      }
    );
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTab: PageTabValue
  ) => setTab(newTab);

  const { data: notificationData, refetch } = useNotifications(undefined, {
    enabled: status === "authenticated",
    refetchOnWindowFocus: false,
  });

  const { orderNotifications, tripNotifications } = useMemo(() => {
    const notifications = flattenInfinitePaginatedData(notificationData);
    return {
      orderNotifications: notifications.filter(
        ({ notificationType }) => notificationType === "ORDER"
      ),
      tripNotifications: notifications.filter(
        ({ notificationType }) => notificationType === "TRIP"
      ),
    };
  }, [notificationData]);

  useEffect(() => {
    void refetch();
  }, [refetch, tab]);

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
        <List>
          <Box>
            <TabContext value={tab}>
              <HorizontalCenterTabList onChange={handleTabChange}>
                {PAGE_TABS.map((tab) => (
                  <StyledTab key={tab.value} {...tab} sx={{ fontSize: 18 }} />
                ))}
              </HorizontalCenterTabList>
              <TabPanel value="ORDER">
                {orderNotifications.length > 0 ? (
                  orderNotifications.map((notification, index) => (
                    <div key={notification.notificationId}>
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
                          handleNotificationClick(
                            notification.notificationId,
                            notification.redirectUrl
                          )
                        }
                      />
                      {index !== orderNotifications.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </div>
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
                {tripNotifications.length > 0 ? (
                  tripNotifications.map((notification, index) => (
                    <div key={notification.notificationId}>
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
                          handleNotificationClick(
                            notification.notificationId,
                            notification.redirectUrl
                          )
                        }
                      />
                      {index !== tripNotifications.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </div>
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
    </>
  );
};

export default NotificationtList;
