import {
  DatePicker as MuiDatePicker,
  type DatePickerProps as MuiDatePickerProps,
} from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

export type DatePickerProps<T extends FieldValues> =
  MuiDatePickerProps<Dayjs> & {
    control: Control<T>;
    name: Path<T>;
  };

export const DatePicker = <T extends FieldValues>({
  control,
  name,
  onChange,
  ...datePickerProps
}: DatePickerProps<T>) => {
  const {
    field: { onChange: fieldOnChange, ...field },
  } = useController({ control, name });

  return (
    <MuiDatePicker<Dayjs>
      onChange={(date, ctx) => {
        onChange?.(date, ctx);
        fieldOnChange(date);
      }}
      {...datePickerProps}
      {...field}
    />
  );
};

export default DatePicker;
