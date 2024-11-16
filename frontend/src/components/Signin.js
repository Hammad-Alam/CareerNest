import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeading from "./AuthHeading";
import AuthSubHeading from "./AuthSubHeading";
import Input from "./Input";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";
import Password from "./Password";

function Signin(props) {
  // Initialize state for user credentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
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
    e.preventDefault(); // Prevent page reload

    // Check for empty fields
    if (!credentials.email || !credentials.password) {
      props.handleAlert("Please fill in all fields.", "danger");
      return;
    }

    // Send login request to server
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
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
        // Check for admin access
        if (credentials.email === "hammadalam115@gmail.com") {
          localStorage.setItem("token", json.authToken);
          props.handleAlert("Logged in Successfully!", "success");
          navigate("/admin-profile");
        } else {
          localStorage.setItem("token", json.authToken);
          props.handleAlert("Logged in Successfully!", "success");
          navigate("/user-profile/jobs");
        }
      } else {
        props.handleAlert("Please enter correct credentials.", "danger");
      }
    } catch (error) {
      console.log(error);
      props.handleAlert("An error occurred. Please try again!", "danger");
    }
  };

  // Update credentials state on input change
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="mx-2 xsm:mx-auto justify-center items-center text-center my-32 lg:my-44 xsm:w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl border-2 border-gray-300"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <AuthHeading heading={"Sign in to CareerNest"} />
      <AuthSubHeading subheading={"Welcome back! Please sign in to continue"} />
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
      <span
        onClick={() => navigate("/forgotpassword")}
        className="text-blue-600 cursor-pointer font-semibold text-sm"
      >
        Forgot Password?
      </span>
      <AuthButton
        text={"Sign in"}
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

export default Signin;
