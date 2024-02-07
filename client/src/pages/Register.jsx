import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Checkbox,
  Paper,
  Box,
  Grid,
  TextField,
  Avatar,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
  registerUser,
  registerSuccess,
  registerFailure,
} from "../redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();
export default function SignInSide() {
  const REGISTER_URL = import.meta.env.VITE_BACKEND_URL;
  console.log(REGISTER_URL, "with register Api ");
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    name: Yup.string().required("name is Required"),
    lastName: Yup.string().required("lastName is Required"),
    email: Yup.string().required("email is Required"),
    password: Yup.string().required("password is Required"),
  });
  const navigate = useNavigate();
  const initialState = {
    name: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [data, setdata] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    try {
      setErrors({});
      e.preventDefault();
      await validationSchema.validate(data, { abortEarly: false });
      dispatch(registerUser());
      const response = await axios.post(`${REGISTER_URL}/register`, {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      console.log("in handleSubmit", response);
      dispatch(registerSuccess(response.data));
      setdata({ ...initialState, success: true });
      setTimeout(() => {
        setdata({ ...data, success: false });
      }, 3000);
      navigate("/log");
    } catch (error) {
      console.log("errror consoling", error);
      dispatch(registerFailure(error.message));
      const validationErrors = {};
      if (error.inner && Array.isArray(error.inner)) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      } else {
        console.error("Error during validation:", error);
      }
      setErrors(validationErrors);
    }
  };
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
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      });
  };
  console.log(data);
  return (
    <Container maxWidth="lg">
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="First Name"
                      onChange={handleChnage}
                      error={Boolean(errors.name)}
                      helperText={errors.name}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      onChange={handleChnage}
                      autoComplete="family-name"
                      error={Boolean(errors.email)}
                      helperText={errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      onChange={handleChnage}
                      autoComplete="email"
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      onChange={handleChnage}
                      autoComplete="new-password"
                      error={Boolean(errors.password)}
                      helperText={errors.password}
                    />

                    {/*nodemailer  iwor qwag qsrq radx */}
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/log" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
}
//
// <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="password"
//               label="password"
//               name="password"
//               autoComplete="text"
//               type={data.showPassword ? "text" : "password"}
//               value={data.password}
//               autoFocus
//               onChange={handleInputChange}
//               error={errors.password}
//               helperText={errors.password}
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment
//                     position="end"
//                     onClick={handlePasswordVisibilityToggle}
//                   >
//                     {data.showPassword ? <Visibility /> : <VisibilityOff />}
//                   </InputAdornment>
//                 ),
//               }}
//             />
