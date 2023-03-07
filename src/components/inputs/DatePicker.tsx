import type { TextFieldProps } from "@mui/material";
import { TextField } from "@mui/material";
import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export type DatePickerProps<T extends FieldValues> = Omit<
  TextFieldProps,
  "name"
> & {
  control: Control<T>;
  name: Path<T>;
};

export const DatePicker = <T extends FieldValues>({
  control,
  name,
  ...textFieldProps
}: DatePickerProps<T>) => {
  const { field } = useController({ control, name });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker
        minDate={new Date()}
        renderInput={(params) => <TextField {...textFieldProps} {...params} />}
        {...field}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
