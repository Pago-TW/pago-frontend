export interface Chatroom {
  chatroomId: string;
  currentLoginUserId: string;
  totalUnreadMessage: number;
  latestMessageSenderId: string;
  latestMessageSendDate: string;
  latestMessageContent: string;
  latestMessageType: string;
  otherUser: OtherUser;
}

export interface OtherUser {
  userId: string;
  fullName: string;
  avatarUrl: string | null;
}
