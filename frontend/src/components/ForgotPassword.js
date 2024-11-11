import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeading from "./AuthHeading";
import Input from "./Input";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";
import Password from "./Password";

function ForgotPassword(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    cnfpassword: "",
  });
  let navigate = useNavigate();

  useEffect(() => {
    props.setProgress(100);
    const timer = setTimeout(() => {
      props.setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.setProgress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.cnfpassword
    ) {
      props.handleAlert("Please fill in all fields.", "danger");
      return;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(credentials.email)) {
      props.handleAlert("Invalid email.", "danger");
      return;
    }

    // Password validation
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

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgotpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();

      if (json.success) {
        props.handleAlert("Password reset Successfully!", "success");
        navigate("/");
      } else {
        props.handleAlert(json.message, "danger");
      }
    } catch (error) {
      console.error(error);
      props.handleAlert("Internal Server Error", "danger");
    }
  };

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
