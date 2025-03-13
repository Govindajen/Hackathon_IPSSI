// server.js

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { WebSocketServer, WebSocket } = require("ws");

dotenv.config();

const tweetsRouter = require("./Routes/TweetRoutes");
const usersRouter = require("./Routes/UserRoutes");
const notifsRouter = require("./Routes/NotifRoutes");
const searchRouter = require('./Routes/search');
const emotionsRouter = require('./Routes/emotions');
const uploadRouter = require("./Routes/upload"); // Import de la route d'upload

mongoose.connect(process.env.MONGODB_URI, {});

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.use("/tweets", tweetsRouter);
app.use("/users", usersRouter);
app.use("/notifs", notifsRouter);
app.use('/search', searchRouter);
app.use('/emotions', emotionsRouter);
app.use("/upload", uploadRouter); // Utilisation de la route d'upload

// Servir le dossier "uploads" en tant que statique
app.use("/uploads", express.static("uploads"));

// Création du serveur HTTP et configuration du WebSocket
const server = http.createServer(app);
const wss = new WebSocketServer({ 
  server,
  path: '/ws' 
});

let onlineUsers = [];

wss.on("connection", (ws) => {
  console.log("WebSocket connected");

  ws.on("message", (message) => {
    const parsedMessage = JSON.parse(message);
    console.log("Received message:", parsedMessage);

    if (parsedMessage.type === "connection") {
      onlineUsers.push({ userId: parsedMessage.userId, wsId: ws.id });
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: "onlineUsers", users: onlineUsers }));
        }
      });
    }

    if (parsedMessage.type === "close") {
      onlineUsers = onlineUsers.filter((user) => user.userId !== parsedMessage.userId);
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

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
