import { useAddTrip } from "@/hooks/api/useAddTrip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { startOfDay } from "date-fns";
import { useCallback, type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CountryCityOption } from "../inputs/CountryCitySelect";
import { CountryCitySelect } from "../inputs/CountryCitySelect";
import { DatePicker } from "../inputs/DatePicker";
import { PaperLayout } from "../layouts/PaperLayout";
import { Button } from "../ui/Button";
import { oneWayTripFormSchema } from "./OneWayTripForm";

const currentDate = startOfDay(new Date());

export const roundTripFormSchema = oneWayTripFormSchema
  .extend({
    returnDate: z.date(),
  })
  .refine((data) => data.returnDate >= data.arrivalDate, {
    message: "返回時間不可早於出發時間",
    path: ["returnDate"],
  });

export type RoundTripFormValues = z.infer<typeof roundTripFormSchema>;

export const DEFAULT_VALUES: Partial<RoundTripFormValues> = {
  from: { countryCode: "", cityCode: "" },
  to: { countryCode: "", cityCode: "" },
  arrivalDate: currentDate,
  returnDate: currentDate,
};

export const RoundTripForm: FC<{ countryCityOptions: CountryCityOption[] }> = ({
  countryCityOptions,
}) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<RoundTripFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(roundTripFormSchema),
  });

  const { mutate } = useAddTrip();

  const handleFormSubmit = useCallback(
    (data: RoundTripFormValues) => {
      console.log(data);
      // mutate(data);
    },
    [mutate]
  );
  return (
    <Stack
      component="form"
      spacing={3}
      justifyContent="space-between"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <PaperLayout>
        <Stack spacing={3}>
          <CountryCitySelect
            control={control}
            name="from"
            label="出發地"
            options={countryCityOptions}
          />
          <CountryCitySelect
            control={control}
            name="to"
            label="目的地"
            options={countryCityOptions}
          />
          <Stack direction="row" spacing={2}>
            <DatePicker
              control={control}
              name="arrivalDate"
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
                  error: !!errors.arrivalDate,
                  helperText: errors.arrivalDate?.message,
                  fullWidth: true,
                },
              }}
            />
            <Box
              display="flex"
              alignItems="center"
              pb={!!errors.arrivalDate || !!errors.returnDate ? 3 : 0}
            >
              <span>—</span>
            </Box>
            <DatePicker
              control={control}
              name="returnDate"
              label="返回時間"
              minDate={watch("arrivalDate")}
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
