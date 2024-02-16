import { Avatar, Box, Button, Container, createTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Group = () => {
  // const theme = createTheme({
  //   palette: {
  //     primary: lime,
  //     secondary: purple,
  //   },
  // });

  const [data, setdata] = useState([]);

  const Api = async () => {
    const response = await axios.get(
      "https://642d4d6dbf8cbecdb4027745.mockapi.io/plane"
    );
    setdata(response.data);
  };
  useEffect(() => {
    Api();
  }, []);

  return (
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
      {data.map((user) => (
        <Box
          key={user.id}
          sx={{
            margin: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "centre",
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
          {/* <ThemeProvider theme={theme}> */}
          <Button variant="" color="success">
            Click to add
          </Button>
          {/* </ThemeProvider> */}
        </Box>
      ))}
    </Box>
  );
};

export default Group;

// overflow: "hidden",
// boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
