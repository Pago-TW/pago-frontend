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
    orderId: "514f51ff7e944e40b879e2d9a06d5311",
    serialNumber: "230409TPE37FQM",
    consumerId: "cc0fc75a5a854b1e9980d4acbe82086d",
    destinationCountryName: "Taiwan, Province of China",
    destinationCityName: "Taipei",
    destinationCountryCode: "TW",
    destinationCityCode: "TPE",
    latestReceiveItemDate: "2022-12-25T23:37:50.000+00:00",
    note: "the faster the better, thanks",
    orderStatus: "TO_BE_DELIVERED",
    orderItem: {
      orderItemId: "84960255db5547ffa0fdb62706b85a19",
      name: "新的商品名稱3332",
      description: "更新後的description唷",
      quantity: 100,
      unitPrice: 31000,
      purchaseCountryName: "Japan",
      purchaseCityName: "Tokyo",
      purchaseCountryCode: "JP",
      purchaseCityCode: "TKO",
      purchaseDistrict: "somewhere",
      purchaseRoad: "somewhere",
      fileUrls: [
        "https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/f9fd2bcee2da46bf973447bcc6fdc484_70170014.JPG",
      ],
    },
    travelerFee: 99,
    tariffFee: 77500.0,
    platformFee: 139500.0,
    totalAmount: 3317099.0,
    currency: "TWD",
    hasNewActivity: false,
    isPackagingRequired: true,
    isVerificationRequired: false,
    createDate: "2023-04-09T14:12:49.000+00:00",
    updateDate: "2023-04-09T14:33:43.000+00:00",
  },
  {
    orderId: "e27f6dfbd4b04bf78c7563b25a4e67d9",
    serialNumber: "230409TPEANIL1",
    consumerId: "cc0fc75a5a854b1e9980d4acbe82086d",
    destinationCountryName: "Taiwan, Province of China",
    destinationCityName: "Taipei",
    destinationCountryCode: "TW",
    destinationCityCode: "TPE",
    latestReceiveItemDate: "2022-12-25T23:37:50.000+00:00",
    note: "the faster the better, thanks",
    orderStatus: "REQUESTED",
    orderItem: {
      orderItemId: "e70bd85841604f20a808b438018f002d",
      name: "新的商品名稱222",
      description: "更新後的description唷",
      quantity: 100,
      unitPrice: 31000,
      purchaseCountryName: "Japan",
      purchaseCityName: "Tokyo",
      purchaseCountryCode: "JP",
      purchaseCityCode: "TKO",
      purchaseDistrict: "somewhere",
      purchaseRoad: "somewhere",
      fileUrls: [
        "https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/73244f2a261d4b28a3b4e2bdb61f8678_70170014.JPG",
      ],
    },
    travelerFee: 99,
    tariffFee: 77500.0,
    platformFee: 139500.0,
    totalAmount: 3317099.0,
    currency: "TWD",
    hasNewActivity: false,
    isPackagingRequired: true,
    isVerificationRequired: false,
    createDate: "2023-04-09T12:29:55.000+00:00",
    updateDate: "2023-04-09T13:36:32.000+00:00",
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
