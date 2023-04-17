import { useAddTrip } from "@/hooks/api/useAddTrip";
import { useDialog } from "@/hooks/useDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { startOfDay } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ConfirmDialog } from "../ConfirmDialog";
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

export const RoundTripForm: FC = () => {
  const router = useRouter();

  const { dialogOpen, handleDialogClose, handleDialogOpen } = useDialog();

  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
    trigger,
  } = useForm<RoundTripFormValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(roundTripFormSchema),
  });

  const qc = useQueryClient();
  const { mutate } = useAddTrip();

  const handleFormSubmit = useCallback(
    (data: RoundTripFormValues) => {
      mutate({
        fromCountry: data.from.countryCode,
        fromCity: data.from.cityCode,
        toCountry: data.to.countryCode,
        toCity: data.to.cityCode,
        arrivalDate: data.arrivalDate,
      });
      mutate(
        {
          fromCountry: data.to.countryCode,
          fromCity: data.to.cityCode,
          toCountry: data.from.countryCode,
          toCity: data.from.cityCode,
          arrivalDate: data.returnDate,
        },
        {
          onSuccess: () => {
            qc.invalidateQueries(["trips"]);

            router.push("/trips");
          },
        }
      );
    },
    [mutate, qc, router]
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
          <CountryCitySelect control={control} name="from" label="出發地" />
          <CountryCitySelect control={control} name="to" label="目的地" />
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
      <Button onClick={handleButtonClick} loading={isSubmitting}>
        新增旅途
      </Button>
      <ConfirmDialog
        text="確定發布旅途？"
        open={dialogOpen}
        onClose={handleDialogClose}
        onCancel={handleDialogClose}
        onConfirm={handleDialogConfirm}
      />
    </Stack>
  );
};

export default RoundTripForm;
