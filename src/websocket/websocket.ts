import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { MessageResponse, SendMessageRequest } from "@/types/message";
import { useChatrooms } from "@/hooks/api/useChatrooms";

type MessageCallback = (message: MessageResponse) => void;
type ConnectCallback = () => void;

const Chatrooms = () => {
  const { data: chatroomsData } = useChatrooms();
};

export class WebSocketService {
  private socket: WebSocket | null = null;
  private stompClient: Client | null = null;
  private messageListeners: MessageCallback[] = [];
  private pendingChatroomId: string | null = null;
  private pendingChatroomIds: Set<string> = new Set();
  private subscribedChatrooms: Set<string> = new Set();
  private connectListeners: ConnectCallback[] = [];
  private boundHandleMessage: ((event: MessageEvent) => void) | null = null;

  constructor(private url: string) {
    this.connect();
  }

  offMessage() {
    if (this.socket && this.boundHandleMessage) {
      this.socket.removeEventListener("message", this.boundHandleMessage);
    }
  }

  offConnect(callback: ConnectCallback): void {
    this.connectListeners = this.connectListeners.filter(
      (listener) => listener !== callback
    );
  }

  onConnect(callback: () => void): void {
    if (!this.stompClient) {
      console.error("StompClient not initialized");
      return;
    }

    this.connectListeners.push(callback);

    this.stompClient.onConnect = (frame) => {
      console.log("WebSocket connection opened");
      this.connectListeners.forEach((listener) => listener());
      callback();

      if (this.pendingChatroomId) {
        this.subscribe(this.pendingChatroomId);
      }
    };
  }

  onDisconnect(callback: () => void): void {
    if (!this.stompClient) {
      console.error("StompClient not initialized");
      return;
    }

    this.stompClient.onWebSocketClose = () => {
      console.log("WebSocket connection closed");
      callback();
    };
  }

  public connect() {
    this.socket = new SockJS(this.url);
    this.stompClient = new Client({
      webSocketFactory: () => this.socket as WebSocket,
    });

    this.stompClient.activate();
  }

  public disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
    }
  }

  public subscribe(chatroomId: string) {
    console.log("WebSocketService subscribe", chatroomId);

    if (this.pendingChatroomId) {
      this.unsubscribe(this.pendingChatroomId);
    }
    this.pendingChatroomId = chatroomId;

    if (!this.stompClient || !this.stompClient.connected) {
      console.error("WebSocket not connected");
      return;
    }

    if (this.subscribedChatrooms.has(chatroomId)) {
      console.warn(`Already subscribed to chatroom ${chatroomId}`);
      return;
    }

    this.stompClient.subscribe(
      `/chatrooms/${chatroomId}/message`,
      (message) => {
        console.log("SUBSCRIBE /chatrooms/{chatroomId}/message");
        const parsedMessage: MessageResponse = JSON.parse(message.body);
        this.handleMessage(parsedMessage);
        this.subscribedChatrooms.add(chatroomId);
      }
    );
  }

  public unsubscribe(chatroomId: string) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.unsubscribe(`/chatrooms/${chatroomId}/message`);
      this.subscribedChatrooms.delete(chatroomId);
    } else {
      console.error("WebSocket not connected");
    }
  }

  public sendMessage(message: SendMessageRequest) {
    if (this.stompClient) {
      console.log("StompClient state before sending message:");
      console.log("Connected:", this.stompClient.connected);
      console.log("Active:", this.stompClient.active);
    } else {
      console.log("StompClient is null before sending message");
    }

    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: "/app/send-message",
        body: JSON.stringify(message),
      });
    } else {
      console.error("WebSocket not connected");
    }
  }

  public onMessage(callback: MessageCallback) {
    this.messageListeners.push(callback);
  }

  public isChatroomSubscribed(chatroomId: string): boolean {
    return this.subscribedChatrooms.has(chatroomId);
  }

  public isConnected(): boolean {
    return this.stompClient ? this.stompClient.connected : false;
  }

  private handleMessage(message: MessageResponse) {
    for (const callback of this.messageListeners) {
      callback(message);
    }
  }
}
