import { useMemo, type SyntheticEvent } from "react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Container, styled, Tab, Tabs } from "@mui/material";

import { BaseLayout } from "@/components/layouts/base-layout";
import OrderList from "@/components/order-list";
import TripList from "@/components/trip-list";
import { UserItem } from "@/components/user-item";
import { UserList } from "@/components/user-list";
import { useSearch, type SearchType } from "@/hooks/api/use-search";
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

  const { data: itemsData } = useSearch({ params: { type, query: q } });

  const items = useMemo(
    () => flattenInfinitePaginatedData<Order | Trip | User>(itemsData),
    [itemsData]
  );

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
          {type === "order" && <OrderList items={items as Order[]} />}
          {type === "trip" && <TripList items={items as Trip[]} />}
          {type === "user" && (
            <UserList gap={4}>
              {(items as User[]).map((item) => (
                <UserItem key={item.userId} {...item} />
              ))}
            </UserList>
          )}
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
