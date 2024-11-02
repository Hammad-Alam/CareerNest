import React, { useState, useEffect } from "react";
import AuthHeading from "./AuthHeading";
import Password from "./Password";

function ChangePassword(props) {
  const [credentials, setCredentials] = useState({
    newPassword: "",
    newCnfPassword: "",
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    props.setProgress(100);
    const timer = setTimeout(() => {
      props.setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.setProgress]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    // Check if all fields are filled
    if (!credentials.newPassword || !credentials.newCnfPassword) {
      props.handleAlert("Please fill in all fields.", "danger");
      return;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPattern.test(credentials.newPassword)) {
      props.handleAlert(
        "Password should be at least 8 characters, contain uppercase, lowercase letters, and numbers.",
        "danger"
      );
      return;
    }

    // Check password match
    if (credentials.newPassword !== credentials.newCnfPassword) {
      props.handleAlert("Password do not match.", "danger");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/changepassword/${user._id}`,
        {
          method: "PUT",
          headers: {
            "auth-token": localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: credentials.newPassword,
          }),
        }
      );

      const json = await response.json();

      if (json.user) {
        props.handleAlert("Password changed Successfully!", "success");
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
      className="mx-2 xsm:mx-auto justify-center items-center text-center my-4 md:my-auto xsm:w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl border-2 border-gray-300"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <AuthHeading heading={"Change Password"} />
      <Password
        id="newPassword"
        name="newPassword"
        label="New Password"
        onChange={onChange}
      />
      <Password
        id="newCnfpassword"
        name="newCnfPassword"
        label="Confirm New Password"
        onChange={onChange}
      />
      <button
        onClick={handleSubmit}
        className="bg-gray-700 w-[190px] mt-4 mb-8 py-1 rounded-lg text-white mx-auto hover:bg-gray-600 
        transition duration-300 ease-in-out"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default ChangePassword;
