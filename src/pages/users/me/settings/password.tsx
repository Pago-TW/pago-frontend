import { SubmitButton } from "@/components/SubmitButton";
import { PasswordInput } from "@/components/inputs/PasswordInput";
import { SettingLayout } from "@/components/layouts/SettingLayout";
import { Typography } from "@/components/ui/Typography";
import { useChangePassword } from "@/hooks/api/useChangePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Paper, Stack, alpha } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { z } from "zod";

const changePasswordFormSchema = z
  .object({
    oldPassword: z.string({ required_error: "請輸入舊密碼" }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: "請輸入新密碼" })
      .min(8, { message: "長度不得小於 8" })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s!@#$%^&*]+$/, {
        message: "需至少包含英文字母與數字各一",
      }),
    confirmNewPassword: z.string({ required_error: "請確認新密碼" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "新密碼與確認新密碼不相符",
    path: ["confirmNewPassword"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordFormSchema>;

const DEFAULT_VALUES: ChangePasswordFormValues = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};

export default function UserPasswordSettingPage() {
  const { data: session } = useSession();

  const {
    register,
    formState: { errors, dirtyFields },
    handleSubmit,
    trigger,
  } = useForm<ChangePasswordFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(changePasswordFormSchema),
  });

  const {
    mutate: changePassword,
    isLoading,
    isSuccess,
    reset,
  } = useChangePassword();

  const handlePasswordCheck = () => {
    if (dirtyFields.confirmNewPassword) trigger("confirmNewPassword");
  };

  const handleFormSubmit = (data: ChangePasswordFormValues) => {
    return changePassword(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      { onSettled: () => setTimeout(() => reset, 2500) }
    );
  };

  const notLocalProvider =
    !!session?.user?.provider && session.user.provider !== "LOCAL";
  const inputDisabled = isLoading || notLocalProvider;

  return (
    <>
      <Head>
        <title>變更密碼</title>
      </Head>
      <SettingLayout>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Paper
            sx={{
              borderRadius: 2.5,
              p: 2,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Stack gap={{ xs: 1, md: 2 }}>
              <PasswordInput
                label="舊密碼"
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
                disabled={inputDisabled}
                {...register("oldPassword")}
              />
              <PasswordInput
                label="新密碼"
                error={
                  !!errors.newPassword ||
                  errors.confirmNewPassword?.type === "custom"
                }
                helperText={errors.newPassword?.message}
                disabled={inputDisabled}
                showStrength
                {...register("newPassword", { onChange: handlePasswordCheck })}
              />
              <PasswordInput
                label="確認新密碼"
                error={!!errors.confirmNewPassword}
                helperText={errors.confirmNewPassword?.message}
                disabled={inputDisabled}
                {...register("confirmNewPassword", {
                  onChange: handlePasswordCheck,
                })}
              />
              <div>
                <Typography
                  variant="h6"
                  as="p"
                  color="base.400"
                  textAlign="center"
                >
                  密碼長度最少8碼，至少需包含英文、數字各一
                </Typography>
                <Typography
                  variant="h6"
                  as="p"
                  color="base.400"
                  textAlign="center"
                >
                  接受英文大小寫、數字、符號
                </Typography>
              </div>
              <SubmitButton
                type="submit"
                size="large"
                loading={isLoading}
                success={isSuccess}
              >
                確認送出
              </SubmitButton>
            </Stack>
            {notLocalProvider && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: (theme) =>
                    alpha(theme.palette.common.white, 0.75),
                  backdropFilter: "blur(2px)",
                  zIndex: 1000,
                  userSelect: "none",
                }}
              >
                <Typography
                  variant="h5"
                  as="p"
                  color="base.500"
                  textAlign="center"
                >
                  很抱歉，第三方平台登入無法變更密碼
                </Typography>
              </Box>
            )}
          </Paper>
        </form>
      </SettingLayout>
    </>
  );
}
