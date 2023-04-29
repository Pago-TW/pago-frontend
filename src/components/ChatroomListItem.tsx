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
  content: string;
  sendDate: string;
  avatarSrc: string;
  totalUnreadMessages: number;
  messageType: "TEXT" | "FILE";
}

const ChatRoomListItem: React.FC<ChatRoomListItemProps> = ({
  senderId,
  senderName,
  content,
  sendDate,
  avatarSrc,
  totalUnreadMessages,
  messageType,
}) => {
  const hasUnreadMessages = totalUnreadMessages > 0;

  return (
    <ListItem
      button
      sx={{
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <ListItemAvatar>
        <Avatar alt="Profile Picture" src={avatarSrc} />
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
              color="text.primary"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: hasUnreadMessages ? "bold" : "normal",
              }}
            >
              {content}
            </Typography>
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              display="block"
            >
              {sendDate}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default ChatRoomListItem;
