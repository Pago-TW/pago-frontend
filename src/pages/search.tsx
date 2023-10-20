import { useEffect, useMemo, type SyntheticEvent } from "react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { useInView } from "react-intersection-observer";

import { BaseLayout } from "@/components/layouts/base-layout";
import OrderList from "@/components/order-list";
import { ShowMoreButton } from "@/components/show-more-button";
import TripList from "@/components/trip-list";
import { Typography } from "@/components/ui/typography";
import { UserItem } from "@/components/user-item";
import { UserList } from "@/components/user-list";
import { useSearch, type SearchType } from "@/hooks/api/use-search";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Order } from "@/types/order";
import type { Trip } from "@/types/trip";
import type { User } from "@/types/user";
import { flattenInfinitePaginatedData } from "@/utils/api";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 18,
  maxWidth: 200,
  width: "100%",
  flexShrink: 1,
  [theme.breakpoints.up("sm")]: {
    fontSize: 20,
  },
}));

export default function SearchPage() {
  const router = useRouter();

  const q = router.query.q as string;
  const type = router.query.type as SearchType;

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { ref, inView } = useInView();

  const {
    data: itemsData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useSearch({
    params: { type, query: q },
  });

  const items = useMemo(
    () => flattenInfinitePaginatedData<Order | Trip | User>(itemsData),
    [itemsData]
  );

  useEffect(() => {
    if (inView && hasNextPage) void fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  const handleTabChange = (_e: SyntheticEvent, value: SearchType) => {
    void router.push(
      {
        query: {
          ...router.query,
          type: value,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleShowMore = () => fetchNextPage();

  return (
    <>
      <Head>
        <title>{q ? `${q} 的搜尋結果 - Pago` : "Pago"}</title>
        <meta name="description" content="" />
      </Head>
      <BaseLayout>
        <Container sx={{ my: 6 }}>
          <Tabs value={type} onChange={handleTabChange} centered>
            <StyledTab value="order" label="委託" />
            <StyledTab value="trip" label="旅途" />
            <StyledTab value="user" label="使用者" />
          </Tabs>
          <Box mt={{ xs: 3, md: 6 }}>
            {items.length !== 0 ? (
              <>
                {type === "order" && <OrderList items={items as Order[]} />}
                {type === "trip" && <TripList items={items as Trip[]} />}
                {type === "user" && (
                  <UserList gap={4}>
                    {(items as User[]).map((item) => (
                      <UserItem key={item.userId} {...item} />
                    ))}
                  </UserList>
                )}
              </>
            ) : null}
            {!isFetching && items.length === 0 ? (
              <Typography
                variant={mdUp ? "h3" : "h5"}
                component="p"
                textAlign="center"
              >
                查無符合「{q}」的結果
              </Typography>
            ) : null}
            <ShowMoreButton
              hasMore={hasNextPage}
              onClick={handleShowMore}
              loading={isFetching}
              fullWidth
              ref={ref}
              sx={{ mt: 2 }}
            />
          </Box>
        </Container>
      </BaseLayout>
    </>
  );
}

export const getServerSideProps = (async ({ query }) => {
  const q = query.q as string;
  const type = query.type as string;

  if (!q) {
    return {
      notFound: true,
    };
  }

  if (!type) {
    return {
      redirect: {
        destination: `/search?q=${q}&type=order`,
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}) satisfies GetServerSideProps;
