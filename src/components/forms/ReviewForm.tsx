import type { AddOrderData } from "@/hooks/api/useAddOrder";
import { useCharge } from "@/hooks/api/useCharge";
import { useLocale } from "@/hooks/useLocale";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Place } from "@mui/icons-material";
import { Box, Skeleton, Stack } from "@mui/material";
import { intlFormat } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { translateBoolean } from "src/utils/translateBoolean";
import type { z } from "zod";
import { DetailItem } from "../DetailItem";
import { PaperLayout } from "../layouts/PaperLayout";
import { Typography } from "../ui/Typography";
import { merchandiseFormSchema } from "./MerchandiseForm";
import { needsFormSchema } from "./NeedsForm";

export const reviewFormSchema = merchandiseFormSchema.merge(needsFormSchema);

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export const transformReviewFormValues = (
  data: ReviewFormValues
): AddOrderData => {
  return {
    file: data.images,
    data: {
      orderItem: {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        unitPrice: data.price.amount,
        purchaseCountry: data.purchase.countryCode,
        purchaseCity: data.purchase.cityCode,
        purchaseRoad: data.purchaseAddress,
      },
      isPackagingRequired: data.packing,
      isVerificationRequired: data.receipt,
      destinationCountry: data.destination.countryCode,
      destinationCity: data.destination.cityCode,
      travelerFee: data.fee,
      currency: data.price.currency,
      note: data.note,
      latestReceiveItemDate: data.deadline,
    },
  };
};

export const ReviewForm = () => {
  const [preview, setPreview] = useState<string>("");

  const locale = useLocale();

  const { getValues } = useFormContext<ReviewFormValues>();

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const formValues = getValues();
  const { data: charge } = useCharge(
    transformReviewFormValues(formValues).data
  );

  const {
    name,
    images,
    description,
    price: { amount: price, currency },
    purchase,
    purchaseAddress,
    quantity,
    packing,
    receipt,
    fee,
    destination,
    deadline,
    note,
  } = formValues;

  useEffect(() => {
    let previewUrl: string;
    if (images.length > 0 && images[0]) {
      previewUrl = URL.createObjectURL(images[0]);
      setPreview(previewUrl);
    }

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [images, setPreview]);

  const withCurrency = (amount: number) => `${amount} ${currency}`;

  // TODO: Get country and city name
  const purchaseText = [
    purchase.countryCode,
    purchase.cityCode,
    purchaseAddress,
  ].join(" ");
  const destinationText = [destination.countryCode, destination.cityCode].join(
    " "
  );

  const detailItemSkeleton = <Skeleton variant="rectangular" width="100%" />;

  return (
    <Stack spacing={2} mt={3}>
      <PaperLayout>
        <Stack direction="row" spacing={{ xs: 2, md: 3 }}>
          <Box
            sx={(theme) => ({
              position: "relative",
              width: 75,
              height: 75,
              borderRadius: 2,
              [theme.breakpoints.up("md")]: {
                width: 200,
                height: 200,
              },
            })}
          >
            {preview ? (
              <Image
                src={preview}
                alt="Preview image"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            ) : null}
          </Box>
          <Stack justifyContent="space-between" flexGrow={1} py={1}>
            <Typography variant={mdDown ? "h5" : "h1"} weightPreset="bold">
              {name}
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant={mdDown ? "h6" : "h3"}>
                {description}
              </Typography>
              <Typography variant={mdDown ? "h6" : "h3"}>{quantity}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </PaperLayout>
      <PaperLayout>
        <Stack spacing={4}>
          <DetailItem label="是否需要包裝" value={translateBoolean(packing)} />
          <DetailItem
            label="是否需要購買證明"
            value={translateBoolean(receipt)}
          />
          <DetailItem
            label="商品購買地點"
            value={
              <Stack direction="row" alignItems="center">
                <Place />
                {purchaseText}
              </Stack>
            }
            multiLine
          />
          <DetailItem
            label="送達地點"
            value={
              <Stack direction="row" alignItems="center">
                <Place />
                {destinationText}
              </Stack>
            }
            multiLine
          />
          <DetailItem
            label="最晚收到商品時間"
            value={intlFormat(
              deadline,
              { year: "numeric", month: "2-digit", day: "2-digit" },
              { locale }
            )}
            multiLine
          />
          <DetailItem label="備註" value={note} multiLine />
        </Stack>
      </PaperLayout>
      <PaperLayout>
        <Stack spacing={4}>
          <DetailItem
            label="商品價格"
            value={withCurrency(price)}
            valueProps={{ weightPreset: "bold" }}
          />
          <DetailItem
            label="願付代購費"
            value={withCurrency(fee)}
            valueProps={{ weightPreset: "bold" }}
          />
          {charge?.tariffFee !== undefined ? (
            <DetailItem
              label="關稅"
              value={withCurrency(charge?.tariffFee)}
              valueProps={{ weightPreset: "bold" }}
            />
          ) : (
            detailItemSkeleton
          )}
          {charge?.platformFee !== undefined ? (
            <DetailItem
              label="平台費"
              value={withCurrency(charge?.platformFee)}
              valueProps={{ weightPreset: "bold" }}
            />
          ) : (
            detailItemSkeleton
          )}
          {charge?.totalAmount !== undefined ? (
            <DetailItem
              label="總付款金額"
              value={withCurrency(charge?.totalAmount)}
              valueProps={{ variant: "h3", weightPreset: "bold" }}
            />
          ) : (
            detailItemSkeleton
          )}
        </Stack>
      </PaperLayout>
    </Stack>
  );
};

export default ReviewForm;
