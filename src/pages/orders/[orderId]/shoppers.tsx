import { useEffect, useMemo, type FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { ArrowDownward } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

import { BaseLayout } from "@/components/layouts/base-layout";
import { OrderItem } from "@/components/order-item";
import { PageTitle } from "@/components/page-title";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Paper } from "@/components/ui/paper";
import { Typography } from "@/components/ui/typography";
import { useMatchingShoppers } from "@/hooks/api/use-matching-shoppers";
import { useOrder } from "@/hooks/api/use-order";
import { useChatroomStore } from "@/store/ui/use-chatroom-store";
import type { OrderShopper } from "@/types/order";
import { flattenInfinitePaginatedData } from "@/utils/api";
import { getUserProfileUrl } from "@/utils/user";

type ShopperChooserProps = Pick<
  OrderShopper,
  "userId" | "fullName" | "avatarUrl"
>;

const ShopperChooser: FC<ShopperChooserProps> = ({
  userId,
  fullName,
  avatarUrl,
}) => {
  const setOpen = useChatroomStore((state) => state.setOpen);
  const setChatWith = useChatroomStore((state) => state.setChatWith);

  const handleSendMessageClick = () => {
    setOpen(true);
    setChatWith(userId);
  };

  return (
    <Paper sx={{ px: 1.5, py: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={avatarUrl} href={getUserProfileUrl(userId)} />
        <Typography variant="h5" flexGrow={1} noWrap>
          {fullName}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleSendMessageClick}
        >
          傳送訊息
        </Button>
      </Stack>
    </Paper>
  );
};

export default function OrderShoppersPage() {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { data: order } = useOrder(orderId);

  const isOwner = userId !== undefined && userId === order?.consumer.userId;

  const {
    data: shoppersData,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useMatchingShoppers(orderId, undefined, {
    enabled: isOwner && !order?.shopper,
  });

  const { ref, inView } = useInView();

  const shoppers = useMemo(
    () => flattenInfinitePaginatedData(shoppersData),
    [shoppersData]
  );

  useEffect(() => {
    if (inView && hasNextPage) void fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (!order) return null;

  return (
    <>
      <Head>
        <title>媒合結果</title>
      </Head>
      <BaseLayout>
        <PageTitle title="媒合結果" />
        <Container>
          <Box>
            <OrderItem
              orderStatus={order.orderStatus}
              currency={order.currency}
              travelerFee={order.travelerFee}
              totalAmount={order.totalAmount}
              latestReceiveItemDate={order.latestReceiveItemDate}
              destinationCountryCode={order.destinationCountryCode}
              destinationCityCode={order.destinationCityCode}
              destinationCountryName={order.destinationCountryName}
              destinationCityName={order.destinationCityName}
              isPackagingRequired={order.isPackagingRequired}
              name={order.orderItem.name}
              description={order.orderItem.description}
              quantity={order.orderItem.quantity}
              fileUrls={order.orderItem.fileUrls}
              purchaseCountryName={order.orderItem.purchaseCountryName}
              purchaseCityName={order.orderItem.purchaseCityName}
              purchaseCountryCode={order.orderItem.purchaseCountryCode}
              purchaseCityCode={order.orderItem.purchaseCityCode}
              createDate={order.createDate}
            />
            <Box mt={4}>
              <Typography variant="h4" textAlign="center">
                以下代購者的旅途與您的委託相符
              </Typography>
              <Stack spacing={2} mt={3}>
                {shoppers.map((shopper) => (
                  <ShopperChooser key={shopper.userId} {...shopper} />
                ))}
                <Button
                  ref={ref}
                  variant="outlined"
                  size="small"
                  startIcon={<ArrowDownward />}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage}
                  loading={isFetching}
                >
                  {hasNextPage ? "查看更多" : "沒有更多了"}
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </BaseLayout>
    </>
  );
}
