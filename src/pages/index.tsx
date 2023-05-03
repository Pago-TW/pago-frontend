import * as React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab as MuiTab, Stack, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useOrders } from "@/hooks/api/useOrders";
import { Order } from "@/types/order";

import Footer from "@/components/Footer";
import { IndexCard } from "@/components/IndexCard";
import { OrderList } from "@/components/OrderList";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";

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
        <Container
          sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
        >
          <main>Pago Home Page</main>
          <p>{status}</p>
          {status === "authenticated" ? (
            <button onClick={() => signOut()}>Sign Out</button>
          ) : (
            <button onClick={() => signIn()}>Sign In</button>
          )}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 5,
              }}
            >
              <Image
                src="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/49814ee847e344079d7d4e18b236b16e_%E7%B0%A1%E4%BB%8B.svg"
                alt="簡介"
                width={272}
                height={269}
                style={{
                  boxShadow: "0px 2px 4px rgba(51, 88, 145, 0.5)",
                  borderRadius: "6px",
                  overflow: "hidden",
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="h1"
                color="primary.main"
                weightPreset="bold"
                textAlign={{ xs: "center", md: "left" }}
                sx={{
                  marginBottom: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Pago 讓你邊玩邊賺
              </Typography>
              <Typography
                variant="body2"
                color="secondary.dark"
                sx={{
                  marginBottom: 3,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                將您計畫好的旅途，發佈在 Pago，您將看到符合您旅途範圍的委託單。
              </Typography>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
                gap={2}
              >
                <StyledButton LinkComponent={Link} href="/trips/new">
                  新增旅途
                </StyledButton>
                <StyledButton LinkComponent={Link} href="/orders/new">
                  新增委託
                </StyledButton>
              </Box>
              <Box>
                <Typography
                  variant="h1"
                  color="primary.main"
                  weightPreset="bold"
                  textAlign={{ xs: "center", md: "left" }}
                  sx={{
                    marginTop: 10,
                    marginBottom: 5,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  最新發布委託
                </Typography>
                <OrderList items={latestFiveOrders || []} />
              </Box>
            </Box>
          </Box>
          <Typography
            variant="h1"
            color="primary.main"
            weightPreset="bold"
            textAlign={{ xs: "center", md: "left" }}
            sx={{ marginTop: 10, display: "flex", justifyContent: "center" }}
          >
            Pago 如何運作
          </Typography>
          <TabContext value={currentTab}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TabList
                centered
                onChange={(_e, v) => setCurrentTab(v)}
                aria-label="委託者 / 代購者"
              >
                {TABS.map((tab) => (
                  <MuiTab
                    key={tab.value}
                    label={tab.label}
                    value={tab.value}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
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
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={6}
              >
                <IndexCard />
                <IndexCard />
              </Stack>
            </TabPanel>

            <TabPanel value="SHOPPER">
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={6}
              >
                <IndexCard />
                <IndexCard />
                <IndexCard />
                <IndexCard />
              </Stack>
            </TabPanel>
          </TabContext>
          <Box sx={{ flexGrow: 1 }} />
        </Container>
        <Footer />
      </BaseLayout>
    </>
  );
};

export default Home;
