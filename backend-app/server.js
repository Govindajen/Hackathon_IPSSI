const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http"); // Import HTTP module

const { WebSocketServer, WebSocket } = require("ws");


dotenv.config();

const tweetsRouter = require("./Routes/TweetRoutes");
const usersRouter = require("./Routes/UserRoutes");
const notifsRouter = require("./Routes/NotifRoutes");

mongoose.connect(process.env.MONGODB_URI, {});

// Middleware
app.use(cors());
app.use(express.json());

app.use("/tweets", tweetsRouter);
app.use("/users", usersRouter);
app.use("/notifs", notifsRouter);

// Create HTTP server and attach Express
const server = http.createServer(app);

// WebSocket Server
const wss = new WebSocketServer({ server });

let onlineUsers = []; // Move this line up

wss.on("connection", (ws) => {
  console.log("WebSocket connected");

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "connection") {
      // Add user to online users list
      onlineUsers.push(parsedMessage.userId);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "onlineUsers", users: onlineUsers }));
        }
      });
    }

    if (parsedMessage.type === "close") {
      // Remove user from online users list
      onlineUsers = onlineUsers.filter((userId) => userId !== parsedMessage.userId);
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "onlineUsers", users: onlineUsers }));
        }
      });
    }

    ws.send(JSON.stringify({ type: "message", msg: "Hello from WebSocket server!" }));
  });

  ws.send("Hello from WebSocket server");
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

