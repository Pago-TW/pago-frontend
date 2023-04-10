import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import { forwardRef } from "react";
import type { NumericFormatProps } from "react-number-format";
import { NumericFormat } from "react-number-format";

export type NumberInputProps = NumericFormatProps<TextFieldProps>;

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(props, ref) {
    const {
      allowNegative = false,
      customInput = TextField,
      decimalScale = 0,
      variant = "standard",
      ...rest
    } = props;

    return (
      <NumericFormat
        allowNegative={allowNegative}
        customInput={customInput}
        decimalScale={decimalScale}
        variant={variant}
        inputRef={ref}
        {...rest}
      />
    );
  }
);

export default NumberInput;
