import type { Commission } from "@components/CommissionCard";
import { CommissionCard } from "@components/CommissionCard";
import { Header } from "@components/Header";
import { PageTitle } from "@components/PageTitle";
import { Button } from "@components/ui/Button";
import { Add } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Stack, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const TABS = [
  { label: "全部", value: "ALL" },
  { label: "待確認", value: "TO_BE_CONFIRMED" },
  { label: "待面交", value: "TO_BE_DELIVERED" },
  { label: "待購買", value: "TO_BE_PURCHASED" },
  { label: "已完成", value: "DONE" },
  { label: "不成立", value: "CANCELED" },
] as const;

type Tab = (typeof TABS)[number];

const COMMISSIONS: Commission[] = [
  {
    name: "商品名稱 1",
    imageUrl: "",
    description: "商品規格 1",
    orderStatus: "待確認",
    quantity: 111111,
    amount: 111111,
    currency: "NT$",
  },
  {
    name: "商品名稱 2",
    imageUrl: "",
    description: "商品規格 2",
    orderStatus: "待面交",
    quantity: 222222,
    amount: 222222,
    currency: "NT$",
  },
  {
    name: "商品名稱 3",
    imageUrl: "",
    description: "商品規格 3",
    orderStatus: "待購買",
    quantity: 333333,
    amount: 333333,
    currency: "NT$",
  },
  {
    name: "商品名稱 4",
    imageUrl: "",
    description: "商品規格 4",
    orderStatus: "已完成",
    quantity: 444444,
    amount: 444444,
    currency: "NT$",
  },
  {
    name: "商品名稱 5",
    imageUrl: "",
    description: "商品規格 5",
    orderStatus: "不成立",
    quantity: 555555,
    amount: 555555,
    currency: "NT$",
  },
];

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

const CommissionsPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ALL");

  const filterCommissions = (status: Tab["label"]) => {
    if (status === "全部") {
      return COMMISSIONS;
    }
    return COMMISSIONS.filter((comm) => comm.orderStatus === status);
  };

  return (
    <>
      <Head>
        <title>我的委託</title>
      </Head>
      <Header />
      <Box sx={{ mx: { xs: 3, sm: 13 }, my: { xs: 3, md: 8 } }}>
        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PageTitle title="我的委託" />
          {/* 新增委託按鈕 */}
          <Stack justifyContent="center" sx={{ mt: { xs: 3, md: 0 } }}>
            <Button>
              <Add />
              新增委託
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box sx={{ mx: { xs: 3, sm: 13 } }}>
        <Box sx={{ mx: "auto", maxWidth: 1424 }}>
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
                <Stack spacing={2}>
                  {filterCommissions(tab.label).map((comm, idx) => (
                    <CommissionCard key={idx} {...comm} />
                  ))}
                </Stack>
              </TabPanel>
            ))}
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default CommissionsPage;
