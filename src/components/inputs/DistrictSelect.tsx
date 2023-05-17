import { useDistricts } from "@/hooks/api/useDistricts";
import { District } from "@/types/bank";
import type {
  AutocompleteProps,
  InputLabelProps,
  TextFieldProps,
} from "@mui/material";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";

export type DistrictSelectProps<T extends FieldValues> = Pick<
  AutocompleteProps<string, false, false, false>,
  "fullWidth" | "disabled"
> &
  Pick<TextFieldProps, "label" | "placeholder"> &
  Pick<InputLabelProps, "shrink"> & {
    control: Control<T>;
    name: FieldPath<T>;
    city?: string;
  };

const filterOptions = createFilterOptions<District>({
  stringify: (option) =>
    `${option.zipCode} ${option.districtChineseName} ${option.districtEnglishName}`,
});

export const DistrictSelect = <T extends FieldValues>({
  control,
  name,
  fullWidth,
  label,
  placeholder,
  shrink,
  disabled,
  city,
}: DistrictSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const { data: options = [], isFetching } = useDistricts(
    { administrativeDivision: city },
    { enabled: !disabled }
  );
  const districts = options[0]?.districtList || [];

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      blurOnSelect
      clearOnBlur
      onChange={(_event, value) => {
        field.onChange(value?.zipCode);
      }}
      loading={isFetching}
      loadingText="Loading..."
      noOptionsText="There's no city matched your search :("
      ListboxProps={{ sx: { py: 0 } }}
      fullWidth={fullWidth}
      disabled={disabled}
      options={districts}
      getOptionLabel={(option) => option.districtChineseName}
      filterOptions={filterOptions}
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
