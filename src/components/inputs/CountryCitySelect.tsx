import { useCountryCity } from "@/hooks/api/useCountryCity";
import { useOpen } from "@/hooks/useOpen";
import type { TextFieldProps } from "@mui/material";
import {
  Autocomplete,
  Box,
  Stack,
  TextField,
  Typography,
  alpha,
  createFilterOptions,
  lighten,
} from "@mui/material";
import { hasFlag } from "country-flag-icons";
import Flags from "country-flag-icons/react/3x2";
import { useState, type CSSProperties } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import { z } from "zod";

type FlagKeys = keyof typeof Flags;

export const countryCitySchema = z.object({
  countryCode: z.string(),
  cityCode: z.string(),
});

export type CountryCityOption = {
  country: { countryCode: string; englishName: string; chineseName: string };
  city: { cityCode: string; englishName: string; chineseName: string };
};

export type CountryInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: TextFieldProps["label"];
  placeholder?: TextFieldProps["placeholder"];
  fullWidth?: boolean;
  maxHeight?: number;
  includeAny?: boolean;
};

const filterOptions = createFilterOptions<CountryCityOption>({
  stringify: ({ country, city }) =>
    `${country.chineseName} ${city.chineseName} ${country.englishName} ${city.englishName} ${country.countryCode} ${city.cityCode}`,
});

const countryFlagStyle: CSSProperties = {
  width: "5rem",
  borderRadius: "0.5rem",
};

export const CountryCitySelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  fullWidth = true,
  maxHeight = 300,
  includeAny,
}: CountryInputProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const { open, handleOpen, handleClose } = useOpen();

  const { data: options = [], isFetching } = useCountryCity(
    { includeAny },
    { enabled: open }
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          autoComplete
          autoHighlight
          blurOnSelect
          clearOnBlur
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          onChange={(_event, value) => {
            if (value)
              field.onChange({
                countryCode: value.country.countryCode,
                cityCode: value.city.cityCode,
              });
          }}
          inputValue={inputValue}
          onInputChange={(_event, value) => setInputValue(value)}
          loading={isFetching}
          loadingText="Loading..."
          noOptionsText="There's no country/city matched your search :("
          fullWidth={fullWidth}
          ListboxProps={{ sx: { py: 0, maxHeight: maxHeight } }}
          options={options}
          filterOptions={filterOptions}
          groupBy={({ country }) => country.chineseName}
          renderGroup={(params) => (
            <div key={params.key} onClick={() => setInputValue(params.group)}>
              <Box
                sx={{
                  position: "sticky",
                  top: "-1px",
                  padding: (theme) => theme.spacing(0.5, 1.5),
                  color: (theme) => theme.palette.pago.main,
                  backgroundColor: (theme) =>
                    lighten(theme.palette.pago.light, 0.85),
                  userSelect: "none",
                }}
              >
                {params.group}
              </Box>
              <div>{params.children}</div>
            </div>
          )}
          getOptionLabel={({ country, city }) =>
            `${country.chineseName} ${city.chineseName}`
          }
          renderOption={(props, option) => {
            const { country, city } = option;

            const { countryCode } = country;
            const Flag = hasFlag(countryCode)
              ? Flags[countryCode as FlagKeys]
              : null;

            return (
              <Box
                component="li"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.base[50], 0.5),
                  "&:hover": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.base[100], 0.75),
                  },
                  "&.Mui-selected": {
                    backgroundColor: (theme) =>
                      alpha(theme.palette.pago[50], 0.25),
                    "&:hover": {
                      backgroundColor: (theme) =>
                        alpha(theme.palette.pago[100], 0.25),
                    },
                  },
                }}
                {...props}
              >
                <Stack flexGrow={1}>
                  <Typography fontSize={20} component="span">
                    {city.chineseName}
                  </Typography>
                  <Typography fontSize={16} component="span" color="base.500">
                    {country.chineseName}
                  </Typography>
                </Stack>
                {Flag ? <Flag style={countryFlagStyle} /> : null}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              placeholder={placeholder}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              error={!!error}
              helperText={error?.message}
            />
          )}
        />
      )}
    />
  );
};

export default CountryCitySelect;
