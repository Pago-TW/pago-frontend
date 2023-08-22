import { useMemo, type FC } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Add } from "@mui/icons-material";
import { Container, Stack } from "@mui/material";
import { useSession } from "next-auth/react";

import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import { TripList, type TripListProps } from "@/components/TripList";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Paper } from "@/components/ui/Paper";
import { Typography } from "@/components/ui/Typography";
import { useTrips } from "@/hooks/api/useTrips";
import type { TripStatus } from "@/types/trip";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";

type CategorizedTripListProps = Omit<TripListProps, "items"> & {
  category: string;
  status: TripStatus;
};

const CategorizedTripList: FC<CategorizedTripListProps> = ({
  category,
  status,
  ...tripListProps
}) => {
  const { data: session } = useSession();

  const userId = session?.user?.id;
  const { data: tripsData } = useTrips(
    { userId, status },
    { enabled: !!userId }
  );

  const trips = useMemo(
    () => flattenInfinitePaginatedData(tripsData),
    [tripsData]
  );

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Typography variant="h5">{category}</Typography>
        {trips.length !== 0 ? (
          <TripList items={trips} {...tripListProps} />
        ) : null}
      </Stack>
    </Paper>
  );
};

const TripsPage: NextPage = () => {
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
            <CategorizedTripList category="即將出發" status="UPCOMING" />
            <CategorizedTripList category="正在途中" status="ONGOING" />
            <CategorizedTripList category="歷史旅途" status="PAST" />
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export default TripsPage;
