import { Visibility, VisibilityOff } from "@mui/icons-material";
import type { TextFieldProps } from "@mui/material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { forwardRef, useState } from "react";

export const PasswordField = forwardRef<
  HTMLInputElement,
  Omit<TextFieldProps, "type" | "InputProps">
>(function PasswordField({ variant = "outlined", ...rest }, ref) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow((prev) => !prev);

  return (
    <TextField
      type={show ? "text" : "password"}
      variant={variant}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShow}>
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      inputRef={ref}
      {...rest}
    />
  );
});
