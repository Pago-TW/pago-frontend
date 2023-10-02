import React from "react";

import {
  Badge,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import { Avatar } from "@/components/ui/avatar";
import UnreadMessageBadge from "@/components/unread-message-badge";

interface NotificationListItemProps {
  notificationId: string;
  content: string;
  createDate: string;
  imageUrl: string;
  isRead: boolean;
  notificationType: "ORDER" | "TRIP" | "SYSTEM";
  onClick?: () => void;
}

export const NotificationListItem: React.FC<NotificationListItemProps> = ({
  content: content,
  createDate: sendDate,
  imageUrl: imageUrl,
  isRead: isRead,
  onClick,
}) => {
  const isReadNotification = isRead;

  const displayContent = content;

  const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} 天`;
    } else if (hours > 0) {
      return `${hours} 小時`;
    } else if (minutes > 0) {
      return `${minutes} 分鐘`;
    } else {
      return "剛剛";
    }
  };

  return (
    <ListItem
      button
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Badge color="primary" variant="dot" invisible={isRead}>
          <Avatar alt="Notification Picture" src={imageUrl} />
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              component="span"
              variant="body2"
              color="text.primary"
              noWrap
              overflow="hidden"
              textOverflow="ellipsis"
              sx={{
                fontWeight: isReadNotification ? "normal" : "bold",
              }}
            >
              {}
            </Typography>
            {isRead && <UnreadMessageBadge count={0} />}
          </Box>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color={isRead ? "base.500" : "text.primary"}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: isRead ? "normal" : "bold",
              }}
            >
              {displayContent}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              color="#9d9d9d"
              display="block"
            >
              {timeAgo(sendDate)}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default NotificationListItem;
