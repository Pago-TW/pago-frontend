import { useMemo, type ReactNode } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Place } from "@mui/icons-material";
import { Box, Paper, Stack } from "@mui/material";
import { useSession } from "next-auth/react";

import { Actions } from "@/components/actions/actions";
import { AvailableShoppers } from "@/components/available-shoppers";
import { BidList } from "@/components/bid-list";
import { DetailItem } from "@/components/detail-item";
import { FavoriteButton } from "@/components/favorite-button";
import { ImageCarousel } from "@/components/image-carousel";
import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";
import { ShareButton } from "@/components/share-button";
import { StatusBox } from "@/components/status-box";
import { Typography } from "@/components/ui/typography";
import { UserCard } from "@/components/user-card";
import { useBids } from "@/hooks/api/use-bids";
import { useCountryCity } from "@/hooks/api/use-country-city";
import { useMatchingShoppers } from "@/hooks/api/use-matching-shoppers";
import { useOrder } from "@/hooks/api/use-order";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Order } from "@/types/order";
import {
  extractCountriesCities,
  flattenInfinitePaginatedData,
} from "@/utils/api";
import { formatDate } from "@/utils/date";
import { translateBoolean } from "@/utils/misc";

const AreaWrapper = ({ children }: { children: ReactNode }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  if (isDesktop) return <Box>{children}</Box>;

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      {children}
    </Paper>
  );
};

const DetailList = (
  props: Pick<
    Order,
    | "currency"
    | "destinationCountryCode"
    | "destinationCityCode"
    | "travelerFee"
    | "platformFee"
    | "totalAmount"
    | "isPackagingRequired"
    | "isVerificationRequired"
    | "latestReceiveItemDate"
    | "note"
    | "serialNumber"
  > &
    Pick<
      Order["orderItem"],
      | "purchaseCountryCode"
      | "purchaseCityCode"
      | "purchaseDistrict"
      | "purchaseRoad"
      | "unitPrice"
      | "description"
      | "quantity"
    >
) => {
  const {
    currency,
    purchaseCountryCode,
    purchaseCityCode,
    purchaseDistrict,
    purchaseRoad,
    destinationCountryCode,
    destinationCityCode,
    unitPrice,
    travelerFee,
    platformFee,
    totalAmount,
    description,
    quantity,
    isPackagingRequired,
    isVerificationRequired,
    latestReceiveItemDate,
    note,
    serialNumber,
  } = props;

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: options = [] } = useCountryCity({ includeAny: true });
  const { countries, cities } = useMemo(
    () => extractCountriesCities(options),
    [options]
  );

  const withCurrency = (value: number) => `${value} ${currency}`;

  const getCountryChineseName = (countryCode: string) =>
    countries[countryCode]?.chineseName ?? countryCode;
  const getCityChineseName = (cityCode: string) =>
    cities[cityCode]?.chineseName ?? cityCode;

  const purchaseCountryName = getCountryChineseName(purchaseCountryCode);
  const purchaseCityName = getCityChineseName(purchaseCityCode);
  const purchaseAddress = [
    purchaseCityName,
    purchaseCountryName,
    purchaseDistrict,
    purchaseRoad,
  ].join(" ");
  const destinationCountryName = getCountryChineseName(destinationCountryCode);
  const destinationCityName = getCityChineseName(destinationCityCode);
  const destinationAddress = [destinationCityName, destinationCountryName].join(
    " "
  );

  const multiline = !isDesktop;

  return (
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
      <Stack spacing={1}>
        <DetailItem
          label="平台費"
          value={withCurrency(platformFee)}
          valueProps={{ weightPreset: "bold" }}
        />
        <Typography variant="h6" as="p" weightPreset="light" color="base.300">
          平台費 = 商品總價 × 4.5%
        </Typography>
      </Stack>
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
        value={formatDate(latestReceiveItemDate)}
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
};

const OrderDetailPage: NextPage = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: order } = useOrder(orderId);

  const isOwner = !!userId && userId === order?.consumer.userId;
  const isShopper = !!userId && userId === order?.shopper?.userId;
  const isOwnerOrShopper = isOwner || isShopper;
  const matched = !!order?.shopper;

  const { data: shoppersData } = useMatchingShoppers(orderId, undefined, {
    // Fetch shoppers only if the view is owner and the order is not matched
    enabled: isOwner && !matched,
  });
  const {
    data: bidsData,
    hasNextPage: hasNextBidsPage,
    fetchNextPage: fetchNextBidsPage,
  } = useBids(orderId, undefined, {
    // Fetch bids only if the order is not matched
    enabled: !matched,
  });

  // Memoize the data to prevent heavy computations
  const shoppers = useMemo(
    () => flattenInfinitePaginatedData(shoppersData),
    [shoppersData]
  );
  const bids = useMemo(
    () => flattenInfinitePaginatedData(bidsData),
    [bidsData]
  );

  if (!order) return null;

  const {
    consumer,
    serialNumber,
    destinationCountryCode,
    destinationCityCode,
    latestReceiveItemDate,
    note,
    orderStatus,
    orderItem: {
      name,
      description,
      quantity,
      unitPrice,
      purchaseCountryCode,
      purchaseCityCode,
      purchaseDistrict,
      purchaseRoad,
      fileUrls,
    },
    travelerFee,
    platformFee,
    totalAmount,
    currency,
    isPackagingRequired,
    isVerificationRequired,
    shopper,
    isApplicant,
    isBidder,
    hasCancellationRecord,
    hasPostponeRecord,
  } = order;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Pago 委託詳情頁面",
          text:
            "由 Pago 用戶: " +
            order.consumer.fullName +
            " 發布的委託: " +
            order.orderItem.name,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Something went wrong sharing the trip", error);
      }
    } else {
      console.log("Your browser does not support the Share API");
    }
  };

  const handleFavorite = () => {
    console.log({ type: "favorite" });
  };

  const perspective = isOwner ? "consumer" : "shopper";

  const userCard = isOwner ? (
    // If the viewer is owner and the shopper is matched, display shopper's card
    shopper ? (
      <UserCard
        userId={shopper.userId}
        avatarUrl={shopper.avatarUrl}
        fullName={shopper.fullName}
        latestDeliveryDate={shopper.latestDeliveryDate}
        perspective="consumer"
      />
    ) : null
  ) : (
    // If the viewer is shopper or other ppl, display consumer's card
    <UserCard
      userId={consumer.userId}
      avatarUrl={consumer.avatarUrl}
      fullName={consumer.fullName}
      // The latest delivery date may be undefined if the order is not matched yet
      latestDeliveryDate={shopper?.latestDeliveryDate}
      perspective="shopper"
    />
  );
  const bidList =
    // Only display when the order is not matched yet
    !shopper ? (
      <BidList
        bids={bids}
        hasMore={hasNextBidsPage}
        onShowMore={() => fetchNextBidsPage()}
        isOwner={isOwner}
      />
    ) : null;
  const availableShoppers =
    // Only display when viewer is owner and the order is not matched yet
    isOwner && !shopper ? (
      <AvailableShoppers
        orderId={orderId}
        shoppers={shoppers}
        total={shoppersData?.pages[0]?.total}
      />
    ) : null;
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
              <Typography
                variant="h3"
                as="h1"
                textAlign="center"
                noWrap
                sx={{ width: "100%" }}
              >
                {name}
              </Typography>
            ) : null}
          </Stack>
        </AreaWrapper>
        {/* Status, display when not matched (i.e. REQUESTED status) or when view is owner/shopper */}
        {(!matched && isBidder) || isOwnerOrShopper ? (
          <StatusBox
            perspective={perspective}
            status={orderStatus}
            isApplicant={isApplicant}
          />
        ) : null}
        {/* Consumer info, display when the order is not matched yet, or the view is the owner/shopper */}
        {(!matched || isOwnerOrShopper) && userCard}
        {/* Bids (PC) */}
        {isDesktop ? bidList : null}
        {/* AvailableShoppers (PC) */}
        {isDesktop ? availableShoppers : null}
      </Stack>
      <Stack spacing={2} flexGrow={1}>
        {/* Name (PC) */}
        {isDesktop ? (
          <Typography variant="h1" weightPreset="bold" mt={1} mb={4}>
            {name}
          </Typography>
        ) : null}
        {/* Details */}
        <AreaWrapper>
          <DetailList
            currency={currency}
            purchaseCityCode={purchaseCityCode}
            purchaseCountryCode={purchaseCountryCode}
            purchaseDistrict={purchaseDistrict}
            purchaseRoad={purchaseRoad}
            destinationCityCode={destinationCityCode}
            destinationCountryCode={destinationCountryCode}
            unitPrice={unitPrice}
            travelerFee={travelerFee}
            platformFee={platformFee}
            totalAmount={totalAmount}
            description={description}
            quantity={quantity}
            isPackagingRequired={isPackagingRequired}
            isVerificationRequired={isVerificationRequired}
            latestReceiveItemDate={latestReceiveItemDate}
            note={note}
            serialNumber={serialNumber}
          />
        </AreaWrapper>
        {/* Bids (Mobile) */}
        {!isDesktop ? bidList : null}
        {/* AvailableShoppers (Mobile) */}
        {!isDesktop ? availableShoppers : null}
        <Actions
          perspective={perspective}
          status={orderStatus}
          isBidder={isBidder}
          isShopper={isShopper}
          isApplicant={isApplicant}
          hasCancellationRecord={hasCancellationRecord}
          hasPostponeRecord={hasPostponeRecord}
          // TODO: improve this or something idk
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          shopperId={shopper?.userId!}
          consumerId={consumer.userId}
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
        <PageTitle
          title="委託詳情"
          endButton={
            isOwner ? (
              <ShareButton onClick={handleShare} sx={{ color: "#335891" }} />
            ) : (
              <FavoriteButton onClick={handleFavorite} />
            )
          }
        />
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
