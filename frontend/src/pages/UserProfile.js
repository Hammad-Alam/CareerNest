import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input";
import Button from "../components/Button";
import { BACKEND_URI } from "../config";

function UserProfile(props) {
  // State to store user data
  const [user, setUser] = useState({});
  const [data, setData] = useState({
    name: "",
    email: "",
    bio: "",
    skills: [""],
    experience: "",
  });
  // Flag to toggle edit mode
  const [disabled, setDisabled] = useState(true);

  // Reset progress bar after loading
  useEffect(() => {
    props.setProgress(100);
    const timer = setTimeout(() => {
      props.setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.setProgress]);

  // Fetch user data on mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}/api/auth/getuser`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const userData = await response.json();
        setUser(userData);
        setData({
          // Initialize data state with user data
          name: userData.name,
          email: userData.email,
          bio: userData.bio,
          skills: userData.skills,
          experience: userData.experience,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  // Toggle edit mode
  const editProfile = () => {
    setDisabled(false);
  };

  // Handle save button click
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate input data
    if (!data.name || data.name.length < 3) {
      props.handleAlert("Please enter valid name.", "danger");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      props.handleAlert("Please enter valid email format.", "danger");
      return;
    }

    if (!data.bio || data.bio.length < 10) {
      props.handleAlert(
        "Bio length should be at least 10 characters.",
        "danger"
      );
      return;
    }

    try {
      // Update user profile
      const response = await fetch(
        `${BACKEND_URI}/api/updateprofile/updateuser/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            bio: data.bio,
            skills: data.skills,
            experience: data.experience,
          }),
        }
      );

      const json = await response.json();

      if (json.user) {
        props.handleAlert(
          "Your profile has been updated successfully.",
          "success"
        );
        setDisabled(true);
      } else {
        props.handleAlert(json.message, "danger");
      }
    } catch (error) {
      console.error(error);
      props.handleAlert("Internal Server Error", "danger");
    }
  };

  // Handle input changes
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        className="mx-2 justify-center items-center text-center my-4 lg:mt-20 lg:mb-8 rounded-xl border-2 border-gray-300"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <div className="flex justify-between mx-4 my-2">
          <h1 className="font-bold text-base lg:text-2xl md:text-xl sm:text-base md:mx-4">
            Profile Summary
          </h1>
          <FontAwesomeIcon
            icon={faEdit}
            onClick={editProfile}
            className="my-1 cursor-pointer"
          />
        </div>
        <div className="lg:flex lg:flex-row">
          <div className="lg:w-1/2">
            <Input
              type="Name"
              id="name"
              name="name"
              value={data.name}
              label="Name"
              disabled={disabled}
              onChange={onChange}
            />
          </div>
          <div className="lg:w-1/2">
            <Input
              type="Email"
              id="email"
              name="email"
              value={data.email}
              label="Email"
              disabled={disabled}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="lg:flex lg:flex-row">
          <div className="lg:w-1/2">
            <Input
              type="text"
              id="skills"
              name="skills"
              value={data.skills}
              label="Skills"
              disabled={disabled}
              className={"mb-4"}
              onChange={onChange}
            />
          </div>
          <div className="lg:w-1/2">
            <Input
              type="text"
              id="experience"
              name="experience"
              value={data.experience}
              label="Experience"
              disabled={disabled}
              className={"mb-4"}
              onChange={onChange}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            type="Bio"
            id="bio"
            name="bio"
            value={data.bio}
            label="Bio"
            disabled={disabled}
            className={"mb-4"}
            onChange={onChange}
          />
        </div>
      </div>
      {!disabled && (
        <Button
          text={"Save"}
          onClick={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
        />
      )}
    </>
  );
}

export default UserProfile;
