import { useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PasswordInput } from "@/components/inputs/password-input";
import { PhoneInput } from "@/components/inputs/phone-input";
import { CenterLayout } from "@/components/layouts/center-layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { axios } from "@/libs/axios";

export const signUpFormSchema = z
  .object({
    account: z.string().trim().min(1, { message: "請輸入帳號" }),
    email: z
      .string()
      .min(1, { message: "請輸入電子郵件" })
      .email({ message: "輸入的電子郵件無效" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "請輸入密碼" })
      .min(8, { message: "長度不得小於 8" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s!@#$%^&*]+$/, {
        message: "需至少包含英文字母與數字各一",
      }),
    confirmPassword: z.string().trim().min(1, { message: "請再次輸入密碼" }),
    firstName: z.string().trim().min(1, { message: "請輸入名稱" }),
    lastName: z.string().trim().min(1, { message: "請輸入姓氏" }),
    phone: z
      .string()
      .trim()
      .regex(/^09[0-9]{8}/, { message: "無效的電話號碼" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "輸入的密碼不一致",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const DEFAULT_VALUES: Partial<SignUpFormValues> = {
  account: "",
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  phone: "",
};

const SignUpPage: NextPage = () => {
  const router = useRouter();

  const queryCallbackUrl = router.query.callbackUrl as string | undefined;
  const callbackUrl = queryCallbackUrl?.startsWith("/")
    ? queryCallbackUrl
    : "/";

  const {
    register,
    control,
    formState: { errors, dirtyFields },
    handleSubmit,
    trigger,
  } = useForm<SignUpFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(signUpFormSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = useCallback(
    async (data: SignUpFormValues) => {
      try {
        await axios.post("/auth/register", data);

        void router.replace(callbackUrl);
      } catch (e) {
        enqueueSnackbar("註冊失敗", {
          variant: "error",
        });
      }
    },
    [router, callbackUrl, enqueueSnackbar]
  );

  const handlePasswordCheck = () => {
    if (dirtyFields.confirmPassword) void trigger("confirmPassword");
  };

  return (
    <>
      <Head>
        <title>註冊</title>
      </Head>
      <CenterLayout>
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 400, p: 2 }}>
          <Typography variant="h1" weightPreset="bold" textAlign="center">
            註冊
          </Typography>
          <Stack
            component="form"
            spacing={3}
            onSubmit={handleSubmit(handleSignUp)}
          >
            <TextField
              variant="outlined"
              label="帳號"
              error={!!errors.account}
              helperText={errors.account?.message}
              {...register("account")}
            />
            <PasswordInput
              label="密碼"
              error={!!errors.password || !!errors.confirmPassword}
              helperText={errors.password?.message}
              showStrength
              {...register("password", {
                onBlur: handlePasswordCheck,
              })}
            />
            <PasswordInput
              label="確認密碼"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                onBlur: handlePasswordCheck,
              })}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                variant="outlined"
                label="名"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                {...register("firstName")}
              />
              <TextField
                variant="outlined"
                label="姓"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                {...register("lastName")}
              />
            </Stack>
            <PhoneInput
              InputProps={{ label: "手機電話" }}
              control={control}
              name="phone"
            />
            <TextField
              type="email"
              variant="outlined"
              label="電子信箱"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <Button type="submit">註冊</Button>
          </Stack>
          <Stack>
            <Typography variant="h5" textAlign="center">
              點擊註冊代表您同意Pago的
            </Typography>
            <Typography variant="h5" textAlign="center">
              <Link>會員條款</Link>以及<Link>客戶隱私權條款</Link>
            </Typography>
          </Stack>
          <Typography variant="h6" textAlign="center" color="base.main">
            已經有帳號了嗎？<Link href="/auth/signin">點擊登入</Link>
          </Typography>
        </Stack>
      </CenterLayout>
    </>
  );
};

export default SignUpPage;
