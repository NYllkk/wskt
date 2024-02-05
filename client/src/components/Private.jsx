import { Box, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Private = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [getRooom, setgetRoom] = useState("");

  const url = "http://localhost:2000";
  const socket = io(url, { transports: ["websocket"] });
  useEffect(() => {
    socket.on("connect", () => {
      console.log("before getting the socket id ");
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });
    socket.on("receiveMessage", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });
    socket.on("welcome", (data) => {
      console.log(data);
    });
    socket.on("messagetoAll", (data) => {
      console.log(data, "in here client side with alll message ");
      setMessages((message) => [...message, data]);
    });
    socket.on("roomJoined", (message) => {
      console.log("roomJoined with ");
      console.log(message, "in here after recieving the message ");
    });
    socket.on("congratstojoin", (data) => {
      setgetRoom((getRooom) => [...getRooom, data]);
      console.log(data, "in here final data ");
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
  };
  const joinRoom = (e) => {
    e.preventDefault();
    socket.emit("joinRoom", roomName);
    setRoomName("");
  };
  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: "15px" }}>
        <Card sx={{ maxWidth: 345, marginTop: "25px" }}>
          {/* <CardMedia sx={{ height: 140 }} image="dc" title="green iguana" /> */}
          <Box>{getRooom}</Box>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {socketID}
            </Typography>
            <Box>
              <form onSubmit={joinRoom}>
                <h3>Join Room</h3>
                <input
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="Room Name"
                />
                <button>Join</button>
              </form>
              {/* 706C61 
              899E8B 
              99C5B5 
              AFECE7 
              81F499 */}
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgb(249 241 243)",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ backgroundColor: "", width: "290px", minHeight: "50%" }}
                >
                  {messages.map((mess, i) => (
                    <p
                      style={{ backgroundColor: "#ebe8e8", color: "black" }}
                      key={i}
                    >
                      {mess}
                    </p>
                  ))}
                </Typography>
                <Box
                  sx={{
                    margin: "12px",
                    padding: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    width: "310px",
                  }}
                >
                  <TextField
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    label="roomm"
                    sx={{ backgroundColor: "white" }}
                  />
                  <TextField
                    sx={{ backgroundColor: "white" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    label=" messageee heere "
                  />
                </Box>
                <Button
                  type="submit"
                  size="small"
                  sx={{ backgroundColor: "#ebe8e8", color: "black" }}
                >
                  Send
                </Button>
              </form>
            </Box>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default Private;
// wiil have to see the room join method
//

// export default function MediaCard() {
//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardMedia
//         sx={{ height: 140 }}
//         image="/static/images/cards/contemplative-reptile.jpg"
//         title="green iguana"
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           Lizard
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           Lizards are a widespread group of squamate reptiles, with over 6,000
//           species, ranging across all continents except Antarctica
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Share</Button>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }

// const Header = () => {
//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar position="static">
//       <Container
//         maxWidth="100%"
//         sx={{ backgroundColor: "#055558", width: "100%" }}
//       >
//         <Toolbar disableGutters sx={{}}>
//           <Link to="/chat" style={{ textDecoration: "none" }}>
//             <MdKeyboardBackspace
//               style={{ marginRight: "30px", color: "white" }}
//             />
//           </Link>
//           <Typography
//             variant="h6"
//             noWrap
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             <IconButton sx={{ p: 0 }}>
//               <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//             </IconButton>
//           </Typography>
//           <Box
//             sx={{
//               flexGrow: 1,
//               display: {
//                 xs: "none",
//                 md: "flex",
//                 lg: "flex",
//                 flexDirection: "column",
//                 justifyContent: "space-between", // Distribute items along the main axis
//               },
//             }}
//           >
//             <h4>Name</h4>
//             <div style={{ flex: 1 }}></div>
//             <p>Surname</p>
//           </Box>

//           <Box sx={{ flexGrow: 0, backgroundColor: "#", color: "white" }}>
//             <Tooltip>
//               <IconButton
//                 sx={{ color: "white", display: "flex", gap: "20px" }}
//                 disableRipple
//               >
//                 <FaVideo />
//                 <MdCall />
//                 <BiDotsVerticalRounded />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                   <Typography textAlign="center">{setting}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default Header;
