export type Message = {
  senderId: string;
  chatroomId: string;
  content: string;
  senderName: string;
  sendDate: string;
  messageType: string;
};

export type SendMessageRequest = {
  senderId: string;
  chatroomId: string;
  content: string;
  messageType: "TEXT" | "FILE";
};

export type MessageResponse = {
  senderId: string;
  chatroomId: string;
  content: string;
  senderName: string;
  sendDate: string;
  messageType: "TEXT" | "FILE";
};
