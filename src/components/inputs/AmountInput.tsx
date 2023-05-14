import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import type { TextFieldProps } from "@mui/material";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import type { PropsWithChildren } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";
import type {
  NumberFormatValues,
  NumericFormatProps,
} from "react-number-format";
import { NumericFormat } from "react-number-format";

type AmountButtonProps = PropsWithChildren<{
  onClick: () => void;
}>;

const AmountButton = ({ children, onClick }: AmountButtonProps) => (
  <Button
    variant="outlined"
    size="small"
    sx={{ minWidth: "fit-content", px: 2 }}
    onClick={onClick}
  >
    {children}
  </Button>
);

export type AmountInputProps<T extends FieldValues> =
  NumericFormatProps<TextFieldProps> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
  };

const commonIconButtonSx = {
  p: 0,
  position: "absolute",
  bottom: 5,
  zIndex: 1,
};

export const AmountInput = <T extends FieldValues>(
  props: AmountInputProps<T>
) => {
  const {
    control,
    name,
    label,
    allowNegative = false,
    customInput = TextField,
    decimalScale = 0,
    variant = "standard",
    ...rest
  } = props;

  const {
    field: { onChange, value, ref, ...field },
  } = useController({ control, name });

  const handleValueChange = (values: NumberFormatValues) => {
    onChange(values.floatValue);
  };

  const handleClick = (v: number) => {
    const newValue = value + v;
    onChange(newValue < 0 && !allowNegative ? 0 : newValue);
  };

  return (
    <div>
      <Box width="100%" position="relative">
        <NumericFormat
          allowNegative={allowNegative}
          customInput={customInput}
          decimalScale={decimalScale}
          variant={variant}
          label={label}
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{
            startAdornment: (
              <IconButton
                sx={{ ...commonIconButtonSx, left: 0 }}
                onClick={() => handleClick(-1)}
              >
                <RemoveCircleOutline />
              </IconButton>
            ),
            endAdornment: (
              <IconButton
                sx={{ ...commonIconButtonSx, right: 0 }}
                onClick={() => handleClick(1)}
              >
                <AddCircleOutline />
              </IconButton>
            ),
          }}
          sx={{ "& input": { mx: 4 } }}
          onValueChange={handleValueChange}
          value={value}
          inputRef={ref}
          {...field}
          {...rest}
        />
      </Box>
      <Stack direction="row" spacing={1} mt={1}>
        <AmountButton onClick={() => handleClick(1)}>+1</AmountButton>
        <AmountButton onClick={() => handleClick(10)}>+10</AmountButton>
        <AmountButton onClick={() => handleClick(100)}>+100</AmountButton>
      </Stack>
    </div>
  );
};
