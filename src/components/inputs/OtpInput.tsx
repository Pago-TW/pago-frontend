import {
  MuiOtpInput,
  type MuiOtpInputProps,
} from "mui-one-time-password-input";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

export type OtpInputProps<T extends FieldValues> = UseControllerProps<T> & {
  InputProps: MuiOtpInputProps;
};

export const OtpInput = <T extends FieldValues>({
  InputProps,
  ...controllerProps
}: OtpInputProps<T>) => {
  const { field } = useController(controllerProps);

  return (
    <MuiOtpInput
      {...field}
      {...InputProps}
      TextFieldsProps={{
        ...InputProps?.TextFieldsProps,
        sx: { "& input": { px: 0 }, ...InputProps?.TextFieldsProps?.sx },
      }}
      sx={{
        "& .MuiOtpInput-TextField input:disabled": {
          color: (theme) => theme.palette.base.light,
        },
        "& .MuiOtpInput-TextField fieldset:disabled": {
          borderColor: (theme) => theme.palette.base.light,
        },
        ...InputProps?.sx,
      }}
    />
  );
};
