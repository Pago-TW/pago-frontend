import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Place } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { concatStrings } from "src/utils/concatStrings";
import { translateBoolean } from "src/utils/translateBoolean";
import type { z } from "zod";
import { DetailItem } from "../DetailItem";
import { PaperLayout } from "../layouts/PaperLayout";
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
  const image = getValues("image");
  const description = getValues("description");
  const { amount: priceAmount, currency: priceCurrency } = getValues("price");
  const purchaseLocation = getValues("purchaseLocation");
  const amount = getValues("amount");
  const packing = getValues("packing");
  const receipt = getValues("receipt");
  const { amount: feeAmount, currency: feeCurrency } = getValues("fee");
  const destination = getValues("destination");
  const date = getValues("date");
  const remark = getValues("remark");

  useEffect(() => {
    const previewUrl = URL.createObjectURL(image);
    setPreview(previewUrl);

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [image, setPreview]);

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
              <Typography variant={mdDown ? "h6" : "h3"}>{amount}</Typography>
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
                {purchaseLocation}
              </Stack>
            }
            multiLine
          />
          <DetailItem
            label="送達地點"
            value={
              <Stack direction="row" alignItems="center">
                <Place />
                {destination}
              </Stack>
            }
            multiLine
          />
          <DetailItem
            label="最晚收到商品時間"
            value={format(date, "MM/dd/yyyy")}
            multiLine
          />
          <DetailItem label="備註" value={remark} multiLine />
        </Stack>
      </PaperLayout>
      <PaperLayout>
        <Stack spacing={4}>
          <DetailItem
            label="商品價格"
            value={concatStrings([priceAmount.toString(), priceCurrency])}
            valueProps={{ weightPreset: "bold" }}
          />
          <DetailItem
            label="願付代購費"
            value={concatStrings([feeAmount.toString(), feeCurrency])}
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
