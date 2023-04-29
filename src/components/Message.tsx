import React from "react";
import { Box, Typography } from "@mui/material";

interface MessageProps {
  sender: string;
  content: string;
  time: string;
  isSender: boolean;
}

const Message: React.FC<MessageProps> = ({
  sender,
  content,
  time,
  isSender,
}) => {
  return (
    <Box>
      <Box
        width="100%"
        display="flex"
        justifyContent={isSender ? "flex-end" : "flex-start"}
      >
        <Typography variant="caption" color="black" mb={1}>
          {sender}
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent={isSender ? "flex-end" : "flex-start"}
        alignItems="flex-end"
        maxWidth="100%"
      >
        {isSender && (
          <Typography variant="caption" color="black" mr={1}>
            {time}
          </Typography>
        )}
        <Box
          maxWidth="50%"
          sx={{
            background: "#c1ccde",
            px: 2,
            py: 1,
            borderRadius: isSender ? "16px 16px 0 16px" : "16px 16px 16px 0",
          }}
        >
          <Typography variant="body2" color="black">
            {content}
          </Typography>
        </Box>
        {!isSender && (
          <Typography variant="caption" color="black" ml={1}>
            {time}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Message;
