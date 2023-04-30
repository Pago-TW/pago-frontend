export type Chatroom = {
  chatroomId: string;
  currentLoginUserId: string;
  totalUnreadMessage: number;
  latestMessageSendDate: string;
  latestMessageContent: string;
  latestMessageType: string;
  otherUser: OtherUser;
};

export type OtherUser = {
  userId: string;
  fullName: string;
  avatarUrl: string | null;
};
