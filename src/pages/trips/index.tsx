import { useMemo } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Add } from "@mui/icons-material";
import { Container, Stack } from "@mui/material";

import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";
import { TripCollectionList } from "@/components/trip-collection-list";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { useTripCollections } from "@/hooks/api/use-trip-collection";
import { flattenInfinitePaginatedData } from "@/utils/api";

const TripsPage: NextPage = () => {
  const { data: tripCollectionsData } = useTripCollections();

  const tripCollections = useMemo(
    () => flattenInfinitePaginatedData(tripCollectionsData),
    [tripCollectionsData]
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
          <Stack spacing={3}>
            <TripCollectionList data={tripCollections} />
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export default TripsPage;
