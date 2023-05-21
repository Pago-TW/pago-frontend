import { Place } from "@mui/icons-material";
import type { TextFieldProps } from "@mui/material";
import { Box, TextField } from "@mui/material";
import { forwardRef } from "react";

export type PlaceInputProps = TextFieldProps;

export const PlaceInput = forwardRef<HTMLInputElement, PlaceInputProps>(
  function PlaceInput(
    { variant = "standard", fullWidth = true, InputLabelProps, ...rest },
    ref
  ) {
    return (
      <Box sx={{ position: "relative" }}>
        <TextField
          variant={variant}
          fullWidth={fullWidth}
          InputProps={{ endAdornment: <Place /> }}
          InputLabelProps={{ shrink: true, ...InputLabelProps }}
          inputRef={ref}
          {...rest}
        />
        {/* <Place sx={{ p: 0, position: "absolute", right: 0, bottom: 5 }} /> */}
      </Box>
    );
  }
);
