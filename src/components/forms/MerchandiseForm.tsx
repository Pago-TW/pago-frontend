import { Add } from "@mui/icons-material";
import {
  Box,
  FormHelperText,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { AmountInput } from "../inputs/AmountInput";
import {
  CountryCitySelect,
  countryCitySchema,
} from "../inputs/CountryCitySelect";
import { CURRENCY_OPTIONS, CurrencyInput } from "../inputs/CurrencyInput";
import { NumberInput } from "../inputs/NumberInput";
import { PaperLayout } from "../layouts/PaperLayout";
import { Typography } from "../ui/Typography";

const IMAGE_MIME = ["image/jpeg", "image/png"];

export const merchandiseFormSchema = z.object({
  name: z.string().min(1, { message: "請輸入商品名稱" }),
  images: z
    .custom<File[]>(
      (files) => {
        if (!Array.isArray(files)) return false;
        return files.map((file) => file instanceof File).every((v) => v);
      },
      { message: "無效的檔案" }
    )
    .refine((files) => files?.length > 0, "至少需要上傳 1 張商品圖片")
    .refine((files) => files?.length <= 3, "最多只能上傳 3 張商品圖片")
    .refine(
      (files) =>
        files?.map((file) => IMAGE_MIME.includes(file.type)).every((v) => v),
      "不支援的檔案格式"
    ),
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

export type MerchandiseFormValues = z.infer<typeof merchandiseFormSchema>;

export const MerchandiseForm = () => {
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    control,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useFormContext<MerchandiseFormValues>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 3,
    onDrop: (acceptedFiles: File[]) => {
      setValue("images", acceptedFiles);
      setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));

      trigger("images");
    },
  });

  useEffect(() => {
    const images = getValues("images");
    if (images) {
      setPreviews(images.map((image) => URL.createObjectURL(image)));
    }
  }, [getValues]);

  useEffect(() => {
    return () => {
      previews.map((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews, getValues]);

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
          <InputLabel error={!!errors.images} shrink>
            商品圖片
          </InputLabel>
          <Stack
            direction="row"
            spacing={1}
            width="100%"
            height="100%"
            sx={{ overflowX: "auto", overflowY: "visible" }}
          >
            <Box
              {...getRootProps({
                sx: {
                  height: { xs: 75, md: 150 },
                  minWidth: { xs: 75, md: 150 },
                  width: "100%",
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 1,
                  borderRadius: 2,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23C4C4C4FF' stroke-width='4' stroke-dasharray='9' stroke-dashoffset='0' stroke-linecap='butt'/%3e%3c/svg%3e")`,
                  color: "base.300",
                },
              })}
            >
              <Add />
              <Typography fontSize={{ xs: 14, md: 18 }}>新增圖片</Typography>
              <input {...getInputProps()} />
            </Box>
            {previews.map((preview) => (
              <Box
                key={preview}
                position="relative"
                flexShrink={0}
                width={{ xs: 75, md: 150 }}
                height={{ xs: 75, md: 150 }}
              >
                <Image
                  src={preview}
                  alt="Preview"
                  onLoad={() => URL.revokeObjectURL(preview)}
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
          {!!errors?.images ? (
            <FormHelperText error={!!errors?.images}>
              {errors?.images.message}
            </FormHelperText>
          ) : null}
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
            label="購買國家縣市"
            noInputLabelOnShrink
            includeAny
          />
          <TextField
            variant="standard"
            fullWidth
            label="詳細購買地址"
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

export default MerchandiseForm;
