/* eslint-disable no-console */

import { useEffect, useState } from "react";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const serverUrl: string = process.env
  .SOCKET_APP_BASE_URL as string;
const useWebSocket = (sessionId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [data, setData] = useState<{
    message?: string;
    showPayment?: boolean;
    success?: boolean;
  } | null>(null);
  const user = useAuth();
  const router = useRouter();

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
      if (!user?.id) {
        sessionStorage.setItem(
          "formData",
          JSON.stringify(data?.data ?? {}),
        );
        if (data?.existing) {
          toast.error(
            "Email already exists, Please login to continue, You are being redirected to login page",
          );
          setTimeout(() => {
            router.push("/login?next=surprise");
          }, 2000);
        } else {
          setData({
            showPayment: true,
            message: data?.message ?? "",
          });
        }
      } else {
        setData({ success: true });
        toast.success(
          "Recipient details stored successfully",
        );
        console.log(data);
      }
    });

    return () => {
      newSocket.disconnect();
      console.log("Disconnected from WebSocket server");
    };
  }, [sessionId]);

  return { socket, data };
};

export default useWebSocket;
