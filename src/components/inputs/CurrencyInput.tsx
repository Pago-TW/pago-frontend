import type { FormControlProps } from "@mui/material";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { ReactNode } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export const CURRENCY_OPTIONS = [
  "TWD",
  "USD",
  "JPY",
  "HKD",
  "CNY",
  "EUR",
  "KRW",
] as const;

export type Currency = (typeof CURRENCY_OPTIONS)[number];

export type CurrencyInputProps<T extends FieldValues> = FormControlProps & {
  control: Control<T>;
  name: Path<T>;
  label: ReactNode;
  helperText?: ReactNode;
};

export const CurrencyInput = <T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  ...formControlProps
}: CurrencyInputProps<T>) => {
  const { field } = useController({ control, name });

  return (
    <FormControl {...formControlProps}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...field}>
        {CURRENCY_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default CurrencyInput;
