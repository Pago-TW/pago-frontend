/* eslint-disable */

import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
} from "react";

import {
  alpha,
  Autocomplete,
  Box,
  createFilterOptions,
  lighten,
  ListSubheader,
  Stack,
  TextField,
  Typography,
  type TextFieldProps,
} from "@mui/material";
import { hasFlag } from "country-flag-icons";
import Flags from "country-flag-icons/react/3x2";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { VariableSizeList, type ListChildComponentProps } from "react-window";
import { z } from "zod";

import { useCountryCity } from "@/hooks/api/use-country-city";

type FlagKeys = keyof typeof Flags;

export const countryCitySchema = z.object({
  countryCode: z.string().min(2),
  cityCode: z.string().min(3),
});

const Row = ({ data, index, style }: ListChildComponentProps) => {
  const dataSet = data[index];
  const commonInlineStyle = {
    ...style,
    top: style.top as number,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader
        key={dataSet.key}
        component="div"
        style={{
          ...commonInlineStyle,
          lineHeight: `${style.height}px`,
        }}
        sx={{
          color: (theme) => theme.palette.pago.main,
          backgroundColor: (theme) => lighten(theme.palette.pago.light, 0.85),
          userSelect: "none",
        }}
      >
        {dataSet.group}
      </ListSubheader>
    );
  }

  const [itemProps, { country, city }] = dataSet;

  const Flag = hasFlag(country.countryCode)
    ? Flags[country.countryCode as FlagKeys]
    : null;

  return (
    <Box
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.base[50], 0.5),
        "&:hover": {
          backgroundColor: (theme) => alpha(theme.palette.base[100], 0.75),
        },
        "&.Mui-selected": {
          backgroundColor: (theme) => alpha(theme.palette.pago[50], 0.25),
          "&:hover": {
            backgroundColor: (theme) => alpha(theme.palette.pago[100], 0.25),
          },
        },
      }}
      style={commonInlineStyle}
      {...itemProps}
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
};

const OuterElementContext = createContext({});

const OuterElementType = forwardRef<HTMLDivElement>(
  function OuterElementType(props, ref) {
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  }
);

const useResetCache = (dep: unknown) => {
  // Ref for the VariableSizeList element
  const ref = useRef<VariableSizeList>(null);

  useEffect(() => {
    if (ref.current != null) {
      // Reset the cache to force the list re-render since the item size may be changed (autocomplete)
      ref.current.resetAfterIndex(0, true);
    }
  }, [dep]);

  return ref;
};

const ListboxComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>(function ListboxComponent({ children, ...rest }, ref) {
  // Extract header and items from each group (children)
  const itemData: ReactElement[] = [];
  (children as ReactElement[]).forEach(
    (child: ReactElement & { children?: ReactElement[] }) => {
      itemData.push(child, ...(child.children ?? []));
    }
  );
  const itemCount = itemData.length;
  // Height of each option
  const itemSize = 72;
  // Ref for the VariableSizeList element
  const listRef = useResetCache(itemCount);

  // Get the height of each item
  const getChildSize = (child: ReactElement) => {
    // Group label height is different from other options
    if (child.hasOwnProperty("group")) {
      return 32;
    }
    return itemSize;
  };

  const getHeight = () => {
    // If there are more than 4 items, show only 4 items
    if (itemCount > 4) {
      return 4 * itemSize;
    }
    // If there are less than 4 items, calculate the total height
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={rest}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight()}
          width="100%"
          ref={listRef}
          outerElementType={OuterElementType}
          innerElementType="div"
          itemSize={(index) => getChildSize(itemData[index]!)}
          overscanCount={5}
          itemCount={itemCount}
        >
          {(props) => <Row {...props} />}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

export interface CountryCityOption {
  country: { countryCode: string; englishName: string; chineseName: string };
  city: { cityCode: string; englishName: string; chineseName: string };
}

export interface CountryInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: TextFieldProps["label"];
  placeholder?: TextFieldProps["placeholder"];
  fullWidth?: boolean;
  includeAny?: boolean;
}

const filterOptions = createFilterOptions<CountryCityOption>({
  stringify: ({ country, city }) =>
    `${country.chineseName} ${city.chineseName} ${country.englishName} ${city.englishName} ${country.countryCode} ${city.cityCode}`,
});

const countryFlagStyle: CSSProperties = {
  height: 48,
  borderRadius: "0.5rem",
};

export const CountryCitySelect = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  fullWidth = true,
  includeAny,
}: CountryInputProps<T>) => {
  const [inputValue, setInputValue] = useState("");

  const { data: options = [], isFetching } = useCountryCity({ includeAny });

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
          disableListWrap
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
          ListboxProps={{ sx: { py: 0 } }}
          options={options}
          filterOptions={filterOptions}
          getOptionLabel={({ country, city }) =>
            `${country.chineseName} ${city.chineseName}`
          }
          groupBy={({ country }) => country.chineseName}
          ListboxComponent={ListboxComponent}
          renderGroup={(params) => params as unknown as React.ReactNode}
          renderOption={(props, option) => [props, option] as React.ReactNode}
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
