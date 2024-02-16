import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import {
  Avatar,
  Container,
  Input,
  InputAdornment,
  InputBase,
  Popover,
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
const drawerWidth = 400;

function ResponsiveDrawer(props) {
  const data = useSelector((state) => state.data.data);
  const { window } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  //
  const [selectedImage, setSelectedImage] = useState(null);
  const initialState = {
    name: "",
  };
  const [name, setName] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setName({
      ...name,
      [name]: value,
    });
  };
  //
  const [anchorEl, setAnchorEl] = useState(null);
  const Navigate = useNavigate();
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
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  console.log(name, "here ");
  const gettingVal = JSON.parse(localStorage.getItem("NAMEEEEE"));
  console.log(gettingVal, "in USERPROFILE");
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
          placeholder="Search Here"
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
      {/* upper to have position fixed  */}
      <Box>
        {/* <UserLIst /> */}
        <Api searchTerm={searchTerm} onClick={handleClick} />
      </Box>
      {/* here i wil lshow contact */}
      <List></List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const handleImageChange = (event) => {
    console.log("here i am ");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
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
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
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
        <Box
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          {/* <Container maxWidth="sm"> */}
          <Box
            sx={{
              backgroundColor: "#055558",
              height: "65px",
              color: "white",
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              font: "32px",
            }}
          >
            <Link to="/side">
              <MdKeyboardBackspace
                style={{ marginRight: "30px", color: "white", font: 22 }}
              />
            </Link>
            <Typography variant="h5" gutterBottom sx={{ padding: "20px" }}>
              Profile
            </Typography>
          </Box>
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              alignContent: "centre",
              alignItems: "centre",
              flexDirection: "column",
              backgroundColor: "whitesmoke",
              padding: "6vh",
              height: "100%",
              gap: "6vh",
            }}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload-input"
            />
            <label htmlFor="image-upload-input">
              <Avatar
                alt={gettingVal}
                src={selectedImage || "/static/images/avatar/2.jpg"}
                sx={{
                  width: 170,
                  height: 170,
                  justifyContent: "center",
                  justifyItems: "center",
                  display: "flex",
                  cursor: "pointer",
                  marginLeft: {
                    xs: "10px",
                    sm: "20px",
                    md: "30px",
                    lg: "340px",
                    xl: "350px",
                  },
                }}
              >
                <EditIcon />
              </Avatar>
            </label>

            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                height: "150px",
                display: "flex",
                flexDirection: "column",
                gap: "4vh",
                padding: "2vh",
              }}
            >
              <Typography sx={{ color: "green" }} variant="h6">
                Your Name
              </Typography>
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                value={name.name}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Container maxWidth="sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam,
              cumque?
            </Container>
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                height: "150px",
                // width: "100vh",
                marginLeft: "",
                display: "flex",
                flexDirection: "column",
                gap: "4vh",
                padding: "12px",
              }}
            >
              <Typography sx={{ color: "green" }} variant="h6">
                About
              </Typography>
              <TextField
                style={{}}
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
                InputLabelProps={{
                  style: { color: "none" },
                }}
                InputProps={{
                  style: {
                    border: "none",
                    borderBottom: "1px solid transparent",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <EditIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Container>

          {/* </Container> */}
        </Box>
      </Box>
    </>
    // <Box>wqd</Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
