import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { CountryInput } from "../inputs/CountryInput";

export const OneWayTripForm = () => {
  const { control } = useForm({
    defaultValues: {
      fromCountry: "新北市",
      toCountry: "新北市",

    },
  });

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
    </Stack>
  );
};

export default OneWayTripForm;
