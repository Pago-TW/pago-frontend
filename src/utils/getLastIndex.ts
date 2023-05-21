import type { PaginatedResponse } from "@/types/api";

export const getLastIndex = <T extends object>(page: PaginatedResponse<T>) => {
  return page.startIndex + page.size - 1;
};
