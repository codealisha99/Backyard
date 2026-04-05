import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection" , function(ws)  {
      console.log("A client has connected!");//1st
      ws.send("hello");//2nd

      setInterval(() => {
           ws.send("Hello");
            }, 500);//3rd  
        
   //we write the behavior of the socket server on whtever like on connection or on message     
   //wss is the websocket server and ws is the client server



});



