import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

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
  const {
    field: { onChange: fieldOnChange, ...field },
  } = useController({ control, name });

  return (
    <MuiDatePicker
      {...datePickerProps}
      onChange={(date, ctx) => {
        datePickerProps.onChange?.(date, ctx);
        fieldOnChange(date);
      }}
      {...field}
    />
  );
};

export default DatePicker;
