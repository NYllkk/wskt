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
      navigate("/side");
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
