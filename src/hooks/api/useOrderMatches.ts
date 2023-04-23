import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Order } from "@/types/order";
import type { Trip } from "@/types/trip";
import { getLastIndex } from "@/utils/getLastIndex";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = PaginationParams;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getOrderMatches = async (
  orderId: Order["orderId"],
  options: Options = {}
) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Trip[]>>(
    `/orders/${orderId}/matching-orders`,
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

export const useOrderMatches = (
  orderId: Order["orderId"],
  params?: Params,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ["order", orderId, "matches"],
    queryFn: ({ pageParam }) => getOrderMatches(orderId, { params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};
