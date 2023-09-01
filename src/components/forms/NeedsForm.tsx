import { Box, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { BooleanRadioGroup } from "@/components/inputs/BooleanRadioGroup";
import {
  countryCitySchema,
  CountryCitySelect,
} from "@/components/inputs/CountryCitySelect";
import { DatePicker } from "@/components/inputs/DatePicker";
import { NumberInput } from "@/components/inputs/NumberInput";
import { PaperLayout } from "@/components/layouts/PaperLayout";
import { Typography } from "@/components/ui/Typography";
import { zDayjs } from "@/types/zod";
import { now } from "@/utils/date";

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
  fee: z.number().min(1, { message: "代購費不可小於1" }),
  deadline: zDayjs.refine((date) => date >= now().startOf("day")),
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
            placeholder="送達國家縣市"
          />
        </Stack>
        <Box position="relative">
          <NumberInput
            label="願付代購費"
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
          disablePast
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
