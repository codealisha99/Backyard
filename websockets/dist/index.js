import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", function (socket) {
    console.log("A client has connected!");
    socket.send("hello");
});
//# sourceMappingURL=index.js.map