import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Badge, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/dataSlice";

const UserLIst = ({ data }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      <CardContent sx={{ display: "flex" }}>
        <Box component="div" variant="h5">
          <Avatar
            sx={{ height: "60px", width: "60px", marginRight: "20px" }}
            src={data.image}
            alt="Loading"
          />
        </Box>
        <Typography
          sx={{ width: "15vh" }}
          variant="subtitle1"
          color="text.secondary"
          component="div"
        >
          {data.name}
          <Typography
            variant="subtitle2"
            color="text.secondary"
            component="div"
          >
            typing.....
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
            <Badge color="blue" badgeContent={data.id} showZero></Badge>
          </Stack>
        </Box>
      </CardContent>
    </Box>
  );
};
export default UserLIst;

// const dispatch = useDispatch();

// useEffect(() => {
//   dispatch(fetchData());
// }, [dispatch]);

{
  /* <Box
  style={{
    backgroundColor: "#055558",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 1, 
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
      <GroupsIcon />
      <LuMessageSquarePlus /> <SiRoamresearch />
      <CiMenuKebab />
    </Box>
  </Box>
</Box>; */
}
