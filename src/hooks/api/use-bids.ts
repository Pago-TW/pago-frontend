import { useInfiniteQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Bid } from "@/types/bid";
import type { Order } from "@/types/order";
import { getLastIndex } from "@/utils/api";

type Params = PaginationParams;

interface Options {
  params?: Params;
  pageParam?: number;
}

const getBids = async (orderId: Order["orderId"], options: Options = {}) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Bid[]>>(
    `/orders/${orderId}/bids`,
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

export const useBids = (
  orderId: Order["orderId"],
  params?: Params,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ["bidders", orderId],
    queryFn: ({ pageParam }) => getBids(orderId, { params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};
