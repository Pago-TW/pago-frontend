import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Order, OrderStatus } from "@/types/order";
import type { Trip } from "@/types/trip";
import type { User } from "@/types/user";
import { getLastIndex } from "@/utils/getLastIndex";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = PaginationParams<{
  userId: User["userId"];
  tripId: Trip["tripId"];
  status: OrderStatus;
  search: string;
  from: string;
  to: string;
  isPackagingRequired: boolean;
}>;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getOrders = async (options: Options = {}) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Order[]>>("/orders", {
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
    queryKey: ["orders", params],
    queryFn: ({ pageParam }) => getOrders({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};

export default useOrders;
