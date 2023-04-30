import React, { useMemo } from "react";
import Header from "@/components/Header";
import ChatroomListItem from "@/components/ChatroomListItem";
import { useChatRooms } from "@/hooks/api/useChatrooms";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { CssBaseline, Divider, List, Paper } from "@mui/material";
import { Link } from "@/components/ui/Link";

const hideScrollbar = {
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
};

const Chatrooms = () => {
  const { data: chatRoomsData } = useChatRooms();

  const chatRooms = useMemo(
    () => flattenInfinitePaginatedData(chatRoomsData) ?? [],
    [chatRoomsData]
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: "50px", overflowY: "scroll", ...hideScrollbar }}>
        <Header title="聊天室列表" />
        <List sx={{ mb: 2 }}>
          {chatRooms.map((chatRoom, index) => (
            <React.Fragment key={chatRoom.chatroomId}>
              <Link
                href={`/chatrooms/board?chatWith=${chatRoom.otherUser.userId}`}
              >
                <ChatroomListItem
                  senderId={chatRoom.otherUser.userId}
                  senderName={chatRoom.otherUser.fullName}
                  content={chatRoom.latestMessageContent}
                  avatarUrl={chatRoom.otherUser.avatarUrl || ""}
                  sendDate={chatRoom.latestMessageSendDate}
                  totalUnreadMessages={chatRoom.totalUnreadMessage}
                  messageType={chatRoom.latestMessageType}
                />
              </Link>

              {index !== chatRooms.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default Chatrooms;
