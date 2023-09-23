import { useInfiniteQuery } from "@tanstack/react-query";

import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Review, ReviewType } from "@/types/review";
import type { User } from "@/types/user";
import { getLastIndex } from "@/utils/api";

type Params = PaginationParams<{
  type: ReviewType;
}>;

interface Options {
  params?: Params;
  pageParam?: number;
}

const getReviews = async (userId: User["userId"], options: Options = {}) => {
  const { params, pageParam } = options;

  const res = await axios.get<PaginatedResponse<Review[]>>("/reviews", {
    params: {
      startIndex: pageParam,
      size: 10,
      userId,
      ...params,
    },
  });
  return res.data;
};

export const useReviews = (userId: User["userId"], params?: Params) => {
  return useInfiniteQuery({
    queryKey: ["reviews", userId, params],
    queryFn: ({ pageParam }) => getReviews(userId, { params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
  });
};
