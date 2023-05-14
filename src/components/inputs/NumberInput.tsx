import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";
import type {
  NumberFormatValues,
  NumericFormatProps,
} from "react-number-format";
import { NumericFormat } from "react-number-format";

export type NumberInputProps<T extends FieldValues> =
  NumericFormatProps<TextFieldProps> & {
    control: Control<T>;
    name: Path<T>;
  };

export const NumberInput = <T extends FieldValues>(
  props: NumberInputProps<T>
) => {
  const {
    control,
    name,
    allowNegative = false,
    customInput = TextField,
    decimalScale = 0,
    variant = "standard",
    ...rest
  } = props;

  const {
    field: { onChange, ref, ...field },
  } = useController({ control, name });

  const handleValueChange = (values: NumberFormatValues) => {
    onChange(values.floatValue || "");
  };

  return (
    <NumericFormat
      allowNegative={allowNegative}
      customInput={customInput}
      decimalScale={decimalScale}
      variant={variant}
      onValueChange={handleValueChange}
      inputRef={ref}
      {...field}
      {...rest}
    />
  );
};
