import { zodResolver } from "@hookform/resolvers/zod";
import { Box, InputLabel, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { CitySelect } from "@/components/inputs/city-select";
import { DatePicker } from "@/components/inputs/date-picker";
import { DistrictSelect } from "@/components/inputs/district-select";
import { Button } from "@/components/ui/button";
import { Paper } from "@/components/ui/paper";
import { Typography } from "@/components/ui/typography";
import { useAddBankAccFormContext } from "@/contexts/add-bank-acc-form-context";
import { zDayjs } from "@/types/zod";

export const userInfoFormSchema = z.object({
  legalName: z.string().trim().min(1, "請輸入真實姓名"),
  birthDate: zDayjs,
  city: z.string().trim(),
  zipCode: z
    .string({ required_error: "請選擇鄉鎮市區" })
    .trim()
    .length(3, "請選擇鄉鎮市區"),
});

export type UserInfoFormValues = z.infer<typeof userInfoFormSchema>;

interface UserInfoFormProps {
  onNext: () => void;
}

export const UserInfoForm = ({ onNext }: UserInfoFormProps) => {
  const { form, setForm } = useAddBankAccFormContext();

  const {
    register,
    control,
    formState: { errors },
    watch,
    resetField,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
    defaultValues: form.data.userInfo,
    resolver: zodResolver(userInfoFormSchema),
  });

  const handleFormSubmit = (data: UserInfoFormValues) => {
    setForm((draft) => {
      draft.data.userInfo = data;
    });
    onNext();
  };

  const city = watch("city");

  return (
    <Box
      width="100%"
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Paper sx={{ p: 2 }}>
        <Stack spacing={3}>
          <TextField
            label="真實姓名"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            fullWidth
            autoComplete="name"
            error={!!errors.legalName}
            helperText={errors.legalName?.message}
            {...register("legalName")}
          />
          <DatePicker
            label="生日"
            slotProps={{
              textField: {
                fullWidth: true,
                InputLabelProps: { shrink: true },
              },
            }}
            disableFuture
            views={["year", "month", "day"]}
            openTo="year"
            control={control}
            name="birthDate"
          />
          <div>
            <InputLabel shrink>居住地區</InputLabel>
            <Stack direction="row" spacing={2}>
              <CitySelect
                placeholder="請選擇縣市"
                fullWidth
                shrink
                control={control}
                name="city"
                rules={{ onChange: () => resetField("zipCode") }}
              />
              <DistrictSelect
                placeholder="請選擇鄉鎮市區"
                fullWidth
                shrink
                disabled={!city}
                city={city}
                control={control}
                name="zipCode"
              />
            </Stack>
          </div>
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
              *提醒您，身分證字號需與銀行帳號資訊一致，否則可能會影響日後撥款權益
            </em>
          </Typography>
        </Stack>
      </Paper>
      <Button type="submit" sx={{ mt: 3, width: "100%" }}>
        下一步
      </Button>
    </Box>
  );
};
