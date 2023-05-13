import { FilterButton } from "@/components/FilterButton";
import { FilterMorePopup } from "@/components/FilterMorePopup";
import OrderList from "@/components/OrderList";
import PageTitle from "@/components/PageTitle";
import CountryCitySelect, {
  countryCitySchema,
} from "@/components/inputs/CountryCitySelect";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Typography } from "@/components/ui/Typography";
import { useOrders } from "@/hooks/api/useOrders";
import { useOpen } from "@/hooks/useOpen";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDownward, Check, Close, ExpandMore } from "@mui/icons-material";
import { Box, Container, Stack } from "@mui/material";
import { endOfDay, isBefore } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import Head from "next/head";
import { useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const marketplaceFormSchema = z.object({
  from: countryCitySchema,
  to: countryCitySchema,
  sort: z.enum(["ASC", "DESC"]),
  packaging: z.boolean(),
  fee: z.object({
    min: z.number().positive().optional(),
    max: z.number().positive().optional(),
  }),
  latestReceiveDate: z.date().nullable(),
});

type MarketplaceFormValues = z.infer<typeof marketplaceFormSchema>;

const DEFAULT_VALUES: MarketplaceFormValues = {
  from: {
    countryCode: "",
    cityCode: "",
  },
  to: {
    countryCode: "",
    cityCode: "",
  },
  sort: "ASC",
  packaging: false,
  fee: {
    min: 0,
    max: 0,
  },
  latestReceiveDate: null,
};

export default function MarketplacePage() {
  const {
    open: filterMoreOpen,
    handleOpen: handleFilterMoreOpen,
    handleClose: handleFilterMoreClose,
  } = useOpen();

  const methods = useForm<MarketplaceFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(marketplaceFormSchema),
  });
  const { control, watch } = methods;

  const formValues = watch();
  const { data: ordersData } = useOrders({
    fromCountry: formValues.from.countryCode,
    fromCity: formValues.from.cityCode,
    toCountry: formValues.to.countryCode,
    toCity: formValues.to.cityCode,
    sort: formValues.sort,
    isPackagingRequired: formValues.packaging,
  });

  const orders = useMemo(() => {
    const {
      fee: { min, max },
      latestReceiveDate,
    } = formValues;
    return flattenInfinitePaginatedData(ordersData).filter(
      (order) =>
        (!min || (min && order.travelerFee >= min)) &&
        (!max || (max && order.travelerFee <= max)) &&
        (!latestReceiveDate ||
          (latestReceiveDate &&
            isBefore(
              new Date(order.latestReceiveItemDate),
              endOfDay(zonedTimeToUtc(latestReceiveDate, "UTC"))
            )))
    );
  }, [formValues, ordersData]);

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
                  label="地區"
                  includeAny
                  noInputLabelOnShrink
                />
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h5" as="p">
                  送達
                </Typography>
                <CountryCitySelect
                  control={control}
                  name="to"
                  label="地區"
                  includeAny
                  noInputLabelOnShrink
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
            <FormProvider {...methods}>
              <FilterMorePopup
                open={filterMoreOpen}
                onOpen={handleFilterMoreOpen}
                onClose={handleFilterMoreClose}
              />
            </FormProvider>
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
