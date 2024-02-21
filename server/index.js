// In the f'inal execution 
// server.js
const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const app = express();
const port = 2000;
const users = {};
const sequelize = require("./sequelize.js")
const router = require("./router/routes.js");
const morgan = require("morgan");
app.use(morgan('dev'))
app.use(express.json());
app.use(cors());
// app.get("/", (req, res) => {
//     res.send("Working in the Backend");
// });
const server = http.createServer(app);
const io = socketIO(server);
// app.use('/api', router);
app.use("/api", router)
io.on("connection", (socket) => {
    console.log("New Connection", socket.id);
    socket.on("joined", ({ user }) => {
        console.log("user before extracting id ", user);
        users[socket.id] = user;
        console.log("user after extracting id  ", users[socket.id]);
        console.log(`${user} has joined `);
        socket.broadcast.emit("userJoined", {
            user: "Admin",
            message: `${users[socket.id]} has joined`,
        });
        socket.emit("welcome", {
            user: "Admin",
            message: `Welcome to the chat ${users[socket.id]} `,
            online: `${socket.id} is online `
        });
        // socket.emit("welcometoGroup", {
        //     user: "",
        //     message: ` ${users[socket.id]}  Got Created`,
        //     online: `${socket.id} is online `
        // })
    });
    // 
    socket.on('createGroup', (groupName) => {
        console.log(groupName, "in groupName")
        io.emit('welcometoGroup', {
            user: '',
            message: `${groupName} Group Got Created`,
            online: `${socket.id} is online`,
            groupName: groupName
        });
        socket.join(groupName);
        console.log(groupName, "having name of the group");
    });
    socket.on('joinGroup', (groupName) => {
        socket.join(groupName);
        socket.emit('welcometoGroup', {
            user: '',
            message: `You joined ${groupName} Group`,
            online: `${socket.id} is online`,
            groupName: groupName
        });
    });
    // 
    socket.on("message", ({ userInput: message, id }) => {
        console.log("Received message:", message, "from user with id:", id, "for other Route");
        io.emit("sendMessage", { user: users[id], message, id });
    });
    // for private ,,,...........
    // //////////////////////
    // sending to aa specifcc room 
    socket.on("joinRoom", (room) => {
        // socket.join and socket.on are wroking th esame  
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`)
        console.log(room, "here geeting the room in the server")
        console.log(`User joined room ${room}`);
        io.to(socket.id).emit('roomJoined', `Joined room: ${room}`);
        console.log(socket.id)
        io.emit("congratstojoin", `${socket.id} joined succesfully the room  `)
        console.log("finish tillroom message")
    });
    // upper wil ad to roo4m to specific user 
    // //////////////////////////
    socket.on("message", ({ room, message, }) => {
        console.log({ room, message }, "in here with room and message ");
        io.to(room).emit("receiveMessage", message);
        socket.emit("messagetoAll", message)
        console.log(message, "message in messageto all ")
    });

    // //////////////////////////
    //  final
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

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database connection successful!e3fdef');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();
