import { PageTitle } from "@/components/PageTitle";
import { CitySelect } from "@/components/inputs/CitySelect";
import { DatePicker } from "@/components/inputs/DatePicker";
import { DistrictSelect } from "@/components/inputs/DistrictSelect";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Paper } from "@/components/ui/Paper";
import { Typography } from "@/components/ui/Typography";
import { Container, Stack, TextField } from "@mui/material";
import Head from "next/head";
import { useForm } from "react-hook-form";

const UserInfoForm = () => {
  const { register, control, watch } = useForm();

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

export default function UserAddBankAccountPage() {
  return (
    <>
      <Head>
        <title>新增付款方式</title>
      </Head>
      <BaseLayout>
        <PageTitle title="使用者資訊" />
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Paper sx={{ p: 2 }}>
            <UserInfoForm />
          </Paper>
        </Container>
      </BaseLayout>
    </>
  );
}
