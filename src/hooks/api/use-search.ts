import { useInfiniteQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Order } from "@/types/order";
import type { SearchedTrip } from "@/types/trip";
import type { User } from "@/types/user";
import { getLastIndex } from "@/utils/api";

export type SearchType = "order" | "trip" | "user";

type Params<T extends SearchType> = PaginationParams & {
  type: T;
  query: string;
};

type ResponseData<TSearchType extends SearchType> = TSearchType extends "order"
  ? PaginatedResponse<Order[]>
  : TSearchType extends "trip"
  ? PaginatedResponse<SearchedTrip[]>
  : TSearchType extends "user"
  ? PaginatedResponse<User[]>
  : never;

const search = async <TSearchType extends SearchType>({
  params,
  pageParam,
}: {
  params: Params<TSearchType>;
  pageParam: number;
}) => {
  const res = await axios.get<ResponseData<TSearchType>>(`/search`, {
    params: {
      startIndex: pageParam,
      size: 10,
      ...params,
    },
  });
  return res.data;
};

export const useSearch = ({ params }: { params: Params<SearchType> }) => {
  return useInfiniteQuery({
    queryKey: ["search", params],
    queryFn: ({ pageParam = 0 }) => search({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex<Order[] | SearchedTrip[] | User[]>(
        lastPage
      );
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
  });
};
