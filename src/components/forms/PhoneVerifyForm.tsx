import { useSendSns } from "@/hooks/api/useSendSns";
import { useVerifyOtp } from "@/hooks/api/useVerifyOtp";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "@mui/icons-material";
import { Stack, styled } from "@mui/material";
import { AxiosError } from "axios";
import { addSeconds, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import type { CountdownRenderProps } from "react-countdown";
import Countdown from "react-countdown";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { OtpInput } from "../inputs/OtpInput";
import { PhoneInput, phoneSchema } from "../inputs/PhoneInput";
import { Button } from "../ui/Button";

export const phoneVerifyFormSchema = z.object({
  phone: phoneSchema,
  otpCode: z.string().regex(/\d{6}/, { message: "無效的驗證碼" }),
});

export type PhoneVerifyFormValues = z.infer<typeof phoneVerifyFormSchema>;

const DEFAULT_VALUES: PhoneVerifyFormValues = {
  phone: "",
  otpCode: "",
};

const VerifiedIcon = styled(CheckCircle)(({ theme }) => ({
  color: theme.palette.pagoGreen.main,
}));

const calcCountdownDate = (createDate: string, deltaInSeconds = 180) => {
  const date = parseISO(createDate);
  return addSeconds(date, deltaInSeconds);
};

export const PhoneVerifyForm = () => {
  const { data: session } = useSession();
  const isVerified = session?.user?.verified;

  const [countdownDate, setCountdownDate] = useState<Date>(new Date());
  const countdownRef = useRef<Countdown>(null);

  const { register, control, getValues, watch, setError } = useForm({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(phoneVerifyFormSchema),
    values: {
      phone: session?.user?.phone ?? "",
      otpCode: "",
    },
  });

  const { mutate: sendSns, isLoading: isSending } = useSendSns();
  const { mutate: verifyOtp, isLoading: isVerifying } = useVerifyOtp();

  useEffect(() => {
    countdownRef.current?.start();
  }, [countdownDate]);

  const countdownButtonRenderer = ({
    completed,
    formatted,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <Stack direction="row" spacing={1} alignItems="end">
          <PhoneInput
            label="手機號碼"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled={!!session?.user?.phone}
            value={watch("phone")}
            {...register("phone", {
              setValueAs: (value) => value?.replace(/\s/g, ""),
            })}
          />
          {isVerified ? (
            <VerifiedIcon />
          ) : (
            <Button
              variant="outlined"
              size="small"
              loading={isSending}
              disabled={isVerified}
              onClick={handleSendVerificationCode}
            >
              發送驗證碼
            </Button>
          )}
        </Stack>
      );
    }
    return (
      <Stack direction="row" spacing={1} alignItems="end">
        <PhoneInput
          label="手機號碼"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          disabled
          value={getValues("phone")}
        />
        {isVerified ? (
          <VerifiedIcon />
        ) : (
          <Button variant="outlined" size="small" disabled>
            {formatted.minutes}:{formatted.seconds}
          </Button>
        )}
      </Stack>
    );
  };

  const handleSendVerificationCode = () => {
    const phone = getValues("phone");
    const isPhoneValid = phoneSchema.safeParse(phone).success;

    if (!isPhoneValid) return;

    sendSns(
      { phone },
      {
        onSuccess: (data) => {
          setCountdownDate(calcCountdownDate(data.createDate));
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            if (error.response?.status === 429) {
              const { createDate, secondsRemaining } = error.response.data;
              if (createDate) {
                setCountdownDate(
                  calcCountdownDate(createDate, secondsRemaining)
                );
              } else {
                setError("phone", {
                  message: "請求次數已超過上限，請明天再試",
                });
              }
            }
          }
        },
      }
    );
  };

  const handleVerifyOtp = () => {
    const data = getValues();
    verifyOtp(data);
  };

  return (
    <Stack spacing={3}>
      <Countdown
        date={countdownDate}
        ref={countdownRef}
        renderer={countdownButtonRenderer}
      />
      {!isVerified && (
        <Stack direction="row" spacing={1} alignItems="end">
          <fieldset
            disabled={isVerified}
            style={{ padding: 0, margin: 0, border: 0 }}
          >
            <OtpInput
              control={control}
              name="otpCode"
              InputProps={{
                gap: { xs: 0.5, sm: 1 },
                length: 6,
                TextFieldsProps: { size: "small" },
                validateChar: (char) => char === "" || /\d/.test(char),
                onComplete: handleVerifyOtp,
              }}
            />
          </fieldset>
          <Button
            variant="outlined"
            size="small"
            loading={isVerifying}
            disabled={isVerified}
            onClick={handleVerifyOtp}
          >
            驗證
          </Button>
        </Stack>
      )}
    </Stack>
  );
};
