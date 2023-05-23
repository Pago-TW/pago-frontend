import { useCountryCity } from "@/hooks/api/useCountryCity";
import type { CountryOption } from "@/types/misc";
import { extractCountries } from "@/utils/extractCountriesCities";
import type {
  AutocompleteProps,
  InputLabelProps,
  TextFieldProps,
} from "@mui/material";
import { Autocomplete, TextField, createFilterOptions } from "@mui/material";
import { useMemo } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";

export type CountrySelectProps<T extends FieldValues> = UseControllerProps<T> &
  Pick<
    AutocompleteProps<string, false, false, false>,
    "fullWidth" | "disabled"
  > &
  Pick<TextFieldProps, "label" | "placeholder"> &
  Pick<InputLabelProps, "shrink">;

const filterOptions = createFilterOptions<CountryOption>({
  stringify: (option) =>
    `${option.countryCode} ${option.chineseName} ${option.englishName}`,
});

export const CountrySelect = <T extends FieldValues>({
  fullWidth,
  label,
  placeholder,
  shrink,
  disabled,
  ...controllerProps
}: CountrySelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController(controllerProps);

  const { data: options = [], isFetching } = useCountryCity();
  const countries = useMemo(
    () => Object.values(extractCountries(options)),
    [options]
  );

  const selected = countries.find(
    (country) => country.countryCode === field.value
  );

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      blurOnSelect
      clearOnBlur
      onChange={(_event, value) => field.onChange(value?.countryCode)}
      value={selected || null}
      loading={isFetching}
      loadingText="Loading..."
      noOptionsText="There's no country matched your search :("
      fullWidth={fullWidth}
      disabled={disabled}
      ListboxProps={{ sx: { py: 0 } }}
      options={countries}
      filterOptions={filterOptions}
      getOptionLabel={(country) => country.chineseName}
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
