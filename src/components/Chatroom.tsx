import * as React from "react";
import { Box } from "@mui/material";
import PageTitle from "./PageTitle";
import MessageBoard from "./MessageBoard";
import InputSection from "./InputSection";
import Header from "./Header";

const Chatroom: React.FC = () => {
  const fakeMessages = [
    {
      sender: "John",
      content: "Hey, how are you?",
      time: "10:15 AM",
      isSender: false,
    },
    {
      sender: "Yi Shiun",
      content: "I am fine, thank you!",
      time: "10:17 AM",
      isSender: true,
    },
    {
      sender: "John",
      content: "What are you doing today?",
      time: "10:20 AM",
      isSender: false,
    },
    {
      sender: "Yi Shiun",
      content: "I have some work to do, and later I will go for a walk.",
      time: "10:22 AM",
      isSender: true,
    },
  ];

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
        <Header title="Yi Shiun" onBackButtonClick={() => {}} />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          paddingTop: "56px",
        }}
      >
        <MessageBoard messages={fakeMessages} />
      </Box>

      <InputSection />
    </Box>
  );
};

export default Chatroom;
