import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import { TripList } from "@/components/TripList";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { useTrips } from "@/hooks/api/useTrips";
import { Add } from "@mui/icons-material";
import { Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";

const TripsPage: NextPage = () => {
  const { data: trips = [] } = useTrips();

  return (
    <>
      <Head>
        <title>所有旅途</title>
      </Head>
      <BaseLayout>
        <PageTitle title="所有旅途">
          <Button LinkComponent={Link} href="/trips/new">
            <Add />
            新增旅途
          </Button>
        </PageTitle>
        <Container>
          <Stack spacing={2}>
            <TripList category="即將出發" items={trips} />
            <TripList category="正在途中" items={trips} />
            <TripList category="歷史旅途" items={trips} />
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export default TripsPage;
