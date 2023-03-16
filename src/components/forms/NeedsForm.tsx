import { Box, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { BooleanRadioGroup } from "../inputs/BooleanRadioGroup";
import { CurrencyInput, CURRENCY_OPTIONS } from "../inputs/CurrencyInput";
import { DatePicker } from "../inputs/DatePicker";
import { NumberInput } from "../inputs/NumberInput";
import { PlaceInput } from "../inputs/PlaceInput";
import { PaperLayout } from "../layouts/PaperLayout";

export const needsFormSchema = z.object({
  packing: z.boolean({
    invalid_type_error: "無效的選項",
    required_error: "請選擇選項",
  }),
  receipt: z.boolean({
    invalid_type_error: "無效的選項",
    required_error: "請選擇選項",
  }),
  destination: z.string().min(1, { message: "請輸入送達地點" }),
  fee: z.object({
    amount: z
      .number({
        invalid_type_error: "無效的數字",
        required_error: "代購費不可為空",
      })
      .min(1, { message: "代購費不可小於1" }),
    currency: z.enum(CURRENCY_OPTIONS, {
      errorMap: (issue, ctx) => {
        switch (issue.code) {
          case z.ZodIssueCode.invalid_enum_value:
            return { message: "無效的貨幣單位" };
          default:
            return { message: ctx.defaultError };
        }
      },
    }),
  }),
  date: z.date({
    invalid_type_error: "無效的日期",
    required_error: "請選擇日期",
  }),
  remark: z.string().optional(),
});

export type NeedsFormValues = z.infer<typeof needsFormSchema>;

export const NeedsForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NeedsFormValues>();

  return (
    <PaperLayout sx={{ mt: 3 }}>
      <Stack spacing={3}>
        <BooleanRadioGroup
          name="packing"
          control={control}
          label="是否需要拆包裝"
          error={!!errors?.packing}
          helperText={errors?.packing?.message}
        />
        <BooleanRadioGroup
          name="receipt"
          control={control}
          label="是否需要購買證明"
          error={!!errors?.receipt}
          helperText={errors?.receipt?.message}
        />
        <PlaceInput
          label="送達地點"
          error={!!errors?.destination}
          helperText={errors?.destination?.message}
          {...register("destination")}
        />
        <Box position="relative">
          <NumberInput
            label="最高願付代購費"
            inputProps={{ min: 1 }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!errors?.fee?.amount}
            helperText={errors?.fee?.amount?.message}
            InputProps={{
              endAdornment: (
                <CurrencyInput
                  control={control}
                  name="fee.currency"
                  label="貨幣單位"
                  error={!!errors?.fee?.currency}
                  helperText={errors?.fee?.currency?.message}
                  FormControlProps={{ size: "small", sx: { minWidth: 120 } }}
                />
              ),
            }}
            sx={{ "& input[type='number']": { mr: 16 } }}
            {...register("fee.amount", { valueAsNumber: true })}
          />
        </Box>
        <DatePicker
          control={control}
          name="date"
          label="最晚收到商品日期"
          minDate={new Date()}
          slotProps={{
            textField: {
              error: !!errors?.date,
              helperText: errors?.date?.message,
            },
          }}
        />
        <TextField
          label="備註"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!errors?.remark}
          helperText={errors?.remark?.message}
          {...register("remark")}
        />
      </Stack>
    </PaperLayout>
  );
};

export default NeedsForm;
