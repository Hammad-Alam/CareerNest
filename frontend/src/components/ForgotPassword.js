import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeading from "./AuthHeading";
import Input from "./Input";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";
import Password from "./Password";
import { BACKEND_URI } from "../config";

function ForgotPassword(props) {
  // Initialize state for user credentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    cnfpassword: "",
  });

  // Initialize navigation hook
  let navigate = useNavigate();

  // Set progress to 100% on component mount and reset after 1 second
  useEffect(() => {
    props.setProgress(100);
    const timer = setTimeout(() => {
      props.setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.setProgress]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.cnfpassword
    ) {
      props.handleAlert("Please fill in all fields.", "danger");
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(credentials.email)) {
      props.handleAlert("Invalid email.", "danger");
      return;
    }

    // Validate password format (8+ chars, uppercase, lowercase, numbers)
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(credentials.password)) {
      props.handleAlert(
        "Password should be at least 8 characters, contain uppercase, lowercase letters, and numbers.",
        "danger"
      );
      return;
    }

    // Check password match
    if (credentials.password !== credentials.cnfpassword) {
      props.handleAlert("Password do not match.", "danger");
      return;
    }

    // Send password reset request to server
    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/forgotpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      // Handle server response
      if (json.success) {
        props.handleAlert("Password reset Successfully!", "success");
        navigate("/"); // Redirect to homepage
      } else {
        props.handleAlert(json.message, "danger");
      }
    } catch (error) {
      console.error(error);
      props.handleAlert("Internal Server Error", "danger");
    }
  };

  // Update credentials state on input change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="mx-2 xsm:mx-auto justify-center items-center text-center my-28 lg:my-40 xsm:w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl border-2 border-gray-300"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <AuthHeading heading={"Forgot Password"} />
      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        onChange={onChange}
      />
      <Password
        type="password"
        id="password"
        name="password"
        label="Password"
        onChange={onChange}
      />
      <Password
        type="password"
        id="cnfpassword"
        name="cnfpassword"
        label="Confirm Password"
        onChange={onChange}
      />
      <AuthButton
        text={"Reset Password"}
        onClick={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <AuthMessage
        message={"Don't have an account?"}
        link={"Sign up"}
        route={"/signup"}
      />
    </div>
  );
}

export default ForgotPassword;
