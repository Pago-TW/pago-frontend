import React, { useMemo } from "react";
import Header from "@/components/Header";
import ChatroomListItem from "@/components/ChatroomListItem";
import { useChatrooms } from "@/hooks/api/useChatrooms";
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
  const { data: chatroomsData } = useChatrooms();

  const chatrooms = useMemo(
    () => flattenInfinitePaginatedData(chatroomsData) ?? [],
    [chatroomsData]
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: "50px", overflowY: "scroll", ...hideScrollbar }}>
        <Header title="聊天室列表" />
        <List sx={{ mb: 2 }}>
          {chatrooms.map((chatRoom, index) => (
            <React.Fragment key={chatRoom.chatroomId}>
              <Link
                href={`/chatrooms/board?chatWith=${chatRoom.otherUser.userId}`}
              >
                <ChatroomListItem
                  senderId={chatRoom.otherUser.userId}
                  senderName={chatRoom.otherUser.fullName}
                  latestMessageContent={chatRoom.latestMessageContent}
                  avatarUrl={chatRoom.otherUser.avatarUrl || ""}
                  latestMessageSendDate={chatRoom.latestMessageSendDate}
                  totalUnreadMessages={chatRoom.totalUnreadMessage}
                  latestMessageType={
                    chatRoom.latestMessageType as "FILE" | "TEXT"
                  }
                />
              </Link>

              {index !== chatrooms.length - 1 && (
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
