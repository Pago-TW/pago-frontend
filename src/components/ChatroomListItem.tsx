import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UnreadMessageBadge from "./UnreadMessageBadge";

interface ChatRoomListItemProps {
  senderId: string;
  senderName: string;
  latestMessageContent: string;
  latestMessageSendDate: string;
  avatarUrl: string;
  totalUnreadMessages: number;
  latestMessageType: "TEXT" | "FILE";
  onClick?: () => void;
}

const ChatRoomListItem: React.FC<ChatRoomListItemProps> = ({
  senderId,
  senderName,
  latestMessageContent: content,
  latestMessageSendDate: sendDate,
  avatarUrl,
  totalUnreadMessages,
  latestMessageType: messageType,
  onClick,
}) => {
  const hasUnreadMessages = totalUnreadMessages > 0;

  const displayContent = messageType === "FILE" ? "傳送了圖片給你" : content;

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
        <Avatar alt="Profile Picture" src={avatarUrl} />
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
                fontWeight: hasUnreadMessages ? "bold" : "normal",
              }}
            >
              {senderName}
            </Typography>
            {hasUnreadMessages && (
              <UnreadMessageBadge count={totalUnreadMessages} />
            )}
          </Box>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              color="#7b7b7b"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: hasUnreadMessages ? "bold" : "normal",
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

export default ChatRoomListItem;
