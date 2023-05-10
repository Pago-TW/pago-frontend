import OrderList from "@/components/OrderList";
import PageTitle from "@/components/PageTitle";
import CountryCitySelect, {
  countryCitySchema,
} from "@/components/inputs/CountryCitySelect";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Typography } from "@/components/ui/Typography";
import { useOrders } from "@/hooks/api/useOrders";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Container, Stack } from "@mui/material";
import Head from "next/head";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const marketplaceFormSchema = z.object({
  from: countryCitySchema,
  to: countryCitySchema,
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
};

export default function MarketplacePage() {
  const { control, watch } = useForm<MarketplaceFormValues>({
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
    resolver: zodResolver(marketplaceFormSchema),
  });

  const { from, to } = watch();

  const { data: ordersData } = useOrders({
    fromCountry: from.countryCode,
    fromCity: from.cityCode,
    toCountry: to.countryCode,
    toCity: to.cityCode,
  });

  const orders = useMemo(
    () => flattenInfinitePaginatedData(ordersData),
    [ordersData]
  );

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
          </Box>
          <Box>
            <OrderList items={orders} variant="detailed" />
          </Box>
        </Container>
      </BaseLayout>
    </>
  );
}
