import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export type BooleanRadioGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: ReactNode;
  trueLabel?: ReactNode;
  falseLabel?: ReactNode;
  error?: boolean;
  helperText?: ReactNode;
};

export const BooleanRadioGroup = <T extends FieldValues>({
  control,
  name,
  label,
  trueLabel = "是",
  falseLabel = "否",
  error,
  helperText,
}: BooleanRadioGroupProps<T>) => {
  const {
    field: { onChange, ...field },
  } = useController({ control, name });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value === "true");
  };

  return (
    <FormControl error={error}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row onChange={handleChange} {...field}>
        <FormControlLabel control={<Radio />} label={trueLabel} value="true" />
        <FormControlLabel
          control={<Radio />}
          label={falseLabel}
          value="false"
        />
      </RadioGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};

export default BooleanRadioGroup;
