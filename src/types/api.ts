export type PaginationParams<T extends object = object> = Partial<{
  startIndex: number;
  size: number;
  orderBy: string;
  sort: "ASC" | "DESC";
}> &
  Partial<T>;

export type PaginatedResponse<T extends object = object> = {
  total: number;
  startIndex: number;
  size: number;
  data: T;
};
