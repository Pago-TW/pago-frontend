import { BaseLayout } from "@/components/layouts/BaseLayout";
import { OrderList } from "@/components/OrderList";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Tab } from "@/components/ui/Tab";
import { useOrders } from "@/hooks/api/useOrders";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { Add } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container } from "@mui/material";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

const TABS = [
  { label: "全部", value: "ALL" },
  { label: "待確認", value: "REQUESTED" },
  { label: "待購買", value: "TO_BE_PURCHASED" },
  { label: "待面交", value: "TO_BE_DELIVERED" },
  { label: "已送達", value: "DELIVERED" },
  { label: "已完成", value: "FINISHED" },
  { label: "不成立", value: "CANCELED" },
] as const;

type Tab = (typeof TABS)[number];

const OrdersPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ALL");

  const { data: session } = useSession();

  const { ref, inView } = useInView();
  const userId = session?.user?.id;
  const {
    data: ordersData,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = useOrders({ userId }, { enabled: !!userId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
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
                onChange={(_e, v) => setCurrentTab(v)}
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
                <OrderList items={filterOrders(tab.value)} />
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
