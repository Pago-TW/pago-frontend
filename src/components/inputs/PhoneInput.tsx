import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import { forwardRef, type FC } from "react";
import type { PatternFormatProps } from "react-number-format";
import { PatternFormat } from "react-number-format";

export type PhoneInputProps = Omit<
  PatternFormatProps<TextFieldProps>,
  "format" | "allowEmptyFormatting"
>;

export const PhoneInput: FC<PhoneInputProps> = forwardRef<
  HTMLInputElement,
  PhoneInputProps
>(function PhoneInput(
  { customInput = TextField, variant = "outlined", ...rest },
  ref
) {
  return (
    <PatternFormat
      type="tel"
      format="09########"
      allowEmptyFormatting
      customInput={customInput}
      variant={variant}
      inputRef={ref}
      {...rest}
    />
  );
});