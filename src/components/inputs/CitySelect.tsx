import { useCities } from "@/hooks/api/useCities";
import type {
  AutocompleteProps,
  InputLabelProps,
  TextFieldProps,
} from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export type CitySelectProps<T extends FieldValues> = UseControllerProps<T> & {
  fullWidth?: AutocompleteProps<string, false, false, false>["fullWidth"];
  label?: TextFieldProps["label"];
  placeholder?: TextFieldProps["placeholder"];
  shrink?: InputLabelProps["shrink"];
};

export const CitySelect = <T extends FieldValues>({
  fullWidth,
  label,
  placeholder,
  shrink,
  ...controllerProps
}: CitySelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  const { data: options = [], isFetching } = useCities();

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      blurOnSelect
      clearOnBlur
      onChange={(_event, value) => field.onChange(value)}
      value={field.value || null}
      loading={isFetching}
      loadingText="Loading..."
      noOptionsText="There's no city matched your search :("
      fullWidth={fullWidth}
      ListboxProps={{ sx: { py: 0 } }}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
          InputLabelProps={{
            ...params.InputLabelProps,
            shrink,
          }}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};
