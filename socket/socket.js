const {addNewMessage}=require("../controllers/GroupMessages.js")

const SocketMessaging = (io) => {
  io.on("connection", (socket) => {
    let roomID = null;
    let username = "";
    console.log("connection established");
    socket.on("join", ({ name, room }, callback) => {
      roomID = room;
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
        addNewMessage(data)
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
};

module.exports={
    SocketMessaging
}
