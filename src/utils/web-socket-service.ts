/* eslint-disable */

import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import type { Message, SendMessageRequest } from "@/types/message";

type MessageCallback = (message: Message) => void;

type EventCallback = () => void;

export class WebSocketService {
  private socket: WebSocket | null = null;
  private stompClient: any = null;
  private messageListeners: MessageCallback[] = [];
  private eventListeners: Record<string, EventCallback[]> = {
    connect: [],
    disconnect: [],
  };
  private chatroomId: string;

  constructor(
    private url: string,
    chatroomId: string
  ) {
    this.chatroomId = chatroomId;
    this.connect();
  }

  public connect() {
    this.socket = new SockJS(this.url);
    this.stompClient = Stomp.over(() => this.socket!);

    this.stompClient.connect(
      {},
      (frame: any) => {
        this.stompClient.subscribe(
          `/chatrooms/${this.chatroomId}/message`,
          (message: any) => {
            const parsedMessage: Message = JSON.parse(message.body);
            this.messageListeners.forEach((listener) =>
              listener(parsedMessage)
            );
          }
        );
        this.emit("connect");
      },
      (error: string) => {
        this.emit("disconnect");
      }
    );
  }

  public disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        this.emit("disconnect");
      });
    }
  }

  public on(event: string, callback: EventCallback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event]?.push(callback); // Temporarily fix this.eventListeners[event] undefined by using "?"
  }

  private emit(event: string) {
    const listeners = this.eventListeners[event];
    if (listeners) {
      listeners.forEach((listener) => listener());
    }
  }

  public sendMessage(message: SendMessageRequest) {
    if (this.stompClient) {
      this.stompClient.send("/app/send-message", {}, JSON.stringify(message));
    } else {
      console.error("WebSocket not connected");
    }
  }

  public onMessage(callback: MessageCallback) {
    this.messageListeners.push(callback);
  }

  public offMessage(callback: MessageCallback) {
    this.messageListeners = this.messageListeners.filter(
      (listener) => listener !== callback
    );
  }

  public off(event: string, callback: EventCallback) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event]!.filter(
        // Temporarily fix this.eventListeners[event] undefined by using "!"
        (listener) => listener !== callback
      );
    }
  }
}
