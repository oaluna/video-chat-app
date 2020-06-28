const express = require("express");
const cors = require("cors");
const path = require("path");
const keyFiles = require("./config/keys.js");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const http = require("http");

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

//App Routes
app.get("/", (req, res) => {
  res.send("Welcome to Chat Application");
});

app.use("/api/users", users);
app.use("/api/messages", messages);
app.use("/api/groups", groups);

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

//Socket Configuration
const io = socketIo(server);

// Port Configuration
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server running at ${port}`);
});

io.on("connection", (socket) => {
  let roomID=null;
  let username = "";
  console.log("connection established");
  socket.on("join", ({ name, room }, callback) => {
    roomID=room
    socket.join(room);
    name.name.lastname
      ? (username = `${name.name.firstname} ${name.name.lastname}`)
      : (username = name.name.firstname);

    socket.emit("message", {
      sendername: "ChatBot",
      message: `Welcome ${username} to the group`,
      date: new Date(),
      group: room,
      sender: 0,
    });
    socket.broadcast.to(room).emit("message", {
      sendername: "ChatBot",
      message: `${username} joined`,
      date: new Date(),
      group: room,
      sender: 0,
    });
    callback();
  });

  socket.on("sendMessage", (data, callback) => {
    io.to(data.group).emit("message", data);
    callback();
  });

  socket.on("disconnect", () => {
    console.log("connection disconnected");

    io.to(roomID).emit("message", {
      sendername: "ChatBot",
      message: `${username} left`,
      date: new Date(),
      group: roomID,
      sender: 0,
    });

  });
});
