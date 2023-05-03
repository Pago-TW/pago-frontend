import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import MessageBoard from "@/components/MessageBoard";
import { useChatroom } from "@/hooks/api/useChatroom";
import useChatroomMessages from "@/hooks/api/useChatroomMessages";
import { useChatroomStore } from "@/store/ui/useChatroomStore";
import type { MessageResponse, SendMessageRequest } from "@/types/message";
import { useWebSocket } from "@/websocket/contexts/WebSocketContext";
import { Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useSession } from "next-auth/react";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

type Message = {
  senderName: string;
  content: string;
  sendDate: string;
  isSender: boolean;
  messageType: "TEXT" | "FILE";
};

type ChatroomProps = {
  chatWith: string;
};

export const Chatroom: React.FC<ChatroomProps> = ({ chatWith }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  const clearChatWith = useChatroomStore((state) => state.clearChatWith);

  const { data: chatroomData, isLoading: isChatroomLoading } =
    useChatroom(chatWith);

  const chatroomId = chatroomData?.chatroomId;
  const { data: messagesData, isLoading: isMessagesLoading } =
    useChatroomMessages(chatroomId || "");

  const { webSocketService, sendFileMessage } = useWebSocket();

  useEffect(() => {
    if (webSocketService) {
      const handleMessage = (message: MessageResponse) => {
        const isSender = message.senderId === chatroomData?.currentLoginUserId;

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
      };

      webSocketService.onMessage(handleMessage);
      return () => {
        webSocketService.offMessage(handleMessage);
      };
    }
  }, [webSocketService, chatroomData, localMessages]);

  const handleBackClick = () => {
    clearChatWith();
  };

  const scrollToBottom = () => {
    const messageBoardElement = document.getElementById("message-board");
    if (messageBoardElement) {
      messageBoardElement.scrollTop = messageBoardElement.scrollHeight;
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      await sendFileMessage(files);
      scrollToBottom();
    }
  };

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
      scrollToBottom();
    }
  };

  if (isChatroomLoading || isMessagesLoading) {
    const skeletonElements = Array.from({ length: 9 }, (_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width="50%"
        sx={{
          marginLeft: "5px",
          fontSize: "2rem",
          borderRadius: "16px 16px 16px 0",
        }}
      />
    ));
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
          <Header
            title={
              chatroomData?.otherUser?.fullName || (
                <Skeleton
                  width={120}
                  height={38}
                  sx={{
                    borderRadius: "16px 16px 16px 16px",
                  }}
                />
              )
            }
            onBackClick={handleBackClick}
          />
        </Box>

        <Box
          display="block"
          justifyContent="flex-end"
          alignItems="end"
          mb={4}
          width="100%"
          sx={{
            paddingTop: "56px",
          }}
        >
          {skeletonElements}
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
          }}
        >
          <InputSection />
        </Box>
      </Box>
    );
  }

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
        <Header
          title={chatroomData?.otherUser?.fullName || ""}
          onBackClick={handleBackClick}
        />
      </Box>

      <Box sx={{ flexGrow: 1, paddingTop: "56px" }}>
        <MessageBoard messages={messages} scrollToBottom={scrollToBottom} />
      </Box>
      <InputSection
        onFileUpload={handleFileUpload}
        onSend={handleSendMessage}
      />
    </Box>
  );
};

export default Chatroom;
