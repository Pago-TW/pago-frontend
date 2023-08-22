import type { FC } from "react";
import Image from "next/image";

import { Box, InputLabel, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { AmountInput } from "@/components/inputs/AmountInput";
import {
  countryCitySchema,
  CountryCitySelect,
} from "@/components/inputs/CountryCitySelect";
import {
  CURRENCY_OPTIONS,
  CurrencyInput,
} from "@/components/inputs/CurrencyInput";
import { NumberInput } from "@/components/inputs/NumberInput";
import { PaperLayout } from "@/components/layouts/PaperLayout";
import { Typography } from "@/components/ui/Typography";

export const editMerchandiseFormSchema = z.object({
  name: z.string().min(1, { message: "請輸入商品名稱" }),
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
  purchase: countryCitySchema.refine(
    (value) => Object.values(value).every(Boolean),
    { message: "請選擇購買國家、縣市" }
  ),
  purchaseAddress: z.string().min(1, { message: "請輸入詳細購買地址" }),
  quantity: z
    .number({
      invalid_type_error: "無效的數字",
      required_error: "請輸入商品數量",
    })
    .min(1, { message: "商品數量不可小於1" }),
});

export type EditMerchandiseFormValues = z.infer<
  typeof editMerchandiseFormSchema
>;

interface EditMerchandiseFormProps {
  imageUrls?: string[];
}

export const EditMerchandiseForm: FC<EditMerchandiseFormProps> = ({
  imageUrls = [],
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<EditMerchandiseFormValues>();

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
          {...register("name")}
        />
        <Box>
          <InputLabel shrink>商品圖片</InputLabel>
          <Stack
            direction="row"
            spacing={1}
            width="100%"
            height="100%"
            sx={{ overflowX: "auto", overflowY: "visible" }}
          >
            {imageUrls.map((image) => (
              <Box
                key={image}
                position="relative"
                flexShrink={0}
                width={{ xs: 75, md: 150 }}
                height={{ xs: 75, md: 150 }}
              >
                <Image
                  src={image}
                  alt="Preview"
                  fill
                  sizes="(max-width: 600px) 75px, 150px"
                  style={{
                    borderRadius: 2,
                    flexShrink: 0,
                    objectFit: "cover",
                    objectPosition: "center center",
                  }}
                />
              </Box>
            ))}
          </Stack>
        </Box>
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
                  FormControlProps={{ size: "small", sx: { minWidth: 120 } }}
                />
              ),
            }}
            sx={{ "& input": { mr: 1 } }}
            control={control}
            name="price.amount"
          />
        </Box>
        <Stack spacing={1}>
          <Typography
            as="span"
            sx={{
              fontSize: (theme) => theme.typography.pxToRem(12),
              color: "rgba(0, 0, 0, 0.6)",
              mb: 1,
            }}
          >
            購買地點
          </Typography>
          <CountryCitySelect
            control={control}
            name="purchase"
            placeholder="購買國家縣市"
            includeAny
          />
          <TextField
            variant="standard"
            fullWidth
            label="詳細購買地址"
            InputLabelProps={{ shrink: true }}
            error={!!errors?.purchaseAddress}
            helperText={errors?.purchaseAddress?.message}
            {...register("purchaseAddress")}
          />
        </Stack>
        <AmountInput
          label="商品數量"
          name="quantity"
          control={control}
          error={!!errors?.quantity}
          helperText={errors?.quantity?.message}
        />
      </Stack>
    </PaperLayout>
  );
};

export default EditMerchandiseForm;
