import React from "react";
import Draggable from "react-draggable";
import { Card, CardContent, Typography } from "@mui/material";

const DraggableCard = ({ title, onClick, onDragStart, onDrag, onDragStop }) => {
  return (
    <Draggable onStart={onDragStart} onDrag={onDrag} onStop={onDragStop}>
      <Card onClick={onClick} style={{ cursor: "pointer" }}>
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography color="text.secondary">Click me or drag me!</Typography>
        </CardContent>
      </Card>
    </Draggable>
  );
};
export default DraggableCard;
//

//
//
// const CreateUser = async (req, res) => {
//   const form = new formidable.IncomingForm();
//   try {
//     const returndata = await new Promise((resolve, reject) => {
//       form.parse(req, async (error, fields, files) => {
//         if (error) {
//           return reject(new Error("error occured during parsing the Data "));
//         }
//         console.log(files, "files content ");
//         const processedData = processFormFields(fields);
//         const { userName, email, LastName, password } = processedData;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         let profilePictureUrl = "";
//         if (
//           files.profilePicture &&
//           Array.isArray(files.profilePicture) &&
//           files.profilePicture.length > 0
//         ) {
//           const uploadedFile = files.profilePicture[0];
//           const imagePath = uploadedFile.filepath;
//           console.log(imagePath, "here in image path");
//           const public_id = await testUserUpload(imagePath);
//           console.log(" here in publicID ", public_id);
//           profilePictureUrl = `https://res.cloudinary.com/do7fwlqpn/image/upload/${public_id}`;
//         }
//         const find = await testUser.findOne({
//           where: { email },
//           attributes: { exclude: ["password"] },
//         });
//         if (find) {
//           return RES(res, STATUS.BAD_REQUEST, "EMAIL HAS ALREADY TAKEN ");
//         }
//         const newUser = await testUser.create({
//           userName,
//           email,
//           LastName,
//           password: hashedPassword,
//           profilePicture: profilePictureUrl,
//         });
//         return RES(res, STATUS.OK, "CREATED", newUser);
//       });
//     });
//   } catch (error) {
//     console.log(error);
//     return RES(res, STATUS.INTERNAL_SERVER_ERROR);
//   }
// };
