import { useCallback } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

import { PasswordInput } from "@/components/inputs/password-input";
import { CenterLayout } from "@/components/layouts/center-layout";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "請輸入電子郵件" })
    .email({ message: "輸入的電子郵件無效" }),
  password: z.string().min(1, { message: "請輸入密碼" }),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

const DEFAULT_VALUES: Partial<SignInFormValues> = {
  email: "",
  password: "",
};

const SignInPage: NextPage = () => {
  const router = useRouter();

  const queryCallbackUrl = router.query.callbackUrl as string | undefined;
  const callbackUrl = queryCallbackUrl?.startsWith("/")
    ? queryCallbackUrl
    : "/";

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignInFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(signInFormSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleGoogleSignIn = useCallback(async () => {
    await signIn("google", {
      callbackUrl,
    });
  }, [callbackUrl]);

  const handleCredentialsSignIn = useCallback(
    async (data: SignInFormValues) => {
      const res = await signIn("credentials", {
        ...data,
        callbackUrl,
        redirect: false,
      });

      if (res?.error) {
        let message;

        if (res.status === 401) {
          if (res.error.includes("ECONNREFUSED")) {
            message = "無法連接到伺服器，請稍後再試";
          } else {
            message = "電子郵件或密碼錯誤";
          }
        } else if (res.status >= 500 && res.status < 600) {
          message = "登入錯誤，請聯繫客服";
        }

        enqueueSnackbar(message, {
          variant: "error",
        });
      } else {
        void router.push(callbackUrl);
      }
    },
    [callbackUrl, enqueueSnackbar, router]
  );

  return (
    <>
      <Head>
        <title>登入</title>
      </Head>
      <CenterLayout>
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 400, p: 2 }}>
          <Typography variant="h1" weightPreset="bold" textAlign="center">
            登入
          </Typography>
          <Button
            variant="outlined"
            startIcon={<FcGoogle />}
            onClick={handleGoogleSignIn}
          >
            使用 Google 繼續
          </Button>
          <Divider>或</Divider>
          <Stack
            component="form"
            spacing={3}
            onSubmit={handleSubmit(handleCredentialsSignIn)}
          >
            <TextField
              variant="outlined"
              label="帳號"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
            />
            <PasswordInput
              label="密碼"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
            />
            <Button type="submit" loading={isSubmitting}>
              登入
            </Button>
          </Stack>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">
              <Link href="/auth/forgot-password">忘記密碼？</Link>
            </Typography>
            <Typography variant="h6">
              還沒有帳號嗎？<Link href="/auth/signup">立即註冊</Link>
            </Typography>
          </Box>
        </Stack>
      </CenterLayout>
    </>
  );
};

export default SignInPage;
