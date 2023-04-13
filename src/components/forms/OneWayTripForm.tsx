import { useAddTrip } from "@/hooks/api/useAddTrip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { startOfDay } from "date-fns";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { CountryCityOption } from "../inputs/CountryCitySelect";
import CountryCitySelect, {
  countryCitySchema,
} from "../inputs/CountryCitySelect";
import { DatePicker } from "../inputs/DatePicker";
import { PaperLayout } from "../layouts/PaperLayout";
import { Button } from "../ui/Button";

const currentDate = startOfDay(new Date());

export const oneWayTripFormSchema = z.object({
  from: countryCitySchema.refine(
    (value) => Object.values(value).every(Boolean),
    { message: "請選擇出發地" }
  ),
  to: countryCitySchema.refine((value) => Object.values(value).every(Boolean), {
    message: "請選擇目的地",
  }),
  arrivalDate: z.date().min(currentDate, { message: "出發時間不可早於今天" }),
});

export type OneWayTripFormValues = z.infer<typeof oneWayTripFormSchema>;

export const DEFAULT_VALUES: Partial<OneWayTripFormValues> = {
  from: { countryCode: "", cityCode: "" },
  to: { countryCode: "", cityCode: "" },
  arrivalDate: currentDate,
};

export const OneWayTripForm: FC<{
  countryCityOptions: CountryCityOption[];
}> = ({ countryCityOptions: options }) => {
  const router = useRouter();

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<OneWayTripFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(oneWayTripFormSchema),
  });

  const { mutate } = useAddTrip();

  const handleFormSubmit = useCallback(
    (data: OneWayTripFormValues) => {
      mutate({
        fromCountry: data.from.countryCode,
        fromCity: data.from.cityCode,
        toCountry: data.to.countryCode,
        toCity: data.to.cityCode,
        arrivalDate: data.arrivalDate,
      });

      router.push("/trips");
    },
    [mutate, router]
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
            options={options}
          />
          <CountryCitySelect
            control={control}
            name="to"
            label="目的地"
            options={options}
          />
          <DatePicker
            control={control}
            name="arrivalDate"
            label="出發時間"
            minDate={currentDate}
            slotProps={{
              textField: {
                error: !!errors.arrivalDate,
                helperText: errors.arrivalDate?.message,
                fullWidth: true,
              },
            }}
          />
        </Stack>
      </PaperLayout>
      <Button type="submit" loading={isSubmitting}>
        新增旅途
      </Button>
    </Stack>
  );
};

export default OneWayTripForm;
