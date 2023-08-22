import { useEffect, useMemo } from "react";

import { Divider, List, Paper, SwipeableDrawer } from "@mui/material";
import { useSession } from "next-auth/react";

import { Chatroom } from "@/components/Chatroom";
import { ChatroomListItem } from "@/components/ChatroomListItem";
import { Header } from "@/components/Header";
import { Typography } from "@/components/ui/Typography";
import { useChatrooms } from "@/hooks/api/useChatrooms";
import { useChatroomStore } from "@/store/ui/useChatroomStore";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";

const hideScrollbar = {
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
};

interface ChatroomListProps {
  onBackClick?: () => void;
}

export const ChatroomList = ({ onBackClick }: ChatroomListProps) => {
  const { status } = useSession();

  const chatroomListOpen = useChatroomStore((state) => state.open);
  const chatWith = useChatroomStore((state) => state.chatWith);
  const setChatWith = useChatroomStore((state) => state.setChatWith);
  const clearChatWith = useChatroomStore((state) => state.clearChatWith);

  const { data: chatroomsData, refetch } = useChatrooms(undefined, {
    enabled: status === "authenticated",
    refetchOnWindowFocus: false,
  });

  const chatrooms = useMemo(
    () => flattenInfinitePaginatedData(chatroomsData),
    [chatroomsData]
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
          pb: "50px",
          overflowY: "scroll",
          height: "100%",
          ...hideScrollbar,
        }}
      >
        <Header title="聊天室列表" onBackClick={onBackClick} />
        <List sx={{ mb: 2 }}>
          {chatrooms.length > 0 ? (
            chatrooms.map((chatRoom, index) => (
              <div key={chatRoom.chatroomId}>
                <ChatroomListItem
                  senderId={chatRoom.latestMessageSenderId}
                  senderName={chatRoom.otherUser.fullName}
                  latestMessageContent={chatRoom.latestMessageContent}
                  avatarUrl={chatRoom.otherUser.avatarUrl || ""}
                  latestMessageSendDate={chatRoom.latestMessageSendDate}
                  totalUnreadMessages={chatRoom.totalUnreadMessage}
                  latestMessageType={
                    chatRoom.latestMessageType as "FILE" | "TEXT"
                  }
                  onClick={() => handleChatroomOpen(chatRoom.otherUser.userId)}
                />
                {index !== chatrooms.length - 1 && (
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
                marginTop: 2,
              }}
            >
              目前沒有聊天室
            </Typography>
          )}
        </List>
      </Paper>
      <SwipeableDrawer
        anchor="right"
        open={!!chatWith}
        onOpen={clearChatWith}
        onClose={clearChatWith}
        disableSwipeToOpen
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
      </SwipeableDrawer>
    </>
  );
};

export default ChatroomList;
