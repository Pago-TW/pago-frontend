import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { startOfDay } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CountryInput } from "../inputs/CountryInput";
import { DatePicker } from "../inputs/DatePicker";
import { PaperLayout } from "../layouts/PaperLayout";
import { Button } from "../ui/Button";
import { oneWayTripFormSchema } from "./OneWayTripForm";

const currentDate = startOfDay(new Date());

export const roundTripFormSchema = oneWayTripFormSchema
  .extend({
    returnDate: z.date(),
  })
  .refine((data) => data.returnDate >= data.departureDate, {
    message: "返回時間不可早於出發時間",
    path: ["returnDate"],
  });

export type RoundTripFormValues = z.infer<typeof roundTripFormSchema>;

export const DEFAULT_VALUES: RoundTripFormValues = {
  departureCountry: "新北市",
  destinationCountry: "臺北市",
  departureDate: currentDate,
  returnDate: currentDate,
};

export const RoundTripForm = () => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RoundTripFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(roundTripFormSchema),
  });

  return (
    <Stack justifyContent="space-between" height="100%">
      <PaperLayout>
        <Stack spacing={3}>
          <CountryInput
            control={control}
            name="departureCountry"
            label="出發地城市"
            error={!!errors.departureCountry}
            helperText={errors.departureCountry?.message}
            FormControlProps={{ fullWidth: true }}
            SelectProps={{ MenuProps: { sx: { maxHeight: 300 } } }}
          />
          <CountryInput
            control={control}
            name="destinationCountry"
            label="目的地城市"
            error={!!errors.destinationCountry}
            helperText={errors.destinationCountry?.message}
            FormControlProps={{ fullWidth: true }}
            SelectProps={{ MenuProps: { sx: { maxHeight: 300 } } }}
          />
          <Stack direction="row" spacing={2}>
            <DatePicker
              control={control}
              name="departureDate"
              label="出發時間"
              minDate={currentDate}
              onChange={(date) => {
                if (date) {
                  const returnDate = getValues("returnDate");
                  if (date > returnDate) setValue("returnDate", date);
                }
              }}
              slotProps={{
                textField: {
                  error: !!errors.departureDate,
                  helperText: errors.departureDate?.message,
                  fullWidth: true,
                },
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              pb={!!errors.departureDate || !!errors.returnDate ? 3 : 0}
            >
              <span>—</span>
            </Box>
            <DatePicker
              control={control}
              name="returnDate"
              label="返回時間"
              minDate={watch("departureDate")}
              slotProps={{
                textField: {
                  error: !!errors.returnDate,
                  helperText: errors.returnDate?.message,
                  fullWidth: true,
                },
              }}
            />
          </Stack>
        </Stack>
      </PaperLayout>
      <Button type="submit">新增旅途</Button>
    </Stack>
  );
};

export default RoundTripForm;
