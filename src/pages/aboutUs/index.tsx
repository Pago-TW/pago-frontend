import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import { IndexCard } from "@/components/IndexCard";
import { OrderList } from "@/components/OrderList";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Typography } from "@/components/ui/Typography";
import { useOrders } from "@/hooks/api/useOrders";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab as MuiTab, Stack, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { useState } from "react";
import { Height } from "@mui/icons-material";
import { AboutUsCard } from "@/components/AboutUsCard";

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
        <PageTitle title={"關於我們"} />

        {/* <Container sx={{ my: 6 }}> */}
        <Stack
          gap={{ xs: 4, md: 6 }}
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
                boxShadow: "0px 2px 4px rgba(51, 88, 145, 0.5)",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            />
          </Box>
          <Box
            sx={{
              background: "#c4c4c4",
              width: "100%",
            }}
          >
            <Typography
              variant="h1"
              color="primary.main"
              weightPreset="bold"
              textAlign={{ xs: "center", md: "left" }}
            >
              創立理念
            </Typography>
          </Box>
          <Stack justifyContent="center" height="100%">
            <Box mt={{ xs: 4, md: 6 }}>
              <Typography
                variant="h5"
                as="p"
                color="secondary.dark"
                textAlign={{ xs: "center", md: "left" }}
              >
                還在為了擔心海外代購需要支付的高額國際運費嗎？
                出國旅遊行李箱的多餘空間不知道要如何運用嗎？
                還在為了找尋更低價的代購商而到處比價嗎?
              </Typography>
              <Typography
                variant="h5"
                as="p"
                color="secondary.dark"
                textAlign={{ xs: "center", md: "left" }}
                sx={{ mt: 3 }}
              >
                為了解決在代購上遇到的問題，並且實現共享經濟，因此我們團隊決定建立一個能夠快速媒合，且價格公開透明的代購媒合平台。
              </Typography>
            </Box>
            {/* <Stack
              direction={{ xs: "row", md: "column" }}
              gap={2}
              mt={{ xs: 3, md: 6 }}
            >
              <StyledButton
                variant="outlined"
                LinkComponent={Link}
                href="/trips/new"
              >
                新增旅途
              </StyledButton>
              <StyledButton LinkComponent={Link} href="/orders/new">
                新增委託
              </StyledButton>
            </Stack> */}
          </Stack>
        </Stack>
        <Box>
          <Box
            sx={{
              width: "100%",
              Height: 500,
              backgroundColor: "#e1e1e1",
              border: "solid 1px",
              clipPath: "ellipse(48% 40% at 50% 50%)",
            }}
          >
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
              核心價值
            </Typography>
          </Box>

          <Stack spacing={1}>
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
                color="secondary.dark"
                textAlign={{ xs: "center", md: "left" }}
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
                color="secondary.dark"
                textAlign={{ xs: "center", md: "left" }}
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
                color="secondary.dark"
                textAlign={{ xs: "center", md: "left" }}
              >
                所有價格公開透明，幫您省去溝通上的時間成本。
              </Typography>
            </Box>
          </Stack>
        </Box>

        <Typography
          variant="h1"
          color="primary.main"
          weightPreset="bold"
          textAlign={{ xs: "center", md: "left" }}
          sx={{ marginTop: 10, display: "flex", justifyContent: "center" }}
        >
          創辦團隊
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
              <AboutUsCard
                step={1 - 1}
                title="邱奕勳"
                content="PM、後端開發"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.consumer[0]!}
              />
              <AboutUsCard
                step={1 - 1}
                title="陳俊廷"
                content="設計、行銷"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.consumer[0]!}
              />
              <AboutUsCard
                step={1 - 1}
                title="范詠淇"
                content="設計、行銷"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.consumer[0]!}
              />
              <AboutUsCard
                step={1 - 1}
                title="邱奕勳"
                content="PM、後端開發"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                ImageProps={images.howItWorks.consumer[0]!}
              />
              <AboutUsCard
                step={1 - 1}
                title="邱奕勳"
                content="PM、後端開發"
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
    aboutUs: await getImagesBase64(["/images/about-us/about-us-cover.jpg"], {
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
