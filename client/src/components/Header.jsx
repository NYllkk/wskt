import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { MdKeyboardBackspace, MdCall } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaVideo } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SpeedDial, styled } from "@mui/material";
import { logout } from "../redux/authSlice";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import persistor from "../redux/store";
import LogoutIcon from "@mui/icons-material/Logout";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    backgroundColor: "#055558",
    marginBottom: "20px",
    "& .MuiSpeedDial-fab": {
      backgroundColor: "#055558",
      // varient: "",
      padding: "12px",
      gap: "12px",
      marginLeft: "-12px",
      // norderRadius: "12px",
      // marginBottom: "120px",
    },
  }));

  // { icon: <SaveIcon />, name: "Save" },

  const [direction, setDirection] = React.useState("down");
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const name = useSelector((state) => state.auth?.user?.user?.email);
  console.log(name, "having value of name");
  // const state = useSelector((state) => state);
  // console.log(state, "state");
  const handleVideo = () => {
    console.log("Clicked on handleVideo");
  };
  const handleCall = () => {
    console.log("cllicked on handleCall");
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    // persistor.purge();
    navigate("/log");
  };

  return (
    <AppBar position="static">
      <Box maxWidth="100%" sx={{ backgroundColor: "#055558", width: "100%" }}>
        <Toolbar disableGutters sx={{}}>
          <Link to="/chat" style={{ textDecoration: "none" }}>
            <MdKeyboardBackspace
              style={{ marginRight: "30px", color: "white" }}
            />
          </Link>
          <Typography
            variant="h6"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <IconButton sx={{ p: 0 }}>
              <Avatar alt={name} src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              backgroundColor: "",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              //   onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              //   anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              //   open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ChatApp
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                lg: "flex",
                flexDirection: "column",
              },
            }}
          >
            <h4>
              {name} <br />
            </h4>
          </Box>
          <Box sx={{ flexGrow: 0, backgroundColor: "#", color: "white" }}>
            <Tooltip>
              <IconButton
                sx={{
                  color: "white",
                  display: "flex",
                  gap: "40px",
                  alignContent: "center",
                  alignItems: "center",
                }}
                disableRipple
              >
                <FaVideo onClick={handleVideo} />
                <MdCall onClick={handleCall} />
                {/* <BiDotsVerticalRounded  /> */}

                <StyledSpeedDial
                  sx={{
                    width: "18px",
                    height: "18px",
                    border: "none",
                  }}
                  ariaLabel="speed dial"
                  icon={<BiDotsVerticalRounded />}
                  direction={direction}
                  // color="white"
                >
                  <SpeedDialAction
                    sx={{ backgroundColor: "#055558", color: "white" }}
                    icon={<LogoutIcon />}
                    name="LogOut"
                    onClick={handleLogout}
                  />
                </StyledSpeedDial>
              </IconButton>

              {/* </IconButton> */}
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              //   anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              //   open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Header;
//