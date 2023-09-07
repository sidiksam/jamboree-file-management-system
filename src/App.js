import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage, Login, Register, DashboardPage } from "./pages";
import { useDispatch } from "react-redux";
import React from "react";
import { checkIsLoggedIn } from "./redux/actionCreators/authActionCreator";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PendingPage from "./pages/DashboardPage/PendingPage";
import AdminPage from "./pages/DashboardPage/AdminPage";
import AboutUs from "./pages/AuthPages/AvoutUs/AboutUs";
import Contact from "./pages/AuthPages/ContactUs/Contact";


const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [dispatch]);
  return (
    <div className="App">
       <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element={<Login />}></Route>
        <Route path="/signup" element={<Register />}></Route>
        <Route path="/dashboard/*" element={<DashboardPage />}></Route>
        <Route path="/pending/*" element={<PendingPage />}></Route>
        <Route path="/admin/*" element={<AdminPage />}></Route>
        <Route path="/contactus/" element={<Contact />}></Route>
        <Route path="/aboutus/" element={<AboutUs />}></Route>
      </Routes>
    </div>
  );
};

export default App;
