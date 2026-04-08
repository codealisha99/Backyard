// 1] made a server in 2 lines
import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
//
let userCount = 1;
let allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    userCount = userCount + 1;
    console.log("User count: " + userCount);
    socket.on("message", (msg) => {
        console.log("Received message from client: ", msg.toString());
        for (let i = 0; i < allSockets.length; i++) {
            const s = allSockets[i];
            s?.send("From Server: " + msg.toString());
        }
    });
});
// import { createClient} from 'redis';
// const pub = createClient();
// const sub = createClient();
// await pub.connect();
// await sub.connect();
// const wss = new WebSocketServer({ port: 8080 });
// // Subscribe to channel
// await sub.subscribe("chat", (message) => {
//     console.log("Server A received from Redis:", message);
//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         client.send("From Redis: " + message);
//       }
//     });
//   });
// const wss1 = new WebSocketServer({ port: 8081 });
// wss.on("connection" , function(ws)  {
//       console.log("A client has connected!");//1st
//       ws.send("hello");//2nd
//       setInterval(() => {
//            ws.send("Hello");
//             }, 500);//3rd  
//             ws.on("message", async (msg) => {
//                 console.log("Received message from client: " ,  msg.toString());
//                  // Publish to Redis
//               await pub.publish("chat", msg.toString());
//             });
//    //we write the behavior of the socket server on whtever like on connection or on message     
//    //wss is the websocket server and ws is the client server
// });
// wss1.on("connection", function(client) {
//         console.log("Connected to Server 2");
//         client.send("Hello from Server 2");
//       });
//# sourceMappingURL=index.js.map