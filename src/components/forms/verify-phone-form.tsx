import { useEffect, useRef, useState, type ChangeEvent } from "react";
import dynamic from "next/dynamic";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "@mui/icons-material";
import { Stack, styled } from "@mui/material";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Countdown, { type CountdownRenderProps } from "react-countdown";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PhoneInput, phoneSchema } from "@/components/inputs/phone-input";
import { Button } from "@/components/ui/button";
import { useAddBankAccFormContext } from "@/contexts/add-bank-acc-form-context";
import { useRequestPhoneVerificationOtp } from "@/hooks/api/use-request-phone-verification-otp";
import { useVerifyPhone } from "@/hooks/api/use-verify-phone";
import { parse } from "@/utils/date";

const OtpInput = dynamic(
  () => import("@/components/inputs/otp-input").then((mod) => mod.OtpInput),
  { ssr: false }
);

export const phoneVerifyFormSchema = z.object({
  phone: phoneSchema,
  otpCode: z.string().regex(/\d{6}/, { message: "無效的驗證碼" }),
});

export type PhoneVerifyFormValues = z.infer<typeof phoneVerifyFormSchema>;

const VerifiedIcon = styled(CheckCircle)(({ theme }) => ({
  color: theme.palette.pagoGreen.main,
}));

const calcCountdownDate = (createDate: string, deltaInSeconds = 180): Date => {
  const date = parse(createDate);
  return date.add(deltaInSeconds, "seconds").toDate();
};

export const VerifyPhoneForm = () => {
  const { data: session } = useSession();
  const isVerified = session?.user?.verified;

  const { form, setForm } = useAddBankAccFormContext();

  const [countdownDate, setCountdownDate] = useState<Date>(
    form.data.verifyPhone.countdownDate
  );
  const countdownRef = useRef<Countdown>(null);

  const { control, getValues, setError } = useForm({
    mode: "onBlur",
    defaultValues: form.data.verifyPhone,
    resolver: zodResolver(phoneVerifyFormSchema),
  });

  const { mutate: requestPhoneVerificationOtp, isLoading: isRequesting } =
    useRequestPhoneVerificationOtp();
  const { mutate: verifyPhone, isLoading: isVerifying } = useVerifyPhone();

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
            InputProps={{
              label: "手機號碼",
              variant: "standard",
              InputLabelProps: { shrink: true },
              fullWidth: true,
              disabled: isVerified,
            }}
            control={control}
            name="phone"
            rules={{
              onChange: (e: ChangeEvent<HTMLInputElement>) =>
                setForm((draft) => {
                  draft.data.verifyPhone.phone = e.target.value;
                }),
            }}
          />
          {isVerified ? (
            <VerifiedIcon />
          ) : (
            <Button
              variant="outlined"
              size="small"
              loading={isRequesting}
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
          InputProps={{
            label: "手機號碼",
            variant: "standard",
            InputLabelProps: { shrink: true },
            fullWidth: true,
            disabled: true,
          }}
          control={control}
          name="phone"
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

    requestPhoneVerificationOtp(
      { phone },
      {
        onSuccess: (data) => {
          const calculatedDate = calcCountdownDate(data.createDate);
          setForm((draft) => {
            draft.data.verifyPhone.countdownDate = calculatedDate;
          });
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
                setForm((draft) => {
                  draft.data.verifyPhone.countdownDate = calculatedDate;
                });
                setCountdownDate(calculatedDate);
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
    verifyPhone(data);
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
              // @ts-expect-error Type 'Control<{ phone: string; otpCode: string; countdownDate: Date; }, any>' is not assignable to type 'Control<FieldValues>'.
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
