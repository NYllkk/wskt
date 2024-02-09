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

const drawerWidth = 400;
function ResponsiveDrawer(props) {
  const data = useSelector((state) => state.data.data);
  console.log(data, "in selector data from data");
  const dispatch = useDispatch();
  const { window } = props;
  // upeer from the state from store
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [page, setPage] = useState();
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
  const handleChange = (event, value) => {
    setPage(1);
    setSearchTerm(value);
  };
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
          // gap: "",
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
          onChange={(e) => handleChange(e, e.target.value)}
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
        <Api />
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

// import CardContent from "@mui/material/CardContent";

// import { Box, Container, Grid, Typography } from "@mui/material";
// import Paper from "@mui/material/Paper";
// import InputBase from "@mui/material/InputBase";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import SearchIcon from "@mui/icons-material/Search";

// import axios from "axios";
// import Buttonn from "../components/constants/Button";
// import { IoGridOutline } from "react-icons/io5";
// import { BiMap } from "react-icons/bi";

// import { useNavigate } from "react-router-dom";
// import Mycomponent from "./Mycomponent.jsx";

// const GoogleMap = ({}) => {
//   const navigate = useNavigate();
//   const [data, setdata] = useState([]);

//   // work here lkewjwehjidehifdhifhiehfiehfiheifheihfi
//   //   new handleChange

//   const [page, setPage] = React.useState(1);
//   const [searchTerm, setSearchTerm] = React.useState("");
//   const itemsPerPage = 4;

//   const handleChange = (event, value) => {
//     setPage(1);
//     setSearchTerm(value);
//   };

//   // ///l3eidodoeudouudiduiuidihdi
//   useEffect(() => {
//     axios
//       .get("https://642d4d6dbf8cbecdb4027745.mockapi.io/plane")
//       .then((res) => setdata(res.data))
//       .catch((err) => console.log(err));
//   }, []);
//   console.log(data, "in gogole map");
//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const startIndex = (page - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: "#4D0179",
//           height: "50px",
//           margin: "20px",
//           color: "white",
//           display: "flex",
//           alignContent: "center",
//           alignItems: "center",
//         }}
//       >
//         Events
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "flex-start",
//           [breakpoints.md]: {
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//           },
//         }}
//       >
//         <Grid item xs={8}>
//           {/* search box */}
//           <Paper
//             component="form"
//             sx={{
//               p: "2px 4px",
//               display: "flex",
//               alignItems: "center",
//               borderRadius: "120px",
//               marginRight: "300px",
//               bgcolor: "",
//               marginLeft: "20px",
//             }}
//           >
//             <Box
//               sx={{
//                 borderRadius: "12px",
//                 borderColor: "black",
//                 borderStyle: "",
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//               }}
//             >
//               <InputBase
//                 sx={{ ml: 1, flex: 1 }}
//                 placeholder="Search Here"
//                 inputProps={{ "aria-label": "search Here" }}
//                 value={searchTerm}
//                 onChange={(e) => handleChange(e, e.target.value)}
//               />
//               <IconButton
//                 type="button"
//                 sx={{ p: "10px" }}
//                 aria-label="search"
//                 disableRipple
//               >
//                 <SearchIcon sx={{ marginLeft: "120px" }} />
//               </IconButton>
//             </Box>
//           </Paper>
//           {/* new component will gets add here  */}
//           {/* search box end  */}
//           <Grid>
//             <Grid
//               item
//               xs={12}
//               md={8}
//               sx={{
//                 marginLeft: "444px",
//                 marginTop: "-34px",
//                 display: "flex",
//                 justifyContent: "end",
//                 gap: "12px",
//                 marginRight: "15px",
//                 alignContent: "",
//                 alignItems: "",
//               }}
//             >
//               <div>View as:</div>
//               <div>
//                 {" "}
//                 <IoGridOutline onClick={handleGridClick} />{" "}
//               </div>
//               <div>
//                 <BiMap onClick={handleMapClick} />
//               </div>
//             </Grid>
//             <CardContent></CardContent>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// };

//  in side bar //////////////////////

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchData, selectData } from 'path-to-your-slice';

// const YourComponent = () => {
//   const dispatch = useDispatch();
//   const data = useSelector(selectData);

//   useEffect(() => {

//     dispatch(fetchData())
//       .then((response) => {
//         console.log(response, "Fetched data successfully");
//       })
//       .catch((error) => {

//         console.error('Error fetching data:', error);
//       });
//   }, [dispatch]);

//   console.log(data, "Console logging data from Redux store");

// };

// export default YourComponent;
