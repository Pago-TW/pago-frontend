import { TextField, type TextFieldProps } from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import { PatternFormat, type PatternFormatProps } from "react-number-format";
import { z } from "zod";

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^09\d{8}$/, { message: "無效的電話號碼" });

export type PhoneInputProps<T extends FieldValues> = UseControllerProps<T> & {
  InputProps: Omit<PatternFormatProps<TextFieldProps>, "type" | "format">;
};

export const PhoneInput = <T extends FieldValues>({
  InputProps: {
    allowEmptyFormatting = true,
    customInput = TextField,
    variant = "outlined",
    ...InputProps
  },
  ...controllerProps
}: PhoneInputProps<T>) => {
  const {
    field: { ref, ...field },
  } = useController(controllerProps);

  return (
    <PatternFormat
      type="tel"
      format="09########"
      allowEmptyFormatting={allowEmptyFormatting}
      customInput={customInput}
      variant={variant}
      inputRef={ref}
      {...field}
      {...InputProps}
    />
  );
};
