import { Place } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import type { z } from "zod";
import { DetailItem } from "../DetailItem";
import { PaperLayout } from "../layouts/PaperLayout";
import { Typography } from "../ui/Typography";
import { merchandiseFormSchema } from "./MerchandiseForm";
import { needsFormSchema } from "./NeedsForm";
export const reviewFormSchema = merchandiseFormSchema.merge(needsFormSchema);

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;

const translateBoolean = (value: boolean) => {
  return value ? "是" : "否";
};

export const ReviewForm = () => {
  const { getValues } = useFormContext<ReviewFormValues>();

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

  return (
    <Stack spacing={2} mt={3}>
      <PaperLayout>
        <Stack direction="row">
          <div
            style={{
              width: 72,
              height: 72,
              backgroundColor: "pago.500",
              color: "common.white",
            }}
          >
            {image}
          </div>
          <Stack justifyContent="space-between" flexGrow={1}>
            <Typography variant="h5">{name}</Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h6">{description}</Typography>
              <Typography variant="h6">{amount}</Typography>
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
            value={`${priceAmount} ${priceCurrency}`}
            valueBold
          />
          <DetailItem
            label="願付代購費"
            value={`${feeAmount} ${feeCurrency}`}
            valueBold
          />
          <DetailItem label="關稅" value="5NT$" valueBold />
          <DetailItem label="平台費" value="0NT$" valueBold />
          <DetailItem
            label="總付款金額"
            value="280NT$"
            valueVariant="h3"
            valueBold
          />
        </Stack>
      </PaperLayout>
    </Stack>
  );
};

export default ReviewForm;
