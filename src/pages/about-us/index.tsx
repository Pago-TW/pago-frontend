import type { ReactNode } from "react";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getPlaiceholder } from "plaiceholder";

import { AboutUsCard } from "@/components/AboutUsCard";
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

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
}) => {
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
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                {...images.aboutUs.cover[0]!}
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
          <Container>
            <Box sx={{ my: 6 }}>
              <SectionTitle>Team 創辦團隊</SectionTitle>
              <Box>
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  lineHeight={1.75}
                  textAlign={{ xs: "left", md: "left" }}
                >
                  我們是一群來自輔仁大學資管系的學子， 於 2022
                  年聚集而成的團隊。
                </Typography>
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  textAlign={{ xs: "left", md: "left" }}
                  lineHeight={1.75}
                  sx={{ mt: 3 }}
                >
                  我們憑藉著專業知識與創新思維，專注於解決社會問題並創造有價值的技術產品。
                </Typography>
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  textAlign={{ xs: "left", md: "left" }}
                  lineHeight={1.75}
                  sx={{ mt: 3 }}
                >
                  我們的理念不只是創造出一個共享經濟、快速媒合、價格透明的，更是透過實際行動，以科技助益社會，
                  期望能共創一個高度透明、充分利用共享經濟並為每位用戶帶來價值的代購市場，讓每位用戶都能從中受益。
                </Typography>
              </Box>
            </Box>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={3}
            >
              <AboutUsCard
                name="邱奕勳"
                job="PM、後端開發"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.aboutUs.team[0]!}
              />
              <AboutUsCard
                name="陳俊廷"
                job="設計、行銷"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.aboutUs.team[1]!}
              />
              <AboutUsCard
                name="范詠淇"
                job="設計、行銷"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.aboutUs.team[2]!}
              />
              <AboutUsCard
                name="曾瑞章"
                job="前端開發"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.aboutUs.team[3]!}
              />
              <AboutUsCard
                name="戴宇辰"
                job="後端開發"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.aboutUs.team[4]!}
              />
            </Stack>
          </Container>
          <Box
            sx={{
              marginBottom: 3,
            }}
          ></Box>

          {/* </Container> */}
          <Footer />
        </BaseLayout>
      </Box>
    </>
  );
};

const getImageBase64 = async (
  imagePath: string,
  options?: { alt?: string; title?: string }
) => {
  const { base64, img } = await getPlaiceholder(imagePath);
  return {
    src: img.src,
    type: img.type,
    blurDataURL: base64,
    alt: options?.alt ?? "",
  };
};

const getImagesBase64 = async (
  imagePaths: string[],
  options?: { alt?: string; title?: string }
) => await Promise.all(imagePaths.map((path) => getImageBase64(path, options)));

export const getStaticProps = async () => {
  const introductionImage = await getImageBase64("/images/introduction.svg", {
    alt: "Page introduction image",
  });
  const howItWorksImages = {
    consumer: await getImagesBase64(
      [
        "/images/how-it-works/consumer/step1.jpg",
        "/images/how-it-works/consumer/step2.jpg",
        "/images/how-it-works/consumer/step3.jpg",
        "/images/how-it-works/consumer/step4.jpg",
      ],
      { alt: "How it works image for consumer" }
    ),
    shopper: await getImagesBase64(
      [
        "/images/how-it-works/shopper/step1.jpg",
        "/images/how-it-works/shopper/step2.jpg",
        "/images/how-it-works/shopper/step3.jpg",
        "/images/how-it-works/shopper/step4.jpg",
      ],
      { alt: "How it works image for shopper" }
    ),
  };

  const aboutUsImages = {
    cover: await getImagesBase64(["/images/about-us/about-us-cover.svg"], {
      alt: "about us",
    }),
    team: await getImagesBase64(
      [
        "/images/about-us/team/shiun.svg",
        "/images/about-us/team/jack.svg",
        "/images/about-us/team/ariel.svg",
        "/images/about-us/team/enderwolf.svg",
        "/images/about-us/team/ycday.svg",
      ],
      { alt: "How it works image for shopper" }
    ),
  };

  return {
    props: {
      images: {
        introduction: introductionImage,
        howItWorks: howItWorksImages,
        aboutUs: aboutUsImages,
      },
    },
  };
};

export default Home;
