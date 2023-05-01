import { axios } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

type ChatroomResponse = {
  chatroomId: string;
  currentLoginUserId: string;
  totalUnreadMessage: number;
  latestMessageSendDate: string;
  latestMessageContent: string;
  latestMessageType: string;
  otherUser: {
    userId: string;
    fullName: string;
    avatarUrl: string | null;
  };
};

const getChatroom = async (chatWith: string) => {
  const res = await axios.get<ChatroomResponse>(`/chatrooms`, {
    params: {
      chatWith,
    },
  });
  return res.data;
};

export const useChatroom = (chatWith: string) => {
  return useQuery(["chatroom", chatWith], () => getChatroom(chatWith), {
    refetchOnWindowFocus: false,
  });
};
