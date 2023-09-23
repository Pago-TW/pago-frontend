import { useEffect, useMemo, useState, type FC } from "react";

import { TabContext, TabList } from "@mui/lab";
import { styled, Tab } from "@mui/material";
import { useInView } from "react-intersection-observer";

import { OrderList } from "@/components/order-list";
import { ReviewList } from "@/components/review-list";
import { ShowMoreButton } from "@/components/show-more-button";
import { TripList } from "@/components/trip-list";
import { useOrders } from "@/hooks/api/use-orders";
import { useReviews } from "@/hooks/api/use-reviews";
import { useTrips } from "@/hooks/api/use-trips";
import type { ReviewType } from "@/types/review";
import type { User } from "@/types/user";
import { flattenInfinitePaginatedData } from "@/utils/api";

export const HorizontalCenterTabList = styled(TabList)({
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },
});

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
}));

interface TabContentProps {
  userId: User["userId"];
}

export const RequestedCommissions: FC<TabContentProps> = ({ userId }) => {
  const { ref, inView } = useInView();

  const {
    data: ordersData,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useOrders({ userId, status: "REQUESTED" });

  const orders = useMemo(
    () => flattenInfinitePaginatedData(ordersData),
    [ordersData]
  );

  useEffect(() => {
    if (inView && hasNextPage) void fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handleShowMore = () => fetchNextPage();

  return (
    <div>
      <OrderList items={orders} />
      <ShowMoreButton
        hasMore={hasNextPage}
        onClick={handleShowMore}
        loading={isFetching}
        fullWidth
        ref={ref}
        sx={{ mt: 2 }}
      />
    </div>
  );
};

export const OngoingTrips: FC<TabContentProps> = ({ userId }) => {
  const { ref, inView } = useInView();

  const {
    data: tripsData,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useTrips({ userId, status: "UPCOMING" });

  const trips = useMemo(
    () => flattenInfinitePaginatedData(tripsData),
    [tripsData]
  );

  useEffect(() => {
    if (inView && hasNextPage) void fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handleShowMore = () => fetchNextPage();

  return (
    <div>
      <TripList spacing={2} items={trips} />
      <ShowMoreButton
        hasMore={hasNextPage}
        onClick={handleShowMore}
        loading={isFetching}
        fullWidth
        ref={ref}
        sx={{ mt: 2 }}
      />
    </div>
  );
};

const REVIEW_TABS: readonly { label: string; value: ReviewType }[] = [
  { label: "代購者", value: "FOR_SHOPPER" },
  { label: "消費者", value: "FOR_CONSUMER" },
] as const;

type ReviewTabValue = (typeof REVIEW_TABS)[number]["value"];

export const PersonalReviews: FC<TabContentProps> = ({ userId }) => {
  const [tab, setTab] = useState<ReviewTabValue>("FOR_SHOPPER");

  const { ref, inView } = useInView();

  const {
    data: reviewsData,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useReviews(userId, { type: tab });

  const reviews = useMemo(
    () => flattenInfinitePaginatedData(reviewsData),
    [reviewsData]
  );

  useEffect(() => {
    if (inView && hasNextPage) void fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handleTabChange = (_event: React.SyntheticEvent, newTab: ReviewType) =>
    setTab(newTab);

  const handleShowMore = () => fetchNextPage();

  return (
    <div>
      <TabContext value={tab}>
        <HorizontalCenterTabList onChange={handleTabChange}>
          {REVIEW_TABS.map((tab) => (
            <StyledTab key={tab.value} {...tab} sx={{ fontSize: 18 }} />
          ))}
        </HorizontalCenterTabList>
        <ReviewList items={reviews} />
      </TabContext>
      <ShowMoreButton
        hasMore={hasNextPage}
        onClick={handleShowMore}
        loading={isFetching}
        fullWidth
        ref={ref}
        sx={{ mt: 2 }}
      />
    </div>
  );
};
