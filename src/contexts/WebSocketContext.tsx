import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useChatroom } from "@/hooks/api/useChatroom";
import useFileUpload from "@/hooks/api/useFileUpload";
import { useChatroomStore } from "@/store/ui/useChatroomStore";
import { WebSocketService } from "@/utils/WebSocketService";

interface WebSocketProviderProps {
  websocketUrl: string;
  children: React.ReactNode;
}

interface WebSocketContextType {
  webSocketService: WebSocketService | null;
  isConnected: boolean;
  sendFileMessage: (files: FileList) => Promise<void>;
}

const WebSocketContext = createContext<WebSocketContextType>({
  webSocketService: null,
  isConnected: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendFileMessage: async () => {},
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  websocketUrl,
}) => {
  const chatWith = useChatroomStore((state) => state.chatWith);

  const webSocketServiceRef = useRef<WebSocketService | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [chatroomId, setChatroomId] = useState<string | null>(null);

  const chatWithString = typeof chatWith === "string" ? chatWith : "";
  const { data: chatroomData } = useChatroom(chatWithString);
  const { mutateAsync: uploadFile } = useFileUpload();

  useEffect(() => {
    if (chatroomData) {
      setChatroomId(chatroomData.chatroomId);
    }
  }, [chatroomData]);

  useEffect(() => {
    if (chatroomId) {
      if (webSocketServiceRef.current) {
        webSocketServiceRef.current.disconnect();
      }
      webSocketServiceRef.current = new WebSocketService(
        websocketUrl,
        chatroomId
      );

      webSocketServiceRef.current.on("connect", () => {
        setIsConnected(true);
      });

      webSocketServiceRef.current.on("disconnect", () => {
        setIsConnected(false);
      });

      webSocketServiceRef.current.connect();

      return () => {
        webSocketServiceRef.current?.disconnect();
      };
    }
  }, [websocketUrl, chatroomId]);

  // useEffect(() => {
  //   return () => {
  //     webSocketServiceRef.current?.disconnect();
  //   };
  // }, [chatroomId]);

  const sendFileMessage = async (files: FileList) => {
    if (!webSocketServiceRef.current) return;

    const webSocketService = webSocketServiceRef.current;

    for (const file of files) {
      try {
        const fileUrl = await uploadFile({
          file,
          params: {
            objectId: chatroomId ?? "",
            objectType: "CHATROOM",
          },
        });

        webSocketService.sendMessage({
          chatroomId: chatroomId ?? "",
          content: fileUrl,
          messageType: "FILE",
          senderId: chatroomData?.currentLoginUserId ?? "",
        });
      } catch (error) {
        console.error("檔案上傳出錯:", error);
      }
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        webSocketService: webSocketServiceRef.current,
        isConnected,
        sendFileMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === null) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
