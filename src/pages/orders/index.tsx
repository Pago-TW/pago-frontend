import { BaseLayout } from "@/components/layouts/BaseLayout";
import OrderList from "@/components/OrderList";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/Button";
import { useOrders } from "@/hooks/api/useOrders";
import { Add } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

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

const StyledTab = styled(Tab)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    minWidth: "fit-content",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "calc(100% / 3)",
  },
  fontSize: 18,
  flex: 1,
}));

const OrdersPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ALL");

  const { data: orders } = useOrders();

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
          <Button>
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
                onChange={(e, v) => setCurrentTab(v)}
              >
                {TABS.map((tab, idx) => (
                  <StyledTab key={idx} {...tab} />
                ))}
              </TabList>
            </Box>
            {/* TabPanels */}
            {TABS.map((tab, idx) => (
              <TabPanel key={idx} value={tab.value} sx={{ px: 0 }}>
                <OrderList items={filterOrders(tab.value)} />
              </TabPanel>
            ))}
          </TabContext>
        </Container>
      </BaseLayout>
    </>
  );
};

export default OrdersPage;
