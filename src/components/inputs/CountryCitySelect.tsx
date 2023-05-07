import { useCountryCity } from "@/hooks/api/useCountryCity";
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
import { useEffect, useMemo, useState } from "react";
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
  fullWidth?: boolean;
  menuMaxHeight?: number;
  noInputLabelOnShrink?: boolean;
  includeAny?: boolean;
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
    fullWidth = true,
    menuMaxHeight = 300,
    noInputLabelOnShrink: noLabelOnShrink,
    includeAny,
  } = props;

  const {
    field: { value: fieldValue, onChange, ...field },
    fieldState: { error },
  } = useController({ name, control });

  const [value, setValue] = useState("");

  const { data: options = [] } = useCountryCity({ includeAny });

  const transformedOptions = useMemo(
    () => options.map((opt) => ({ id: getItemValue(opt), value: opt })),
    [options]
  );

  useEffect(() => {
    if (transformedOptions.length === 0) return;
    if (!fieldValue || !fieldValue.countryCode || !fieldValue.cityCode) return;
    setValue(`${fieldValue.countryCode}-${fieldValue.cityCode}`);
  }, [transformedOptions, fieldValue]);

  const handleChange = (e: SelectChangeEvent) => {
    {
      const selected = transformedOptions.find(
        (opt) => e.target.value === opt.id
      );
      if (selected === undefined) return;

      const {
        country: { countryCode },
        city: { cityCode },
      } = selected.value;

      onChange({ countryCode, cityCode });
      setValue(e.target.value);
    }
  };

  const inputLabelSx = noLabelOnShrink
    ? { "&.MuiInputLabel-shrink": { display: "none" } }
    : undefined;
  const selectLabel = noLabelOnShrink ? undefined : label;

  return (
    <FormControl error={!!error} fullWidth={fullWidth}>
      <InputLabel sx={inputLabelSx}>{label}</InputLabel>
      <Select
        label={selectLabel}
        MenuProps={{ sx: { maxHeight: menuMaxHeight } }}
        onChange={handleChange}
        value={value}
        {...field}
      >
        {transformedOptions.map((opt, idx) => {
          const { country, city } = opt.value;

          const { countryCode } = country;
          const Flag = hasFlag(countryCode)
            ? Flags[countryCode as FlagKeys]
            : null;

          const isEven = idx % 2 === 0;

          return (
            <MenuItem
              key={opt.id}
              value={opt.id}
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
