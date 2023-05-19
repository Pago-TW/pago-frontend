import { PageTitle } from "@/components/PageTitle";
import { BankBranchSelect } from "@/components/inputs/BankBranchSelect";
import { BankSelect } from "@/components/inputs/BankSelect";
import { CitySelect } from "@/components/inputs/CitySelect";
import { DatePicker } from "@/components/inputs/DatePicker";
import { DistrictSelect } from "@/components/inputs/DistrictSelect";
import { PhoneInput, phoneSchema } from "@/components/inputs/PhoneInput";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Button } from "@/components/ui/Button";
import { Paper } from "@/components/ui/Paper";
import { Typography } from "@/components/ui/Typography";
import { useSendSns } from "@/hooks/api/useSendSns";
import { useVerifyOtp } from "@/hooks/api/useVerifyOtp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Stack, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { addSeconds, parseISO } from "date-fns";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import type { CountdownRenderProps } from "react-countdown";
import Countdown from "react-countdown";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UserInfoForm = () => {
  const { register, control, watch, resetField } = useForm();

  const city = watch("city");

  return (
    <form>
      <Stack spacing={3}>
        <TextField
          label="真實姓名"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...register("legalName")}
        />
        <TextField
          label="身分證字號/統一證號/公司統編"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...register("identityNumber")}
        />
        <DatePicker
          label="生日/公司核准設立日期"
          slotProps={{
            textField: {
              fullWidth: true,
              InputLabelProps: { shrink: true },
            },
          }}
          control={control}
          name="birthDate"
        />
        <Stack direction="row" spacing={2}>
          <CitySelect
            label="縣市"
            placeholder="請選擇地區"
            fullWidth
            shrink
            control={control}
            name="city"
            rules={{ onChange: () => resetField("zipCode") }}
          />
          <DistrictSelect
            label="鄉鎮市區"
            placeholder="請選擇地區"
            fullWidth
            shrink
            disabled={!city}
            city={city}
            control={control}
            name="zipCode"
          />
        </Stack>
        <TextField
          label="詳細地址"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...register("residentialAddress")}
        />
        <TextField
          label="郵遞區號"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          disabled
          value={watch("zipCode")}
        />
        <Typography as="p" fontSize={12} color="base.500">
          <em>
            *提醒您，身分證字號/統一編號需與銀行帳號資訊一致，否則可能會影響日後撥款權益
          </em>
        </Typography>
      </Stack>
    </form>
  );
};

const bankInfoSchema = z.object({
  bankCode: z.string(),
  bankCity: z.string(),
  branchCode: z.string(),
  accountHolderName: z.string(),
  accountNumber: z.string(),
  phone: phoneSchema,
  otpCode: z.string(),
});

type BankInfoFormValues = z.infer<typeof bankInfoSchema>;

const DEFAULT_VALUES: BankInfoFormValues = {
  bankCode: "",
  bankCity: "",
  branchCode: "",
  accountHolderName: "",
  accountNumber: "",
  phone: "",
  otpCode: "",
};

const calcCountdownDate = (createDate: string, deltaInSeconds = 180) => {
  const date = parseISO(createDate);
  return addSeconds(date, deltaInSeconds);
};

const BankInfoForm = () => {
  const { data: session } = useSession();

  const [countdownDate, setCountdownDate] = useState<Date>(new Date());
  const countdownRef = useRef<Countdown>(null);

  const { register, control, watch, getValues, setValue, setError } =
    useForm<BankInfoFormValues>({
      mode: "onChange",
      defaultValues: DEFAULT_VALUES,
      resolver: zodResolver(bankInfoSchema),
    });

  const [bankCode, bankCity] = watch(["bankCode", "bankCity"]);

  const { mutate: sendSns } = useSendSns();
  const { mutate: verifyOtp } = useVerifyOtp();

  useEffect(() => {
    countdownRef.current?.start();
  }, [countdownDate]);

  useEffect(() => {
    setValue("phone", session?.user?.phone ?? "");
  }, [session?.user?.phone, setValue]);

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
    const [phone, otpCode] = getValues(["phone", "otpCode"]);
    const isPhoneValid = phoneSchema.safeParse(phone).success;

    if (!isPhoneValid) return;

    verifyOtp({ phone, otpCode });
  };

  const countdownButtonRenderer = ({
    completed,
    formatted,
  }: CountdownRenderProps) => {
    let content;
    if (completed) {
      content = (
        <>
          <PhoneInput
            label="手機號碼"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled={!!session?.user?.phone}
            {...register("phone", {
              setValueAs: (value) => value?.replace(/\s/g, ""),
            })}
          />
          <Button
            variant="outlined"
            size="small"
            disabled={session?.user?.verified}
            onClick={handleSendVerificationCode}
          >
            發送驗證碼
          </Button>
        </>
      );
    } else {
      content = (
        <>
          <PhoneInput
            label="手機號碼"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled
            value={getValues("phone")}
          />
          <Button variant="outlined" size="small" disabled>
            {formatted.minutes}:{formatted.seconds}
          </Button>
        </>
      );
    }
    return (
      <Stack direction="row" spacing={1} alignItems="end">
        {content}
      </Stack>
    );
  };

  return (
    <form>
      <Stack spacing={3}>
        <BankSelect
          placeholder="請選擇銀行"
          fullWidth
          control={control}
          name="bankCode"
        />
        <CitySelect
          placeholder="請選擇地區"
          fullWidth
          control={control}
          name="bankCity"
        />
        <BankBranchSelect
          placeholder="請選擇分行"
          fullWidth
          disabled={!bankCode || !bankCity}
          bankCode={bankCode}
          bankCity={bankCity}
          control={control}
          name="branchCode"
        />
        <TextField
          label="銀行戶名"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...register("accountHolderName")}
        />
        <TextField
          label="銀行帳號"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          {...register("accountNumber")}
        />
        <Stack spacing={3}>
          <Countdown
            date={countdownDate}
            ref={countdownRef}
            renderer={countdownButtonRenderer}
          />
          <Stack direction="row" spacing={1} alignItems="end">
            <TextField
              label="驗證碼"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...register("otpCode")}
            />
            <Button
              variant="outlined"
              size="small"
              disabled={session?.user?.verified}
              onClick={handleVerifyOtp}
            >
              驗證
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
};

export default function UserAddBankAccountPage() {
  return (
    <>
      <Head>
        <title>新增付款方式</title>
      </Head>
      <BaseLayout>
        <PageTitle title="使用者資訊" />
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={3}>
            <Paper sx={{ p: 2, width: "100%" }}>
              <UserInfoForm />
            </Paper>
            <Paper sx={{ p: 2, width: "100%" }}>
              <BankInfoForm />
            </Paper>
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
}
