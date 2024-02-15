import { useEffect, useState } from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Badge, Button, Stack } from "@mui/material";

const UserLIst = ({ data, onClick }) => {
  const theme = useTheme();
  // const { id } = useParams();
  // console.log(id, "in user list id ");
  return (
    <>
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
            onClick={onClick}
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
    </>
  );
};
export default UserLIst;

//

// route in main app
{
  /* <Route path="/eventdetails/:id" element={<EventCatagories />} />; */
}
// card
// import React from "react";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import vine from "../../assets/vine.jpg";
// import Buttonn from "../constants/Button";
// import { Link, useNavigate } from "react-router-dom";

// const CustomCard = ({ text, p, p1, color, pic, onButtonClick, handletrigger, data }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     // if (onButtonClick) {
//     //   navigate("/eventdetails");
//     // }
//     if (handletrigger) {
//       handletrigger();
//     }
//   };

//   return (
//     <Card
//       style={{
//         backgroundColor: "#ffffff",
//         width: "300px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "12px",
//       }}
//     >
//       <CardMedia
//         component="img"
//         alt="Card Image"
//         height="200"
//         image={pic || vine} // Assuming vine is a default image if pic is not provided
//         title="Card Image"
//         style={{ width: "215px", height: "120px", borderRadius: "15px" }}
//       />
//       <CardContent>
//         <Typography variant="h6" component="div">
//           {text}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {p} <br /> {p1}
//         </Typography>
//       </CardContent>
//       <Buttonn texthero="Read More" backgroundColor="#4D0179" color="white" width="250px" onClick={handleClick} />
//     </Card>
//   );
// };

// export default CustomCard;

//
// final
// import * as React from "react";
// import Card from "../components/Card/Card";
// import { useNavigate } from "react-router-dom";

// const MyComponent = ({ data }) => {
//   const navigate = useNavigate();

//   const styles = {
//     card: {
//       border: "1px solid #ddd",
//       borderRadius: "8px",
//       overflow: "hidden",
//       width: "300px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       margin: "16px",
//       backgroundColor: "#fff",
//     },
//     cardImage: {
//       width: "100%",
//       height: "150px",
//       objectFit: "cover",
//     },
//     cardContent: {
//       padding: "16px",
//     },
//     cardTitle: {
//       fontSize: "1.5rem",
//       margin: "0 0 8px 0",
//     },
//     cardDescription: {
//       fontSize: "1rem",
//       color: "#555",
//     },
//   };

//   const handleTrigger = (id) => {
//     console.log("Clicked id:", id);
//     navigate(`/eventdetails/${id}`);
//   };

//   return (
//     <>
//       <Card
//         pic={data.image}
//         text={data.name}
//         p={data.createdAt}
//         p1={data.time}
//         handleTrigger={() => handleTrigger(data.id)}
//       />
//     </>
//   );
// };

// export default MyComponent;
