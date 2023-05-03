import { IndexCard } from "@/components/IndexCard";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { OrderList } from "@/components/OrderList";
import { CenterLayout } from "@/components/layouts/CenterLayout";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab as MuiTab, Stack, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import * as React from "react";
import { Typography } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { useOrders } from "@/hooks/api/useOrders";
import { Order } from "@/types/order";
import { Add } from "@mui/icons-material";

const TABS = [
  { label: "委託者", value: "CONSUMER" },
  { label: "代購者", value: "SHOPPER" },
] as const;

const StyledButton = styled(Button)({
  minWidth: "fit-content",
  maxWidth: "80%",
  width: "100%",
  fontSize: 14,
});

type Tab = (typeof TABS)[number];

const Home: NextPage = () => {
  const { status } = useSession();
  const [currentTab, setCurrentTab] = React.useState<Tab["value"]>("CONSUMER");
  const { data, isLoading, isError } = useOrders();

  const latestFiveOrders: Order[] | undefined = data?.pages
    .flatMap((page) => page.data)
    .slice(0, 5); // Extract only the first 5 orders

  return (
    <>
      <Head>
        <title>Pago</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <main>Pago Home Page</main>
        <p>{status}</p>
        {status === "authenticated" && (
          <button onClick={() => signOut()}>Sign Out</button>
        )}
        <Container maxWidth="md">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box>
              <img src="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/49814ee847e344079d7d4e18b236b16e_%E7%B0%A1%E4%BB%8B.svg" />
            </Box>
            <Box>
              <Typography
                variant="h1"
                color="primary.main"
                weightPreset="bold"
                textAlign={{ xs: "center", md: "left" }}
              >
                Pago 讓你邊玩邊賺
              </Typography>
              <Typography variant="body2" color="secondary.dark">
                將您計畫好的旅途，發佈在 Pago，您將看到符合您旅途範圍的委託單。
              </Typography>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                gap={2}
              >
                <StyledButton LinkComponent={Link} href="/trips/new">
                  {/* <Add /> */}
                  新增旅途
                </StyledButton>
                <StyledButton LinkComponent={Link} href="/orders/new">
                  {/* <Add /> */}
                  新增委託
                </StyledButton>
              </Box>
              <Box>
                <OrderList items={latestFiveOrders as Order[]} />
              </Box>
            </Box>
          </Box>
          <Typography
            variant="h1"
            color="primary.main"
            weightPreset="bold"
            textAlign={{ xs: "center", md: "left" }}
          >
            Pago 如何運作
          </Typography>
          <TabContext value={currentTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(_e, v) => setCurrentTab(v)}
                aria-label="委託者 / 代購者"
              >
                {TABS.map((tab) => (
                  <MuiTab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    sx={{
                      fontSize: (theme) => ({
                        xs: theme.typography.pxToRem(16),
                        sm: theme.typography.pxToRem(18),
                      }),
                    }}
                  />
                ))}
              </TabList>
            </Box>

            <TabPanel value="CONSUMER">
              <Stack spacing={6}>
                <IndexCard />
                <IndexCard />
              </Stack>
            </TabPanel>

            <TabPanel value="SHOPPER">
              <Stack spacing={6}>
                <IndexCard />
                <IndexCard />
                <IndexCard />
                <IndexCard />
              </Stack>
            </TabPanel>
          </TabContext>
        </Container>
      </BaseLayout>
    </>
  );
};

export default Home;
