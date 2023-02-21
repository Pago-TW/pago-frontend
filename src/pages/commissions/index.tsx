import type { Commission } from "@components/CommissionCard";
import { CommissionCard } from "@components/CommissionCard";
import { Header } from "@components/Header";
import { Button } from "@components/ui/Button";
import { FlexCenter } from "@components/ui/FlexCenter";
import { Typography } from "@components/ui/Typography";
import { Add, ArrowBack } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, IconButton, Stack, Tab } from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";

type Tab = {
  label: string;
  value: string;
};

const TABS_: Tab[] = [
  { label: "全部", value: "1" },
  { label: "待確認", value: "2" },
  { label: "待面交", value: "3" },
  { label: "待購買", value: "4" },
  { label: "已完成", value: "5" },
  { label: "不成立", value: "6" },
];

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

const CommissionsPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState("1");

  return (
    <>
      <Header />
      <Box sx={{ mx: { xs: 3, sm: 13 } }}>
        <Box
          sx={{
            my: { xs: 3, md: 8 },
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ mb: { xs: 3, md: 0 } }}>
            <IconButton
              sx={{
                display: { xs: "block", sm: "none" },
                position: "absolute",
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography
              variant="h1"
              weightPreset="bold"
              sx={{
                textAlign: { xs: "center", md: "left" },
              }}
            >
              我的委託
            </Typography>
          </Box>
          <FlexCenter main>
            <Button>
              <Add />
              新增委託
            </Button>
          </FlexCenter>
        </Box>
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, v) => setCurrentTab(v)}
            >
              {TABS_.map((tab, idx) => (
                <Tab
                  key={idx}
                  sx={{
                    minWidth: { xs: "calc(100% / 3)", md: "fit-content" },
                    fontSize: 18,
                    flex: 1,
                  }}
                  {...tab}
                />
              ))}
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ px: 0 }}>
            <Stack spacing={2}>
              {COMMISSIONS.map((comm, idx) => (
                <CommissionCard key={idx} {...comm} />
              ))}
            </Stack>
          </TabPanel>
          <TabPanel value="2" sx={{ px: 0 }}></TabPanel>
          <TabPanel value="3" sx={{ px: 0 }}></TabPanel>
          <TabPanel value="4" sx={{ px: 0 }}></TabPanel>
          <TabPanel value="5" sx={{ px: 0 }}></TabPanel>
          <TabPanel value="6" sx={{ px: 0 }}></TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default CommissionsPage;
