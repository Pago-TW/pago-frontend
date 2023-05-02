import React, { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/router";
import ChatroomListItem from "@/components/ChatroomListItem";
import { useChatrooms } from "@/hooks/api/useChatrooms";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import {
  CssBaseline,
  Divider,
  List,
  Paper,
  SwipeableDrawer,
} from "@mui/material";

import Header from "@/components/Header";
import Chatroom from "./board";

type ChatroomListProps = {
  onBackClick?: () => void;
};

const hideScrollbar = {
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
};

export const ChatroomList = ({ onBackClick }: ChatroomListProps) => {
  const { data: chatroomsData } = useChatrooms();

  const chatrooms = useMemo(
    () => flattenInfinitePaginatedData(chatroomsData) ?? [],
    [chatroomsData]
  );

  const [chatroomOpen, setChatroomOpen] = useState(false);
  const [selectedChatWith, setSelectedChatWith] = useState<string | undefined>(
    undefined
  );

  const router = useRouter();

  const handleChatroomItemClick = (chatWith: string) => {
    setSelectedChatWith(chatWith);
    setChatroomOpen(true);
    router.push(`/chatrooms/board?chatWith=${chatWith}`);
  };

  const handleChatroomClose = useCallback(() => setChatroomOpen(false), []);

  const chatroomDrawerContent = (
    <>
      <Chatroom
        onBackClick={handleChatroomClose}
        passedChatWith={selectedChatWith}
      />
    </>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper
        square
        sx={{
          pb: "50px",
          overflowY: "scroll",
          height: "100%",
          ...hideScrollbar,
        }}
      >
        <Header title="聊天室列表" onBackClick={onBackClick} />
        <List sx={{ mb: 2 }}>
          {chatrooms.map((chatRoom, index) => (
            <React.Fragment key={chatRoom.chatroomId}>
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
                onClick={() =>
                  handleChatroomItemClick(chatRoom.otherUser.userId)
                }
              />
              {index !== chatrooms.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <SwipeableDrawer
        open={chatroomOpen}
        onOpen={() => setChatroomOpen(true)}
        onClose={() => setChatroomOpen(false)}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            backgroundColor: "#f5f5f5",
            color: "common.white",
          },
        }}
      >
        {chatroomDrawerContent}
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default ChatroomList;
