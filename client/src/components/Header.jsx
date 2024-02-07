import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { MdKeyboardBackspace, MdCall } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaVideo } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { user } from "../components/Join";
import { useSelector } from "react-redux";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const name = useSelector((state) => state.auth?.user?.user?.email);
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container
        maxWidth="100%"
        sx={{ backgroundColor: "#055558", width: "100%" }}
      >
        <Toolbar disableGutters sx={{}}>
          <Link to="/chat" style={{ textDecoration: "none" }}>
            <MdKeyboardBackspace
              style={{ marginRight: "30px", color: "white" }}
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={name} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              backgroundColor: "",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              //   onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              //   anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              //   open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ChatApp
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                lg: "flex",
                flexDirection: "column",
              },
            }}
          >
            <h4>
              {name} <br />
            </h4>
          </Box>
          <Box sx={{ flexGrow: 0, backgroundColor: "#", color: "white" }}>
            <Tooltip>
              <IconButton
                sx={{ color: "white", display: "flex", gap: "30px" }}
                disableRipple
              >
                <FaVideo />
                <MdCall />
                <BiDotsVerticalRounded />
              </IconButton>

              {/* </IconButton> */}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              //   anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              //   open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
//  // // // //

// const Centre = () => {
//   const [id, setid] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const [selectedEmoji, setSelectedEmoji] = useState(null);
//   const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

//   const handleEmojiSelect = (emoji) => {
//     setSelectedEmoji(emoji);
//     // setIsEmojiPickerOpen(false);
//   };

//   const handleToggleEmojiPicker = () => {
//     setIsEmojiPickerOpen((prev) => !prev);
//   };

//   const sendChat = () => {
//     const userInput = document.getElementById("userInput").value;
//     if (socket) {
//       socket.emit("message", { userInput, id, user });
//     }
//     document.getElementById("userInput").value = "";
//   };

//   useEffect(() => {
//     const socket = io(url, { transports: ["websocket"] });
//     socket.on("connect", () => {
//       console.log("connected");
//       setid(socket.id);
//       console.log(socket.id, "socket gets consoled ");
//     });
//     setSocket(socket);
//     socket.emit("joined", { user });
//     socket.on("welcome", (data) => {
//       setMessages((msg) => [...msg, data]);
//     });
//     socket.on("userJoined", (data) => {
//       setMessages((msg) => [...msg, data]);
//     });
//     socket.on("leave", (data) => {
//       setMessages((msg) => [...msg, data]);
//     });
//     socket.on("sendMessage", (data) => {
//       setMessages((msg) => [...msg, data]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "82vh",
//           backgroundColor: "#f4f4f4",
//           width: "100%",
//           color: "white",
//         }}
//       >
//         <Box
//           sx={{
//             overflowY: "auto",
//             padding: "20px",
//             width: "100%",
//           }}
//         >
//           {messages.map((message, index) => {
//             const isCurrentUser = message.user === user;

//             return (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   flexDirection: isCurrentUser ? "row-reverse" : "row",
//                   alignItems: "center",
//                 }}
//               >
//                 {!isCurrentUser && (
//                   <img
//                     src={message.userAvatar} // Add user avatar URL or default avatar
//                     alt={message.user}
//                     style={{
//                       width: "30px",
//                       height: "30px",
//                       borderRadius: "50%",
//                       marginRight: "8px",
//                     }}
//                   />
//                 )}
//                 <p
//                   style={{
//                     backgroundColor: isCurrentUser
//                       ? "rgb(209 245 209)"
//                       : "#ebe8e8",
//                     color: "black",
//                     padding: "8px",
//                     borderRadius: "8px",
//                     margin: "4px 0",
//                     textAlign: isCurrentUser ? "right" : "left",
//                   }}
//                 >
//                   {message.message}
//                 </p>
//                 {isCurrentUser && (
//                   <img
//                     src={message.userAvatar} // Add user avatar URL or default avatar
//                     alt={message.user}
//                     style={{
//                       width: "30px",
//                       height: "30px",
//                       borderRadius: "50%",
//                       marginLeft: "8px",
//                     }}
//                   />
//                 )}
//               </div>
//             );
//           })}
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           borderRadius: "12px",
//           borderColor: "black",
//           borderStyle: "",
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {selectedEmoji && (
//           <img
//             src={selectedEmoji.imageUrl}
//             alt={selectedEmoji.emoji}
//             style={{ width: "30px", height: "30px", borderRadius: "50%" }}
//           />
//         )}
//         <TextField
//           variant="outlined"
//           id="userInput"
//           sx={{
//             width: "100%",
//             borderRadius: "24px",
//             "& .MuiOutlinedInput-root": {
//               "& fieldset": {
//                 borderColor: "black",
//                 borderRadius: "70px",
//               },
//             },
//             "& input": {
//               padding: "12px",
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Box
//                   sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "8px",
//                   }}
//                 >
//                   <FaRegSmile
//                     onClick={handleToggleEmojiPicker}
//                     style={{ cursor: "pointer" }}
//                   />
//                 </Box>
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 <SendIcon
//                   onClick={sendChat}
//                   sx={{ color: "green", cursor: "pointer" }}
//                 />
//               </InputAdornment>
//             ),
//           }}
//           placeholder="Type a message"
//         />
//         {isEmojiPickerOpen && (
//           <EmojiPicker
//             onEmojiClick={handleEmojiSelect}
//             disableSearchBar
//             disableSkinTonePicker
//           />
//         )}
//       </Box>
//     </>
//   );
// };

// export default Centre;
