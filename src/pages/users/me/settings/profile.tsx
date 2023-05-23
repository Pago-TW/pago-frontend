import { SubmitButton } from "@/components/SubmitButton";
import { CountrySelect } from "@/components/inputs/CountrySelect";
import { SettingLayout } from "@/components/layouts/SettingLayout";
import FilledTextarea from "@/components/ui/FilledTextarea";
import { useUpdateAvatar } from "@/hooks/api/useUpdateAvatar";
import { useUpdateUser } from "@/hooks/api/useUpdateUser";
import { useUserMe } from "@/hooks/api/useUserMe";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Paper, Skeleton, Stack, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { z } from "zod";

const updateUserFormSchema = z.object({
  firstName: z.string().trim().min(1, "姓氏不可為空"),
  lastName: z.string().trim().min(1, "名稱不可為空"),
  phone: z.string().trim().min(1, "電話不可為空"),
  country: z.string().trim().nullable(),
  aboutMe: z.string().trim().nullable(),
});

type UpdateUserFormValues = z.infer<typeof updateUserFormSchema>;

const DEFAULT_VALUES: UpdateUserFormValues = {
  firstName: "",
  lastName: "",
  phone: "",
  country: null,
  aboutMe: "",
};

export default function UserProfileSettingPage() {
  const { data: session } = useSession();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: me, isLoading } = useUserMe();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(updateUserFormSchema),
    values: {
      firstName: me?.firstName ?? "",
      lastName: me?.lastName ?? "",
      phone: me?.phone ?? "",
      country: me?.country ?? null,
      aboutMe: me?.aboutMe ?? "",
    },
  });

  const {
    mutate: updateAvatar,
    isLoading: isUploading,
    isSuccess: isUploadSuccess,
    reset: resetUpload,
  } = useUpdateAvatar();
  const {
    mutate: updateUser,
    isLoading: isUpdating,
    isSuccess: isUpdateSuccess,
    reset: resetUpdate,
  } = useUpdateUser();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file)
      updateAvatar(
        { file },
        { onSettled: () => setTimeout(resetUpload, 2500) }
      );
  };
  const handleFormSubmit = (data: UpdateUserFormValues) => {
    updateUser(data, { onSettled: () => setTimeout(resetUpdate, 2500) });
  };

  const avatarSection = (
    <Stack
      direction="row"
      justifyContent={{ xs: "center", md: "space-around" }}
      alignItems="center"
      gap={4}
    >
      {session?.user?.image ? (
        <Avatar
          src={session?.user?.image}
          sx={{
            width: { xs: 125, md: 200 },
            height: { xs: 125, md: 200 },
          }}
        />
      ) : (
        <Skeleton variant="circular" animation="wave">
          <Avatar
            sx={{
              width: { xs: 125, md: 200 },
              height: { xs: 125, md: 200 },
            }}
          />
        </Skeleton>
      )}
      <SubmitButton
        component="label"
        size="medium"
        loading={isUploading}
        success={isUploadSuccess}
        sx={{ minWidth: "fit-content", px: { xs: 5, md: 10 } }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          hidden
        />
        更改頭像
      </SubmitButton>
    </Stack>
  );

  const inputDisabled = isLoading || isUpdating;

  return (
    <>
      <Head>
        <title>編輯個人資料</title>
      </Head>
      <SettingLayout>
        <Stack gap={{ xs: 1, md: 2 }}>
          {!isDesktop && avatarSection}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Paper sx={{ borderRadius: 2.5, p: 2 }}>
              <Stack gap={{ xs: 1, md: 2 }}>
                {isDesktop && avatarSection}
                <Stack direction="row" gap={{ xs: 1, md: 2 }}>
                  <TextField
                    label="名"
                    InputLabelProps={{ shrink: true }}
                    disabled={inputDisabled}
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    {...register("firstName")}
                  />
                  <TextField
                    label="姓"
                    InputLabelProps={{ shrink: true }}
                    disabled={inputDisabled}
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    {...register("lastName")}
                  />
                </Stack>
                <TextField
                  label="Email"
                  InputLabelProps={{ shrink: true }}
                  disabled
                  fullWidth
                  value={session?.user?.email ?? ""}
                />
                <TextField
                  label="手機"
                  InputLabelProps={{ shrink: true }}
                  disabled={session?.user?.verified || inputDisabled}
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  {...register("phone")}
                />
                <CountrySelect
                  label="居住國家"
                  disabled={inputDisabled}
                  fullWidth
                  control={control}
                  name="country"
                />
                <FilledTextarea
                  disabled={inputDisabled}
                  fullWidth
                  error={!!errors.aboutMe}
                  {...register("aboutMe")}
                />
              </Stack>
            </Paper>
            <SubmitButton
              fullWidth
              loading={isUpdating}
              success={isUpdateSuccess}
              sx={{ mt: 2 }}
            >
              儲存變更
            </SubmitButton>
          </form>
        </Stack>
      </SettingLayout>
    </>
  );
}
