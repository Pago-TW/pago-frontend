import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Chatroom } from "@/types/chatroom";
import { getLastIndex } from "@/utils/getLastIndex";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = PaginationParams<{}>;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getChatRooms = async (options: Options = {}) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Chatroom[]>>("/chatrooms", {
    params: {
      startIndex: pageParam,
      size: 10,
      ...params,
    },
  });
  return res.data;
};

export const useChatRooms = (
  params?: Params,
  options?: { enabled?: boolean }
) => {
  return useInfiniteQuery({
    queryKey: ["chatrooms"],
    queryFn: ({ pageParam }) => getChatRooms({ params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    ...options,
  });
};

export default useChatRooms;
