import { useInfiniteQuery } from "@tanstack/react-query";
import { zonedTimeToUtc } from "date-fns-tz";

import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Order, OrderStatus } from "@/types/order";
import type { Trip } from "@/types/trip";
import type { User } from "@/types/user";
import { getLastIndex } from "@/utils/api";

export type Params = PaginationParams<
  {
    userId: User["userId"];
    tripId: Trip["tripId"];
    status: OrderStatus;
    search: string;
    fromCountry: string;
    fromCity: string;
    toCountry: string;
    toCity: string;
    isPackagingRequired: boolean;
    minTravelerFee: number;
    maxTravelerFee: number;
    latestReceiveItemDate: Date;
  },
  Order
>;

interface Options {
  params?: Params;
  pageParam?: number;
}

const getOrders = async (options: Options = {}) => {
  const { params, pageParam = 0 } = options;

  const getParams = {
    ...params,
    latestReceiveItemDate: params?.latestReceiveItemDate
      ? zonedTimeToUtc(params.latestReceiveItemDate, "UTC")
      : undefined,
  };
  const res = await axios.get<PaginatedResponse<Order[]>>("/orders", {
    params: {
      startIndex: pageParam,
      size: 10,
      ...getParams,
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
