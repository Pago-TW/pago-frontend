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
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { useBanks } from "@/hooks/api/use-banks";
import type { Bank } from "@/types/bank";

export interface BankSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  fullWidth?: AutocompleteProps<string, false, false, false>["fullWidth"];
  label?: TextFieldProps["label"];
  placeholder?: TextFieldProps["placeholder"];
  shrink?: InputLabelProps["shrink"];
}

const filterOptions = createFilterOptions<Bank>({
  stringify: (option) => `${option.bankCode} ${option.name}`,
});

export const BankSelect = <T extends FieldValues>({
  control,
  name,
  fullWidth,
  label,
  placeholder,
  shrink,
}: BankSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const { data: options = [], isFetching } = useBanks();

  const value =
    options.find((option) => option.bankCode === field.value) ?? null;

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      blurOnSelect
      clearOnBlur
      onChange={(_event, value) => field.onChange(value?.bankCode)}
      value={value}
      loading={isFetching}
      loadingText="Loading..."
      noOptionsText="There's no bank matched your search :("
      fullWidth={fullWidth}
      ListboxProps={{ sx: { py: 0 } }}
      options={options}
      getOptionLabel={(option) => option.name}
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
