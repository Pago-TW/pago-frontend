import { useInfiniteQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { TripCollection } from "@/types/trip";
import { getLastIndex } from "@/utils/api";

type Params = PaginationParams<
  {
    search: string;
  },
  TripCollection
>;

interface Options {
  params?: Params;
  pageParam?: number;
}

const getTripCollections = async (options: Options = {}) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<TripCollection[]>>(
    "/trip-collections",
    {
      params: {
        startIndex: pageParam,
        size: 10,
        ...params,
      },
    }
  );
  return res.data;
};

export const useTripCollections = (params?: Params) => {
  return useInfiniteQuery({
    queryKey: ["trips", "collections", params],
    queryFn: ({ pageParam }) => getTripCollections({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
  });
};
