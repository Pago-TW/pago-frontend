import { Add } from "@mui/icons-material";
import {
  Box,
  FormHelperText,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { AmountInput } from "../inputs/AmountInput";
import { CurrencyInput, CURRENCY_OPTIONS } from "../inputs/CurrencyInput";
import { NumberInput } from "../inputs/NumberInput";
import { PlaceInput } from "../inputs/PlaceInput";
import { PaperLayout } from "../layouts/PaperLayout";
import { Image } from "../ui/Image";

const IMAGE_MIME = ["image/jpeg", "image/png"];

export const merchandiseFormSchema = z.object({
  name: z.string().min(1, { message: "請輸入商品名稱" }),
  images: z
    .custom<File[]>(
      (files) => {
        if (!Array.isArray(files)) return false;
        if (files.length === 0) return false;
        return files.map((file) => file instanceof File).every((v) => v);
      },
      { message: "無效的檔案" }
    )
    .refine((files) => files?.length >= 1, "請上傳商品圖片")
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
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<MerchandiseFormValues>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles: File[]) => {
      setValue("images", acceptedFiles);
      setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
    },
  });

  useEffect(() => {
    return () => {
      previews.map((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

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
              新增圖片
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
                  sx={{ borderRadius: 2, flexShrink: 0 }}
                  fill
                  sizes="(max-width: 600px) 75px, 150px"
                  style={{
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
                  error={!!errors?.price?.currency}
                  helperText={errors?.price?.currency?.message}
                  FormControlProps={{ size: "small", sx: { minWidth: 120 } }}
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
