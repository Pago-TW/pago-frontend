import * as React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useChatroom } from "@/hooks/api/useChatroom";
import useChatroomMessages from "@/hooks/api/useChatroomMessages";
import { useWebSocket } from "@/websocket/contexts/WebSocketContext";
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
  const { webSocketService, isConnected } = useWebSocket();
  const [localMessages, setLocalMessages] = React.useState<Message[]>([]);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;

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

      const handleConnect = () => {
        if (chatroomId && !isSubscribed) {
          console.log("CHECK subscribe, board.tsx");
          webSocketService.subscribe(chatroomId);
          setIsSubscribed(true);
        }
      };

      webSocketService.onConnect(handleConnect);

      if (isConnected) {
        webSocketService.connect();
      } else {
        if (chatroomId && isSubscribed) {
          webSocketService.unsubscribe(chatroomId);
          setIsSubscribed(false);
        }

        webSocketService.disconnect();
      }

      return () => {
        webSocketService.offMessage();
        webSocketService.offConnect(handleConnect);

        if (chatroomId && isSubscribed) {
          webSocketService.unsubscribe(chatroomId);
          setIsSubscribed(false);
        }

        webSocketService.disconnect();
      };
    }
  }, [webSocketService, chatroomData, chatroomId, isSubscribed, isConnected]);

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

      <InputSection onSend={handleSendMessage} />
    </Box>
  );
};

export default Chatroom;
