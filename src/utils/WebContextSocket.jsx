// src/utils/WebSocketProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");

    if (playerId) {
      const socket = new WebSocket(
        `ws://localhost:3000?playerid=${encodeURIComponent(playerId)}`
      );

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        console.log("Received message:", event.data);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed, retrying...");
        setTimeout(() => {
          setWs(null);
          setWs(
            new WebSocket(
              `ws://localhost:3000?playerid=${encodeURIComponent(playerId)}`
            )
          );
        }, 5000); // Retry after 5 seconds
      };

      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      setWs(socket);

      return () => {
        socket.close();
      };
    }
  }, []);

  return (
    <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
