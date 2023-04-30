import { Box } from "@mui/material";
import * as React from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import MessageBoard from "@/components/MessageBoard";
import { useChatroom } from "@/hooks/api/useChatroom";
import useChatroomMessages from "@/hooks/api/useChatroomMessages";

const Chatroom: React.FC = () => {
  const router = useRouter();
  const { chatWith } = router.query;

  const { data: chatroomData, isLoading: isChatroomLoading } = useChatroom(
    chatWith as string
  );
  const chatroomId = chatroomData?.chatroomId;

  const { data: messagesData, isLoading: isMessagesLoading } =
    useChatroomMessages(chatroomId || "");

  if (isChatroomLoading || isMessagesLoading) {
    return <div>Loading...</div>;
  }

  const messages =
    messagesData?.pages
      .flatMap((page) => page.data)
      .map((message) => ({
        senderName: message.senderName,
        content: message.content,
        sendDate: new Date(message.sendDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSender: message.senderId === chatroomData?.currentLoginUserId,
        messageType: message.messageType as "TEXT" | "FILE",
      })) || [];

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        paddingTop: "10px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Header title={chatroomData?.otherUser.fullName || ""} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          paddingTop: "56px",
        }}
      >
        <MessageBoard messages={messages} />
      </Box>

      <InputSection />
    </Box>
  );
};

export default Chatroom;
