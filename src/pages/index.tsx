import * as React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab as MuiTab, Stack, styled } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const skeletonHeight = isMobile ? 131 : 290;
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
                利用行李箱多餘的空間為別人代購 創造共享經濟
                讓你出去玩，不再只是花錢
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
                {isLoading ? (
                  <Stack spacing={1}>
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width="100%"
                      height={skeletonHeight}
                    />
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width="100%"
                      height={skeletonHeight}
                    />
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width="100%"
                      height={skeletonHeight}
                    />
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width="100%"
                      height={skeletonHeight}
                    />
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width="100%"
                      height={skeletonHeight}
                    />
                  </Stack>
                ) : (
                  <OrderList items={latestFiveOrders || []} />
                )}
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
                <IndexCard
                  step={1 - 1}
                  title="發布旅途"
                  content="為您想要購買的產品創建一個委託訂單，並自己訂定願意支付的代購費。"
                  imageUrl="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/2126344822034747a773800a5c8b8b80_Consumer%20-%20Step1.svg"
                />
                <IndexCard
                  step={2 - 1}
                  title="等待代購者出價"
                  content="當您發布委託後，所有使用者將看到您的委託，且他們可以針對委託提出更合理的報價。"
                  imageUrl="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/7ed1d40c37b8467886f7cfc4e04b78d2_Consumer%20-%20Step2.svg"
                />
                <IndexCard
                  step={3 - 1}
                  title="選擇代購者"
                  content="您可以從所有願意代購者中，選擇一位，並接受他的報價。"
                  imageUrl="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/b4f395160b364adc8e80ba3716b00cbc_Consumer%20-%20Step3.svg"
                />
                <IndexCard
                  step={4 - 1}
                  title="面交取得商品"
                  content="與代購者相約時間、地點面交，取得商品，並為雙方在這次的交易體驗中評價。"
                  imageUrl="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/c262c7ac237046bb9223851b58de721b_Consumer%20-%20Step4.svg"
                />
              </Stack>
            </TabPanel>

            <TabPanel value="SHOPPER">
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={6}
              >
                <IndexCard
                  step={1 - 1}
                  title="發布旅途"
                  content="將您計畫好的旅途，發布在Pago，您將看到符合您旅途範圍的委託單。"
                  imageUrl="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/ed579986c6874e40876eddb911e22a7a_Shopper%20-%20Step1.svg"
                />
                <IndexCard
                  step={2 - 1}
                  title="選擇委託單"
                  content="您可以選擇願意代購的委託單，若您對代購費不滿意您可以向對方提出更合理的報價。"
                  imageUrl="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/8d762eca9b324e2fa98cd392f8526f6b_Shopper%20-%20Step2.svg"
                />
                <IndexCard
                  step={3 - 1}
                  title="購買商品"
                  content="委託者接受了您的報價，接著您需要根據委託單的內容購買指定規格的商品。"
                  imageUrl="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/1825368b2c634c49b1b3ce75770c4a93_Shopper%20-%20Step3.svg"
                />
                <IndexCard
                  step={4 - 1}
                  title="面交商品"
                  content="與委託者相約時間、地點面交，取得商品，並為雙方在這次的交易體驗中評價。"
                  imageUrl="https://pago-file-storage.s3.ap-northeast-1.amazonaws.com/8a9860b950144e4e8d9e75e83d242498_Shopper%20-%20Step4.svg"
                />
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
