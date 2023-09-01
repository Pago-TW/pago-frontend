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

import { useBankBranches } from "@/hooks/api/useBankBranches";
import type { Bank, BankBranch } from "@/types/bank";

export interface BankBranchSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  fullWidth?: AutocompleteProps<string, false, false, false>["fullWidth"];
  label?: TextFieldProps["label"];
  placeholder?: TextFieldProps["placeholder"];
  shrink?: InputLabelProps["shrink"];
  disabled?: boolean;
  bankCity: string;
  bankCode: Bank["bankCode"];
}

const filterOptions = createFilterOptions<BankBranch>({
  stringify: (option) => `${option.bankCode} ${option.branchName}`,
});

export const BankBranchSelect = <T extends FieldValues>({
  control,
  name,
  fullWidth,
  label,
  placeholder,
  shrink,
  disabled,
  bankCity,
  bankCode,
}: BankBranchSelectProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const { data: options = [], isFetching } = useBankBranches(
    { administrativeDivision: bankCity, bankCode },
    { enabled: !disabled }
  );

  const value =
    options.find((option) => option.branchCode === field.value) ?? null;

  return (
    <Autocomplete
      autoComplete
      autoHighlight
      blurOnSelect
      clearOnBlur
      onChange={(_event, value) => field.onChange(value?.branchCode)}
      value={value}
      loading={isFetching}
      loadingText="Loading..."
      noOptionsText="There's no bank matched your search :("
      fullWidth={fullWidth}
      disabled={disabled}
      ListboxProps={{ sx: { py: 0 } }}
      options={options}
      getOptionLabel={(option) => option.branchName}
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
