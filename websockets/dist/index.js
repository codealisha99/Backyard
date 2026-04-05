import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", function (wss) {
    console.log("A client has connected!"); //1st
    wss.send("hello"); //2nd
    setInterval(() => {
        wss.send("Hello");
    }, 500); //3rd  
    //we write the behavior of the socket server on whtever like on connection or on message     
});
//# sourceMappingURL=index.js.map