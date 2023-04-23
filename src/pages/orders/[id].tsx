import { Actions } from "@/components/Actions";
import { BidList } from "@/components/BidList";
import { type CancelFormValues } from "@/components/CancelModal";
import { ChosenShopper } from "@/components/ChosenShopper";
import { DetailItem } from "@/components/DetailItem";
import { ImageCarousel } from "@/components/ImageCarousel";
import { PageTitle } from "@/components/PageTitle";
import type { PostponeFormValues } from "@/components/PostponeModal";
import { ShareButton } from "@/components/ShareButton";
import { StatusText } from "@/components/StatusText";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Typography } from "@/components/ui/Typography";
import { useApplyCancelOrder } from "@/hooks/api/useApplyCancelOrder";
import { useApplyPostponeOrder } from "@/hooks/api/useApplyPostponeOrder";
import { useBids } from "@/hooks/api/useBids";
import { useDeleteOrder } from "@/hooks/api/useDeleteOrder";
import { useOrder } from "@/hooks/api/useOrder";
import { useLanguage } from "@/hooks/useLanguage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { Place } from "@mui/icons-material";
import { Box, Paper, Stack } from "@mui/material";
import { intlFormat, parseISO } from "date-fns";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, type ReactNode } from "react";
import { translateBoolean } from "src/utils/translateBoolean";

const AreaWrapper = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  if (isDesktop) return <Box>{children}</Box>;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      {children}
    </Paper>
  );
};

const OrderDetailPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: session } = useSession();

  const lang = useLanguage();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: order } = useOrder(id);
  const { data: bidsData, hasNextPage, fetchNextPage } = useBids(id);
  const { mutate: deleteOrder } = useDeleteOrder();
  const { mutate: applyCancel } = useApplyCancelOrder();
  const { mutate: applyPostpone } = useApplyPostponeOrder();

  const bids = useMemo(
    () => flattenInfinitePaginatedData(bidsData),
    [bidsData]
  );

  if (!order) return null;

  const {
    orderId,
    serialNumber,
    consumerId,
    destinationCountryName,
    destinationCityName,
    destinationCountryCode,
    destinationCityCode,
    latestReceiveItemDate,
    note,
    orderStatus,
    orderItem: {
      orderItemId,
      name,
      description,
      quantity,
      unitPrice,
      purchaseCountryName,
      purchaseCityName,
      purchaseCountryCode,
      purchaseCityCode,
      purchaseDistrict,
      purchaseRoad,
      fileUrls,
    },
    travelerFee,
    tariffFee,
    platformFee,
    totalAmount,
    currency,
    hasNewActivity,
    isPackagingRequired,
    isVerificationRequired,
    createDate,
    updateDate,
    shopper,
  } = order;

  const handleDelete = () => {
    deleteOrder({ orderId });
    router.replace("/orders");
  };
  const handleEdit = () => {
    router.push(`/orders/${orderId}/edit`);
  };
  const handleApplyCancel = (data: CancelFormValues) => {
    applyCancel({
      orderId,
      data: { cancelReason: data.reason, note: data.detail },
    });
  };
  const handleApplyPostpone = (data: PostponeFormValues) => {
    applyPostpone({
      orderId,
      data: { postponeReason: data.reason, note: data.detail },
    });
  };
  const handleFinish = () => {
    console.log({ type: "finish" });
  };

  const withCurrency = (value: number) => `${value} ${currency}`;

  const purchaseAddress = [
    purchaseCityName,
    purchaseCountryName,
    purchaseDistrict,
    purchaseRoad,
  ].join(" ");

  const destinationAddress = [destinationCityName, destinationCountryName].join(
    " "
  );

  const multiline = !isDesktop;
  const perspective = session?.user?.id === consumerId ? "consumer" : "shopper";

  const details = (
    <Stack spacing={4}>
      <DetailItem
        label="商品價格"
        value={withCurrency(unitPrice)}
        valueProps={{ weightPreset: "bold" }}
      />
      <DetailItem
        label="願付代購費"
        value={withCurrency(travelerFee)}
        valueProps={{ weightPreset: "bold" }}
      />
      <DetailItem
        label="關稅"
        value={withCurrency(tariffFee)}
        valueProps={{ weightPreset: "bold" }}
      />
      <DetailItem
        label="平台費"
        value={withCurrency(platformFee)}
        valueProps={{ weightPreset: "bold" }}
      />
      <DetailItem
        label="總付款金額"
        value={withCurrency(totalAmount)}
        valueProps={{ variant: "h3", weightPreset: "bold" }}
      />
      <DetailItem label="商品規格" value={description} />
      <DetailItem label="商品數量" value={quantity} />
      <DetailItem
        label="是否需要包裝"
        value={translateBoolean(isPackagingRequired)}
      />
      <DetailItem
        label="是否需要購買證明"
        value={translateBoolean(isVerificationRequired)}
      />
      <DetailItem
        label="商品購買地點"
        value={
          <Stack direction="row" alignItems="center">
            <Place />
            {purchaseAddress}
          </Stack>
        }
        multiLine={multiline}
      />
      <DetailItem
        label="送達地點"
        value={
          <Stack direction="row" alignItems="center">
            <Place />
            {destinationAddress}
          </Stack>
        }
        multiLine={multiline}
      />
      <DetailItem
        label="最晚收到商品時間"
        value={intlFormat(
          parseISO(latestReceiveItemDate),
          { year: "numeric", month: "numeric", day: "numeric" },
          { locale: lang }
        )}
        multiLine={multiline}
      />
      <DetailItem label="備註" value={note} multiLine={multiline} />
      <DetailItem
        label="訂單編號"
        value={serialNumber}
        labelProps={{ color: "base.300" }}
        valueProps={{ color: "base.300" }}
        multiLine={multiline}
      />
    </Stack>
  );

  const content = (
    <Stack
      direction={isDesktop ? "row" : "column"}
      spacing={isDesktop ? 5 : 2}
      width="100%"
    >
      <Stack spacing={isDesktop ? 6 : 2}>
        {/* Name (Mobile) & Image */}
        <AreaWrapper>
          <Stack
            spacing={2}
            alignItems="center"
            minWidth={{ xs: 300, md: 400 }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              sx={{
                aspectRatio: "1 / 1",
                backgroundColor: (theme) => theme.palette.base[50],
              }}
            >
              {fileUrls.length > 0 ? (
                <ImageCarousel images={fileUrls} />
              ) : (
                <Typography variant="h3" as="span">
                  暫無圖片
                </Typography>
              )}
            </Box>
            {/* Name (Mobile) */}
            {!isDesktop ? (
              <Typography variant="h3" as="h1" textAlign="center">
                {name}
              </Typography>
            ) : null}
          </Stack>
        </AreaWrapper>
        {/* Status */}
        <StatusText perspective={perspective} statusCode={orderStatus} />
        {/* ChosenShopper */}
        {perspective === "consumer" && shopper ? (
          <ChosenShopper {...shopper} />
        ) : null}
        {/* Bids (PC) */}
        {perspective === "consumer" && !shopper ? (
          <BidList
            bids={bids}
            hasMore={hasNextPage}
            onShowMore={() => fetchNextPage()}
            sx={{ display: { xs: "none", md: "block" } }}
          />
        ) : null}
      </Stack>
      <Stack spacing={2} flexGrow={1}>
        {/* Name (PC) */}
        {isDesktop ? (
          <Typography variant="h1" weightPreset="bold" mt={1} mb={4}>
            {name}
          </Typography>
        ) : null}
        {/* Details */}
        <AreaWrapper>{details}</AreaWrapper>
        {/* Bids (Mobile) */}
        {perspective === "consumer" && !shopper ? (
          <BidList
            bids={bids}
            hasMore={hasNextPage}
            onShowMore={() => fetchNextPage()}
            sx={{ display: { xs: "block", md: "none" } }}
          />
        ) : null}
        <Actions
          perspective={perspective}
          statusCode={orderStatus}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onApplyCancel={handleApplyCancel}
          onApplyPostpone={handleApplyPostpone}
          onFinish={handleFinish}
        />
      </Stack>
    </Stack>
  );

  return (
    <>
      <Head>
        <title>委託詳情</title>
      </Head>
      <BaseLayout>
        <PageTitle title="委託詳情" endButton={<ShareButton />} />
        <Box display="flex" justifyContent="center" alignItems="center" mb={12}>
          {isDesktop ? (
            <Paper
              elevation={isDesktop ? 3 : 0}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: { md: 7 },
                py: { md: 5 },
                mx: 2,
                width: "100%",
                maxWidth: 1300,
              }}
            >
              {content}
            </Paper>
          ) : (
            <Box width={336}>{content}</Box>
          )}
        </Box>
      </BaseLayout>
    </>
  );
};

export default OrderDetailPage;
