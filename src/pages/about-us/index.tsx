import type { ReactNode } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { OurTeam } from "@/components/about-us/OurTeam";
import Footer from "@/components/Footer";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import PageTitle from "@/components/PageTitle";
import { Typography } from "@/components/ui/Typography";

const SectionTitle = ({ children }: { children: ReactNode }) => {
  return (
    <Box display="flex" justifyContent="center">
      <Typography
        variant="h1"
        as="span"
        color="primary.main"
        weightPreset="bold"
        textAlign={{ xs: "center", md: "center" }}
        sx={{
          marginBottom: 8,
          position: "relative",
          zIndex: 0,
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            bottom: 0,
            height: "50%",
            width: "100%",
            background: (theme) => theme.palette.pagoYellow[500],
            zIndex: -1,
          },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

const AboutUsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>關於我們</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          backgroundColor: "#ffffff",
        }}
      >
        <BaseLayout>
          <PageTitle title="關於我們" />
          {/* TODO HELP_ME: startButton 不知道為什麼消失了 */}
          <Stack
            gap={{ xs: 6, md: 6 }}
            direction={{ md: "row" }}
            justifyContent="center"
            alignItems="center"
          >
            <Box position="relative" width="100%" height="40vh">
              <Image
                src="/images/about-us/cover.svg"
                alt=""
                fill
                sizes="100vw"
                priority={true}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </Box>
          </Stack>
          <Stack justifyContent="center" height="100%" sx={{ mt: 6 }}>
            <SectionTitle>Pago 創立理念</SectionTitle>
            <Container sx={{ my: 6 }}>
              <Box
                sx={{
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  textAlign={{ xs: "left", md: "left" }}
                  lineHeight={1.75}
                >
                  還在為了擔心海外代購需要支付的高額國際運費嗎？
                </Typography>
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  textAlign={{ xs: "left", md: "left" }}
                  lineHeight={1.75}
                >
                  出國旅遊行李箱的多餘空間不知道要如何運用嗎？
                </Typography>
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  textAlign={{ xs: "left", md: "left" }}
                  lineHeight={1.75}
                >
                  還在為了找尋更低價的代購商而到處比價嗎?
                </Typography>
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  textAlign={{ xs: "left", md: "left" }}
                  lineHeight={1.75}
                  sx={{ mt: 3 }}
                >
                  為了解決在代購上遇到的問題，並且實現<b>共享經濟</b>
                  ，因此我們團隊決定建立一個能夠<b>快速媒合</b>，且
                  <b>價格公開透明</b>的代購媒合平台。
                </Typography>
              </Box>
            </Container>
          </Stack>
          <Box
            sx={{
              backgroundColor: "#f5f5f5",
              width: "100%",
              paddingTop: "30px",
              paddingBottom: "40px",
              zIndex: -2,
            }}
          >
            <SectionTitle>Core Value 核心價值</SectionTitle>

            <Container>
              <Stack spacing={4}>
                <div>
                  <Typography
                    variant="h1"
                    color="primary.main"
                    weightPreset="bold"
                    textAlign={{ xs: "left", md: "left" }}
                  >
                    快速媒合
                  </Typography>
                  <Typography
                    variant="h5"
                    as="p"
                    color="base.800"
                    textAlign={{ xs: "left", md: "left" }}
                    sx={{
                      marginTop: 2,
                    }}
                  >
                    根據您的需求與條件，幫你快速媒合適合的合作對象。
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="h1"
                    color="primary.main"
                    weightPreset="bold"
                    textAlign={{ xs: "left", md: "left" }}
                  >
                    共享經濟
                  </Typography>
                  <Typography
                    variant="h5"
                    as="p"
                    color="base.800"
                    textAlign={{ xs: "left", md: "left" }}
                    sx={{
                      marginTop: 2,
                    }}
                  >
                    利用行李箱的閒置空間，實現共享經濟的概念。
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="h1"
                    color="primary.main"
                    weightPreset="bold"
                    textAlign={{ xs: "left", md: "left" }}
                  >
                    價格公開透明
                  </Typography>
                  <Typography
                    variant="h5"
                    as="p"
                    color="base.800"
                    textAlign={{ xs: "left", md: "left" }}
                    sx={{
                      marginTop: 2,
                    }}
                  >
                    所有價格公開透明，幫您省去溝通上的時間成本。
                  </Typography>
                </div>
              </Stack>
            </Container>
          </Box>

          <OurTeam />

          <Footer mt={6} />
        </BaseLayout>
      </Box>
    </>
  );
};

export default AboutUsPage;
