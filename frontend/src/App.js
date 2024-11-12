import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import ForgotPassword from "./components/ForgotPassword";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Alert from "./components/Alert";
import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import UserProfile from "./pages/UserProfile";
import ChangePassword from "./components/ChangePassword";
import AdminJobs from "./pages/AdminJobs";
import UserJobs from "./pages/UserJobs";
import JobForm from "./components/JobForm";
import ApplicationTable from "./components/ApplicationTable";

function App() {
  // State to store alert messages
  const [alert, setAlert] = useState(null);
  // State to track progress bar progress
  const [progress, setProgress] = useState(0);

  const handleAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <Router>
      {/* Progress bar */}
      <LoadingBar color="#6800C5" progress={progress} height={4} />
      {/* Alert component */}
      {alert && <Alert alert={alert} />}
      <Routes>
        {/* Signin route */}
        <Route
          path="/"
          element={
            <Signin handleAlert={handleAlert} setProgress={setProgress} />
          }
        />
        {/* Signup route */}
        <Route
          path="/signup"
          element={
            <Signup handleAlert={handleAlert} setProgress={setProgress} />
          }
        />
        {/* Forgot password route */}
        <Route
          path="/forgotpassword"
          element={
            <ForgotPassword
              handleAlert={handleAlert}
              setProgress={setProgress}
            />
          }
        />
        {/* Admin dashboard routes */}
        <Route
          path="/admin-profile"
          element={<Layout role="admin" setProgress={setProgress} />}
        >
          {/* Admin dashboard index route */}
          <Route index element={<AdminDashboard setProgress={setProgress} />} />
          {/* Admin jobs route */}
          <Route
            path="jobs"
            element={
              <AdminJobs handleAlert={handleAlert} setProgress={setProgress} />
            }
          />
          {/* Admin profile update route */}
          <Route
            path="update"
            element={
              <AdminProfile
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
          {/* Admin change password route */}
          <Route
            path="changepassword"
            element={
              <ChangePassword
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
          {/* Admin application table route */}
          <Route
            path="application"
            element={
              <ApplicationTable
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
        </Route>

        {/* User dashboard routes */}
        <Route
          path="/user-profile"
          element={<Layout role="user" setProgress={setProgress} />}
        >
          {/* User jobs route */}
          <Route
            path="jobs"
            element={
              <UserJobs
                index
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
          {/* User job form route */}
          <Route
            path="jobform"
            element={
              <JobForm handleAlert={handleAlert} setProgress={setProgress} />
            }
          />
          {/* User profile update route */}
          <Route
            path="update"
            element={
              <UserProfile
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
          {/* User change password route */}
          <Route
            path="changepassword"
            element={
              <ChangePassword
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
