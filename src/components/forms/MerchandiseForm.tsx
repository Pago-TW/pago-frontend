import { Box, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { AmountInput } from "../inputs/AmountInput";
import { CurrencyInput, CURRENCY_OPTIONS } from "../inputs/CurrencyInput";
import { NumberInput } from "../inputs/NumberInput";
import { PlaceInput } from "../inputs/PlaceInput";
import { PaperLayout } from "../layouts/PaperLayout";

export const merchandiseFormSchema = z.object({
  name: z.string().min(1, { message: "請輸入商品名稱" }),
  image: z.string(),
  description: z.string().optional(),
  price: z.object({
    amount: z
      .number({
        invalid_type_error: "無效的數字",
        required_error: "請輸入商品價格",
      })
      .min(1, { message: "商品價格不可小於1" }),
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
  purchaseLocation: z.string().min(1, { message: "請輸入購買地點" }),
  amount: z
    .number({
      invalid_type_error: "無效的數字",
      required_error: "請輸入商品數量",
    })
    .min(1, { message: "商品數量不可小於1" }),
});

export type MerchandiseFormValues = z.infer<typeof merchandiseFormSchema>;

export const MerchandiseForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<MerchandiseFormValues>();

  return (
    <PaperLayout sx={{ mt: 3 }}>
      <Stack spacing={3}>
        <TextField
          label="商品名稱"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!errors?.name}
          helperText={errors?.name?.message}
          {...register("name", { required: "請輸入商品名稱" })}
        />
        <TextField
          label="商品圖片"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={!!errors?.image}
          helperText={errors?.image?.message}
          {...register("image")}
        />
        <TextField
          label="商品規格敘述"
          variant="standard"
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={!!errors?.description}
          helperText={errors?.description?.message}
          {...register("description")}
        />
        <Box position="relative">
          <NumberInput
            label="商品價格"
            inputProps={{ min: 1 }}
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!errors?.price?.amount}
            helperText={errors?.price?.amount?.message}
            InputProps={{
              endAdornment: (
                <CurrencyInput
                  control={control}
                  name="price.currency"
                  label="貨幣單位"
                  size="small"
                  error={!!errors?.price?.currency}
                  helperText={errors?.price?.currency?.message}
                  sx={{ minWidth: 120 }}
                />
              ),
            }}
            sx={{ "& input[type='number']": { mr: 16 } }}
            {...register("price.amount", { valueAsNumber: true })}
          />
        </Box>
        <PlaceInput
          label="購買地點"
          error={!!errors?.purchaseLocation}
          helperText={errors?.purchaseLocation?.message}
          {...register("purchaseLocation")}
        />
        <AmountInput
          label="商品數量"
          name="amount"
          control={control}
          error={!!errors?.amount}
          helperText={errors?.amount?.message}
        />
      </Stack>
    </PaperLayout>
  );
};

export default MerchandiseForm;
