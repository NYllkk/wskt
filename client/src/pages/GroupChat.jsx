// import React from "react";

// import GroupChatHeader from "../components/GroupChatHeader";
// import GroupChatCentre from "./GroupChatCentre";
// const GroupChat = () => {
//   return (
//     <>
//       <GroupChatHeader />
//       <GroupChatCentre />
//     </>
//   );
// };

// export default GroupChat;

import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import GroupChatHeader from "../components/GroupChatHeader";
// import GroupChatCentre
import {
  Avatar,
  Badge,
  Button,
  CardContent,
  Container,
  Input,
  InputAdornment,
  InputBase,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Api from "../api/Api";
import { useState, useEffect } from "react";
import axios from "axios";
import Experiment from "./Experiment";
import GroupsIcon from "@mui/icons-material/Groups";
import { CiMenuKebab } from "react-icons/ci";
import { SiRoamresearch } from "react-icons/si";
import { LuMessageSquarePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { debounce } from "../common/debounce";
import {
  Link,
  Route,
  Routes,
  json,
  useNavigate,
  useParams,
} from "react-router-dom";
import FinalProfile from "../components/FinalProfile";
import { MdKeyboardBackspace } from "react-icons/md";
// import { GroupChatCentre } from "../pages/GroupChatCentre";
import { logout } from "../redux/authSlice";
import GroupChatCentre from "./GroupChatCentre";
const drawerWidth = 400;

function ResponsiveDrawer(props) {
  const data = useSelector((state) => state.data.data);
  const { window } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState([]);
  //
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showExperiment, setShowExperiment] = useState(true);
  const [value, setvalue] = useState([]);
  const [loading, setLoading] = useState(false);
  const initialState = {
    groupName: "",
    GroupDescription: "",
  };
  const [listdata, setlistdata] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setlistdata({
      ...name,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  // console.log(listdata);
  //

  const Navigate = useNavigate();
  const GetttingList = JSON.parse(localStorage.getItem("FINALUSERLIST")) || [];
  const filteredUsers = GetttingList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlelogout = (e) => {
    e.preventDefault();
    dispatch(logout);
    Navigate("/log");
    console.log("looged");
  };
  const CreateGroup = () => {
    navigate("/group");
    console.log("in createGropu");
  };
  const NewCommunity = () => {
    console.log("new Community");
  };
  const MessageStarred = () => {
    console.log("messageStarred");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = () => {
    console.log("in handleMenu");
  };
  const handleGroup = () => {
    console.log("in HandleGroup");
  };
  const handleMessage = () => {
    console.log("handleMEssage");
  };
  const handle = () => {
    console.log("in handleCLick with handle");
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleSubmitGroup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:2000/api/group/create",
        {
          groupName: listdata.groupName,
          GroupDescription: listdata.GroupDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API response:", response.data);
      JSON.stringify(
        localStorage.setItem("GROUP-DETAIL", response.data.GroupName)
      );
      // setShowExperiment((prev) => !prev);
      navigate("/GroupChat");
    } catch (error) {
      console.error("Error submitting group:", error);
    } finally {
      setLoading(false);
    }
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // console.log(name, "here ");
  const gettingVal = JSON.parse(localStorage.getItem("NAMEEEEE"));
  // console.log(gettingVal, "in USERPROFILE");
  const drawer = (
    // whole backColor
    <Box
      style={{ backgroundColor: "#055558", height: "64px", position: "sticky" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          color: "white",
        }}
      >
        <Avatar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "centre",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <GroupsIcon onClick={handleGroup} />
          <LuMessageSquarePlus onClick={handleMessage} />
          <SiRoamresearch onClick={handle} />
          <CiMenuKebab aria-describedby={id} onClick={handleClick} />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "center",
              horizontal: "center",
            }}
          >
            <Typography sx={{ p: 2 }} onClick={CreateGroup}>
              New Group
            </Typography>
            <Typography sx={{ p: 2 }} onClick={NewCommunity}>
              New Community
            </Typography>
            <Typography sx={{ p: 2 }} onClick={MessageStarred}>
              Starred Message
            </Typography>
            <Typography sx={{ p: 2 }} onClick={handlelogout}>
              Logout
            </Typography>
          </Popover>
        </Box>
      </Box>
      <Box
        sx={{
          color: "black",
          backgroundColor: "whitesmoke",
          borderRadius: "30px",
          borderColor: "black",
          display: "flex",
          flexDirection: "",
          margin: "10px",
        }}
      >
        <InputBase
          sx={{
            backgroundColor: "whitesmoke",
            borderRadius: "20px",
            color: "black",
          }}
          placeholder="Searcrh Here"
          inputProps={{ "aria-label": "search Here......" }}
          value={searchTerm}
          onChange={handleSearch}
          // value={searchTerm}
          // onChange={(e) => handleChange(e, e.target.value)}
        />
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search here "
          disableRipple
        >
          <SearchIcon sx={{ marginLeft: "120px" }} />
        </IconButton>
      </Box>
      <Box>
        <Box>
          {loading && <p>Loading...</p>}
          {filteredUsers.length === 0 && !loading && (
            <p>No data found for the given search term.</p>
          )}
          {filteredUsers.map((user) => (
            <Box key={user.id} sx={{ display: "flex", flexWrap: "wrap" }}>
              <CardContent sx={{ display: "flex" }}>
                <Box component="div" variant="h5">
                  <Avatar
                    sx={{ height: "60px", width: "60px", marginRight: "20px" }}
                    src={user.image}
                    alt="Loading"
                  />
                </Box>
                <Typography
                  sx={{ width: "15vh" }}
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {user.name}
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="div"
                  >
                    online
                  </Typography>
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: "70px",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="caption" color="green" component="div">
                    12:00 PM
                  </Typography>
                  <Stack sx={{ margin: "10px" }}>
                    <Badge color="blue" badgeContent={user.id} showZero></Badge>
                  </Stack>
                </Box>
              </CardContent>
            </Box>
          ))}
        </Box>
        {/*  */}

        {/*  */}
      </Box>

      <List></List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex", backgroundColor: "" }}>
        <CssBaseline />
        <AppBar
          style={{ backgroundColor: "" }}
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        ></AppBar>
        <Box
          style={{ backgroundColor: "blue" }}
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Box
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginLeft: "400px",
        }}
      >
        <GroupChatHeader />

        <GroupChatCentre />
      </Box>

      <Box sx={{ marginLeft: "400px" }}>
        {/* here have to map the api and return in group chat  */}
        {/* <GroupChat /> */}
      </Box>
    </>
    // <Box>wqd</Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;

//

// function ResponsiveDrawer(props) {
//
//   const handleSubmitGroup = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(
//         "http://localhost:2000/api/group/create",
//         {
//           groupName: listdata.groupName,
//           GroupDescription: listdata.GroupDescription,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("API response:", response.data);
//       JSON.stringify(
//         localStorage.setItem("GROUP-DETAIL", response.data.GroupName)
//       );
//       // setShowExperiment((prev) => !prev);
//       navigate("/GroupChat");
//     } catch (error) {
//       console.error("Error submitting group:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//

//   return (
//     <>
//       <Box sx={{ display: "flex", backgroundColor: "" }}>
//

//         <Box
//           sx={{
//             color: "black",
//             backgroundColor: "whitesmoke",
//             borderRadius: "30px",
//             borderColor: "black",
//             display: "flex",
//             flexDirection: "",
//             margin: "10px",
//           }}
//         >
//           <InputBase
//             sx={{
//               backgroundColor: "whitesmoke",
//               borderRadius: "20px",
//               color: "black",
//             }}
//             placeholder="Search Here"
//             inputProps={{ "aria-label": "search Here......" }}
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <IconButton
//             type="button"
//             sx={{ p: "10px" }}
//             aria-label="search here "
//             disableRipple
//           >
//             <SearchIcon sx={{ marginLeft: "120px" }} />
//           </IconButton>
//         </Box>

//         <Box>
//           {loading && <p>Loading...</p>}

//           {filteredUsers.length === 0 && !loading && (
//             <p>No data found for the given search term.</p>
//           )}

//           {filteredUsers.map((user) => (
//             <Box key={user.id} sx={{ display: "flex", flexWrap: "wrap" }}>
//               {/* ... (existing code) */}
//             </Box>
//           ))}
//         </Box>

//         {/* ... (existing code) */}
//       </Box>

//       {/* ... (existing code) */}
//     </>
//   );
// }

// ... (existing code)
