// import { useEffect, useState } from "react";
// import "./App.css";
// import { io } from "socket.io-client";
// import { Button, Container, TextField } from "@mui/material";

// function App() {
//   const initialState = {
//     text: "",
//   };
//   const [data, setdata] = useState(initialState);
//   const [finals, setFinals] = useState([]);

//   const socket = io("http://localhost:2000");
//   useEffect(() => {
//     console.log(socket.id, "in here with socket ");
//     socket.on("connect", () => {
//       console.log("Connected to the server");
//     });
//     socket.on("hi", (message) => {
//       console.log("Message got:", message);
//     });
//     //
//     // socket.onAny("sendingmessage", (data) => {
//     //   console.log(data, "in here r");
//     // });
//     //
//     socket.on("o")
//     return () => {
//       socket.disconnect();
//     };
//   }, []);
//   //
//   // const disconnect = () => {
//   //   const socket = io("http://localhost:2000");
//   //   socket.disconnect();
//   // };
//   // will use it later
//   const handleChnage = (e) => {
//     const { name, value } = e.target;
//     setdata((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     socket.emit("change", { [name]: value });
//     socket.on("recieved", (data) => {
//       console.log(data, "received from socket ");

//       socket.emit("sendMessage", "Hello, server!", (acknowledgment) => {
//         console.log("Acknowledgment from server:", acknowledgment);
//       });
//       socket.emit("groupmessage", { message: "Hello, everyone!" });
//       socket.on("recieved", data);
//       const roomName = "firstroom";
//       socket.emit("join", roomName);
//       console.log(roomName, "here in room ");
//       console.log(data, "return data from server ");
//     });
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     socket.emit("finalData", data);
//     socket.on("finally", (gettingdata) => {
//       console.log("receiving data from data final ", gettingdata);
//       setFinals((data) => [...data, gettingdata]);
//     });
//     setdata(initialState);
//   };
//   return (
//     <Container
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <div>
//         {finals.map((finalData, index) => (
//           <div style={{ backgroundColor: "pink" }} key={index}>
//             {finalData.text && <p>{finalData.text}</p>}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           sx={{
//             width: "300px",
//             marginBottom: 2,
//             display: "flex",
//             height: "50px",
//           }}
//           onChange={handleChnage}
//           id="standard-basic"
//           label="write here "
//           variant="outlined"
//           placeholder="write here"
//           name="text"
//           value={data.text}
//         />

//         <Button type="submit" variant="outlined" color="inherit">
//           Click here
//         </Button>
//       </form>
//     </Container>
//   );
// }

// export default App;

// latest one
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";
import Private from "./components/Private";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Join} />
        <Route path="/chat" Component={Chat} />
        <Route path="/private" Component={Private} />
      </Routes>
    </>
  );
}
export default App;

// recoomenddation

// import "./App.css";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Join from "./component/Join/Join";
// import Chat from "./component/Chat/Chat";

// function App() {

//   return (

//     <Router>

//       <Route exact path="/" component={Join} />
//       <Route path="/chat" component={Chat} />

//     </Router>

//   );
// }

// export default App;

// chat.jsx
// import React, { useEffect, useState } from 'react'
// import { user } from "../Join/Join";
// import socketIo from "socket.io-client";
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

// join.jsx

// import React, { useState } from 'react'
// import "./Join.css";
// import logo from "../../images/logo.png";
// import { Link } from "react-router-dom";

// let user;

// const sendUser = () => {
//     user = document.getElementById('joinInput').value;
//     document.getElementById('joinInput').value = "";
// }

// const Join = () => {

//     const [name, setname] = useState("");

//     return (
//         <div className="JoinPage">
//             <div className="JoinContainer">
//                 <img src={logo} alt="logo" />
//                 <h1>C CHAT</h1>
//                 <input onChange={(e) => setname(e.target.value)} placeholder="Enter Your Name" type="text" id="joinInput" />
//                 <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">  <button onClick={sendUser} className="joinbtn">Login In</button></Link>
//             </div>
//         </div>
//     )
// }

// export default Join
// export { user }

// message.jsx
// import React from 'react'
// import "./Message.css";

// const Message = ({ user, message, classs }) => {
//     if (user) {
//         return (
//             <div className={`messageBox ${classs}`}  >
//                 {`${user}: ${message}`}
//             </div>
//         )
//     }
//     else {

//         return (
//             <div className={`messageBox ${classs}`}>
//                 {`You: ${message}`}
//             </div>
//         )
//     }
// }

// export default Message
