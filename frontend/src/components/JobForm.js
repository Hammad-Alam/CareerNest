import React, { useState } from "react";
import AuthHeading from "./AuthHeading";
import Input from "./Input";
import Button from "./Button";

function JobForm(props) {
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    skills: "",
  });

  const addJob = async () => {
    // Check if all fields are filled
    if (
      !data.title ||
      !data.description ||
      !data.category ||
      !data.location ||
      !data.salary ||
      !data.experience ||
      !data.jobType ||
      !data.skills ||
      !data.status
    ) {
      console.error("Please fill in all fields.");
    }

    // Check if the title is valid
    if (data.title.length < 3) {
      console.error("Title must be at least 3 characters");
      return;
    }

    // Check if the description is valid
    if (data.description.length < 25) {
      console.error("Description must be at least 25 characters");
      return;
    }

    // Check if location is valid
    if (data.location.length < 2) {
      console.error("Location must be at least 2 characters");
      return;
    }

    // Validate the salary format
    if (!/^[A-Za-z]+\s?\d+,?\d*/.test(data.salary)) {
      console.error("Salary must be in format 'RS 10000'");
      return;
    }

    // Validate the experience format
    if (!/^\d+\+?\s?years?$/i.test(data.experience)) {
      console.error("Experience must be in format '2+ years'");
      return;
    }

    // Check if job type is valid
    if (
      !["Full-time", "Part-time", "Internship", "Contract"].includes(
        data.jobType
      )
    ) {
      console.error("Invalid job type");
      return;
    }

    // Proceed with API Call
    try {
      const response = await fetch("http://localhost:5000/api/job/createjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          category: data.category,
          location: data.location,
          salary: data.salary,
          experience: data.experience,
          jobType: data.jobType,
          skills: data.skills.split(",") || [], // Convert skills to an array
          status: data.status,
        }),
      });

      if (!response.ok) {
        console.error("Bad request:", response.status);
        return;
      }

      const json = await response.json();

      if (json) {
        console.log("Job Added successfully.");
        setData({
          title: "",
          description: "",
          category: "",
          location: "",
          experience: "",
          salary: "",
          jobType: "",
          skills: "",
          status: "",
        });
      }
      props.handleFormSubmission();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const apply = () => {
    props.handleAlert(
      "Your Job Application has been successfully submitted.",
      "success"
    );
  };

  return (
    <div
      className="mx-2 xsm:mx-auto justify-center items-center pb-4 text-center my-16 lg:my-0 sm:w-1/2 md:w-9/12 xl:w-1/2 rounded-xl border-2 border-gray-300"
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
          value={data.title}
        />
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          onChange={onChange}
          value={data.category}
        />
        <Input
          type="text"
          id="phoneNo"
          name="phoneNo"
          label="Phone Number"
          onChange={onChange}
          value={data.location}
        />
        <Input
          type="text"
          id="jobTitle"
          name="jobTitle"
          label="Position Applied For"
          onChange={onChange}
          value={data.salary}
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
          value={data.jobType}
        />
        <Input
          type="text"
          id="linkedin"
          name="linkedin"
          label="LinkedIn Profile"
          onChange={onChange}
          value={data.skills}
        />
        <Input
          type="file"
          id="resume"
          name="resume"
          label="Resume / CV"
          onChange={onChange}
          value={data.status}
        />
        <Button text={`Apply`} onClick={apply} />
      </div>
    </div>
  );
}

export default JobForm;
