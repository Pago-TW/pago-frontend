// WebSocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { WebSocketService } from "../websocket";

type WebSocketProviderProps = {
  websocketUrl: string;
  children: React.ReactNode;
};

type WebSocketContextType = {
  webSocketService: WebSocketService | null;
  isConnected: boolean;
};

const WebSocketContext = createContext<WebSocketContextType>({
  webSocketService: null,
  isConnected: false,
});

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  websocketUrl,
}) => {
  const webSocketServiceRef = useRef<WebSocketService | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!webSocketServiceRef.current) {
      webSocketServiceRef.current = new WebSocketService(websocketUrl);

      webSocketServiceRef.current.onConnect(() => {
        setIsConnected(true);
      });

      webSocketServiceRef.current.onDisconnect(() => {
        setIsConnected(false);
      });

      webSocketServiceRef.current.connect();
    }

    return () => {
      webSocketServiceRef.current?.disconnect();
    };
  }, [websocketUrl]);

  return (
    <WebSocketContext.Provider
      value={{ webSocketService: webSocketServiceRef.current, isConnected }}
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
