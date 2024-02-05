import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

let user;
const sendUser = () => {
  console.log("Sending User ");
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};
const Join = () => {
  const navigate = useNavigate();
  const [name, setname] = useState("");

  useEffect(() => {
    const url = "http://localhost:2000";
    const socket = io(
      url,
      { transports: ["websocket"] },
      {
        username: name,
      }
    );
    socket.on("connect", () => {
      console.log("connection");
    });
  }, []);

  const handleNavigate = (e) => {
    if (name.length > 3) {
      navigate("ex");
    }
  };
  // window.addEventListener("beforeunload", function (event) {
  //   const confirmationMessage = "Are you sure you want to leave?";
  //   event.returnValue = confirmationMessage;
  //   return confirmationMessage;
  // });
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "22px",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(249 241 243)",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignContent: "center",
          height: "50vh",
          width: "70vh",
          padding: "50px",
          margin: "50px",
        }}
      >
        <Typography
          variant="h6"
          style={{ textAlign: "center", margin: "30px" }}
        >
          Enter Your Name to Group Chat
        </Typography>
        <TextField
          sx={{ backgroundColor: "white" }}
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
        />
        <Box
          onClick={sendUser}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#ebe8e8",
              color: "black",
              display: "flex",
              alignItems: "center",
              margin: "20px",
              padding: "10px",
            }}
            onClick={handleNavigate}
            type="submit"
          >
            Start Chat
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Join;
export { user };

//
// import { Box } from "@mui/material";
// import React from "react";

// const messages = [
//   { user: "User1", message: "Hello" },
//   { user: "User2", message: "Hi there" },
//   // Add more messages as needed
// ];

// const MessageList = () => {
//   let isLeftAligned = true;

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         left: 0,
//         top: 0,
//         height: "100%",
//         overflowY: "auto",
//         padding: "20px",
//         width: "300px",
//       }}
//     >
//       {messages.map((message, index) => {
//         isLeftAligned = !isLeftAligned; // Toggle alignment for each message
//         const textAlign = isLeftAligned ? "left" : "right";

//         return (
//           <p
//             style={{
//               backgroundColor: "#ebe8e8",
//               color: "black",
//               padding: "8px",
//               borderRadius: "8px",
//               margin: "4px 0",
//               textAlign,
//             }}
//             key={index}
//           >
//             {message.user}: {message.message}
//           </p>
//         );
//       })}
//     </Box>
//   );
// };

// export default MessageList;
