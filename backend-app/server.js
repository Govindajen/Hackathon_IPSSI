const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); 

const tweetsRouter = require("./Routes/TweetRoutes");
const usersRouter = require("./Routes/UserRoutes");
const notifsRouter = require("./Routes/NotifRoutes");

mongoose.connect(process.env.MONGODB_URI, {
});

app.use(cors());
app.use(express.json());

app.use("/tweets",  tweetsRouter);
app.use("/users",  usersRouter);
app.use("/notifs", notifsRouter);

app.listen(process.env.PORT, () =>
  console.log("Server listening on port", process.env.PORT)
);
