import { useCharge } from "@/hooks/api/useCharge";
import { useLanguage } from "@/hooks/useLanguage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { translateBoolean } from "@/utils/translateBoolean";
import { Place } from "@mui/icons-material";
import { Box, Skeleton, Stack } from "@mui/material";
import { intlFormat } from "date-fns";
import Image from "next/image";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import { DetailItem } from "../DetailItem";
import { PaperLayout } from "../layouts/PaperLayout";
import { Typography } from "../ui/Typography";
import { merchandiseFormSchema } from "./MerchandiseForm";
import { needsFormSchema } from "./NeedsForm";

export const editReviewFormSchema = merchandiseFormSchema
  .merge(needsFormSchema)
  .omit({ images: true });

export type EditReviewFormValues = z.infer<typeof editReviewFormSchema>;

export const transformEditReviewFormValues = (data: EditReviewFormValues) => {
  return {
    orderItem: {
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      unitPrice: data.price.amount,
      purchaseCountry: data.purchase.countryCode,
      purchaseCity: data.purchase.cityCode,
      purchaseRoad: data.purchaseAddress,
    },
    packaging: data.packing,
    verification: data.receipt,
    destinationCountry: data.destination.countryCode,
    destinationCity: data.destination.cityCode,
    travelerFee: data.fee,
    currency: data.price.currency,
    note: data.note,
    latestReceiveItemDate: data.deadline,
  };
};

type EditMerchandiseFormProps = {
  imageUrls?: string[];
};

export const EditReviewForm: FC<EditMerchandiseFormProps> = ({
  imageUrls = [],
}) => {
  const lang = useLanguage();

  const { getValues } = useFormContext<EditReviewFormValues>();

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const formValues = getValues();
  const { data: charge } = useCharge(transformEditReviewFormValues(formValues));

  const {
    name,
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
            {imageUrls[0] !== undefined ? (
              <Image src={imageUrls[0]} alt="Preview image" fill />
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
              { year: "numeric", month: "numeric", day: "numeric" },
              { locale: lang }
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

export default EditReviewForm;