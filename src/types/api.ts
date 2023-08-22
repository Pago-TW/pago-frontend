import type { KeysToSnakeCase } from "./util";

export type PaginationParams<
  T extends object = object,
  D extends object = object,
> = Partial<{
  startIndex: number;
  size: number;
  orderBy: KeysToSnakeCase<D>;
  sort: "ASC" | "DESC";
}> &
  Partial<T>;

export interface PaginatedResponse<T extends object = object> {
  total: number;
  startIndex: number;
  size: number;
  data: T;
}
