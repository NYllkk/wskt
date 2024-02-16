import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { Avatar, Button, InputBase, Typography } from "@mui/material";
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
import { debounce } from "../common/debounce";

import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Popover from "@mui/material/Popover";

import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { logout } from "../redux/authSlice";
const drawerWidth = 400;
function ResponsiveDrawer(props) {
  const data = useSelector((state) => state.data.data);

  const { window } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
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
  const handleOpen = (e) => {
    console.log("in handleMenu");
    e.preventDefault();
    setOpen(true);
    console.log("after set open true");
  };

  // const handleClick = () => {
  //   // console.log("handleClick");
  // };
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
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [anchorEl, setAnchorEl] = useState(null);
  const Navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const drawer = (
    // whole backColor
    <>
      <Box
        style={{
          backgroundColor: "#055558",
          height: "64px",
          position: "sticky",
        }}
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
            aria-label="search here"
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
        {/* here i wil lshow contact  */}
        <List></List>
      </Box>
    </>
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
          <Experiment />
        </Box>
      </Box>
      {/* <Box> */}

      {/* </Box> */}
    </>
    // <Box>wqd</Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
