// In the f'inal execution 
// server.js
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");


const app = express();
const port = 2000;
const users = {};

app.use(cors());
app.get("/", (req, res) => {
    res.send("Working in the Backend");
});

const server = http.createServer(app);
const io = socketIO(server);
io.on("connection", (socket) => {
    console.log("New Connection", socket.id);
    socket.on("joined", ({ user }) => {
        console.log("user before extracting id ", user);
        users[socket.id] = user;
        console.log("user after extracting id  ", users[socket.id]);
        console.log(`${user} has joined `);
        socket.broadcast.emit("userJoined", {
            user: "Admin",
            message: ` ${users[socket.id]} has joined`,
        });
        socket.emit("welcome", {
            user: "Admin",
            message: `Welcome to the chat ${users[socket.id]} `,
        });
    });
    socket.on("message", ({ userInput: message, id }) => {
        console.log("Received message:", message, "from user with id:", id, "for other Route");
        io.emit("sendMessage", { user: users[id], message, id });
    });
    // for private ,,,...........
    socket.on("message", ({ room, message, }) => {
        console.log({ room, message }, "in here with room and message ");
        socket.to(room).emit("receiveMessage", message);
        // wil se this may be here i have to use socket.emit
        io.emit("messagetoAll", message)
        console.log(message, "message in messageto all ")
    });
    // sending to aa specifcc room 
    socket.on("joinRoom", (room) => {
        // socket.join and socket.on are wroking th esame  
        socket.join(room);
        console.log(room, "here geeting the room in the server")
        console.log(`User joined room ${room}`);
    });


    // upper wil ad to room to specific user 

    socket.on("disconnect", () => {
        socket.broadcast.emit("leave", {
            user: "Admin",
            message: `${users[socket.id]}  has left`,
        });
        console.log(`user left`);
    });
});
server.listen(port, () => {
    console.log(`working on ${port}`);
});


// ///////////////



