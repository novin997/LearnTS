import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocketIoClient } from "./client";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    connectionStateRecovery: {
      // the backup duration of the sessions and the packets
      maxDisconnectionDuration: 2 * 60 * 1000,
      // whether to skip middlewares upon successful recovery
      skipMiddlewares: true,
    }
  });

io.on("connection", (socket) => {
    socket.on("client-1", (arg) => {
    console.log(arg);
  });
});

httpServer.listen(3000);

setupSocketIoClient(1);
