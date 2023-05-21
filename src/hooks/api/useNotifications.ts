import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Notification } from "@/types/notification";
import { getLastIndex } from "@/utils/getLastIndex";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = PaginationParams;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getNotifications = async (options: Options = {}) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Notification[]>>(
    "/notifications",
    {
      params: {
        startIndex: pageParam,
        size: 25,
        ...params,
      },
    }
  );
  return res.data;
};

export const useNotifications = (
  params?: Params,
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    refetchInterval?: number | false;
    refetchIntervalInBackground?: boolean;
    onSuccess?: (data: InfiniteData<PaginatedResponse<Notification[]>>) => void;
  }
) => {
  return useInfiniteQuery({
    queryKey: ["notifications"],
    queryFn: ({ pageParam }) => getNotifications({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};

export default useNotifications;
