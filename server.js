const express = require("express");
const cors = require("cors");
const path = require("path");
const keyFiles = require("./config/keys.js");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const { SocketMessaging } = require("./socket/socket.js");

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//Importing Routes
const users = require("./routes/Users.js");
const messages = require("./routes/Messages.js");
const groups = require("./routes/Groups.js");
const groupmessages = require("./routes/GroupMessages.js");

//App Routes
app.get("/", (req, res) => {
  res.send("Welcome to Chat Application");
});

app.use("/api/users", users);
app.use("/api/messages", messages);
app.use("/api/groups", groups);
app.use("/api/groupmessages", groupmessages);

//DB Configuration
const db = keyFiles.mongoURI;

//Connecting To DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });
mongoose.connection.on("error", (err) => {
  console.log(err.message);
});
mongoose.connection.on("disconnected", (err) => {
  console.log("DB disconnected");
});

// Port Configuration
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server running at ${port}`);
});

//Socket configuration
const io = socketIo(server);
SocketMessaging(io);
