import { OrderList } from "@/components/OrderList";
import { ReviewList } from "@/components/ReviewList";
import { ShowMoreButton } from "@/components/ShowMoreButton";
import { TripList } from "@/components/TripList";
import { useOrders } from "@/hooks/api/useOrders";
import { useReviews } from "@/hooks/api/useReviews";
import { useTrips } from "@/hooks/api/useTrips";
import type { ReviewType } from "@/types/review";
import type { User } from "@/types/user";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { TabContext, TabList } from "@mui/lab";
import { Tab, styled } from "@mui/material";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";

export const HorizontalCenterTabList = styled(TabList)({
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },
});

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
}));

type TabContentProps = {
  userId: User["userId"];
};

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
    if (inView && hasNextPage) fetchNextPage();
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
    if (inView && hasNextPage) fetchNextPage();
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
  } = useReviews(userId);

  const reviews = useMemo(
    () => flattenInfinitePaginatedData(reviewsData),
    [reviewsData]
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
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
