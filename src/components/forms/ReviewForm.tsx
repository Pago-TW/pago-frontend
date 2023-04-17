import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Place } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { translateBoolean } from "src/utils/translateBoolean";
import type { z } from "zod";
import { DetailItem } from "../DetailItem";
import { PaperLayout } from "../layouts/PaperLayout";
import { Image } from "../ui/Image";
import { Typography } from "../ui/Typography";
import { merchandiseFormSchema } from "./MerchandiseForm";
import { needsFormSchema } from "./NeedsForm";

export const reviewFormSchema = merchandiseFormSchema.merge(needsFormSchema);

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export const ReviewForm = () => {
  const [preview, setPreview] = useState<string>("");

  const { getValues } = useFormContext<ReviewFormValues>();

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const name = getValues("name");
  const images = getValues("images");
  const description = getValues("description");
  const { amount: priceAmount, currency: priceCurrency } = getValues("price");
  const purchase = getValues("purchase");
  const purchaseAddress = getValues("purchaseAddress");
  const quantity = getValues("quantity");
  const packing = getValues("packing");
  const receipt = getValues("receipt");
  const fee = getValues("fee");
  const destination = getValues("destination");
  const destinationAddress = getValues("destinationAddress");
  const deadline = getValues("deadline");
  const note = getValues("note");

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

  const purchaseText = [
    purchase.countryCode,
    purchase.cityCode,
    purchaseAddress,
  ].join(" ");
  const destinationText = [
    destination.countryCode,
    destination.cityCode,
    destinationAddress,
  ].join(" ");

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
            {preview ? <Image src={preview} alt="Preview image" fill /> : null}
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
            value={format(deadline, "MM/dd/yyyy")}
            multiLine
          />
          <DetailItem label="備註" value={note} multiLine />
        </Stack>
      </PaperLayout>
      <PaperLayout>
        <Stack spacing={4}>
          <DetailItem
            label="商品價格"
            value={[priceAmount.toString(), priceCurrency].join(" ")}
            valueProps={{ weightPreset: "bold" }}
          />
          <DetailItem
            label="願付代購費"
            value={[fee.toString(), priceCurrency].join()}
            valueProps={{ weightPreset: "bold" }}
          />
          <DetailItem
            label="關稅"
            value="5NT$"
            valueProps={{ weightPreset: "bold" }}
          />
          <DetailItem
            label="平台費"
            value="0NT$"
            valueProps={{ weightPreset: "bold" }}
          />
          <DetailItem
            label="總付款金額"
            value="280NT$"
            valueProps={{ variant: "h3", weightPreset: "bold" }}
          />
        </Stack>
      </PaperLayout>
    </Stack>
  );
};

export default ReviewForm;
