import React, { useState, useEffect } from "react";
import AuthHeading from "./AuthHeading";
import AuthSubHeading from "./AuthSubHeading";
import Input from "./Input";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";
import { useNavigate } from "react-router-dom";
import Password from "./Password";

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
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
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.cnfpassword
    ) {
      props.handleAlert("Please fill in all fields.", "danger");
      return;
    }

    // Check password length and pattern
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(credentials.password)) {
      props.handleAlert(
        "Password should be at least 8 characters, contain uppercase, lowercase letters, and numbers.",
        "danger"
      );
      return;
    }

    // Check email pattern
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

    // Proceed with API call
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );

      const json = await response.json();

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
