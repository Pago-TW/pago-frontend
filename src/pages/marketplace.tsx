import { useEffect, useMemo } from "react";
import Head from "next/head";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExpandMore } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import { snakeCase } from "lodash";
import { useForm } from "react-hook-form";
import { useImmer } from "use-immer";
import { z } from "zod";

import { FilterButton } from "@/components/FilterButton";
import {
  countryCitySchema,
  CountryCitySelect,
} from "@/components/inputs/CountryCitySelect";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import {
  MoreFilterPopup,
  type MoreFilterValues,
} from "@/components/MoreFilterPopup";
import { OrderList } from "@/components/OrderList";
import { PageTitle } from "@/components/PageTitle";
import {
  SortFilterPopup,
  type SortFilterValues,
} from "@/components/SortFilterPopup";
import { Typography } from "@/components/ui/Typography";
import { useOrders, type Params } from "@/hooks/api/useOrders";
import { useOpen } from "@/hooks/useOpen";
import type { Order } from "@/types/order";
import type { KeysToSnakeCase } from "@/types/util";
import { flattenInfinitePaginatedData } from "@/utils/api";

const quickFilterSchema = z.object({
  from: countryCitySchema,
  to: countryCitySchema,
});

type QuickFilterValues = z.infer<typeof quickFilterSchema>;

const DEFAULT_VALUES: QuickFilterValues = {
  from: {
    countryCode: "",
    cityCode: "",
  },
  to: {
    countryCode: "",
    cityCode: "",
  },
};

const defaultParams: Params = {
  isPackagingRequired: true,
};

export default function MarketplacePage() {
  const [params, setParams] = useImmer<Params>(defaultParams);

  const {
    open: sortFilterOpen,
    handleOpen: handleSortFilterOpen,
    handleClose: handleSortFilterClose,
  } = useOpen();

  const {
    open: moreFilterOpen,
    handleOpen: handleMoreFilterOpen,
    handleClose: handleMoreFilterClose,
  } = useOpen();

  const { control, watch } = useForm<QuickFilterValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(quickFilterSchema),
  });

  useEffect(() => {
    const subscription = watch(({ from, to }) =>
      setParams((draft) => {
        draft.fromCountry = from?.countryCode;
        draft.fromCity = from?.cityCode;
        draft.toCountry = to?.countryCode;
        draft.toCity = to?.cityCode;
      })
    );
    return () => subscription.unsubscribe();
  }, [setParams, watch]);

  const { data: ordersData } = useOrders(params);

  const orders = useMemo(
    () => flattenInfinitePaginatedData(ordersData),
    [ordersData]
  );

  const handleSortFilterSubmit = ({ filter }: SortFilterValues) => {
    setParams((draft) => {
      draft.orderBy = snakeCase(
        filter.orderBy
      ) as unknown as KeysToSnakeCase<Order>;
      draft.sort = filter.sort;
    });
  };
  const handleMoreFilterSubmit = (data: MoreFilterValues) => {
    const {
      fee: { min: minFee, max: maxFee },
      latestReceiveDate,
    } = data;
    setParams((draft) => {
      draft.minTravelerFee = typeof minFee === "string" ? undefined : minFee;
      draft.maxTravelerFee = typeof maxFee === "string" ? undefined : maxFee;
      draft.latestReceiveItemDate = latestReceiveDate ?? undefined;
      draft.isPackagingRequired = data.packaging;
    });
  };

  const total = orders.length;

  return (
    <>
      <Head>
        <title>商品頁</title>
      </Head>
      <BaseLayout>
        <PageTitle title="商品頁" />
        <Container>
          <Box>
            <Stack spacing={1}>
              <Stack spacing={1}>
                <Typography variant="h5" as="p">
                  從
                </Typography>
                <CountryCitySelect
                  control={control}
                  name="from"
                  placeholder="地區"
                  includeAny
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h5" as="p">
                  送達
                </Typography>
                <CountryCitySelect
                  control={control}
                  name="to"
                  placeholder="地區"
                  includeAny
                />
              </Stack>
            </Stack>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <FilterButton
                endIcon={<ExpandMore />}
                onClick={handleSortFilterOpen}
              >
                排序
              </FilterButton>
              <SortFilterPopup
                open={sortFilterOpen}
                onOpen={handleSortFilterOpen}
                onClose={handleSortFilterClose}
                onSubmit={handleSortFilterSubmit}
              />
              <FilterButton
                endIcon={<ExpandMore />}
                onClick={handleMoreFilterOpen}
              >
                其他
              </FilterButton>
            </Box>
            <MoreFilterPopup
              open={moreFilterOpen}
              onOpen={handleMoreFilterOpen}
              onClose={handleMoreFilterClose}
              onSubmit={handleMoreFilterSubmit}
            />
          </Box>
          <Box>
            <Typography variant="h6" as="p" textAlign="center" my={2}>
              共 {total} 筆搜尋結果
            </Typography>
            <OrderList items={orders} variant="detailed" />
          </Box>
        </Container>
      </BaseLayout>
    </>
  );
}
