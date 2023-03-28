import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import type { ChangeEvent } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export type Choice = Readonly<{
  label: string;
  value: string;
}>;

export type RadioGroupInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  choices: Choice[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroupInput = <T extends FieldValues>({
  control,
  name,
  choices,
  onChange,
}: RadioGroupInputProps<T>) => {
  const {
    field: { onChange: onFieldChange, ...field },
    fieldState: { error },
  } = useController({ control, name });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    onFieldChange(e.target.value);
  };

  return (
    <FormControl error={!!error}>
      <RadioGroup onChange={handleChange} {...field}>
        <Stack gap={2}>
          {choices.map((choice) => (
            <FormControlLabel
              key={choice.value}
              control={<Radio />}
              {...choice}
            />
          ))}
        </Stack>
      </RadioGroup>
      {!!error ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
};
