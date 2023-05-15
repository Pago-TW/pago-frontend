import { FilterButton } from "@/components/FilterButton";
import type { MoreFilterValues } from "@/components/MoreFilterPopup";
import { MoreFilterPopup } from "@/components/MoreFilterPopup";
import { OrderList } from "@/components/OrderList";
import { PageTitle } from "@/components/PageTitle";
import {
  CountryCitySelect,
  countryCitySchema,
} from "@/components/inputs/CountryCitySelect";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Typography } from "@/components/ui/Typography";
import type { Params } from "@/hooks/api/useOrders";
import { useOrders } from "@/hooks/api/useOrders";
import { useOpen } from "@/hooks/useOpen";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownward, Check, Close, ExpandMore } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import Head from "next/head";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useImmer } from "use-immer";
import { z } from "zod";

const quickFilterSchema = z.object({
  from: countryCitySchema,
  to: countryCitySchema,
  sort: z.enum(["ASC", "DESC"]),
  packaging: z.boolean(),
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
  sort: "ASC",
  packaging: true,
};

export default function MarketplacePage() {
  const [params, setParams] = useImmer<Params>({
    sort: DEFAULT_VALUES.sort,
    isPackagingRequired: DEFAULT_VALUES.packaging,
  });

  const {
    open: filterMoreOpen,
    handleOpen: handleFilterMoreOpen,
    handleClose: handleFilterMoreClose,
  } = useOpen();

  const { control, watch } = useForm<QuickFilterValues>({
    mode: "onBlur",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(quickFilterSchema),
  });

  useEffect(() => {
    const subscription = watch(({ from, to, sort, packaging }) =>
      setParams((draft) => {
        draft.fromCountry = from?.countryCode;
        draft.fromCity = from?.cityCode;
        draft.toCountry = to?.countryCode;
        draft.toCity = to?.cityCode;
        draft.sort = sort;
        draft.isPackagingRequired = packaging;
      })
    );
    return () => subscription.unsubscribe();
  }, [setParams, watch]);

  const { data: ordersData } = useOrders(params);

  const orders = useMemo(
    () => flattenInfinitePaginatedData(ordersData),
    [ordersData]
  );

  const handleFilterMoreSubmit = (data: MoreFilterValues) => {
    const {
      fee: { min: minFee, max: maxFee },
      latestReceiveDate,
    } = data;
    setParams((draft) => {
      draft.minTravelerFee = typeof minFee === "string" ? undefined : minFee;
      draft.maxTravelerFee = typeof maxFee === "string" ? undefined : maxFee;
      draft.latestReceiveItemDate = latestReceiveDate || undefined;
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
              <Controller
                control={control}
                name="sort"
                defaultValue="ASC"
                render={({ field: { onChange, value } }) => (
                  <FilterButton
                    onClick={() => onChange(value === "ASC" ? "DESC" : "ASC")}
                    endIcon={
                      <ArrowDownward
                        sx={{
                          transform:
                            value === "ASC" ? "rotate(0)" : "rotate(-180deg)",
                        }}
                      />
                    }
                  >
                    發布時間
                  </FilterButton>
                )}
              />
              <Controller
                control={control}
                name="packaging"
                defaultValue={true}
                render={({ field: { onChange, value } }) => (
                  <FilterButton
                    onClick={() => onChange(!value)}
                    endIcon={value ? <Check /> : <Close />}
                  >
                    包裝有無
                  </FilterButton>
                )}
              />
              <FilterButton
                endIcon={<ExpandMore />}
                onClick={handleFilterMoreOpen}
              >
                其他
              </FilterButton>
            </Box>
            <MoreFilterPopup
              open={filterMoreOpen}
              onOpen={handleFilterMoreOpen}
              onClose={handleFilterMoreClose}
              onSubmit={handleFilterMoreSubmit}
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
