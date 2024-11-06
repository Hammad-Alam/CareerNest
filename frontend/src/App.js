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
  const [alert, setAlert] = useState(null);
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
      <LoadingBar color="#6800C5" progress={progress} height={4} />
      {alert && <Alert alert={alert} />}
      <Routes>
        <Route
          path="/"
          element={
            <Signin handleAlert={handleAlert} setProgress={setProgress} />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup handleAlert={handleAlert} setProgress={setProgress} />
          }
        />
        <Route
          path="/forgotpassword"
          element={
            <ForgotPassword
              handleAlert={handleAlert}
              setProgress={setProgress}
            />
          }
        />
        <Route
          path="/admin-profile"
          element={<Layout role="admin" setProgress={setProgress} />}
        >
          <Route index element={<AdminDashboard setProgress={setProgress} />} />
          <Route
            path="jobs"
            element={
              <AdminJobs handleAlert={handleAlert} setProgress={setProgress} />
            }
          />
          <Route
            path="update"
            element={
              <AdminProfile
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
          <Route
            path="changepassword"
            element={
              <ChangePassword
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
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

        <Route
          path="/user-profile"
          element={<Layout role="user" setProgress={setProgress} />}
        >
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
          <Route
            path="jobform"
            element={
              <JobForm handleAlert={handleAlert} setProgress={setProgress} />
            }
          />
          <Route
            path="update"
            element={
              <UserProfile
                handleAlert={handleAlert}
                setProgress={setProgress}
              />
            }
          />
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
