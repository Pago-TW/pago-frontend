import type { KeysToSnakeCase } from "@/types/util";

export type Sort = "ASC" | "DESC";

export type PaginationParams<
  TExtraParams extends object = object,
  TReturnData extends object = object,
> = Partial<{
  startIndex: number;
  size: number;
  orderBy: keyof KeysToSnakeCase<TReturnData>;
  sort: Sort;
}> &
  Partial<TExtraParams>;

export interface PaginatedResponse<T extends object = object> {
  total: number;
  startIndex: number;
  size: number;
  data: T;
}
