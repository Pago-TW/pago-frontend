// hooks/api/useChatroomMessages.ts
import { axios } from "@/libs/axios";
import type { PaginatedResponse, PaginationParams } from "@/types/api";
import type { Message } from "@/types/message";
import { getLastIndex } from "@/utils/getLastIndex";
import { useInfiniteQuery } from "@tanstack/react-query";

type Params = PaginationParams;

type Options = {
  params?: Params;
  pageParam?: number;
};

const getChatroomMessages = async (
  chatroomId: string,
  options: Options = {}
) => {
  const { params, pageParam = 0 } = options;

  const res = await axios.get<PaginatedResponse<Message[]>>(
    `/chatrooms/${chatroomId}/messages`,
    {
      params: {
        startIndex: pageParam,
        size: 10,
        ...params,
      },
    }
  );
  return res.data;
};

export const useChatroomMessages = (chatroomId: string, params?: Params) => {
  return useInfiniteQuery({
    queryKey: ["chatroomMessages", chatroomId],
    queryFn: ({ pageParam }) =>
      getChatroomMessages(chatroomId, { params, pageParam }),
    getNextPageParam: (lastPage) => {
      const lastIndex = getLastIndex(lastPage);
      return lastIndex < lastPage.total ? lastIndex + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });
};

export default useChatroomMessages;
