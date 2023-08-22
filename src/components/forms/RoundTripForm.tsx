import { useCallback, type FC } from "react";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { startOfDay, subDays } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { ConfirmDialog } from "@/components/ConfirmDialog";
import { CountryCitySelect } from "@/components/inputs/CountryCitySelect";
import { DatePicker } from "@/components/inputs/DatePicker";
import { PaperLayout } from "@/components/layouts/PaperLayout";
import { oneWayTripFormSchema } from "@/components/OneWayTripForm";
import { SubmitButton } from "@/components/SubmitButton";
import { useAddRoundTrip } from "@/hooks/api/useAddRoundTrip";
import { useOpen } from "@/hooks/useOpen";

const currentDate = startOfDay(new Date());
const minDate = subDays(currentDate, 1);

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

export const RoundTripForm: FC = () => {
  const router = useRouter();

  const {
    open: dialogOpen,
    handleClose: handleDialogClose,
    handleOpen: handleDialogOpen,
  } = useOpen();

  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
    trigger,
  } = useForm<RoundTripFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(roundTripFormSchema),
  });

  const { mutate: addRoundTrip, isLoading, isSuccess } = useAddRoundTrip();

  const handleFormSubmit = useCallback(
    (data: RoundTripFormValues) => {
      addRoundTrip(
        {
          fromCountry: data.from.countryCode,
          fromCity: data.from.cityCode,
          toCountry: data.to.countryCode,
          toCity: data.to.cityCode,
          arrivalDate: data.arrivalDate,
          returnDate: data.returnDate,
        },
        { onSuccess: () => router.replace("/trips") }
      );
    },
    [addRoundTrip, router]
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
          <Stack direction="row" spacing={2}>
            <DatePicker
              control={control}
              name="arrivalDate"
              label="抵達時間"
              minDate={minDate}
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

export default RoundTripForm;
