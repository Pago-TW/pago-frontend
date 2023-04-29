// InputSection.tsx
import React from "react";
import { Box, IconButton, Input, InputAdornment } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";

interface InputSectionProps {
  onFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  onFileUpload,
  onMessageSubmit,
}) => {
  return (
    <Box
      component="form"
      onSubmit={onMessageSubmit}
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
        fullWidth
        sx={{
          mx: 1,
          height: "40px",
          borderRadius: "50px",
          bgcolor: "gray.700",
          color: "white",
          p: 1,
          pl: 2,
        }}
      />

      <IconButton
        type="submit"
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
