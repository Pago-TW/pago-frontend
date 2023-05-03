import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import type { TripListProps } from "@/components/TripList";
import { TripList } from "@/components/TripList";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Paper } from "@/components/ui/Paper";
import { Typography } from "@/components/ui/Typography";
import { useTrips } from "@/hooks/api/useTrips";
import { flattenInfinitePaginatedData } from "@/utils/flattenInfinitePaginatedData";
import { Add } from "@mui/icons-material";
import { Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import type { FC } from "react";
import { useMemo } from "react";

type CategorizedTripListProps = TripListProps & { category: string };

const CategorizedTripList: FC<CategorizedTripListProps> = ({
  category,
  ...tripListProps
}) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Typography variant="h5">{category}</Typography>
        <TripList {...tripListProps} />
      </Stack>
    </Paper>
  );
};

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
            <CategorizedTripList category="即將出發" items={trips} />
            <CategorizedTripList category="正在途中" items={trips} />
            <CategorizedTripList category="歷史旅途" items={trips} />
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export default TripsPage;
