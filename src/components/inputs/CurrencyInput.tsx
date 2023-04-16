import { MenuItem } from "@mui/material";
import type { FieldValues } from "react-hook-form";
import type { SelectInputProps } from "./SelectInput";
import { SelectInput } from "./SelectInput";

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

export type CurrencyInputProps<T extends FieldValues> = Omit<
  SelectInputProps<T>,
  "options"
>;

export const CurrencyInput = <T extends FieldValues>(
  props: CurrencyInputProps<T>
) => {
  return (
    <SelectInput {...props}>
      {CURRENCY_OPTIONS.map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </SelectInput>
  );
};

export default CurrencyInput;
