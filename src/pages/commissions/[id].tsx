import { BuyingAgent } from "@components/BuyingAgent";
import { DetailItem } from "@components/DetailItem";
import { Container } from "@components/layouts/Container";
import { PageTitle } from "@components/PageTitle";
import { Link } from "@components/ui/Link";
import { Typography } from "@components/ui/Typography";
import { Place } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

const CommissionDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>委託詳情</title>
      </Head>
      <Container>
        <Box sx={{ mx: { xs: 3, sm: 13 }, my: { xs: 3, md: 8 } }}>
          <PageTitle title="委託詳情" sharable />
        </Box>
        <Stack alignItems="center" mb={4}>
          <Stack spacing={2} sx={{ width: 336 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Stack spacing={2}>
                {/* 圖片 */}
                <Skeleton variant="rectangular" height={300} width={300} />
                {/* 名稱 */}
                <Typography variant="h3" sx={{ textAlign: "center" }}>
                  商品名稱
                </Typography>
              </Stack>
            </Paper>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Stack spacing={4}>
                {/* 詳細 */}
                <DetailItem label="商品價格" value="215NT$" valueBold />
                <DetailItem label="願付代購費" value="60NT$" valueBold />
                <DetailItem label="關稅" value="5NT$" valueBold />
                <DetailItem label="平台費" value="0NT$" valueBold />
                <DetailItem
                  label="總付款金額"
                  value="280NT$"
                  valueVariant="h3"
                  valueBold
                />
                <DetailItem label="商品規格" value="300ml" />
                <DetailItem label="商品數量" value="2" />
                <DetailItem label="是否需要包裝" value="是" />
                <DetailItem label="是否需要購買證明" value="是" />
                <DetailItem
                  label="商品購買地點"
                  value={
                    <Stack direction="row" alignItems="center">
                      <Place />
                      Forbes Pl Kawerau New Zealand
                    </Stack>
                  }
                  multiLine
                />
                <DetailItem
                  label="送達地點"
                  value={
                    <Stack direction="row" alignItems="center">
                      <Place />
                      338 桃園市蘆竹區大興十街6號
                    </Stack>
                  }
                  multiLine
                />
                <DetailItem
                  label="最晚收到商品時間"
                  value="11/15/2022 12:00AM"
                  multiLine
                />
                <DetailItem
                  label="備註"
                  value="請不要造成瓶身撞凹，謝謝"
                  multiLine
                />
              </Stack>
            </Paper>
            <Stack spacing={3}>
              {/* 代購者 */}
              <Typography variant="h3" mt={1} sx={{ textAlign: "center" }}>
                願意代購者
              </Typography>
              <BuyingAgent />
              <BuyingAgent />
              <Stack alignItems="center">
                <Link fontSize={18} mt={1}>
                  顯示更多
                </Link>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ "&&": { mt: 5 } }}>
              {/* 更多代購者 */}
              <AvatarGroup total={100}>
                <Avatar />
                <Avatar />
                <Avatar />
                <Avatar />
              </AvatarGroup>
              <Typography variant="h6" color="base.400">
                另有100位代購者的旅途與此委託相符
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default CommissionDetailPage;
