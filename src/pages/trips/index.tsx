import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import { TripList } from "@/components/TripList";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { useTrips } from "@/hooks/api/useTrips";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { Add } from "@mui/icons-material";
import { Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useMemo } from "react";

const TripsPage: NextPage = () => {
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const { data: tripsData } = useTrips({ userId }, { enabled: !!userId });

  const trips = useMemo(
    () => flattenInfinitePaginatedData(tripsData) ?? [],
    [tripsData]
  );

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
