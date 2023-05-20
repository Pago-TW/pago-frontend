import { CitySelect } from "@/components/inputs/CitySelect";
import { DatePicker } from "@/components/inputs/DatePicker";
import { DistrictSelect } from "@/components/inputs/DistrictSelect";
import { Typography } from "@/components/ui/Typography";
import { useAddBankAccFormContext } from "@/contexts/AddBankFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/Button";
import { Paper } from "../ui/Paper";

export const userInfoFormSchema = z.object({
  legalName: z.string().trim().min(1, "請輸入真實姓名"),
  identityNumber: z
    .string()
    .trim()
    .regex(
      /(?![LRSY])[A-Z][12]\d{8}/,
      "請輸入正確的身分證字號/統一證號/公司統編"
    ),
  birthDate: z.date(),
  city: z.string().trim(),
  zipCode: z
    .string({ required_error: "請選擇鄉鎮市區" })
    .trim()
    .length(3, "請選擇鄉鎮市區"),
  residentialAddress: z.string().trim().min(1, "請輸入地址"),
});

export type UserInfoFormValues = z.infer<typeof userInfoFormSchema>;

type UserInfoFormProps = {
  onNext: () => void;
};

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
          <TextField
            label="身分證字號/統一證號/公司統編"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!errors.identityNumber}
            helperText={errors.identityNumber?.message}
            sx={{ "& input": { textTransform: "uppercase" } }}
            {...register("identityNumber", {
              setValueAs: (value) => value.toUpperCase(),
            })}
          />
          <DatePicker
            label="生日/公司核准設立日期"
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
            autoComplete="address-line1"
            error={!!errors.residentialAddress}
            helperText={errors.residentialAddress?.message}
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
      </Paper>
      <Button type="submit" sx={{ mt: 3, width: "100%" }}>
        下一步
      </Button>
    </Box>
  );
};
