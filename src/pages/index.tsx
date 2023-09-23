import type { InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { Box, Container, Stack, styled } from "@mui/material";
import { getPlaiceholder } from "plaiceholder";

import Footer from "@/components/footer";
import { HowItWorks } from "@/components/home/how-it-works";
import { LatestOrders } from "@/components/home/latest-orders";
import { BaseLayout } from "@/components/layouts/base-layout";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";

const StyledButton = styled(Button)({
  minWidth: "fit-content",
  width: "100%",
  fontSize: 18,
});

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
}) => {
  return (
    <>
      <Head>
        <title>Pago</title>
        <meta name="description" content="" />
      </Head>
      <BaseLayout>
        <Container sx={{ my: 6 }}>
          <Stack
            gap={{ xs: 4, md: 6 }}
            direction={{ md: "row" }}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              position="relative"
              width={{ xs: 300, md: 400 }}
              sx={{ aspectRatio: "1 / 1" }}
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                {...images.introduction}
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
            <Stack justifyContent="center" height="100%">
              <Typography
                variant="h1"
                color="primary.main"
                weightPreset="bold"
                textAlign={{ xs: "center", md: "left" }}
              >
                Pago 讓你輕鬆代購
              </Typography>
              <Box mt={{ xs: 4, md: 6 }}>
                <Typography
                  variant="h5"
                  as="p"
                  color="secondary.dark"
                  textAlign={{ xs: "center", md: "left" }}
                >
                  你全球購物路上的得力助手
                </Typography>
                <Typography
                  variant="h5"
                  as="p"
                  color="secondary.dark"
                  textAlign={{ xs: "center", md: "left" }}
                  sx={{ mt: 3 }}
                >
                  讓你在家省到，在外賺到
                </Typography>
              </Box>
              <Stack
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
              </Stack>
            </Stack>
          </Stack>

          <LatestOrders />

          <HowItWorks />
        </Container>
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

export const getStaticProps = async () => {
  const introductionImage = await getImageBase64("/images/introduction.svg", {
    alt: "Page introduction image",
  });

  return {
    props: {
      images: {
        introduction: introductionImage,
      },
    },
  };
};

export default Home;
