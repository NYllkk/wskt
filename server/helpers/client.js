// < !--Include Socket.IO library-- >
// <script src="https://cdn.socket.io/4.1.2/socket.io.min.js"></script>

// <!--Your HTML content-- >
//     <sectionsscript>
//         const socket = io("http://localhost:3000"); 
//   socket.on("connect", () => {
//             console.log("Connected to the server");

//     // Listen for "helloFromServer" message from the server
//     socket.on("helloFromServer", (data) => {

//             console.log("Received hello from server:", data);
//     });
//         // Send a "basicsFromClient" message to the server
//         socket.emit("basicsFromClient", "Basics from client!");
//   });



// Worked on the backend API to add the group name and description fields.
//  Implemented the UI layout for the group chat, 
// integrated the updated backend API with the front - end components of the group chat.


//   socket.on("disconnect", () => {
//             console.log("Disconnected from the server");
//   });
//     </sectionsscript>
// 
// 
//  here creating token 
// const isAdmin = (req, res, next) => {
//     let token = req.headers.authorization;

//     if (!token) return RES(res, STATUS.UNAUTHORIZED, "You are not authorized to access the token")
//     let tokenArr = token?.split(" ");
//     token = tokenArr.length > 1 ? tokenArr[1] : ""
//     if (!token) {
//         return RES(res, STATUS.UNAUTHORIZED, 'Token is required');
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
//         console.log("", decoded)
//         if (decoded.role !== 'ADMIN') {
//             return RES(res, STATUS.FORBIDDEN, 'Access denied, not an admin');
//         }
//         req.adminId = decoded.id;
//         next();
//     } catch (error) {
//         console.error(error);
//         return RES(res, STATUS.UNAUTHORIZED, 'Invalid token');
//     }
// };
// module.exports = isAdmin;
