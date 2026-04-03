import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection" , function(socket)  {
      console.log("A client has connected!");
      socket.send("hello");

      setInterval(() => {
            socket.send("Current price of solana: " + Math.random())}, 500);
    
            socket.on("message" , (e) => {
                    socket.send(e.toString());
            });
        
        




})



