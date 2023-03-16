import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { CountryInput } from "../inputs/CountryInput";
import { DatePicker } from "../inputs/DatePicker";
import { Typography } from "../ui/Typography";

export const RoundTripForm = () => {
  const { control, getValues, watch } = useForm({
    defaultValues: {
      fromCountry: "新北市",
      toCountry: "新北市",
      fromDate: new Date(),
      toDate: new Date(),
    },
  });

  const fromDate = getValues("fromDate");

  console.log(watch());

  return (
    <Stack component="form" spacing={3}>
      <CountryInput
        control={control}
        name="fromCountry"
        label="出發地城市"
        FormControlProps={{ fullWidth: true }}
        SelectProps={{ MenuProps: { sx: { maxHeight: 300 } } }}
      />
      <CountryInput
        control={control}
        name="toCountry"
        label="目的地城市"
        FormControlProps={{ fullWidth: true }}
        SelectProps={{ MenuProps: { sx: { maxHeight: 300 } } }}
      />
      <Stack direction="row" alignItems="center" spacing={2}>
        <DatePicker
          control={control}
          name="fromDate"
          label="出發時間"
          minDate={new Date()}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
        <Typography>-</Typography>
        <DatePicker
          control={control}
          name="toDate"
          label="返回時間"
          minDate={fromDate}
          slotProps={{
            textField: {
              fullWidth: true,
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default RoundTripForm;
