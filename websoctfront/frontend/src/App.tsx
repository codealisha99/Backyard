import { useState , useEffect  } from 'react'
import './App.css'





function App() {
    const [wss, setWs] = useState();

  function sendMessage(){
    if (wss) {
      wss.send("Hello from the client!"); //this is the sending of message to the server and we will send it to where it is thus providing it the link
    }
  };

  useEffect(() => {
    const wss = new WebSocket('ws://localhost:8080');
     //this is the creation of connection and we will connect to where it is thus providing it the link
    setWs(wss);
     wss.onmessage = (e) => {
      console.log(e.data);
     }

  }, []);

 return (
    <div>
     <input  type="text" placeholder='Message...'></input>
     <button onClick={sendMessage}>SEND</button>
    </div>
  )
}

export default App
