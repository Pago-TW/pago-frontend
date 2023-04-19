import { AvailableShoppers } from "@/components/AvailableShoppers";
import { DetailItem } from "@/components/DetailItem";
import { ImageCarousel } from "@/components/ImageCarousel";
import { PageTitle } from "@/components/PageTitle";
import { ShareButton } from "@/components/ShareButton";
import { StatusText } from "@/components/StatusText";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import type { ButtonProps } from "@/components/ui/Button";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { useOrder } from "@/hooks/api/useOrder";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Perspective } from "@/types/misc";
import type { StatusCode } from "@/types/order";
import { Place } from "@mui/icons-material";
import { Box, Paper, Stack } from "@mui/material";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { type ReactNode } from "react";
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

const MobileActionsWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Paper
      elevation={5}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: { xs: "flex", sm: "none" },
        justifyContent: "center",
        gap: 3,
        px: 4,
        py: 2,
      }}
    >
      {children}
    </Paper>
  );
};

const ActionButton = (
  props: Pick<ButtonProps, "variant" | "color" | "children">
) => {
  const { variant, color, children } = props;

  return (
    <Button
      variant={variant}
      size="medium"
      color={color}
      sx={{ maxWidth: 144, flexGrow: 1 }}
    >
      {children}
    </Button>
  );
};

const OrderDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: session } = useSession();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: order } = useOrder(id as string);

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
  } = order;

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
    <>
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
        value={latestReceiveItemDate}
        multiLine={multiline}
      />
      <DetailItem label="備註" value={note} multiLine={multiline} />
    </>
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
          <Stack spacing={2} alignItems="center">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width={{ xs: 300, md: "100%" }}
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
            <Typography
              variant="h3"
              as="h1"
              textAlign="center"
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {name}
            </Typography>
          </Stack>
        </AreaWrapper>
        {/* Status */}
        <StatusText perspective={perspective} statusCode={orderStatus} />
        {/* AvailableShoppers (PC) */}
        <AvailableShoppers sx={{ display: { xs: "none", md: "block" } }} />
      </Stack>
      <Stack gap={2} flexGrow={1}>
        {/* Name (PC) */}
        <Typography
          variant="h1"
          weightPreset="bold"
          mt={1}
          mb={4}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {name}
        </Typography>
        <AreaWrapper>
          <Stack spacing={4}>
            {/* Details */}
            {details}
          </Stack>
        </AreaWrapper>
        {/* AvailableShoppers (Mobile) */}
        <AvailableShoppers sx={{ display: { xs: "block", md: "none" } }} />
      </Stack>
    </Stack>
  );

  let actions;
  if (perspective === "consumer") {
    if (orderStatus === "REQUESTED") {
      actions = (
        <>
          <ActionButton variant="outlined" color="error">
            刪除委託
          </ActionButton>
          <ActionButton>編輯委託</ActionButton>
        </>
      );
    } else if (orderStatus === "TO_BE_PURCHASED") {
      actions = (
        <>
          <ActionButton variant="outlined" color="error">
            取消委託
          </ActionButton>
          <ActionButton>申請延期</ActionButton>
        </>
      );
    } else if (
      orderStatus === "TO_BE_DELIVERED" ||
      orderStatus === "DELIVERED"
    ) {
      actions = (
        <>
          <ActionButton>申請延期</ActionButton>
          <ActionButton>完成委託</ActionButton>
        </>
      );
    }
  }

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
              elevation={3}
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
        {actions ? (
          <MobileActionsWrapper>{actions}</MobileActionsWrapper>
        ) : null}
      </BaseLayout>
    </>
  );
};

export default OrderDetailPage;
