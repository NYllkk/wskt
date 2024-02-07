// const express = require("express");
// const { Server } = require("socket.io");
// const http = require("http");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// io.on("connection", (socket) => {
//     console.log("A user connected");

//     // Send a "hello" message to the client upon connection
//     socket.emit("helloFromServer", "Hello from the server!");

//  creating Forgot password Api  and Template & integrate user  
//     // Listen for "basicsFromClient" message from the client
//     socket.on("basicsFromClient", (data) => {
//         console.log("Received basics from client:", data);
//     });
//     socket.on("disconnect", () => {
//         console.log("User disconnected");
//   and receive updates. later
//     });
// });
// "     
// const port = process.env.PORT || 3000;

// server.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });


