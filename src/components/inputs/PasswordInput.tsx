import { forwardRef, useState, type ChangeEvent } from "react";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  type TextFieldProps,
} from "@mui/material";

import { Typography } from "@/components/ui/Typography";

const getStrengthLabel = (strength: number) => {
  switch (strength) {
    case 0:
      return "非常弱";
    case 1:
      return "弱";
    case 2:
      return "中";
    case 3:
      return "強";
    case 4:
      return "非常強";
    default:
      return "錯誤";
  }
};

const getStrengthColor = (strength: number) => {
  switch (strength) {
    case 0:
      return "base.dark";
    case 1:
      return "pagoRed.dark";
    case 2:
      return "pagoYellow.dark";
    case 3:
      return "pago.dark";
    case 4:
      return "pagoGreen.dark";
    default:
      return "pagoRed.dark";
  }
};

export type PasswordInputProps = Omit<TextFieldProps, "type" | "InputProps"> & {
  showStrength?: boolean;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordField(
    {
      variant = "outlined",
      onChange,
      helperText,
      error,
      showStrength,
      ...rest
    },
    ref
  ) {
    const [strength, setStrength] = useState(0);
    const [show, setShow] = useState(false);

    const handleShow = () => setShow((prev) => !prev);
    const handleChange = async (evt: ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(evt);

      const zxcvbn = (await import("zxcvbn")).default;
      const strengthScore = zxcvbn(evt.target.value).score;
      setStrength(strengthScore);
    };

    const label = getStrengthLabel(strength);
    const color = getStrengthColor(strength);

    return (
      <Stack spacing={1}>
        <TextField
          type={show ? "text" : "password"}
          variant={variant}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShow}>
                  {show ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handleChange}
          error={error}
          inputRef={ref}
          {...rest}
        />
        <div>
          {showStrength && (
            <LinearProgress
              variant="determinate"
              value={strength * 25}
              sx={{
                flexGrow: 1,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: color,
                  transition: (theme) =>
                    theme.transitions.create(
                      ["background-color", "transform"],
                      {
                        duration: 300,
                      }
                    ),
                },
              }}
            />
          )}
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6" as="p" color="error">
              {helperText}
            </Typography>
            {showStrength && (
              <Typography variant="h6" as="span" color={color}>
                {label}
              </Typography>
            )}
          </Box>
        </div>
      </Stack>
    );
  }
);
