import type { InfiniteData } from "@tanstack/react-query";

import type { PaginatedResponse } from "@/types/api";

export const getInfinitePaginatedDataTotal = <T extends object>(
  data?: InfiniteData<PaginatedResponse<T[]>>
) => {
  return data?.pages?.[0]?.total ?? 0;
};
