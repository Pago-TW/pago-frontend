import { useEffect, useMemo, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Add } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

import { BaseLayout } from "@/components/layouts/base-layout";
import { OrderList } from "@/components/order-list";
import { PageTitle } from "@/components/page-title";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Tab } from "@/components/ui/tab";
import { useOrders } from "@/hooks/api/use-orders";
import { useMediaQuery } from "@/hooks/use-media-query";
import { flattenInfinitePaginatedData } from "@/utils/api";

const TABS = [
  { label: "全部", value: "ALL" },
  { label: "待確認", value: "REQUESTED" },
  { label: "待購買", value: "TO_BE_PURCHASED" },
  { label: "待面交", value: "TO_BE_DELIVERED" },
  { label: "已送達", value: "DELIVERED" },
  { label: "已完成", value: "FINISHED" },
  { label: "不成立", value: "CANCELLED" },
] as const;

type Tab = (typeof TABS)[number];

const OrdersPage: NextPage = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ALL");

  const { data: session } = useSession();

  const { ref, inView } = useInView();
  const userId = session?.user?.id;
  const {
    data: ordersData,
    isFetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useOrders({ userId }, { enabled: !!userId });

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const orders = useMemo(
    () => flattenInfinitePaginatedData(ordersData),
    [ordersData]
  );
  const filterOrders = (status: Tab["value"]) => {
    if (!orders) return [];

    if (status === "ALL") {
      return orders;
    }

    return orders.filter((order) => order.orderStatus === status);
  };

  return (
    <>
      <Head>
        <title>我的委託</title>
      </Head>
      <BaseLayout>
        <PageTitle title="我的委託">
          <Button LinkComponent={Link} href="/orders/new">
            <Add />
            新增委託
          </Button>
        </PageTitle>
        <Container>
          <TabContext value={currentTab}>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(_e, v: Tab["value"]) => setCurrentTab(v)}
              >
                {TABS.map((tab) => (
                  <Tab
                    key={tab.value}
                    sx={{
                      fontSize: (theme) => ({
                        xs: theme.typography.pxToRem(16),
                        sm: theme.typography.pxToRem(18),
                      }),
                    }}
                    {...tab}
                  />
                ))}
              </TabList>
            </Box>
            {/* TabPanels */}
            {TABS.map((tab) => (
              <TabPanel key={tab.value} value={tab.value} sx={{ px: 0 }}>
                {isLoading ? (
                  <Stack spacing={3}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Skeleton
                        key={idx}
                        variant="rounded"
                        animation="wave"
                        width="100%"
                        height={isMobile ? 131 : 290}
                      />
                    ))}
                  </Stack>
                ) : (
                  <OrderList items={filterOrders(tab.value)} />
                )}
              </TabPanel>
            ))}
          </TabContext>
          {!isFetching && hasNextPage ? (
            <span
              ref={ref}
              style={{
                visibility: "hidden",
                display: "inline-block",
                height: 1,
              }}
            ></span>
          ) : null}
        </Container>
      </BaseLayout>
    </>
  );
};

export default OrdersPage;
