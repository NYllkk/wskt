import {
  Avatar,
  Box,
  Button,
  Container,
  InputBase,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";
import { useNavigate } from "react-router-dom";

const Group = () => {
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

  const handleList = () => {
    console.log("hi from list ");
    // localStorage.setItem("FINALUSERLIST", JSON.stringify(data));
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
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{ backgroundColor: "#f0f0f0" }}>
          <Badge badgeContent={count} color="secondary">
            <GroupsIcon color="action" />
          </Badge>
          <Button onClick={handleList}> Create </Button>
          <InputBase
            sx={{
              backgroundColor: "whitesmoke",
              borderRadius: "20px",
              color: "black",
              // backgroundColor: "blue",
              marginLeft: "20px",
            }}
            placeholder="Search Here"
            inputProps={{ "aria-label": "search Here......" }}
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>
      </Box>
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
            <Box>{user.name}</Box>
            <Button
              variant="contained"
              color={selectedButtonIndexes[index] ? "success" : "secondary"}
              onClick={() => handleAdd(index)}
            >
              {selectedButtonIndexes[index] ? "Added" : "Click to add"}
            </Button>
          </Box>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default Group;
// from here
