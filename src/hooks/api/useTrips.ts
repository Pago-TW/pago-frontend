import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Trip } from "@/types/trip";
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

const getTrips = async (
  options: Options = {}
): Promise<PaginatedResponse<Trip[]>> => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get("/trips", {
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
    queryKey: ["trips"],
    queryFn: ({ pageParam }) => getTrips({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};

export default useTrips;
