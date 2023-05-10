import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Message from "./Message";

type MessageProps = {
  senderName: string;
  content: string;
  sendDate: string;
  isSender: boolean;
  messageType: "TEXT" | "FILE";
};

type MessageBoardProps = {
  messages: MessageProps[];
  scrollToBottom: () => void;
};

const MessageBoard: React.FC<MessageBoardProps> = ({ messages }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToBottom = () => {
    const messageBoardElement = document.getElementById("message-board");
    if (messageBoardElement) {
      messageBoardElement.scrollTop = messageBoardElement.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    setIsLoaded(true);
  }, [messages]);

  return (
    <Stack
      id="message-board"
      spacing={2}
      sx={{
        pt: 1,
        pb: "72px",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        color: "#f5f5f5",
        visibility: isLoaded ? "visible" : "hidden",
      }}
    >
      {messages.map((message, index) => (
        <Box
          display="flex"
          justifyContent={message.isSender ? "flex-end" : "flex-start"}
          alignItems="end"
          width="100%"
          key={index}
        >
          <Message
            senderName={message.senderName}
            content={message.content}
            sendDate={message.sendDate}
            isSender={message.isSender}
            messageType={message.messageType}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default MessageBoard;
