import { InputLabel, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { OtpInput } from "@/components/inputs/otp-input";
import { Button } from "@/components/ui/button";
import { useRequestOtp } from "@/hooks/api/use-request-otp";

export const WithdrawOtp = () => {
  const { control } = useFormContext();

  const { mutate: requestOtp } = useRequestOtp();

  return (
    <div>
      <InputLabel shrink>驗證碼</InputLabel>
      <Stack direction="row" spacing={1} alignItems="center">
        <OtpInput
          control={control}
          name="otpCode"
          InputProps={{
            gap: { xs: 0.5, sm: 1 },
            length: 6,
            TextFieldsProps: { size: "small" },
            validateChar: (char) => char === "" || /\d/.test(char),
          }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => requestOtp()}
          sx={{
            minWidth: "fit-content",
            px: 2,
            fontSize: (theme) => theme.typography.pxToRem(12),
          }}
        >
          取得驗證碼
        </Button>
      </Stack>
    </div>
  );
};
