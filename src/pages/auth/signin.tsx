import { PasswordInput } from "@/components/inputs/PasswordInput";
import { CenterLayout } from "@/components/layouts/CenterLayout";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SlideProps } from "@mui/material";
import { Box, Slide, Stack, TextField } from "@mui/material";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";

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

const SlideRightTransition = (props: SlideProps) => {
  return <Slide {...props} direction="right" />;
};

const SignInPage: NextPage = () => {
  const router = useRouter();
  const callbackUrl = (router.query.callbackUrl as string) ?? "/";

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
        email: data.email,
        password: data.password,
        callbackUrl,
        redirect: false,
      });

      if (res?.error) {
        enqueueSnackbar(res?.error, {
          variant: "error",
          TransitionComponent: SlideRightTransition,
        });
      }
    },
    [callbackUrl, enqueueSnackbar]
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
