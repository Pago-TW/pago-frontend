import { OrderItem } from "@/components/OrderItem";
import { PageTitle } from "@/components/PageTitle";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Button } from "@/components/ui/Button";
import { Paper } from "@/components/ui/Paper";
import { Typography } from "@/components/ui/Typography";
import { useMatchingShoppers } from "@/hooks/api/useMatchingShoppers";
import { useOrder } from "@/hooks/api/useOrder";
import type { Shopper } from "@/types/order";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { ArrowDownward } from "@mui/icons-material";
import { Avatar, Box, Container, Link, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";

type ShopperChooserProps = Pick<Shopper, "userId" | "fullName" | "avatarUrl">;

const ShopperChooser: FC<ShopperChooserProps> = ({
  userId,
  fullName,
  avatarUrl,
}) => {
  return (
    <Paper sx={{ px: 1.5, py: 1 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar src={avatarUrl} />
        <Typography variant="h5" flexGrow={1} noWrap>
          {fullName}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          LinkComponent={Link}
          href={`/users/${userId}`}
        >
          查看代購者詳情
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

  const isOwner = userId !== undefined && userId === order?.consumerId;

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
    if (inView && hasNextPage) fetchNextPage();
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
            <OrderItem {...order} />
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
