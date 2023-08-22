import { useInfiniteQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Order } from "@/types/order";
import type { Trip } from "@/types/trip";
import { getLastIndex } from "@/utils/getLastIndex";

type Params = PaginationParams;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getMatchingOrders = async (
  tripId: Trip["tripId"],
  options: Options = {}
) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Order[]>>(
    `/trips/${tripId}/matching-orders`,
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

export const useMatchingOrders = (
  tripId: Trip["tripId"],
  params?: Params,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ["trip", tripId, "matches"],
    queryFn: ({ pageParam }) =>
      getMatchingOrders(tripId, { params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};
