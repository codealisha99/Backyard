import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", function (ws) {
    console.log("A client has connected!"); //1st
    ws.send("hello"); //2nd
    setInterval(() => {
        ws.send("Hello");
    }, 500); //3rd  
    ws.on("message", (msg) => {
        console.log("Received message from client: ", msg.toString());
    });
    //we write the behavior of the socket server on whtever like on connection or on message     
    //wss is the websocket server and ws is the client server
});
//# sourceMappingURL=index.js.map