import { useMemo } from "react";

import { Skeleton, Stack } from "@mui/material";

import { OrderList } from "@/components/OrderList";
import { SectionTitle } from "@/components/SectionTitle";
import { Typography } from "@/components/ui/Typography";
import { useOrders } from "@/hooks/api/useOrders";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { flattenInfinitePaginatedData } from "@/utils/api";

const LatestOrders = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { data: ordersData, isLoading } = useOrders({ status: "REQUESTED" });

  const latestFiveOrders = useMemo(
    () => flattenInfinitePaginatedData(ordersData).slice(0, 5),
    [ordersData]
  );

  return (
    <section>
      <SectionTitle sx={{ mt: 10, mb: 5 }}>最新發布委託</SectionTitle>

      <Stack spacing={1}>
        {isLoading ? (
          Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rounded"
              animation="wave"
              width="100%"
              height={isMobile ? 131 : 290}
            />
          ))
        ) : latestFiveOrders.length ? (
          <OrderList items={latestFiveOrders || []} />
        ) : (
          <Typography variant="h6" as="em" color="base.main" textAlign="center">
            暫時還沒有訂單...
          </Typography>
        )}
      </Stack>
    </section>
  );
};

LatestOrders.displayName = "LatestOrders";

export { LatestOrders };
