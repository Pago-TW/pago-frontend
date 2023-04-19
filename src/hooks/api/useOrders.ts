import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Order } from "@/types/order";
import { getLastIndex } from "@/utils/getLastIndex";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type Params = PaginationParams<{
  userId: string;
  status: string;
  search: string;
  from: string;
  to: string;
  isPackagingRequired: string;
}>;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getOrders = async (
  options: Options = {}
): Promise<PaginatedResponse<Order[]>> => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get("/orders", {
    params: {
      startIndex: pageParam,
      size: 10,
      ...params,
    },
  });
  return res.data;
};

export const useOrders = (params?: Params, options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }) => getOrders({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};

export default useOrders;
