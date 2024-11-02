import React, { useState } from "react";
import AuthHeading from "./AuthHeading";
import Input from "./Input";
import Button from "./Button";

function JobForm(props) {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    education: "",
    linkedin: "",
    portfolio: "",
  });

  const handleApplication = async () => {
    // Check if all fields are filled
    if (
      !data.name ||
      !data.email ||
      !data.phone ||
      !data.position ||
      !data.experience ||
      !data.education ||
      !data.linkedin ||
      !data.portfolio
    ) {
      props.handleAlert("Please fill in all fields.", "danger");
      return;
    }

    // Validate name
    if (data.name.length < 3) {
      props.handleAlert("Name must be at least 3 characters", "danger");
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      props.handleAlert("Invalid email address", "danger");
      return;
    }

    // Validate phone
    if (data.phone.length < 11) {
      props.handleAlert("Phone number must be at least 11 digits", "danger");
      return;
    }

    // Validate experience
    if (!/^\d+\+?\s?years?$/i.test(data.experience)) {
      props.handleAlert("Experience must be in format '2+ years'", "danger");
      return;
    }

    // Validate LinkedIn & Portfolio URL
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(data.linkedin || data.portfolio)) {
      props.handleAlert("Invalid URL", "danger");
      return;
    }

    // Proceed with API Call
    try {
      const response = await fetch(
        "http://localhost:5000/api/application/createapplication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            position: data.position,
            experience: data.experience,
            education: data.education,
            linkedin: data.linkedin,
            portfolio: data.portfolio,
          }),
        }
      );

      if (!response.ok) {
        console.error("Bad request:", response.status);
        return;
      }

      const json = await response.json();

      if (json) {
        props.handleAlert(
          "Your application has been submitted successfully.",
          "success"
        );
        setData({
          name: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          education: "",
          linkedin: "",
          portfolio: "",
        });
      }
    } catch (error) {
      props.handleAlert("Error adding application:", "danger");
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="mx-2 xsm:mx-auto justify-center items-center pb-4 text-center my-16 md:my-5 sm:w-1/2 md:w-9/12 xl:w-1/2 rounded-xl border-2 border-gray-300"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        height: "80vh",
        overflowY: "auto",
      }}
    >
      <AuthHeading heading={`Job Application Form`} />
      <div>
        <Input
          type="text"
          id="name"
          name="name"
          label="Name"
          onChange={onChange}
          value={data.name}
        />
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          onChange={onChange}
          value={data.email}
        />
        <Input
          type="text"
          id="phone"
          name="phone"
          label="Phone Number"
          onChange={onChange}
          value={data.phone}
        />
        <Input
          type="text"
          id="position"
          name="position"
          label="Position Applied For"
          onChange={onChange}
          value={data.position}
        />
        <Input
          type="text"
          id="experience"
          name="experience"
          label="Relevant Work Experience"
          onChange={onChange}
          value={data.experience}
        />
        <Input
          type="text"
          id="education"
          name="education"
          label="Education"
          onChange={onChange}
          value={data.education}
        />
        <Input
          type="text"
          id="linkedin"
          name="linkedin"
          label="LinkedIn Profile"
          onChange={onChange}
          value={data.linkedin}
        />
        <Input
          type="text"
          id="portfolio"
          name="portfolio"
          label="Portfolio Link"
          onChange={onChange}
          value={data.portfolio}
        />
        <Button text={`Apply`} onClick={handleApplication} />
      </div>
    </div>
  );
}

export default JobForm;
