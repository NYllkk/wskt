import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { Avatar, InputBase } from "@mui/material";
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
import { fetchData } from "../redux/dataSlice";
import { debounce } from "../common/debounce";
const drawerWidth = 400;
function ResponsiveDrawer(props) {
  const data = useSelector((state) => state.data.data);
  console.log(data, "in selector data from data in Sidebar");
  // const dispatch = useDispatch();
  const { window } = props;
  // upeer from the state from store
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [page, setPage] = useState();

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
  // const handleChange = (event, value) => {
  //   setPage(1);
  //   setSearchTerm(value);
  // };
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
          <GroupsIcon />
          <LuMessageSquarePlus /> <SiRoamresearch />
          <CiMenuKebab />
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

      <List>
        {/* <UserLIst /> */}
        <Api searchTerm={searchTerm} />
      </List>
      {/* here i wil lshow contact  */}
      <List></List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
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
    // <Box>wqd</Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
//
// ResponsiveDrawer.js
// import { useState } from "react";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import InputBase from "@mui/material/InputBase";
// import SearchIcon from "@mui/icons-material/Search";
// import Api from "../api/Api";

// const ResponsiveDrawer = () => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   return (
//     <div>
//       {/* Search Box */}
//       <div>
//         <InputBase
//           placeholder="Search Here"
//           inputProps={{ "aria-label": "search Here" }}
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//         <SearchIcon />
//       </div>

//       {/* User List */}
//       <Api searchTerm={searchTerm} />
//     </div>
//   );
// };

// export default ResponsiveDrawer;
