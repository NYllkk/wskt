// const express = require("express");
// const { Server } = require("socket.io");
// const { createServer } = require("http");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// const { sequelize } = require("./sequelize.js");
// const { message } = require("statuses");
// const app = express();
// const server = createServer(app);
// app.use(cors())
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//         credentials: true,
//     },
// });
// const secretKey = process.env.SECRET_KEY;
// const port = process.env.PORT;
// app.get("/", (req, res) => {
//     res.send("hi");
// });
// io.on("connection", (socket) => {
//     console.log("user connected ", socket.id)
//     socket.emit("hi", "hello from the server")
//     // 
//     socket.on("sendingmessage", (message, callback) => {
//         console.log(`Recieved message from ${socket.id} : ${message}`)
//     })
//     socket.on("change", (data) => {
//         console.log("recieve from client in chnageChnage ", data)
//         socket.emit("recieved", data)
//     })
//     socket.on("finalData", (gettingdata) => {
//         console.log(gettingdata, "on handleSubmit getting the data ")
//         socket.emit("finally", gettingdata)
//     })
//     socket.on('groupmessage', (data) => {
//         socket.broadcast.emit('groupmessage', {
//             user: socket.id,
//             message: data.message,
//         });
//         socket.on("join", (firstroom) => {
//             socket.join(firstroom)
//         })
//         console.log(data, "in data");
//         // socket.emit("recieved", data); // 
//         // socket.on("disconnect", () => {
//         //     console.log("user disconneted ");
//         // });
//     });
// })

// app.use((err, req, res, next) => {
//     console.log(err)
//     res.status(500).send("internal server wrror ")
//     return
// })
// server.listen(port, () => {
//     console.log(`Server is listening on ${port}`);
// });
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection successful!');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         process.exit(1);
//     }
// })();

//  latet one
// const express = require('express');
// const app = express();
// const http = require('http');
// const { Server } = require('socket.io');
// const server = http.createServer(app);
// const io = new Server(server)
// const cors = require("cors")
// const port = 2000
// app.use(cors())

// app.get("/", (req, res) => {
//     res.send("hello from the server ")
// })

// io.on("connection", (socket) => {
//     console.log("a user connected")
// })

// server.listen(port, () => {
//     console.log(`server is listening on ${port}`)
// })















// socket.on('joinRoom', (roomName) => {
//     // Join the specified room
//     socket.join(roomName);
//     console.log(`User ${socket.id} joined room ${roomName}`);
// });






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

    socket.on("message", ({ message, id }) => {
        console.log("Received message:", message, "from user with id:", id);
        io.emit("sendMessage", { user: users[id], message, id });
    });

    // 



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
