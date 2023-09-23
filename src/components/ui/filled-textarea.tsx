import { forwardRef } from "react";

import { FilledInput, type FilledInputProps } from "@mui/material";

export type FilledTextareaProps = Omit<FilledInputProps, "multiline">;

export const FilledTextarea = forwardRef<HTMLInputElement, FilledTextareaProps>(
  function FilledTextarea(
    {
      minRows = 4,
      maxRows = 10,
      fullWidth = true,
      disableUnderline = true,
      sx,
      ...rest
    },
    ref
  ) {
    return (
      <FilledInput
        multiline
        fullWidth={fullWidth}
        minRows={minRows}
        maxRows={maxRows}
        disableUnderline={disableUnderline}
        ref={ref}
        // Root padding cannot be overridden even with `styled`, so I use sx instead
        sx={{
          p: 1,
          color: "base.900",
          backgroundColor: "base.50",
          "& .MuiInputBase-input::placeholder": {
            opacity: 0.5,
          },
          ...sx,
        }}
        {...rest}
      />
    );
  }
);

export default FilledTextarea;
