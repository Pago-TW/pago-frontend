import { useMediaQuery } from "@hooks/useMediaQuery";
import { Box, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { AmountInput } from "../inputs/AmountInput";
import { CurrencyInput, CURRENCY_OPTIONS } from "../inputs/CurrencyInput";
import { ImageDropzone } from "../inputs/ImageDropzone";
import { NumberInput } from "../inputs/NumberInput";
import { PlaceInput } from "../inputs/PlaceInput";
import { PaperLayout } from "../layouts/PaperLayout";

const IMAGE_MIME = ["image/jpeg", "image/png"];

export const merchandiseFormSchema = z.object({
  name: z.string().min(1, { message: "請輸入商品名稱" }),
  image: z
    .custom<File>((f) => f instanceof File, "請上傳商品圖片")
    .refine((f) => IMAGE_MIME.includes(f.type), "不支援的檔案格式"),
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

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

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
        <ImageDropzone
          control={control}
          name="image"
          label="商品圖片"
          error={!!errors?.image}
          helperText={errors?.image?.message}
          sx={{
            width: 75,
            height: 75,
            ...(mdUp && {
              width: 150,
              height: 150,
            }),
          }}
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
