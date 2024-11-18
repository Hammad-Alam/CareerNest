import React, { useState, useEffect } from "react";
import AuthHeading from "./AuthHeading";
import AuthSubHeading from "./AuthSubHeading";
import Input from "./Input";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";
import { useNavigate } from "react-router-dom";
import Password from "./Password";
import { BACKEND_URI } from "../config";

function Signup(props) {
  // Initialize state for user credentials
  const [credentials, setCredentials] = useState({
    name: "",
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
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.cnfpassword
    ) {
      props.handleAlert("Please fill in all fields.", "danger");
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

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(credentials.email)) {
      props.handleAlert("Please enter valid email format.", "danger");
      return;
    }

    // Check password match
    if (credentials.password !== credentials.cnfpassword) {
      props.handleAlert("Password do not match.", "danger");
      return;
    }

    // Send registration request to server
    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      // Handle server response
      if (json.success) {
        localStorage.setItem("token", json.authToken);
        props.handleAlert("Sign up successfully!", "success");
        navigate("/"); // Redirect to signin page
      } else {
        console.log(json.error);
      }
    } catch (error) {
      console.error(error);
      props.handleAlert("An error occurred.", "danger");
    }
  };

  // Update credentials state on input change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="mx-2 xsm:mx-auto justify-center items-center text-center my-16 lg:my-24 xsm:w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl border-2 border-gray-300"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <AuthHeading heading={"Create your Account"} />
      <AuthSubHeading
        subheading={"Welcome! Please fill in the details to get started."}
      />
      <Input
        type="name"
        id="name"
        name="name"
        label="Name"
        value={credentials.name}
        onChange={onChange}
      />
      <Input
        type="email"
        id="email"
        name="email"
        label="Email"
        value={credentials.email}
        onChange={onChange}
      />
      <Password
        id="password"
        name="password"
        label="Password"
        value={credentials.password}
        onChange={onChange}
      />
      <Password
        id="cnfpassword"
        name="cnfpassword"
        label="Confirm Password"
        value={credentials.cnfpassword}
        onChange={onChange}
      />
      <AuthButton
        onClick={handleSubmit}
        text={"Sign Up"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <AuthMessage
        message={"Already have an account?"}
        link={"Sign in"}
        route={"/"}
      />
    </div>
  );
}

export default Signup;
