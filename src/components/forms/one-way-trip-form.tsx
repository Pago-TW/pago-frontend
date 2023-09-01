import { useCallback, type FC } from "react";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ConfirmDialog } from "@/components/confirm-dialog";
import {
  countryCitySchema,
  CountryCitySelect,
} from "@/components/inputs/country-city-select";
import { DatePicker } from "@/components/inputs/date-picker";
import { PaperLayout } from "@/components/layouts/paper-layout";
import { SubmitButton } from "@/components/submit-button";
import { useAddOneWayTrip } from "@/hooks/api/use-add-one-way-trip";
import { useOpen } from "@/hooks/use-open";
import { zDayjs } from "@/types/zod";
import { now, utcNow } from "@/utils/date";

export const oneWayTripFormSchema = z.object({
  from: countryCitySchema.refine(
    (value) => Object.values(value).every(Boolean),
    { message: "請選擇出發地" }
  ),
  to: countryCitySchema.refine((value) => Object.values(value).every(Boolean), {
    message: "請選擇目的地",
  }),
  arrivalDate: zDayjs.refine((date) => date >= now().startOf("day")),
});

export type OneWayTripFormValues = z.infer<typeof oneWayTripFormSchema>;

export const DEFAULT_VALUES: Partial<OneWayTripFormValues> = {
  from: { countryCode: "", cityCode: "" },
  to: { countryCode: "", cityCode: "" },
  arrivalDate: utcNow().startOf("day"),
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
          arrivalDate: data.arrivalDate.toDate(),
        },
        { onSuccess: (data) => void router.push(`/trips/${data.tripId}`) }
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
    void handleSubmit(handleFormSubmit)();
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
            disablePast
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
