import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const theme = createTheme({
  breakpoints: {},
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        "Password must contain at least one uppercase, one lowercase, one number, and be at least 8 characters long."
      )
      .required("Password is required"),
    ReEnterPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match")
      .required("Confirm Password is required"),
  });

  const initialState = {
    password: "",
    ReEnterPassword: "",
  };
  const [data, setdata] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [tokenn, settoken] = useState(null);
  const handleChnage = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() =>
        setErrors((prev) => ({
          ...prev,
          [name]: null,
        }))
      )
      .catch((error) => {
        setErrors((prev) => ({
          ...prev,
          [name]: error.message,
        }));
      });
  };

  useEffect(() => {
    const gettingToken = localStorage.getItem("AUTHLOGGEDINTOKEN");
    if (gettingToken) {
      const tokendata = JSON.parse(gettingToken);
      console.log(tokendata, "in here getting dataaaaaaaaa");
      const token = tokendata.token;
      console.log("finaltoken", token);
      settoken(token);
    }
  }, []);
  console.log(tokenn, "HERE GETTING THE FINAL WUTG THE SATE");
  const ChnagePasswordApi = import.meta.env.VITE_BACKEND_URL;
  console.log(ChnagePasswordApi, "in ChnagePasswordApi ");
  console.log(data, "in handleChnage");

  const handleSubmit = async (e) => {
    setErrors({});
    e.preventDefault();
    try {
      await validationSchema.validate(data, { abortEarly: false });
      const response = await axios.post(
        `${ChnagePasswordApi}/reset`,
        {
          password: data.password,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );
      console.log(response, "HERE GETTING THE API RESPONSE");
      setdata({ ...initialState, success: true });
      navigate("/log");
      toast.success("Login Succesfull");
    } catch (error) {
      console.log("error consoling", error);
      const validationErrors = {};
      if (error.inner && Array.isArray(error.inner)) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      } else {
        console.error("Error during validation:", error);
      }
      setErrors(validationErrors);
      toast.error("Validation errors. Please check the form. ");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          margin: "",
          padding: "20px",
          height: "100vh",
        }}
      >
        <Card
          sx={{
            borderRadius: "12px",
            border: "",
            textAlign: "center",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* <CardMedia sx={{ height: 140 }} image={""} title="Forgot Image" /> */}
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: "32px" }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Enter Your New Password
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <TextField
                name="password"
                type="password"
                onChange={handleChnage}
                placeholder="enter your new Password "
                value={data.password}
                error={Boolean(errors.password)}
                helperText={errors.password}
              ></TextField>
              <TextField
                name="ReEnterPassword"
                onChange={handleChnage}
                placeholder="ReEnter your new Password "
                value={data.ReEnterPassword}
                type="password"
                error={Boolean(errors.ReEnterPassword)}
                helperText={errors.ReEnterPassword}
              ></TextField>
            </Box>
          </CardContent>
          <Link to="/log" style={{ textDecoration: "none" }}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{ marginBottom: "22px" }}
            >
              Submit
            </Button>
          </Link>
        </Card>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};
//mail.google.com/mail/u/0/#inbox

export default ChangePassword;

//
// const handleSubmit = async (e) => {
//   setErrors({});
//   e.preventDefault();
//   try {
//     await validationSchema.validate(data, { abortEarly: false });

//     const response = await axios.post(
//       `${ChnagePasswordApi}/reset`,
//       {
//         password: data.password,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${tokenn}`,
//         },
//       }
//     );

//     console.log(response, "HERE GETTING THE API RESPONSE");
//     setdata({ ...initialState, success: true });
//     navigate("/log");
//   } catch (error) {
//     console.log("error consoling", error);
//     const validationErrors = {};
//     if (error.inner && Array.isArray(error.inner)) {
//       error.inner.forEach((err) => {
//         validationErrors[err.path] = err.message;
//       });
//     } else {
//       console.error("Error during validation:", error);
//     }
//     setErrors(validationErrors);
//   }
// };

//
