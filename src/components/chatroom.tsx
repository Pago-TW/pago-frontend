import { useEffect, useState, type ChangeEvent } from "react";

import { Box, Skeleton } from "@mui/material";
import { useSession } from "next-auth/react";

import Header from "@/components/header";
import InputSection from "@/components/input-section";
import MessageBoard from "@/components/message-board";
import { useWebSocket } from "@/contexts/web-socket-context";
import { useChatroom } from "@/hooks/api/use-chatroom";
import useChatroomMessages from "@/hooks/api/use-chatroom-messages";
import { useChatroomStore } from "@/store/ui/use-chatroom-store";
import type { Message, SendMessageRequest } from "@/types/message";
import { flattenInfinitePaginatedData } from "@/utils/api";
import { formatTime } from "@/utils/date";

type MessageState = Omit<Message, "senderId" | "chatroomId"> & {
  isSender: boolean;
};

interface ChatroomProps {
  chatWith: string;
}

const transformMessage = ({
  message,
  userId,
}: {
  message: Message;
  userId?: string;
}) => {
  const { senderName, content, sendDate, senderId, messageType } = message;

  const isSender = senderId === userId;
  return {
    senderName,
    content,
    isSender,
    messageType,
    sendDate: formatTime(sendDate),
  } satisfies MessageState;
};

export const Chatroom: React.FC<ChatroomProps> = ({ chatWith }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [localMessages, setLocalMessages] = useState<MessageState[]>([]);

  const clearChatWith = useChatroomStore((state) => state.clearChatWith);

  const { data: chatroomData, isLoading: isChatroomLoading } =
    useChatroom(chatWith);

  const chatroomId = chatroomData?.chatroomId;
  const { data: messagesData, isLoading: isMessagesLoading } =
    useChatroomMessages(chatroomId ?? "");

  const { webSocketService, sendFileMessage } = useWebSocket();

  useEffect(() => {
    if (webSocketService) {
      const handleMessage = (message: Message) => {
        setLocalMessages((prevMessages) => [
          ...prevMessages,
          transformMessage({ message, userId }),
        ]);
      };
      webSocketService.onMessage(handleMessage);
      return () => webSocketService.offMessage(handleMessage);
    }
  }, [userId, webSocketService]);

  useEffect(() => {
    if (!chatWith) setLocalMessages([]);
  }, [chatWith]);

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
      if (sendFileMessage) await sendFileMessage(files);
      scrollToBottom();
    }
  };

  const messages = [
    ...flattenInfinitePaginatedData(messagesData).map((message) =>
      transformMessage({ message, userId })
    ),
    ...localMessages,
  ];

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
              chatroomData?.otherUser?.fullName ?? (
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
          title={chatroomData?.otherUser?.fullName ?? ""}
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
