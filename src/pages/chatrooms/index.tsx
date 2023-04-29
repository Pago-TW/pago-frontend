import React, { useMemo } from "react";
import Header from "@/components/Header";
import ChatroomListItem from "@/components/ChatroomListItem";
import { useChatRooms } from "@/hooks/api/useChatrooms";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { CssBaseline, Divider, List, Paper } from "@mui/material";

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
        <Header roomName="聊天室列表" onBackButtonClick={() => {}} />
        <List sx={{ mb: 2 }}>
          {chatRooms.map((chatRoom, index) => (
            <React.Fragment key={chatRoom.chatroomId}>
              <ChatroomListItem
                senderId={chatRoom.otherUser.userId}
                senderName={chatRoom.otherUser.fullName}
                content={chatRoom.latestMessageContent}
                avatarUrl={chatRoom.otherUser.avatarUrl || ""}
                sendDate={chatRoom.latestMessageSendDate}
                totalUnreadMessages={chatRoom.totalUnreadMessage}
                messageType={chatRoom.latestMessageType}
              />
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
