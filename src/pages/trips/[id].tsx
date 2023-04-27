import { DetailItem } from "@/components/DetailItem";
import { OrderList } from "@/components/OrderList";
import { PageTitle } from "@/components/PageTitle";
import { ShareButton } from "@/components/ShareButton";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PaperLayout } from "@/components/layouts/PaperLayout";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Tab } from "@/components/ui/Tab";
import { Typography } from "@/components/ui/Typography";
import { useMatchingOrders } from "@/hooks/api/useMatchingOrders";
import { useTrip } from "@/hooks/api/useTrip";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

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

const TripDetailPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ALL");

  const router = useRouter();
  const id = router.query.id as string;

  const { data: trip } = useTrip(id);
  const { data: matchedOrdersData } = useMatchingOrders(id);

  const matchedOrders = useMemo(() => {
    return flattenInfinitePaginatedData(matchedOrdersData);
  }, [matchedOrdersData]);

  if (!trip) return null;

  const {
    tripId,
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
    if (!matchedOrders) return [];

    if (status === "ALL") return matchedOrders;

    return matchedOrders.filter((order) => order.orderStatus === status);
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
