import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PasswordInput } from "@/components/inputs/PasswordInput";
import { CenterLayout } from "@/components/layouts/CenterLayout";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import useFetchEmailFromToken from "@/hooks/api/useFetchEmailFromToken";
import { axios } from "@/libs/axios";

export const resetPasswordFormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "請輸入電子郵件" })
      .email({ message: "輸入的電子郵件無效" }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: "請輸入密碼" })
      .min(8, { message: "長度不得小於 8" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s!@#$%^&*]+$/, {
        message: "需至少包含英文字母與數字各一",
      }),
    confirmPassword: z.string().trim().min(1, { message: "請再次輸入密碼" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "輸入的密碼不一致",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;

const ResetPasswordPage: NextPage = () => {
  const router = useRouter();
  const token = router.query.token as string;
  const { data: email } = useFetchEmailFromToken(token);

  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    setValue,
    trigger,
  } = useForm<ResetPasswordFormValues>({
    mode: "onBlur",
    resolver: zodResolver(resetPasswordFormSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handlePasswordReset = useCallback(
    async (data: ResetPasswordFormValues) => {
      setIsButtonDisabled(true);
      try {
        await axios.post(`/auth/reset-password/${token}`, data);
        enqueueSnackbar("密碼重設成功", { variant: "success" });
        void router.push("/auth/signin");
      } catch (e) {
        enqueueSnackbar("密碼重設失敗", { variant: "error" });
        setIsButtonDisabled(false);
      }
    },
    [enqueueSnackbar, router, token]
  );

  const handlePasswordCheck = () => {
    if (dirtyFields.confirmPassword) void trigger("confirmPassword");
  };

  useEffect(() => {
    if (email) {
      setValue("email", email);
    }
  }, [email, setValue]);

  return (
    <>
      <Head>
        <title>重設密碼</title>
      </Head>
      <CenterLayout>
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 400, p: 2 }}>
          <Typography variant="h1" weightPreset="bold" textAlign="center">
            重設密碼
          </Typography>
          <Stack
            component="form"
            spacing={3}
            onSubmit={handleSubmit(handlePasswordReset)}
          >
            <TextField
              type="email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              value={email ?? ""}
              disabled
            />
            <PasswordInput
              label="新密碼"
              error={!!errors.newPassword || !!errors.confirmPassword}
              helperText={errors.newPassword?.message}
              showStrength
              {...register("newPassword", {
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

            <Button disabled={isButtonDisabled} type="submit">
              確認送出
            </Button>
          </Stack>
        </Stack>
      </CenterLayout>
    </>
  );
};

export default ResetPasswordPage;
