import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Order, Shopper } from "@/types/order";
import { getLastIndex } from "@/utils/getLastIndex";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = PaginationParams;

type Options = {
  params?: Params;
  pageParam?: number;
};

type MatchingShoppersResponse = PaginatedResponse<Shopper[]> & { order: Order };

const getMatchingShoppers = async (
  orderId: Order["orderId"],
  options: Options = {}
) => {
  const { params, pageParam } = options;

  const res = await axios.get<MatchingShoppersResponse>(
    `/orders/${orderId}/matching-shoppers`,
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

export const useMatchingShoppers = (
  orderId: Order["orderId"],
  params?: Params,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ["order", orderId, "matches"],
    queryFn: ({ pageParam }) =>
      getMatchingShoppers(orderId, { params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};
