import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  
  const user = useSelector((state) => state.auth.user);
  const [wsControlleur, setWSControlleur] = useState(null);

/*   useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000/ws");

    ws.onopen = () => {
      setWSControlleur(ws);
      ws.send(JSON.stringify({ type: "connection", userId: user.user.id, wsId: ws.id }));

      ws.onmessage = (message) => {
        const body = JSON.parse(message.data);

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
  }, [user.user.id]); */


  return (
      <div className="layout">
        <Navbar />
        <main className="page-content">{children}</main>
      </div>
  );
};

export default Layout;
