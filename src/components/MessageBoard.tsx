import React from "react";
import { Box } from "@mui/material";
import Message from "./Message";

interface MessageProps {
  sender: string;
  content: string;
  time: string;
  isSender: boolean;
}

interface MessageBoardProps {
  messages: Array<MessageProps>;
}

const MessageBoard: React.FC<MessageBoardProps> = ({ messages }) => {
  return (
    <Box
      sx={{
        marginTop: "1rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        height: "calc(100vh - 156px)",
        overflowY: "scroll",
        color: "#f5f5f5",
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
            sender={message.sender}
            content={message.content}
            time={message.time}
            isSender={message.isSender}
          />
        </Box>
      ))}
    </Box>
  );
};

export default MessageBoard;
