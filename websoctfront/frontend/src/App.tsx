import { useEffect, useState } from 'react'
import './App.css'
import tailwindcss from '@tailwindcss/vite'


function chat(){
  const [message, setMessage] = useState("");
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');
    ws.onmessage = (e) => {
      setMessage(m => [...m, e.data]);
    }
  }, [])
  return (
    <div>
     hi there
    </div>
  )

}


export default chat


// function App() {
//     const [wss, setWs] = useState();
//     const [client, setClient] = useState();

//   function sendMessage(){
//     if (wss) {
//       wss.send("Hello from the client!"); //this is the sending of message to the server and we will send it to where it is thus providing it the link
//     }
//   };

//   useEffect(() => {
//     const wss = new WebSocket('ws://localhost:8080');
//      //this is the creation of connection and we will connect to where it is thus providing it the link
//     setWs(wss);
//      wss.onmessage = (e) => {
//       console.log(e.data);
//      }
//      const client = new WebSocket("ws://localhost:8081");
//      setClient(wss1);
//      ws1.onmessage = (event) => {
//       console.log(event.data);
//      }

//   }, []);

//  return (
//     <div>
//      <input  type="text" placeholder='Message...'></input>
//      <button onClick={sendMessage}>SEND</button>
//     </div>
//   )
// }

// export default App
