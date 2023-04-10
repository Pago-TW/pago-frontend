import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Stack } from "@mui/material";
import type { ChangeEvent, PropsWithChildren } from "react";
import { useCallback } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { useController } from "react-hook-form";
import type { NumberInputProps } from "./NumberInput";
import { NumberInput } from "./NumberInput";

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

export type AmountInputProps<T extends FieldValues> = NumberInputProps & {
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

export const AmountInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...numberInputProps
}: AmountInputProps<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({ control, name });

  const handleClick = useCallback(
    (v: number) => onChange(value + v),
    [onChange, value]
  );
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange(+e.target.value),
    [onChange]
  );

  return (
    <div>
      <Box width="100%" position="relative">
        <NumberInput
          label={label}
          value={value}
          InputLabelProps={{ shrink: true }}
          onChange={handleChange}
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
          {...numberInputProps}
          {...field}
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
