import React from "react";

import { Box, Typography } from "@mui/material";

interface MessageProps {
  senderName: string;
  content: string;
  sendDate: string;
  isSender: boolean;
  messageType: "TEXT" | "FILE";
}

const Message: React.FC<MessageProps> = ({
  senderName: sender,
  content,
  sendDate: time,
  isSender,
  messageType,
}) => {
  const messageContent =
    messageType === "TEXT" ? (
      <Typography variant="body2" color="black">
        {content}
      </Typography>
    ) : (
      <img
        src={content}
        alt="File"
        style={{
          maxWidth: "100%",
          maxHeight: "300px",
          borderRadius: "4px",
          border: "1px solid #eeeeee",
        }}
      />
    );

  const sentTime = (
    <Typography variant="caption" color="black" mx={1}>
      {time}
    </Typography>
  );
  return (
    <Box>
      {!isSender && (
        <Box
          width="100%"
          display="flex"
          justifyContent={isSender ? "flex-end" : "flex-start"}
        >
          <Typography variant="caption" color="black" mb={1}>
            {sender}
          </Typography>
        </Box>
      )}
      <Box
        display="flex"
        justifyContent={isSender ? "flex-end" : "flex-start"}
        alignItems="flex-end"
        maxWidth="100%"
      >
        {isSender && sentTime}
        {messageType === "TEXT" ? (
          <Box
            maxWidth="70%"
            sx={{
              background: "#c1ccde",
              px: 2,
              py: 1,
              borderRadius: isSender ? "16px 16px 0 16px" : "16px 16px 16px 0",
              wordWrap: "break-word",
            }}
          >
            {messageContent}
          </Box>
        ) : (
          <div style={{ maxWidth: "200px", maxHeight: "100%" }}>
            {messageContent}
          </div>
        )}
        {!isSender && sentTime}
      </Box>
    </Box>
  );
};

export default Message;
