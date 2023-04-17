import { Box, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { BooleanRadioGroup } from "../inputs/BooleanRadioGroup";
import {
  CountryCitySelect,
  countryCitySchema,
} from "../inputs/CountryCitySelect";
import { DatePicker } from "../inputs/DatePicker";
import { NumberInput } from "../inputs/NumberInput";
import { PaperLayout } from "../layouts/PaperLayout";
import { Typography } from "../ui/Typography";

export const needsFormSchema = z.object({
  packing: z.boolean({
    invalid_type_error: "無效的選項",
    required_error: "請選擇選項",
  }),
  receipt: z.boolean({
    invalid_type_error: "無效的選項",
    required_error: "請選擇選項",
  }),
  destination: countryCitySchema.refine(
    (value) => Object.values(value).every(Boolean),
    { message: "請選擇送達國家、縣市" }
  ),
  destinationAddress: z.string().min(1, { message: "請輸入詳細送達地址" }),
  fee: z.number().min(1),
  deadline: z.date({
    invalid_type_error: "無效的日期",
    required_error: "請選擇日期",
  }),
  note: z.string().optional(),
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
        <Stack spacing={1}>
          <Typography
            as="span"
            sx={{
              fontSize: (theme) => theme.typography.pxToRem(12),
              color: "rgba(0, 0, 0, 0.6)",
              mb: 1,
            }}
          >
            送達地點
          </Typography>
          <CountryCitySelect
            control={control}
            name="destination"
            label="購買國家縣市"
            noInputLabelOnShrink
          />
          <TextField
            variant="standard"
            fullWidth
            label="詳細購買地址"
            error={!!errors?.destinationAddress}
            helperText={errors?.destinationAddress?.message}
            {...register("destinationAddress")}
          />
        </Stack>
        <Box position="relative">
          <NumberInput
            label="最高願付代購費"
            inputProps={{ min: 1 }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!errors?.fee}
            helperText={errors?.fee?.message}
            sx={{ "& input[type='number']": { mr: 16 } }}
            control={control}
            name="fee"
          />
        </Box>
        <DatePicker
          control={control}
          name="deadline"
          label="最晚收到商品日期"
          minDate={new Date()}
          slotProps={{
            textField: {
              error: !!errors?.deadline,
              helperText: errors?.deadline?.message,
            },
          }}
        />
        <TextField
          label="備註"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!errors?.note}
          helperText={errors?.note?.message}
          {...register("note")}
        />
      </Stack>
    </PaperLayout>
  );
};

export default NeedsForm;
