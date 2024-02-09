import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, InputAdornment } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSucess, loginUser } from "../redux/authSlice";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const defaultTheme = createTheme();
export default function SignInSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginApi = import.meta.env.VITE_BACKEND_URL;
  console.log(LoginApi, "in here with api ");
  const initialState = {
    email: "",
    password: "",
  };
  const [data, setdata] = useState(initialState);
  const [errors, setErrors] = useState({});

  const [showPassword, setshoPassword] = useState(false);
  const LOGIN_URl = import.meta.env.VITE_BACKEND_URL;
  const handlepasswordToggle = () => {
    setshoPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    try {
      setErrors({});
      e.preventDefault();
      await validationSchema.validate(data, { abortEarly: false });
      dispatch(loginUser());
      toast.success("Login Succesfull");
      const response = await axios.post(`${LOGIN_URl}/login`, {
        email: data.email,
        password: data.password,
      });
      console.log("in handleSubmit", response);
      dispatch(loginSucess({ user: data, token: response.data.createToken }));
      setdata({ ...initialState, success: true });
      setTimeout(() => {
        setdata({ ...data, success: false });
      }, 3000);
      navigate("/ex");
    } catch (error) {
      console.log("errror consoling", error);
      // dispatch(registerFailure(error.message));
      const validationErrors = {};
      if (error.inner && Array.isArray(error.inner)) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
      } else {
        console.error("Error during validation:", error);
      }
      setErrors(validationErrors);
      toast.error("check your email and password ");
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("password is required "),
    // phoneNumber: Yup.number().required("Phone Number is required"),
  });
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
    // console.log("here i ant to see name ", name);
    // console.log("handleChnage", data);
  };
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChnage}
                  autoFocus
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChnage}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        onClick={handlepasswordToggle}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to="/forgot" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <ToastContainer />
    </Container>
  );
}

//
// import * as React from "react";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import { Link } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   loginFailure,
//   loginRequest,
//   loginSuccess,
// } from "../../../Slices/loginSlice";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { InputAdornment } from "@mui/material";
// import axios from "axios";
// import backendUrl from "../../../components/api/apiconfig.js";
// const defaultTheme = createTheme();

// const Login = () => {
//   // const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const initialState = {
//     email: "",
//     password: "",
//     showPassword: false,
//   };
//   const [data, setdata] = React.useState(initialState);
//   const [errors, setErrors] = React.useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setdata({
//       ...data,
//       [name]: value,
//     });
//     validationSchema
//       .validateAt(name, { [name]: value })
//       .then(() => {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: null,
//         }));
//       })
//       .catch((error) => {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: error.message,
//         }));
//       });
//   };
//   const handletogglePassowrd = () => {
//     setdata({
//       ...data,
//       showPassword: !data.showPassword,
//     });
//   };
//   // const handleSubmit = async (event) => {
//   //   event.preventDefault();
//   //   try {
//   //     await validationSchema.validate(data, { abortEarly: false });
//   //     dispatch(loginRequest(data));
//   //     console.log("hi");
//   //     const storedUserData = JSON.parse(localStorage.getItem("AUTH"));
//   //     if (
//   //       storedUserData &&
//   //       data.email === storedUserData.email &&
//   //       data.password === storedUserData.password
//   //     ) {
//   //       dispatch(loginSuccess(data));
//   //       console.log("data Submitted");
//   //       localStorage.setItem(
//   //         "AUTHLOGGEDIN",
//   //         JSON.stringify({ email: data.email, name: data.password })
//   //       );
//   //       console.log("top of naviagte");
//   //       navigate("/");
//   //     }
//   //     console.log("form registered");
//   //   } catch (error) {
//   //     const errors = {};
//   //     error.inner.forEach((e) => {
//   //       errors[e.path] = e.message;
//   //     });
//   //     setErrors(errors);
//   //     dispatch(loginFailure(data));
//   //     console.log("errors");
//   //     console.log("errors");
//   //   }
//   // };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log(`Backend URL: ${backendUrl}`);
//     try {
//       await validationSchema.validate(data, { abortEarly: false });
//       // dispatch(loginRequest(data));

//       const res = await axios.post(`${backendUrl}/login`, {
//         email: data.email,
//         password: data.password,
//       });
//       dispatch(loginSuccess({ user: data, token: res.data.token }));
//       console.log("Data Submitted");
//       localStorage.setItem(
//         "AUTHLOGGEDIN",
//         JSON.stringify({ email: data.email, name: data.password })
//       );
//       navigate("/");
//     } catch (error) {
//       dispatch(loginFailure(error.message));
//       console.log(error);
//     }
//   };
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required")
//       .matches(/^\S*$/, "Password must not contain spaces"),
//   });
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid
//         container
//         component="main"
//         style={{
//           margin: "0px",
//           gap: "12px",
//           display: "flex",
//           justifyContent: "center",
//           alignContent: "center",
//           alignItems: "centre",
//           padding: "20px",
//         }}
//       >
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={4}
//           sx={{
//             borderRadius: "8px",
//             backgroundImage:
//               "url(https://source.unsplash.com/random?wallpapers)",
//             backgroundRepeat: "no-repeat",
//             backgroundColor: (t) =>
//               t.palette.mode === "light"
//                 ? t.palette.grey[50]
//                 : t.palette.grey[900],
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Typography
//               component="h1"
//               variant="h5"
//               sx={{ textAlign: "left", width: "100%" }}
//             >
//               Welcome Back
//             </Typography>
//             <Typography>
//               Join Our Wine Community and get exiting Offers, evenyt invitation
//               and , and update on New Realeses. Sign up Now !
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={handleSubmit}
//               sx={{
//                 mt: 1,
//                 display: "contents",
//               }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 onChange={handleChange}
//                 value={data.email}
//                 error={Boolean(errors.email)}
//                 helperText={errors.email}
//                 autoFocus
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type={data.showPassword ? "text" : "password"}
//                 id="password"
//                 onChange={handleChange}
//                 autoComplete="current-password"
//                 value={data.password}
//                 error={Boolean(errors.password)}
//                 helperText={errors.password}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment
//                       position="end"
//                       onClick={handletogglePassowrd}
//                     >
//                       {data.showPassword ? <Visibility /> : <VisibilityOff />}
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//               <Grid container>
//                 <Grid
//                   item
//                   sx={{
//                     display: "flex",
//                     alignContent: "center",
//                     alignItems: "center",
//                     minWidth: "100%",
//                     justifyContent: "end",
//                   }}
//                 >
//                   <Link sx={{ color: "purple" }} to="/forget">
//                     Forgot Password
//                   </Link>
//                 </Grid>
//               </Grid>
//               <Button
//                 style={{ background: " rgb(95, 3, 166)" }}
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// };

// export default Login;
