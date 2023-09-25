import { useEffect, useRef, useState } from "react";

import { InputLabel, Stack } from "@mui/material";
import { AxiosError } from "axios";
import Countdown, { type CountdownRenderProps } from "react-countdown";
import { useFormContext } from "react-hook-form";

import { OtpInput } from "@/components/inputs/otp-input";
import { Button } from "@/components/ui/button";
import { useRequestOtp } from "@/hooks/api/use-request-otp";
import { calcCountdownDate } from "@/utils/misc";

export const WithdrawOtp = () => {
  const { control, setError } = useFormContext();

  const [countdownDate, setCountdownDate] = useState<Date>(new Date());
  const countdownRef = useRef<Countdown>(null);

  const { mutate: requestOtp } = useRequestOtp();

  useEffect(() => {
    countdownRef.current?.start();
  }, [countdownDate]);

  const handleRequestOtp = () => {
    requestOtp(undefined, {
      onSuccess: (data) => {
        const calculatedDate = calcCountdownDate(data.createDate);
        setCountdownDate(calculatedDate);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          if (error.response?.status === 429) {
            const {
              createDate,
              secondsRemaining,
            }: { createDate: string; secondsRemaining: number } =
              error.response.data;
            if (createDate) {
              const calculatedDate = calcCountdownDate(
                createDate,
                secondsRemaining
              );
              setCountdownDate(calculatedDate);
            } else {
              setError("otpCode", {
                message: "請求次數已超過上限，請明天再試",
              });
            }
          }
        }
      },
    });
  };

  const countdownButtonRenderer = ({
    completed,
    formatted: { minutes, seconds },
  }: CountdownRenderProps) => (
    <Button
      variant="outlined"
      size="small"
      onClick={handleRequestOtp}
      disabled={!completed}
      sx={{
        minWidth: "fit-content",
        px: 2,
        fontSize: (theme) => theme.typography.pxToRem(12),
      }}
    >
      {completed ? "取得驗證碼" : `${minutes}:${seconds}`}
    </Button>
  );

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
        <Countdown
          date={countdownDate}
          ref={countdownRef}
          renderer={countdownButtonRenderer}
        />
      </Stack>
    </div>
  );
};
