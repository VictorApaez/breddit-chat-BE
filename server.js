const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

io.on("connection", (socket) => {
  let userId = socket.handshake.query.id;

  console.log("user has connected: " + userId);
  socket.join(userId);

  socket.on("joinRooms", (rooms) => {
    socket.join(rooms);
  });

  socket.on("createRoom", (data) => {
    console.log(data);
    socket.join(data.rooms);
    data.sendTo.forEach((userId) => {
      let result = {
        roomId: data.roomId,
        userIds: data.sendTo,
        messages: [],
      };
      io.in(userId).emit("joinRoom", result);
    });
  });

  socket.on("sendMessage", (data) => {
    console.log(data);
    io.in(data.roomId).emit("message", data);
  });
});
