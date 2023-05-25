import { PageTitle } from "@/components/PageTitle";
import { UserInfo } from "@/components/UserInfo";
import { UserSummary } from "@/components/UserSummary";
import {
  HorizontalCenterTabList,
  RequestedCommissions,
  StyledTab,
} from "@/components/UserTabs";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { Button } from "@/components/ui/Button";
import { TabPanel } from "@/components/ui/TabPanel";
import { useUserMe } from "@/hooks/api/useUserMe";
import { TabContext } from "@mui/lab";
import { Box, Container, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const DynamicOngoingTrips = dynamic(() =>
  import("@/components/UserTabs").then((mod) => mod.OngoingTrips)
);
const DynamicPersonalReviews = dynamic(() =>
  import("@/components/UserTabs").then((mod) => mod.PersonalReviews)
);

const PAGE_TABS = [
  { label: "待確認委託", value: "REQUESTED_COMMISSIONS" },
  { label: "未來旅途", value: "ONGOING_TRIPS" },
  { label: "個人評價", value: "PERSONAL_REVIEWS" },
] as const;

type PageTabValue = (typeof PAGE_TABS)[number]["value"];

export default function UserDashboardPage() {
  const { data: user } = useUserMe();

  const [tab, setTab] = useState<PageTabValue>("REQUESTED_COMMISSIONS");

  if (!user) return null;

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newTab: PageTabValue
  ) => setTab(newTab);

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
                <Button
                  size="large"
                  LinkComponent={Link}
                  href="/users/me/settings/profile"
                >
                  編輯會員資料
                </Button>
              </Stack>
              <Box mt={3}>
                <TabContext value={tab}>
                  <HorizontalCenterTabList onChange={handleTabChange}>
                    {PAGE_TABS.map((tab) => (
                      <StyledTab
                        key={tab.value}
                        {...tab}
                        sx={{ fontSize: 18 }}
                      />
                    ))}
                  </HorizontalCenterTabList>
                  <TabPanel value="REQUESTED_COMMISSIONS">
                    <RequestedCommissions userId={user.userId} />
                  </TabPanel>
                  <TabPanel value="ONGOING_TRIPS">
                    <DynamicOngoingTrips userId={user.userId} />
                  </TabPanel>
                  <TabPanel value="PERSONAL_REVIEWS">
                    <DynamicPersonalReviews userId={user.userId} />
                  </TabPanel>
                </TabContext>
              </Box>
            </Stack>
          </Box>
        </Container>
      </BaseLayout>
    </>
  );
}
