import * as React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useChatroom } from "@/hooks/api/useChatroom";
import { useWebSocket } from "@/websocket/contexts/WebSocketContext";
import useChatroomMessages from "@/hooks/api/useChatroomMessages";
import { WebSocketService } from "@/websocket/websocket";
import { MessageResponse, SendMessageRequest } from "@/types/message";

import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import MessageBoard from "@/components/MessageBoard";

type Message = {
  senderName: string;
  content: string;
  sendDate: string;
  isSender: boolean;
  messageType: "TEXT" | "FILE";
};

const Chatroom: React.FC = () => {
  const router = useRouter();
  const { chatWith } = router.query;
  const { data: chatroomData, isLoading: isChatroomLoading } = useChatroom(
    chatWith as string
  );
  const chatroomId = chatroomData?.chatroomId;
  const { data: messagesData, isLoading: isMessagesLoading } =
    useChatroomMessages(chatroomId || "");
  const [localMessages, setLocalMessages] = React.useState<Message[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { webSocketService, isConnected, sendFileMessage } = useWebSocket();

  React.useEffect(() => {
    if (webSocketService) {
      const handleMessage = (message: MessageResponse) => {
        const isSender = message.senderId === chatroomData?.currentLoginUserId;
        if (isSender) {
          setLocalMessages((prevMessages: Message[]) => [
            ...prevMessages,
            {
              senderName: message.senderName,
              content: message.content,
              sendDate: new Date(message.sendDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isSender: isSender,
              messageType: message.messageType as "TEXT" | "FILE",
            },
          ]);
        }
      };

      webSocketService.onMessage(handleMessage);

      return () => {
        webSocketService.offMessage(handleMessage);
      };
    }
  }, [webSocketService, chatroomData]);

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
      }))
      .concat(localMessages) || [];

  const handleSendMessage = (content: string, messageType: "TEXT" | "FILE") => {
    if (!userId || !webSocketService) {
      return;
    }

    if (webSocketService && chatroomId && userId) {
      const messageToSend: SendMessageRequest = {
        chatroomId,
        content,
        messageType,
        senderId: userId,
      };

      webSocketService.sendMessage(messageToSend);
    }
  };

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
      <InputSection
        onFileUpload={async (event) => {
          const files = event.target.files;
          if (files) {
            await sendFileMessage(files);
          }
        }}
        onSend={handleSendMessage}
      />
    </Box>
  );
};

export default Chatroom;
