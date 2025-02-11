/* eslint-disable no-console */

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useFormData } from "@/context/FormDataContext";

const serverUrl: string = process.env
  .SOCKET_APP_BASE_URL as string;
const useWebSocket = (sessionId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [data, setData] = useState<{
    message: string;
    success: boolean;
  } | null>(null);
  const { setFormData } = useFormData();

  useEffect(() => {
    const newSocket = io(serverUrl, {
      query: { sessionId },
    });

    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("formProcessed", data => {
      console.log("Form processed for this client");
      setData(data);
      setFormData(data?.data ?? {});
    });

    return () => {
      newSocket.disconnect();
      console.log("Disconnected from WebSocket server");
    };
  }, [sessionId, setFormData]);

  return { socket, data };
};

export default useWebSocket;
