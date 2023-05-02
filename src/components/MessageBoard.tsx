import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
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
};

const MessageBoard: React.FC<MessageBoardProps> = ({ messages }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      setIsLoaded(true);
    }
  }, [messages.length]);

  return (
    <Box
      ref={scrollRef}
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
          mb={4}
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
