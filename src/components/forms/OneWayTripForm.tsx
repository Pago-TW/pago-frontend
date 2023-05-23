import { useAddOneWayTrip } from "@/hooks/api/useAddOneWayTrip";
import { useOpen } from "@/hooks/useOpen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { startOfDay, subDays } from "date-fns";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConfirmDialog } from "../ConfirmDialog";
import { SubmitButton } from "../SubmitButton";
import {
  CountryCitySelect,
  countryCitySchema,
} from "../inputs/CountryCitySelect";
import { DatePicker } from "../inputs/DatePicker";
import { PaperLayout } from "../layouts/PaperLayout";

const currentDate = startOfDay(new Date());
const minDate = subDays(currentDate, 1);

export const oneWayTripFormSchema = z.object({
  from: countryCitySchema.refine(
    (value) => Object.values(value).every(Boolean),
    { message: "請選擇出發地" }
  ),
  to: countryCitySchema.refine((value) => Object.values(value).every(Boolean), {
    message: "請選擇目的地",
  }),
  arrivalDate: z.date().min(minDate, { message: "不合理的抵達時間" }),
});

export type OneWayTripFormValues = z.infer<typeof oneWayTripFormSchema>;

export const DEFAULT_VALUES: Partial<OneWayTripFormValues> = {
  from: { countryCode: "", cityCode: "" },
  to: { countryCode: "", cityCode: "" },
  arrivalDate: currentDate,
};

export const OneWayTripForm: FC = () => {
  const router = useRouter();

  const {
    open: dialogOpen,
    handleClose: handleDialogClose,
    handleOpen: handleDialogOpen,
  } = useOpen();

  const {
    control,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<OneWayTripFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(oneWayTripFormSchema),
  });

  const { mutate: addOneWayTrip, isLoading, isSuccess } = useAddOneWayTrip();

  const handleFormSubmit = useCallback(
    (data: OneWayTripFormValues) => {
      addOneWayTrip(
        {
          fromCountry: data.from.countryCode,
          fromCity: data.from.cityCode,
          toCountry: data.to.countryCode,
          toCity: data.to.cityCode,
          arrivalDate: data.arrivalDate,
        },
        { onSuccess: (data) => router.push(`/trips/${data.tripId}`) }
      );
    },
    [addOneWayTrip, router]
  );

  const handleButtonClick = useCallback(async () => {
    const isValid = await trigger();
    if (isValid) handleDialogOpen();
  }, [trigger, handleDialogOpen]);

  const handleDialogConfirm = useCallback(() => {
    handleDialogClose();
    handleSubmit(handleFormSubmit)();
  }, [handleDialogClose, handleSubmit, handleFormSubmit]);

  return (
    <Stack component="form" spacing={3} justifyContent="space-between">
      <PaperLayout>
        <Stack spacing={3}>
          <CountryCitySelect
            control={control}
            name="from"
            placeholder="出發地"
          />
          <CountryCitySelect control={control} name="to" placeholder="目的地" />
          <DatePicker
            control={control}
            name="arrivalDate"
            label="抵達時間"
            minDate={minDate}
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
      <SubmitButton
        fullWidth
        onClick={handleButtonClick}
        loading={isLoading}
        success={isSuccess}
      >
        新增旅途
      </SubmitButton>
      <ConfirmDialog
        title="確定發布旅途？"
        open={dialogOpen}
        onClose={handleDialogClose}
        onCancel={handleDialogClose}
        onConfirm={handleDialogConfirm}
      />
    </Stack>
  );
};

export default OneWayTripForm;
