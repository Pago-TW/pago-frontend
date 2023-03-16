import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { FocusEvent } from "react";
import { forwardRef } from "react";

export type NumberInputProps = Omit<TextFieldProps, "type">;

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput({ variant = "standard", sx, ...rest }, ref) {
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
      if (+e.target.value === 0) e.target.select();
    };

    return (
      <TextField
        type="number"
        variant={variant}
        sx={{
          "& input[type=number]::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            WebkitAppearance: "none",
            margin: 0,
          },
          ...sx,
        }}
        onFocus={handleFocus}
        inputRef={ref}
        {...rest}
      />
    );
  }
);

export default NumberInput;
