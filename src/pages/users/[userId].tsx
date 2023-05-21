import { PageTitle } from "@/components/PageTitle";
import { UserInfo } from "@/components/UserInfo";
import { UserSummary } from "@/components/UserSummary";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { useUser } from "@/hooks/api/useUser";
import { Box, Container, Stack } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

export default function UserDashboardPage() {
  const router = useRouter();
  const userId = router.query.userId as string;

  const { data: user } = useUser(userId);

  if (!user) return null;

  return (
    <>
      <Head>
        <title>會員資料</title>
      </Head>
      <BaseLayout>
        <Container>
          <PageTitle title="會員資料" />
          <Box display="flex" justifyContent="center">
            <Stack width={{ xs: 336, md: "100%" }}>
              <Stack spacing={{ xs: 3, md: 6 }}>
                <UserSummary
                  userId={user.userId}
                  fullName={user.fullName}
                  avatarUrl={user.avatarUrl}
                  consumerReview={user.consumerReview}
                  shopperReview={user.shopperReview}
                  completionRating={user.completionRating}
                  createDate={user.createDate}
                />
                <UserInfo
                  email={user.email}
                  phone={user.phone}
                  country={user.country}
                  aboutMe={user.aboutMe}
                />
              </Stack>
            </Stack>
          </Box>
        </Container>
      </BaseLayout>
    </>
  );
}
