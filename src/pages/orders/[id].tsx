import { BuyingAgent } from "@components/BuyingAgent";
import { DetailItem } from "@components/DetailItem";
import { BaseLayout } from "@components/layouts/BaseLayout";
import { PageTitle } from "@components/PageTitle";
import { Link } from "@components/ui/Link";
import { Typography } from "@components/ui/Typography";
import { useOrder } from "@hooks/api/useOrder";
import { useMediaQuery } from "@hooks/useMediaQuery";
import { Place } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { concatStrings } from "src/utils/concatStrings";
import { translateBoolean } from "src/utils/translateBoolean";

const BuyingAgentArea = () => {
  return (
    <>
      <Stack spacing={3} sx={{ width: "100%" }}>
        {/* 代購者 */}
        <Typography variant="h3" mt={1} sx={{ textAlign: "center" }}>
          願意代購者
        </Typography>
        <BuyingAgent />
        <BuyingAgent />
        <Stack alignItems="center">
          <Link fontSize={18} mt={1}>
            顯示更多
          </Link>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ "&&": { mt: 5 } }}
      >
        {/* 更多代購者 */}
        <AvatarGroup total={100}>
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </AvatarGroup>
        <Typography variant="h6" color="base.400">
          另有100位代購者的旅途與此委託相符
        </Typography>
      </Stack>
    </>
  );
};

const OrderDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const { data: order } = useOrder(id as string);

  if (!order) return null;

  const {
    orderItem: {
      name,
      imageUrl,
      description,
      quantity,
      unitPrice,
      purchaseCity,
      purchaseCountry,
      purchaseDistrict,
      purchaseRoad,
    },
    packaging,
    verification,
    destination,
    travelerFee,
    currency,
    tariffFee,
    platformFee,
    note,
    totalAmount,
    latestReceiveItemDate,
  } = order;

  const combineCurrency = (value: number) =>
    concatStrings([value.toString(), currency]);

  const productPrice = unitPrice * quantity;
  const purchaseAddress = [
    purchaseCity,
    purchaseCountry,
    purchaseDistrict,
    purchaseRoad,
  ].join(" ");

  return (
    <>
      <Head>
        <title>委託詳情</title>
      </Head>
      <BaseLayout>
        <PageTitle title="委託詳情" />
        <Stack alignItems="center" mb={4}>
          <Stack
            direction={mdDown ? "column" : "row"}
            spacing={mdDown ? 2 : 4}
            sx={{
              width: "100%",
              maxWidth: { xs: 336, md: 1440 },
              px: { md: 4 },
            }}
          >
            <Stack spacing={3} alignItems="center">
              <Paper elevation={mdDown ? 3 : 0} sx={{ p: { xs: 2, md: 0 } }}>
                <Stack spacing={2}>
                  {/* 圖片 */}
                  <Box
                    sx={{
                      position: "relative",
                      width: { xs: 300, md: 450 },
                      height: { xs: 300, md: 450 },
                    }}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={`${name} image`}
                        style={{ objectFit: "cover" }}
                        fill
                        sizes="(max-width: 600px) 300px, 450px"
                      />
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        height="100%"
                        width="100%"
                      />
                    )}
                  </Box>
                  {/* 名稱 (手機) */}
                  {mdDown ? (
                    <Typography variant="h3" textAlign="center">
                      {name}
                    </Typography>
                  ) : null}
                </Stack>
              </Paper>
              {!mdDown ? <BuyingAgentArea /> : null}
            </Stack>
            <Paper elevation={mdDown ? 3 : 0} sx={{ p: 2, flexGrow: 1 }}>
              <Stack spacing={4}>
                {/* 名稱 (電腦) */}
                {!mdDown ? (
                  <Typography variant="h1" weightPreset="bold">
                    {name}
                  </Typography>
                ) : null}
                {/* 詳細 */}
                <DetailItem
                  label="商品價格"
                  value={combineCurrency(productPrice)}
                  valueBold
                />
                <DetailItem
                  label="願付代購費"
                  value={combineCurrency(travelerFee)}
                  valueBold
                />
                <DetailItem
                  label="關稅"
                  value={combineCurrency(tariffFee)}
                  valueBold
                />
                <DetailItem
                  label="平台費"
                  value={combineCurrency(platformFee)}
                  valueBold
                />
                <DetailItem
                  label="總付款金額"
                  value={combineCurrency(totalAmount)}
                  valueVariant="h3"
                  valueBold
                />
                <DetailItem label="商品規格" value={description} />
                <DetailItem label="商品數量" value={quantity} />
                <DetailItem
                  label="是否需要包裝"
                  value={translateBoolean(packaging)}
                />
                <DetailItem
                  label="是否需要購買證明"
                  value={translateBoolean(verification)}
                />
                <DetailItem
                  label="商品購買地點"
                  value={
                    <Stack direction="row" alignItems="center">
                      <Place />
                      {purchaseAddress}
                    </Stack>
                  }
                  multiLine={mdDown}
                />
                <DetailItem
                  label="送達地點"
                  value={
                    <Stack direction="row" alignItems="center">
                      <Place />
                      {destination}
                    </Stack>
                  }
                  multiLine={mdDown}
                />
                <DetailItem
                  label="最晚收到商品時間"
                  value={latestReceiveItemDate}
                  multiLine={mdDown}
                />
                <DetailItem label="備註" value={note} multiLine={mdDown} />
              </Stack>
            </Paper>
            {mdDown ? <BuyingAgentArea /> : null}
          </Stack>
        </Stack>
      </BaseLayout>
    </>
  );
};

export default OrderDetailPage;
