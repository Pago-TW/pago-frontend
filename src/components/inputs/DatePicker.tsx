import type { DatePickerProps as MuiDatePickerProps } from "@mui/x-date-pickers";
import {
  DatePicker as MuiDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";

export type DatePickerProps<T extends FieldValues> =
  MuiDatePickerProps<Date> & {
    control: Control<T>;
    name: Path<T>;
  };

export const DatePicker = <T extends FieldValues>({
  control,
  name,
  ...datePickerProps
}: DatePickerProps<T>) => {
  const { field } = useController({ control, name });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDatePicker {...datePickerProps} {...field} />
    </LocalizationProvider>
  );
};

export default DatePicker;
