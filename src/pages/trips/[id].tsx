import { DetailItem } from "@/components/DetailItem";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PaperLayout } from "@/components/layouts/PaperLayout";
import type { Order } from "@/components/OrderItem";
import { OrderList } from "@/components/OrderList";
import { PageTitle } from "@/components/PageTitle";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Tab } from "@/components/ui/Tab";
import { Typography } from "@/components/ui/Typography";
import { useTrip } from "@/hooks/api/useTrip";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
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

const ORDERS: Order[] = [
  {
    orderId: "bbfa5a6a-13ce-49e4-b426-06ba367819bc",
    orderItemId: "286194de-341e-476d-8ace-ef77f76baa5d",
    consumerId: "0b527532-e1b3-4125-9759-8a98250383bb",
    orderItem: {
      name: "iphone 14 pro",
      imageUrl: "https://picsum.photos/1024/1024",
      description: "purple",
      quantity: 1,
      unitPrice: 31000,
      purchaseCountry: "Japan",
      purchaseCity: "Tokyo",
      purchaseDistrict: "somewhere",
      purchaseRoad: "somewhere",
    },
    packaging: true,
    verification: true,
    destination: "Taipei101",
    travelerFee: 99,
    currency: "TWD",
    platformFee: 5,
    tariffFee: 100,
    note: "the faster the better, thanks",
    orderStatus: "REQUESTED",
    latestReceiveItemDate: "2022-12-25 23:37:50",
    createDate: "2022-11-25 23:37:50",
    updateDate: "2022-11-25 23:37:50",
    totalAmount: 9999,
    hasNewActivity: false,
  },
  {
    orderId: "8d66753e-7263-4287-b56d-a7596e7ccea2",
    orderItemId: "a910bf2d-4491-41a0-9b95-c8a5bb74ce94",
    consumerId: "7f184e12-24a7-4e71-8493-b12c3a6526ce",
    orderItem: {
      name: "iphone 14 pro",
      imageUrl: "https://picsum.photos/1024/1024",
      description: "purple",
      quantity: 1,
      unitPrice: 31000,
      purchaseCountry: "Japan",
      purchaseCity: "Tokyo",
      purchaseDistrict: "somewhere",
      purchaseRoad: "somewhere",
    },
    packaging: false,
    verification: false,
    destination: "Taipei101",
    travelerFee: 99,
    currency: "TWD",
    platformFee: 7,
    tariffFee: 99,
    note: "the faster the better, thanks",
    orderStatus: "REQUESTED",
    latestReceiveItemDate: "2022-12-25 23:37:50",
    createDate: "2022-11-25 23:37:50",
    updateDate: "2022-11-25 23:37:50",
    totalAmount: 9999,
    hasNewActivity: false,
  },
];

const TripDetailPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ALL");

  const router = useRouter();
  const { id } = router.query;

  const { data: trip } = useTrip(id as string);

  if (!trip) return null;

  const {
    tripId,
    travelerId,
    profit,
    fromCountry,
    fromCity,
    toCountry,
    toCity,
    arrivalDate,
    createDate,
    updateDate,
  } = trip;

  const filterOrders = (status: Tab["value"]) => {
    if (status === "ALL") {
      return ORDERS;
    }
    return ORDERS.filter((order) => order.orderStatus === status);
  };

  return (
    <>
      <Head>
        <title>旅途詳情</title>
      </Head>
      <BaseLayout>
        <PageTitle title="旅途詳情" endButton={<ShareButton />} />
        <Container>
          <Stack component="main" spacing={2}>
            <PaperLayout>
              <Stack spacing={3}>
                <Typography variant="h3" weightPreset="bold" textAlign="center">
                  {fromCountry} → {toCountry}
                </Typography>
                <Typography
                  variant="h6"
                  weightPreset="light"
                  textAlign="center"
                  color="base.800"
                >
                  抵達時間: {arrivalDate}
                </Typography>
                <DetailItem label="淨賺" value={profit} />
                <DetailItem label="已接單委託" value="2筆" />
                <DetailItem label="與本趟旅途相符之委託還有" value="20筆" />
                <Stack direction="row" spacing={2}>
                  <Button variant="outlined" size="medium" sx={{ flexGrow: 1 }}>
                    申請延期
                  </Button>
                  <Button size="medium" sx={{ flexGrow: 1 }}>
                    編輯旅途
                  </Button>
                </Stack>
              </Stack>
            </PaperLayout>
            <Stack component="section" spacing={2}>
              <TabContext value={currentTab}>
                <Box borderBottom={1} borderColor="divider">
                  <TabList
                    variant="scrollable"
                    allowScrollButtonsMobile
                    onChange={(_e, v) => setCurrentTab(v)}
                  >
                    {TABS.map((tab) => (
                      <Tab key={tab.value} {...tab} />
                    ))}
                  </TabList>
                </Box>
                {TABS.map((tab) => (
                  <TabPanel key={tab.value} value={tab.value} sx={{ p: 0 }}>
                    <OrderList items={filterOrders(tab.value)} />
                  </TabPanel>
                ))}
              </TabContext>
            </Stack>
            <Stack component="section" spacing={2}>
              <Typography variant="h3" weightPreset="bold" textAlign="center">
                其他相符委託
              </Typography>
              <OrderList items={filterOrders("ALL")} />
              <Stack direction="row" justifyContent="center">
                <Link>顯示更多</Link>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export default TripDetailPage;
