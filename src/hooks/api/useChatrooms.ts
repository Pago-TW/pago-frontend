import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Chatroom } from "@/types/chatroom";
import { getLastIndex } from "@/utils/getLastIndex";
import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = PaginationParams;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getChatrooms = async (options: Options = {}, chatWith?: string) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Chatroom[]>>("/chatrooms", {
    params: {
      startIndex: pageParam,
      size: 10,
      ...params,
      ...(chatWith ? { chatWith } : {}),
    },
  });
  return res.data;
};

export const useChatrooms = (
  params?: Params,
  options?: {
    enabled?: boolean;
    refetchOnWindowFocus?: boolean;
    onSuccess?: (data: InfiniteData<PaginatedResponse<Chatroom[]>>) => void;
  }
) => {
  return useInfiniteQuery({
    queryKey: ["chatrooms"],
    queryFn: ({ pageParam }) => getChatrooms({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};

export default useChatrooms;
