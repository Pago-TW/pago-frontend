import type { InfiniteData } from "@tanstack/react-query";

import type { PaginatedResponse } from "@/types/api";

export const flattenInfinitePaginatedData = <T extends object>(
  data?: InfiniteData<PaginatedResponse<T[]>>
) => {
  return data?.pages?.flatMap((page) => page.data) ?? [];
};
