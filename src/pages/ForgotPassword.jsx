import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";
const theme = createTheme({
  breakpoints: {},
});
const ForgotPassword = () => {
  const forgot = import.meta.env.VITE_BACKEND_URL;
  console.log(forgot, "in here forgot");
  const navigate = useNavigate();
  const initialState = {
    email: "",
  };
  const [errors, setErrors] = useState({});
  const [data, setdata] = useState(initialState);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value,
    });
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: undefined,
        }));
      })
      .catch((error) => {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      });
  };
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(data, { abortEarly: false });
      const response = await axios.post(`${forgot}/forget`, {
        email: data.email,
      });
      console.log(response.data.token, "in here response");
      const TOKEN = localStorage.setItem(
        "AUTHLOGGEDINTOKEN",
        JSON.stringify({ email: data.email, token: response.data.token })
      );
      navigate("/change");
      console.log("submitted");
    } catch (error) {
      if (error && error.inner) {
        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("An error occurred:", error);
      }
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
          marginTop: "50%vw",
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
            marginTop: "50%vw",
          }}
        >
          <Box sx={{ height: 140 }} title="Forgot Image" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Forgot Password ?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
              hic omnis molestias!
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              value={data.email}
              error={Boolean(errors.email)}
              helperText={errors.email}
              autoFocus
            />
          </CardContent>
          <Button
            type="submit"
            // fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Click here
          </Button>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;
