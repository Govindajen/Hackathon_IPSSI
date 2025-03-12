import { createContext, useContext } from "react";

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  const ws = useContext(WebSocketContext);
  if (!ws) {
    console.warn("WebSocket context not available");
    return null;
  }
  return ws;
};

export const WebSocketProvider = ({ children, value }) => {

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};