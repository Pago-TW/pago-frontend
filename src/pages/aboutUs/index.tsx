import { AboutUsCard } from "@/components/AboutUsCard";
import Footer from "@/components/Footer";
import { IndexCard } from "@/components/IndexCard";
import PageTitle from "@/components/PageTitle";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { useOrders } from "@/hooks/api/useOrders";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { TabContext, TabPanel } from "@mui/lab";
import { Stack, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { useState } from "react";

const TABS = [
  { label: "委託者", value: "CONSUMER" },
  { label: "代購者", value: "SHOPPER" },
] as const;

const StyledButton = styled(Button)({
  minWidth: "fit-content",
  width: "100%",
  fontSize: 18,
});

type Tab = (typeof TABS)[number];

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
}) => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("CONSUMER");

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { data: ordersData, isLoading } = useOrders({ status: "REQUESTED" });

  const latestFiveOrders = flattenInfinitePaginatedData(ordersData).slice(0, 5);

  const skeletonHeight = isMobile ? 131 : 290;

  return (
    <>
      <Head>
        <title>關於我們</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BaseLayout>
        <PageTitle title="關於我們" />
        <Stack
          gap={{ xs: 6, md: 6 }}
          direction={{ md: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          <Box position="relative" width="100%" sx={{ aspectRatio: "1 / 1" }}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              {...images.aboutUs.aboutUs[0]!}
              fill
              sizes="(max-width: 600px) 50vw, 100vw"
              priority={true}
              style={{
                overflow: "hidden",
              }}
            />
          </Box>

          <Stack justifyContent="center" height="100%">
            <Box
              sx={{
                backgroundColor: "#c4c4c4",
                width: "100%",
                height: "94px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h1"
                color="base.800"
                weightPreset="bold"
                textAlign={{ xs: "center", md: "center" }}
              >
                創立理念
              </Typography>
            </Box>
            <Container sx={{ my: 6 }}>
              <Box>
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  textAlign={{ xs: "left", md: "left" }}
                >
                  還在為了擔心海外代購需要支付的高額國際運費嗎？
                  <br />
                  出國旅遊行李箱的多餘空間不知道要如何運用嗎？
                  <br />
                  還在為了找尋更低價的代購商而到處比價嗎?
                </Typography>
                <Typography
                  variant="h5"
                  as="p"
                  color="base.800"
                  textAlign={{ xs: "left", md: "left" }}
                  sx={{ mt: 3 }}
                >
                  為了解決在代購上遇到的問題，並且實現<b>共享經濟</b>
                  ，因此我們團隊決定建立一個能夠<b>快速媒合</b>，且
                  <b>價格公開透明</b>的代購媒合平台。
                </Typography>
              </Box>
            </Container>
          </Stack>
        </Stack>
        <Box>
          {/* <Box
            sx={{
              width: "100%",
              Height: 500,
              backgroundColor: "#e1e1e1",
              border: "solid 1px",
              clipPath: "ellipse(48% 40% at 50% 50%)",
            }}
          ></Box> */}

          <Typography
            variant="h1"
            color="base.800"
            weightPreset="bold"
            textAlign={{ xs: "center", md: "left" }}
          >
            核心價值
          </Typography>
          <Container sx={{ my: 6 }}>
            <Stack spacing={4}>
              <Box>
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
              </Box>

              <Box>
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
              </Box>
              <Box>
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
              </Box>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ my: 6 }}>
          <Box>
            <Typography
              variant="h1"
              color="base.800"
              weightPreset="bold"
              textAlign={{ xs: "center", md: "left" }}
              sx={{
                marginTop: 10,
                display: "flex",
                justifyContent: "center",
                marginBottom: 3,
              }}
            >
              創辦團隊
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="h5"
              as="p"
              color="base.800"
              textAlign={{ xs: "left", md: "left" }}
            >
              我們是一群來自輔仁大學資管系的學子， 於 2022 年聚集而成的團隊。
            </Typography>
            <Typography
              variant="h5"
              as="p"
              color="base.800"
              textAlign={{ xs: "left", md: "left" }}
              sx={{ mt: 3 }}
            >
              我們憑藉著專業知識與創新思維，專注於解決社會問題並創造有價值的技術產品。
            </Typography>
            <Typography
              variant="h5"
              as="p"
              color="base.800"
              textAlign={{ xs: "left", md: "left" }}
              sx={{ mt: 3 }}
            >
              我們的理念不只是創造出一個共享經濟、快速媒合、價格透明的，更是透過實際行動，以科技助益社會，
              期望能共創一個高度透明、充分利用共享經濟並為每位用戶帶來價值的代購市場，讓每位用戶都能從中受益。
            </Typography>
          </Box>
        </Container>

        <TabContext value={currentTab}>
          <TabPanel value="CONSUMER">
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
                ImageProps={images.howItWorks.consumer[0]!}
              />
              <AboutUsCard
                name="陳俊廷"
                job="設計、行銷"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.consumer[0]!}
              />
              <AboutUsCard
                name="范詠淇"
                job="設計、行銷"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.consumer[0]!}
              />
              <AboutUsCard
                name="邱奕勳"
                job="PM、後端開發"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.consumer[0]!}
              />
              <AboutUsCard
                name="邱奕勳"
                job="PM、後端開發"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.consumer[0]!}
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
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.shopper[0]!}
              />
              <IndexCard
                step={2 - 1}
                title="選擇委託單"
                content="您可以選擇願意代購的委託單，若您對代購費不滿意您可以向對方提出更合理的報價。"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.shopper[1]!}
              />
              <IndexCard
                step={3 - 1}
                title="購買商品"
                content="委託者接受了您的報價，接著您需要根據委託單的內容購買指定規格的商品。"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.shopper[2]!}
              />
              <IndexCard
                step={4 - 1}
                title="面交商品"
                content="與委託者相約時間、地點面交，取得商品，並為雙方在這次的交易體驗中評價。"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.shopper[3]!}
              />
            </Stack>
          </TabPanel>
        </TabContext>
        <Box sx={{ flexGrow: 1 }} />
        {/* </Container> */}
        <Footer />
      </BaseLayout>
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

  const aboutUs = {
    aboutUs: await getImagesBase64(["/images/about-us/about-us-cover-2.jpg"], {
      alt: "about us",
    }),
  };

  return {
    props: {
      images: {
        introduction: introductionImage,
        howItWorks: howItWorksImages,
        aboutUs: aboutUs,
      },
    },
  };
};

export default Home;
