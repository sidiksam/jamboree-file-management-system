import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage, Login, Register, DashboardPage } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  checkIsLoggedIn,
  getUser,
} from "./redux/actionCreators/authActionCreator";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PendingPage from "./pages/DashboardPage/PendingPage";
import AdminPage from "./pages/DashboardPage/AdminPage";
import AboutUs from "./pages/AuthPages/AvoutUs/AboutUs";
import Contact from "./pages/AuthPages/ContactUs/Contact";
import ResetPassword from "./pages/AuthPages/ResetPassword/ResetPassword";
import ResetPending from "./pages/AuthPages/ResetPassword/ResetPending";


const App = () => {
  const adminUser = useSelector((state) => state.auth.adminUser[0]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsLoggedIn());
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {}, [adminUser]);
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/resetpending" element={<ResetPending />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/dashboard/*" element={<DashboardPage />}></Route>
        <Route path="/pending/*" element={<PendingPage />}></Route>

        <Route path="/superadmin/*" element={<AdminPage />}></Route>

        <Route path="/contactus/" element={<Contact />}></Route>
        <Route path="/aboutus/" element={<AboutUs />}></Route>
      </Routes>
    </div>
  );
};

export default App;
