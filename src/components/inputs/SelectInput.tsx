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
  label?: ReactNode;
  FormControlProps?: Omit<FormControlProps, "error">;
  SelectProps?: Omit<SelectProps, keyof UseControllerReturn["field"]>;
}>;

export const SelectInput = <T extends FieldValues>({
  control,
  name,
  label,
  children,
  FormControlProps,
  SelectProps,
}: SelectInputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <FormControl error={!!error} {...FormControlProps}>
      {label ? <InputLabel>{label}</InputLabel> : null}
      <Select label={label} {...field} {...SelectProps}>
        {children}
      </Select>
      {!!error ? <FormHelperText>{error?.message}</FormHelperText> : null}
    </FormControl>
  );
};

export default SelectInput;
