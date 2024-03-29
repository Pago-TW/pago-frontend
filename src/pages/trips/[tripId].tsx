import { useMemo, useState, type FC, type MouseEvent } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Delete, IosShare, MoreHoriz } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { ConfirmProvider, useConfirm } from "material-ui-confirm";
import { useSession } from "next-auth/react";

import { DetailItem } from "@/components/detail-item";
import { BaseLayout } from "@/components/layouts/base-layout";
import { PaperLayout } from "@/components/layouts/paper-layout";
import { OrderList } from "@/components/order-list";
import { PageTitle } from "@/components/page-title";
import { ShowMoreButton } from "@/components/show-more-button";
import { Button } from "@/components/ui/button";
import { Tab } from "@/components/ui/tab";
import { Typography } from "@/components/ui/typography";
import { defaultConfirmOptions } from "@/configs/confirm-options";
import { useDeleteTrip } from "@/hooks/api/use-delete-trip";
import { useMatchingOrders } from "@/hooks/api/use-matching-orders";
import { useOrders } from "@/hooks/api/use-orders";
import { useTrip } from "@/hooks/api/use-trip";
import type { Trip } from "@/types/trip";
import {
  flattenInfinitePaginatedData,
  getInfinitePaginatedDataTotal,
} from "@/utils/api";
import { formatDate } from "@/utils/date";

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

const MoreOptionsButton: FC<{ deletable?: boolean }> = ({ deletable }) => {
  const router = useRouter();
  const tripId = router.query.tripId as string;

  const { data: session } = useSession();
  const username = session?.user?.name;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { mutate: deleteTrip } = useDeleteTrip();

  const confirm = useConfirm();

  const handleMore = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Pago 旅途詳情頁面",
          text: `來自 ${username} 的旅途`,
          url: window.location.href,
        });
        handleClose();
      } catch (error) {
        console.error("Something went wrong sharing the trip", error);
      }
    } else {
      console.log("Your browser does not support the Share API");
    }
  };

  const handleConfirm = async () => {
    try {
      await confirm({
        title: "確定刪除此旅途？",
      });
      deleteTrip(
        { tripId },
        { onSuccess: () => void router.replace("/trips") }
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <IconButton onClick={handleMore}>
        <MoreHoriz />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ disablePadding: true }}
      >
        <MenuItem
          onClick={handleShare}
          sx={{ color: (theme) => theme.palette.pago.main }}
        >
          <IosShare />
          分享
        </MenuItem>
        <MenuItem
          disabled={!deletable}
          onClick={handleConfirm}
          sx={{ color: (theme) => theme.palette.pagoRed[900] }}
        >
          <Delete />
          刪除
        </MenuItem>
      </Menu>
    </>
  );
};

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
  const formattedArrivalDate = formatDate(arrivalDate);

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
          <Button
            size="medium"
            disabled={!!totalTripOrders}
            sx={{ flexGrow: 1 }}
          >
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

  const totalTripOrders = getInfinitePaginatedDataTotal(tripOrdersData);
  const totalMatchedOrders = getInfinitePaginatedDataTotal(matchedOrdersData);

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
        <ConfirmProvider defaultOptions={defaultConfirmOptions}>
          <PageTitle
            title="旅途詳情"
            endButton={<MoreOptionsButton deletable={!totalTripOrders} />}
          />
        </ConfirmProvider>
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
                    onChange={(_e, v: Tab["value"]) => setCurrentTab(v)}
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
