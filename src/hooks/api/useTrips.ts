import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Order } from "@/types/order";
import type { Trip, TripStatus } from "@/types/trip";
import type { User } from "@/types/user";
import { getLastIndex } from "@/utils/getLastIndex";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = PaginationParams<{
  userId: User["userId"];
  orderId: Order["orderId"];
  status: TripStatus;
  search: string;
  latestReceiveItemDate: Date;
}>;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getTrips = async (options: Options = {}) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Trip[]>>("/trips", {
    params: {
      startIndex: pageParam,
      size: 10,
      ...params,
    },
  });
  return res.data;
};

export const useTrips = (params?: Params, options?: { enabled?: boolean }) => {
  return useInfiniteQuery({
    queryKey: ["trips", params],
    queryFn: ({ pageParam }) => getTrips({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};

export default useTrips;
