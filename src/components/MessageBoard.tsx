import React, { useEffect, useState } from "react";

import { Box } from "@mui/material";

import Message from "@/components/Message";

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
    <Box
      id="message-board"
      sx={{
        marginTop: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        height: "calc(100vh - 156px)",
        overflowY: "scroll",
        color: "#f5f5f5",
        visibility: isLoaded ? "visible" : "hidden",
      }}
    >
      {messages.map((message, index) => (
        <Box
          display="flex"
          justifyContent={message.isSender ? "flex-end" : "flex-start"}
          alignItems="end"
          mb={2}
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
    </Box>
  );
};

export default MessageBoard;
