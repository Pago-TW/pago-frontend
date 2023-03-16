import type { FormControlProps, SelectProps } from "@mui/material";
import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import type {
  Control,
  FieldValues,
  Path,
  UseControllerReturn,
} from "react-hook-form";
import { useController } from "react-hook-form";

export type SelectInputProps<T extends FieldValues> = PropsWithChildren<{
  control: Control<T>;
  name: Path<T>;
  label: ReactNode;
  error?: FormControlProps["error"];
  helperText?: ReactNode;
  FormControlProps?: Omit<FormControlProps, "error">;
  SelectProps?: Omit<SelectProps, keyof UseControllerReturn["field"]>;
}>;

export const SelectInput = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  helperText,
  children,
  FormControlProps,
  SelectProps,
}: SelectInputProps<T>) => {
  const { field } = useController({ control, name });

  return (
    <FormControl error={error} {...FormControlProps}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...field} {...SelectProps}>
        {children}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default SelectInput;
