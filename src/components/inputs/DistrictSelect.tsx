import {
  Autocomplete,
  createFilterOptions,
  TextField,
  type AutocompleteProps,
  type InputLabelProps,
  type TextFieldProps,
} from "@mui/material";
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { useDistricts } from "@/hooks/api/useDistricts";
import type { District } from "@/types/bank";

export type DistrictSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Pick<
    AutocompleteProps<string, false, false, false>,
    "fullWidth" | "disabled"
  > &
  Pick<TextFieldProps, "label" | "placeholder"> &
  Pick<InputLabelProps, "shrink"> & {
    city?: string;
  };

const filterOptions = createFilterOptions<District>({
  stringify: (option) =>
    `${option.zipCode} ${option.districtChineseName} ${option.districtEnglishName}`,
});

export const DistrictSelect = <T extends FieldValues>({
  fullWidth,
  label,
  placeholder,
  shrink,
  disabled,
  city,
  ...controllerProps
}: DistrictSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  const { data: options = [], isFetching } = useDistricts(
    { administrativeDivision: city },
    { enabled: !disabled }
  );
  const districts = options[0]?.districtList ?? [];
  const value =
    districts.find((district) => district.zipCode === field.value) ?? null;

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      blurOnSelect
      clearOnBlur
      onChange={(_event, value) => {
        field.onChange(value?.zipCode);
      }}
      value={value}
      loading={isFetching}
      loadingText="Loading..."
      noOptionsText="There's no city matched your search :("
      ListboxProps={{ sx: { py: 0 } }}
      fullWidth={fullWidth}
      disabled={disabled}
      options={districts}
      getOptionLabel={(option) => option?.districtChineseName || ""}
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
