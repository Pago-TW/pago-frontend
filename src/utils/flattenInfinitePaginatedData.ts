import type { PaginatedResponse } from "@/types/api";
import type { InfiniteData } from "@tanstack/react-query";

export const flattenInfinitePaginatedData = <T extends object>(
  data?: InfiniteData<PaginatedResponse<T[]>>
) => {
  return data?.pages?.flatMap((page) => page.data);
};
