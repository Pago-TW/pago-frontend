import { useMemo, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import { Add } from "@mui/icons-material";
import { Container, Stack, ToggleButtonGroup } from "@mui/material";

import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";
import { TripCollectionList } from "@/components/trip-collection-list";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { ToggleButton } from "@/components/ui/toggle-button";
import { useTripCollections } from "@/hooks/api/use-trip-collection";
import type { Sort } from "@/types/api";
import { flattenInfinitePaginatedData } from "@/utils/api";

const TripsPage: NextPage = () => {
  const [sort, setSort] = useState<Sort>("DESC");

  const { data: tripCollectionsData } = useTripCollections({
    orderBy: "create_date",
    sort: sort,
  });

  const tripCollections = useMemo(() => {
    const flattenedData = flattenInfinitePaginatedData(tripCollectionsData);

    const ongoingTripCollections = flattenedData.filter(
      (tripCollection) => tripCollection.tripCollectionStatus === "ONGOING"
    );
    const otherTripCollections = flattenedData.filter(
      (tripCollection) => tripCollection.tripCollectionStatus !== "ONGOING"
    );

    return [...ongoingTripCollections, ...otherTripCollections];
  }, [tripCollectionsData]);

  const handleSortChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSort: Sort
  ) => {
    setSort(newSort);
  };

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
            <ToggleButtonGroup
              value={sort}
              onChange={handleSortChange}
              color="pago"
              exclusive
            >
              <ToggleButton size="small" value="DESC">
                最新
              </ToggleButton>
              <ToggleButton size="small" value="ASC">
                最舊
              </ToggleButton>
            </ToggleButtonGroup>
            <TripCollectionList data={tripCollections} />
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export default TripsPage;
