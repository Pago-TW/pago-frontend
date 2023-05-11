// InputSection.tsx
import { AttachFile, Send } from "@mui/icons-material";
import { Box, IconButton, Input } from "@mui/material";
import React, { useState } from "react";

export interface InputSectionProps {
  onFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSend?: (content: string, messageType: "TEXT" | "FILE") => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  onFileUpload,
  onSend,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (onSend) onSend(inputValue, "TEXT");
      setInputValue("");
    }
  };

  const handleSendButtonClick = () => {
    if (onSend) onSend(inputValue, "TEXT");
    setInputValue("");
  };

  return (
    <Box
      component="form"
      onSubmit={(event) => event.preventDefault()}
      sx={{
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 2,
      }}
    >
      <IconButton
        component="label"
        htmlFor="fileUpload"
        sx={{
          width: "50px",
          height: "40px",
          borderRadius: "4px",
        }}
      >
        <AttachFile fontSize="small" />
        <input
          type="file"
          id="fileUpload"
          accept="image/*"
          multiple
          hidden
          onChange={onFileUpload}
        />
      </IconButton>

      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        fullWidth
        sx={{
          mx: 1,
          height: "40px",
          borderRadius: "50px",
          bgcolor: "gray.700",
          color: "black",
          p: 1,
          pl: 2,
        }}
      />

      <IconButton
        onClick={handleSendButtonClick}
        sx={{
          width: "50px",
          height: "40px",
          borderRadius: "4px",
        }}
      >
        <Send fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default InputSection;
