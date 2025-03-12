import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { WebSocketProvider } from "./wsWrapper"; 

const Layout = ({ children }) => {
  
  const user = useSelector((state) => state.auth.user);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [wsControlleur, setWSControlleur] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");

    ws.onopen = () => {
      setWSControlleur(ws);
      ws.send(JSON.stringify({ type: "connection", userId: user.user.id }));

      ws.onmessage = (message) => {
        const body = JSON.parse(message.data);
        if (body.type === "onlineUsers") {
          setOnlineUsers(body.users);
        }

        if (body.type === "newNotification") {
          setNotifications((prevNotifications) => [
            ...prevNotifications,
            { message: body.message, username: body.username },
          ]);
        }
      };
    };

    const closeWebSocket = () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "close", userId: user.user.id }));
        ws.close();
      }
    };

    window.addEventListener("beforeunload", closeWebSocket);

    return () => {
      closeWebSocket();
      window.removeEventListener("beforeunload", closeWebSocket);
    };
  }, [user.user.id]);

  console.log(wsControlleur)


  return (
    <WebSocketProvider wsControlleur={wsControlleur}>
      <div className="layout">
        <Navbar />
        <main className="page-content">{children}</main>
      </div>
    </WebSocketProvider>
  );
};

export default Layout;
