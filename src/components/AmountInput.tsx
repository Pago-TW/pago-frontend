import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import { useCounter } from "react-use";

export const AmountInput = forwardRef(function AmountInput(
  { label }: { label: ReactNode },
  ref
) {
  const [value, { inc, dec, set }] = useCounter(1, 999, 1);

  return (
    <Box>
      <Box width="100%" position="relative">
        <IconButton
          sx={{ p: 0, position: "absolute", left: 0, bottom: 5, zIndex: 1 }}
          onClick={() => dec()}
        >
          <RemoveCircleOutline />
        </IconButton>
        <TextField
          type="number"
          variant="standard"
          value={value}
          onChange={(e) => set(Number(e.target.value))}
          label={label}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{
            "& input[type=number]": { mx: 5 },
            "& input[type=number]::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "& input[type=number]::-webkit-outer-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
          }}
          inputRef={ref}
        />
        <IconButton
          sx={{ p: 0, position: "absolute", right: 0, bottom: 5, zIndex: 1 }}
          onClick={() => inc()}
        >
          <AddCircleOutline />
        </IconButton>
      </Box>
      <Stack direction="row" spacing={1} mt={1}>
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: "fit-content", px: 2 }}
          onClick={() => inc()}
        >
          +1
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: "fit-content", px: 2 }}
          onClick={() => inc(10)}
        >
          +10
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ minWidth: "fit-content", px: 2 }}
          onClick={() => inc(100)}
        >
          +100
        </Button>
      </Stack>
    </Box>
  );
});
