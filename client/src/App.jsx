import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";
import Private from "./components/Private";
import Experiment from "./pages/Experiment.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Sidebar from "../src/pages/Sidebar.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/reg" Component={Join} />
        <Route path="/chat" Component={Chat} />
        <Route path="/private" Component={Private} />
        <Route path="/ex" Component={Experiment} />
        {/*  */}
        <Route path="/log" Component={Login} />
        <Route path="/" Component={Register} />
        <Route path="/forgot" Component={ForgotPassword} />
        <Route path="/change" Component={ChangePassword} />
        <Route path="/side" Component={Sidebar} />
      </Routes>
    </>
  );
}
export default App;
