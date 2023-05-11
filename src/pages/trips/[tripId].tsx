import { DetailItem } from "@/components/DetailItem";
import { OrderList } from "@/components/OrderList";
import { PageTitle } from "@/components/PageTitle";
import TripPageTitle from "@/components/TripPageTitle";
import { ShareButton } from "@/components/ShareButton";
import { ShowMoreButton } from "@/components/ShowMoreButton";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PaperLayout } from "@/components/layouts/PaperLayout";
import { Button } from "@/components/ui/Button";
import { Tab } from "@/components/ui/Tab";
import { Typography } from "@/components/ui/Typography";
import { useMatchingOrders } from "@/hooks/api/useMatchingOrders";
import { useOrders } from "@/hooks/api/useOrders";
import { useTrip } from "@/hooks/api/useTrip";
import { useLocale } from "@/hooks/useLocale";
import type { Trip } from "@/types/trip";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { formatDate } from "@/utils/formatDateTime";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import type { FC } from "react";
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

type TripInfoProps = Pick<
  Trip,
  "fromCountryChineseName" | "toCountryChineseName" | "arrivalDate" | "profit"
> & {
  totalTripOrders?: number;
  totalMatchedOrders?: number;
};

const TripInfo: FC<TripInfoProps> = ({
  fromCountryChineseName,
  toCountryChineseName,
  arrivalDate,
  profit,
  totalTripOrders,
  totalMatchedOrders,
}) => {
  const locale = useLocale();

  const formattedArrivalDate = formatDate({
    date: arrivalDate,
    locale,
  });

  return (
    <PaperLayout>
      <Stack spacing={3}>
        <Typography variant="h3" weightPreset="bold" textAlign="center">
          {fromCountryChineseName} → {toCountryChineseName}
        </Typography>
        <Typography
          variant="h6"
          weightPreset="light"
          textAlign="center"
          color="base.800"
        >
          抵達時間: {formattedArrivalDate}
        </Typography>
        {profit !== undefined && <DetailItem label="預計淨賺" value={profit} />}
        {totalTripOrders !== undefined && (
          <DetailItem label="已接單委託" value={`${totalTripOrders}筆`} />
        )}
        {totalMatchedOrders !== undefined && (
          <DetailItem
            label="與本趟旅途相符之委託還有"
            value={`${totalMatchedOrders}筆`}
          />
        )}
        <Stack direction="row" spacing={2}>
          <Button size="medium" sx={{ flexGrow: 1 }}>
            編輯旅途
          </Button>
        </Stack>
      </Stack>
    </PaperLayout>
  );
};

const TripDetailPage: NextPage = () => {
  const router = useRouter();
  const tripId = router.query.tripId as string;

  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ALL");

  const { data: trip } = useTrip(tripId);
  const { data: tripOrdersData } = useOrders({ tripId });
  const {
    data: matchedOrdersData,
    hasNextPage: hasNextMatchedOrdersPage,
    fetchNextPage: fetchNextMatchedOrdersPage,
  } = useMatchingOrders(tripId);

  const tripOrders = useMemo(() => {
    return flattenInfinitePaginatedData(tripOrdersData);
  }, [tripOrdersData]);
  const matchedOrders = useMemo(() => {
    return flattenInfinitePaginatedData(matchedOrdersData);
  }, [matchedOrdersData]);

  const totalTripOrders =
    tripOrdersData?.pages[tripOrdersData.pages.length - 1]?.total;
  const totalMatchedOrders =
    matchedOrdersData?.pages[matchedOrdersData.pages.length - 1]?.total;

  if (!trip) return null;

  const { profit, fromCountryChineseName, toCountryChineseName, arrivalDate } =
    trip;

  const filterOrders = (status: Tab["value"]) => {
    if (!tripOrders) return [];

    if (status === "ALL") return tripOrders;

    return tripOrders.filter((order) => order.orderStatus === status);
  };

  return (
    <>
      <Head>
        <title>旅途詳情</title>
      </Head>
      <BaseLayout>
        <TripPageTitle
          title="旅途詳情"
          endButton={<MoreHorizIcon sx={{ color: "#335891" }} />}
        />
        <Container>
          <Stack component="main" spacing={2}>
            <TripInfo
              fromCountryChineseName={fromCountryChineseName}
              toCountryChineseName={toCountryChineseName}
              arrivalDate={arrivalDate}
              profit={profit}
              totalTripOrders={totalTripOrders}
              totalMatchedOrders={totalMatchedOrders}
            />
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
          </Stack>
          <Stack component="section" spacing={2} mt={5}>
            <Typography variant="h3" weightPreset="bold" textAlign="center">
              其他相符委託
            </Typography>
            <OrderList items={matchedOrders} />
            <ShowMoreButton
              hasMore={hasNextMatchedOrdersPage}
              onClick={() => fetchNextMatchedOrdersPage()}
            />
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export default TripDetailPage;
