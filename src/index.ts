import { app } from "./app";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { savemessage } from "./modules/chat/v1/services/chat.services";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", async (data) => {
    let res = await savemessage({
      senderId: data.senderId,
      message: data.message,
      projectId: data.teamId,
    });
    if (res?.success) {
      console.log("success");
      let successmessage = {
        senderId: data.senderId,
        projectId: data.teamId,
        message: data.message,
        success: res.success,
      };
      socket.to(data.teamId).emit("receive_message", successmessage);
    }
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

server.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
