import type { SelectChangeEvent, SelectProps } from "@mui/material";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import { hasFlag } from "country-flag-icons";
import Flags from "country-flag-icons/react/3x2";
import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import type { Control, Path } from "react-hook-form";
import { useController, type FieldValues } from "react-hook-form";
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
  name: Path<T>;
  label: SelectProps["label"];
  options: CountryCityOption[];
  fullWidth?: boolean;
  menuMaxHeight?: number;
};

const getItemValue = (item: CountryCityOption) =>
  `${item.country.countryCode}-${item.city.cityCode}`;

const countryFlagStyle: CSSProperties = {
  width: "5rem",
  borderRadius: "0.5rem",
};

export const CountryCitySelect = <T extends FieldValues>(
  props: CountryInputProps<T>
) => {
  const {
    control,
    name,
    label,
    options = [],
    fullWidth = true,
    menuMaxHeight = 300,
  } = props;

  const [value, setValue] = useState("");

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const handleChange = useCallback(
    (e: SelectChangeEvent) => {
      {
        const value = e.target.value as string;
        const [countryCode, cityCode] = value.split("-");
        field.onChange({ countryCode, cityCode });
        setValue(value);
      }
    },
    [field]
  );

  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        onChange={handleChange}
        value={value}
        name={field.name}
        ref={field.ref}
        onBlur={field.onBlur}
        MenuProps={{ sx: { maxHeight: menuMaxHeight } }}
      >
        {options.map((opt, idx) => {
          const value = getItemValue(opt);
          const {
            country: { countryCode, ...country },
            city,
          } = opt;

          const Flag = hasFlag(countryCode)
            ? Flags[countryCode as FlagKeys]
            : null;

          const isEven = idx % 2 === 0;

          return (
            <MenuItem
              key={idx}
              value={value}
              sx={{
                backgroundColor: (theme) =>
                  isEven
                    ? alpha(theme.palette.base[100], 0.5)
                    : alpha(theme.palette.base[50], 0.5),
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
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
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
            </MenuItem>
          );
        })}
      </Select>
      {error?.message ? <FormHelperText>{error.message}</FormHelperText> : null}
    </FormControl>
  );
};

export default CountryCitySelect;
