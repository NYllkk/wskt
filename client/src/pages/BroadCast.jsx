import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Stack,
  Typography,
  createTheme,
} from "@mui/material";
import { MdKeyboardBackspace } from "react-icons/md";
// import { CiMenuKebab } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { SiRoamresearch } from "react-icons/si";
import { LuMessageSquarePlus } from "react-icons/lu";
import GroupsIcon from "@mui/icons-material/Groups";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import axios from "axios";
const BroadCast = ({}) => {
  const navigate = useNavigate();
  const [selectedButtonIndexes, setSelectedButtonIndexes] = useState([]);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleAdd = (index) => {
    setSelectedButtonIndexes((prevIndexes) => {
      const updatedIndexes = [...prevIndexes];
      updatedIndexes[index] = !prevIndexes[index];
      console.log(`To Index: ${index}`);
      setCount((prevCount) => prevCount + (updatedIndexes[index] ? 1 : -1));
      const selectedUsers = data.filter((user, i) => updatedIndexes[i]);
      localStorage.setItem("FINALUSERLIST", JSON.stringify(selectedUsers));

      return updatedIndexes;
    });
  };

  const theme = createTheme({
    palette: {
      success: {
        main: "#nnn",
      },
    },
  });
  const handleSubmit = () => {
    navigate("/next");
    console.log("hihihih");
  };
  const handleList = () => {
    console.log("hi from list ");

    navigate("/grouplist");
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://642d4d6dbf8cbecdb4027745.mockapi.io/plane"
      );
      setData(response.data);
      setSelectedButtonIndexes(new Array(response.data.length).fill(false));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#055558",
          height: "65px",
          color: "white",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          font: "32px",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/side">
            <MdKeyboardBackspace
              style={{ marginRight: "30px", color: "white", font: 22 }}
            />
          </Link>
          <Typography variant="h6" gutterBottom sx={{ padding: "20px" }}>
            Select Contacts
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignContent: "centre", alignItems: "center" }}
        >
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
          <CiMenuKebab style={{ color: "white", fontSize: "22px" }} />
          <Button sx={{ color: "white" }} onClick={handleSubmit}>
            <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: "", backgroundColor: "#2a6062d6" }}>
        <Box
          spacing={2}
          s
          sx={{
            color: "white",
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "20px",
              padding: "30px",
              backgroundColor: "#f0f0f0",
            }}
          >
            {filteredData.map((user, index) => (
              <Box
                key={user.id}
                sx={{
                  margin: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "center",
                  padding: "12px",
                }}
              >
                <Avatar
                  alt={user.image}
                  src={user.image || "/static/images/avatar/2.jpg"}
                  sx={{
                    width: 140,
                    height: 140,
                    cursor: "pointer",
                  }}
                />
                <Box sx={{ color: "black" }}>{user.name}</Box>
                <Button
                  variant="contained"
                  color={selectedButtonIndexes[index] ? "success" : "secondary"}
                  onClick={() => handleAdd(index)}
                  style={{
                    backgroundColor: selectedButtonIndexes[index]
                      ? "#4CAF50"
                      : "rgb(51 100 14 / 93%)",
                    color: "white",
                  }}
                >
                  {selectedButtonIndexes[index] ? "Added" : "Click to add"}
                </Button>
              </Box>
            ))}
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "centre",
              gap: "12px",
              // backgroundColor: "blue",
              borderRadius: "40%",
              padding: "12px",
            }}
          >
            <GroupsIcon
              sx={{
                backgroundColor: "#055558",
                borderRadius: "22px",
                height: "44px",
                width: "44px",
              }}
            />
            New Group
          </Box> */}
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "centre",
              gap: "12px",
              // backgroundColor: "blue",
              borderRadius: "40%",
              padding: "12px",
              width: "44vh",
            }}
          >
            <GroupsIcon
              sx={{
                backgroundColor: "#055558",
                borderRadius: "22px",
                height: "44px",
                width: "44px",
              }}
            />
            New Contact
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "centre",
              gap: "12px",
              // backgroundColor: "blue",
              borderRadius: "40%",
              padding: "12px",
            }}
          >
            <GroupsIcon
              sx={{
                backgroundColor: "#055558",
                borderRadius: "22px",
                height: "44px",
                width: "44px",
              }}
            />
            New Community
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default BroadCast;
