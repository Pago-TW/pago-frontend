import type { PaginatedResponse } from "@/types/api";
import type { InfiniteData } from "@tanstack/react-query";

export const getInfinitePaginatedDataTotal = <T extends object>(
  data?: InfiniteData<PaginatedResponse<T[]>>
) => {
  return data?.pages?.[0]?.total ?? 0;
};
