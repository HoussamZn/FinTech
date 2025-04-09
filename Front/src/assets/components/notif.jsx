// NotificationSocket.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import Toast from "./Ui/Toast";

const NotificationSocket = () => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:8002/ws/${user.id}`);
    socket.onmessage = (event) => {
      setMessage(event.data);
    };
  }, [user]);

  const handleClose = () => {
    console.log('Toast closed');
  };

  return <Toast message={message} onClose={handleClose} />
};

export default NotificationSocket;
