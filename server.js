import { createServer } from "http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
// const hostname = "localhost";
const port = process.env.PORT || 3000;
const app = next({ dev, port: port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    connectionStateRecovery: {},
    cors: {
      origin: "*",
      // origin: "https://portfolio2025.up.railway.app",//URL here kung san naka deploy ang server.js,
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    if(socket.recovered){
      console.log("recovered", socket.recovered);
    } else {
      console.log("not recovered", socket.recovered);
    }

    socket.on('chat message', (data) => {
      if(process.env.NODE_ENV === "development") console.log({from: "server.js", data, message_from_client: data, socketID: socket.id});
      // socket.emit("chat message", data, result.lastID)
      // socket.broadcast.emit("chat message", data) //broadcast to all clients except the sender
      io.emit("chat message", data) //broadcast to all clients

    })
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      // console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Server running on port ${port}`);

    });
});