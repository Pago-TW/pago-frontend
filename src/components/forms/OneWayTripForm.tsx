import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { startOfDay } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CountryInput, COUNTRY_VALUES } from "../inputs/CountryInput";
import { DatePicker } from "../inputs/DatePicker";
import { PaperLayout } from "../layouts/PaperLayout";
import { Button } from "../ui/Button";

const currentDate = startOfDay(new Date());

export const oneWayTripFormSchema = z.object({
  departureCountry: z.enum(COUNTRY_VALUES, {
    required_error: "請選擇出發地城市",
  }),
  destinationCountry: z.enum(COUNTRY_VALUES, {
    required_error: "請選擇目的地城市",
  }),
  departureDate: z.date().min(currentDate, { message: "出發時間不可早於今天" }),
});

export type OneWayTripFormValues = z.infer<typeof oneWayTripFormSchema>;

export const DEFAULT_VALUES: OneWayTripFormValues = {
  departureCountry: "新北市",
  destinationCountry: "臺北市",
  departureDate: currentDate,
};

export const OneWayTripForm = () => {
  const {
    control,
    formState: { errors },
  } = useForm<OneWayTripFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(oneWayTripFormSchema),
  });

  return (
    <Stack spacing={3} justifyContent="space-between">
      <PaperLayout>
        <Stack spacing={3}>
          <CountryInput
            control={control}
            name="departureCountry"
            label="出發地城市"
            FormControlProps={{ fullWidth: true }}
            SelectProps={{ MenuProps: { sx: { maxHeight: 300 } } }}
          />
          <CountryInput
            control={control}
            name="destinationCountry"
            label="目的地城市"
            FormControlProps={{ fullWidth: true }}
            SelectProps={{ MenuProps: { sx: { maxHeight: 300 } } }}
          />
          <DatePicker
            control={control}
            name="departureDate"
            label="出發時間"
            minDate={currentDate}
            slotProps={{
              textField: {
                error: !!errors.departureDate,
                helperText: errors.departureDate?.message,
                fullWidth: true,
              },
            }}
          />
        </Stack>
      </PaperLayout>
      <Button type="submit">新增旅途</Button>
    </Stack>
  );
};

export default OneWayTripForm;
