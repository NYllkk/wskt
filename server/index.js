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
    });
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




// .................................................//
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const passport = require("./passport/GoogleStrategy");
// const session = require('express-session');
// const ejs = require('ejs');
// const sequelize = require('./sequlize');
// const router = require('./routes/routes');
// const Employee = require('./db/models/Employee');
// // const paymentIntentent = require("./stripe/stripe")
// // const stripe = require("./stripe/stripe.js")
// // socket on sequelize
// app.use(session({
//     secret: 'thgtrhhhythtyuyjuh',
//     resave: false,
//     saveUninitialized: true,
// }));
// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/view');
// app.use(cors());
// app.use(express.json());
// app.use(passport.initialize());
// app.use(passport.session());
// app.use('/api', router);
// // index.js
// console.log('Server is starting...');
// const PORT = process.env.PORT || 2000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await Employee.findById(id);
//         done(null, user);
//     } catch (error) {
//         done(error, null);
//     }
// });
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection successful!');
//         await sequelize.sync();
//         console.log('Database synchronization successful');
//     } catch (error) {
//         console.error('Unable to connect to the database or synchronize:', error);
//         process.exit(1);
//     }
// })();