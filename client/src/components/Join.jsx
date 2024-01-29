import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

let user;
const sendUser = () => {
  console.log("Sending User ");
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setname] = useState("");
  useEffect(() => {
    const url = "http://localhost:2000";
    const socket = io(url, { transports: ["websocket"] });

    socket.on("connect", () => {
      console.log("connection");
    });
  }, []);

  return (
    <div>
      <h2>Chat</h2>
      <input
        onChange={(e) => setname(e.target.value)}
        placeholder="Enter Your Name"
        type="text"
        id="joinInput"
      />
      <Link to="/chat">
        <button onClick={sendUser} type="submit">
          Start Chat
        </button>
      </Link>
    </div>
  );
};

export default Join;
export { user };

//

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
