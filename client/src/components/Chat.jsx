// Chat.js
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { user } from "./Join";

const url = "http://localhost:2000";

const Chat = () => {
  const [id, setid] = useState("");
  const [show, setShow] = useState([]);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const sendChat = () => {
    const userInput = document.getElementById("userInput").value;
    console.log(userInput, "here in userInputValue ");
    if (socket) {
      socket.emit("message", { userInput, id });
    }

    document.getElementById("userInput").value = "";
    setShow((prevShow) => [...prevShow, userInput]);
    console.log(show, "in here with the final user message ");
  };
  useEffect(() => {
    const socket = io(url, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("connected");
      setid(socket.id);
      console.log(socket.id, "socket gets consoled ");
    });

    setSocket(socket);

    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log("here in message with data object", data);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message);
    });

    socket.on("sendMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(
        "Received message:",
        data.message,
        "from user:",
        data.user,
        "with id:",
        data.id
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <h2>Chat</h2>
      <p>{user}&nbsp; Joined Successfully</p>
      <div>
        {messages.map((message, index) => (
          <p key={index}>
            {message.user}: {message.message}
          </p>
        ))}
      </div>
      <div>
        {show.map((show, index) => (
          <p key={index}>{show}</p>
        ))}
      </div>
      <input type="text" id="userInput" />
      <button onClick={sendChat}>SendMessage</button>
    </>
  );
};

export default Chat;

//
// import React, { useEffect, useState } from 'react'
// import { user } from "../Join/Join";

// import "./Chat.css";
// import sendLogo from "../../images/send.png";
// import Message from "../Message/Message";
// import ReactScrollToBottom from "react-scroll-to-bottom";
// import closeIcon from "../../images/closeIcon.png";

// let socket;

// const ENDPOINT = "https://demo-cchat.herokuapp.com/";

// const Chat = () => {
//     const [id, setid] = useState("");
//     const [messages, setMessages] = useState([])

//     const send = () => {
//         const message = document.getElementById('chatInput').value;
//         socket.emit('message', { message, id });
//         document.getElementById('chatInput').value = "";
//     }
//     console.log(messages);
//     useEffect(() => {
//         socket = socketIo(ENDPOINT, { transports: ['websocket'] });-*

//         socket.on('connect', () => {
//             alert('Connected');
//             setid(socket.id);

//         })
//         console.log(socket);
//         socket.emit('joined', { user })

//         socket.on('welcome', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message);
//         })

//         socket.on('userJoined', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message);
//         })

//         socket.on('leave', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message)
//         })

//         return () => {
//             socket.emit('disconnect');
//             socket.off();
//         }
//     }, [])

//     useEffect(() => {
//         socket.on('sendMessage', (data) => {
//             setMessages([...messages, data]);
//             console.log(data.user, data.message, data.id);
//         })
//         return () => {
//             socket.off();
//         }
//     }, [messages])

//     return (
//         <div className="chatPage">
//             <div className="chatContainer">
//                 <div className="header">
//                     <h2>C CHAT</h2>
//                     <a href="/"> <img src={closeIcon} alt="Close" /></a>
//                 </div>
//                 <ReactScrollToBottom className="chatBox">
//                     {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
//                 </ReactScrollToBottom>
//                 <div className="inputBox">
//                     <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
//                     <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Chat
