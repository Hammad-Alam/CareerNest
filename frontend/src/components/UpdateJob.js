import React, { useState, useEffect } from "react";
import AuthHeading from "./AuthHeading";
import Input from "./Input";
import Textarea from "./TextArea";
import Button from "./Button";

function UpdateJob(props) {
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
    skills: "",
    status: "",
  });
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    setJobId(props.jobId);
  }, [props.jobId]);

  useEffect(() => {
    const getJobDetails = async () => {
      if (jobId) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/job/getjob/${jobId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
            }
          );

          const jobData = await response.json();
          console.log(jobData);
          setData(jobData);
        } catch (error) {
          console.error("Error fetching job details:", error);
        }
      }
    };

    getJobDetails();
  }, [jobId]);

  const updateJob = async () => {
    // Validation logic
    try {
      const response = await fetch(
        `http://localhost:5000/api/job/updatejob/${jobId}`,
        {
          method: "PUT",
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
            skills: data.skills,
            status: data.status,
          }),
        }
      );

      if (!response.ok) {
        console.error("Bad request:", response.status);
        return;
      }

      const json = await response.json();

      if (json) {
        console.log("Job updated successfully.");
        props.handleFormSubmission();
      }
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="mx-2 xsm:mx-auto justify-center items-center pb-4 text-center my-16 lg:-my-10 xsm:w-3/4 sm:w-1/2 lg:w-1/3 xl:w-1/2 rounded-xl border-2 border-gray-300"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        height: "80vh",
        overflowY: "auto",
      }}
    >
      <AuthHeading heading={`Update Job`} />
      <div>
        <Input
          type="text"
          id="title"
          name="title"
          label="Title"
          onChange={onChange}
          value={data.title}
        />
        <Textarea
          id="description"
          label="Job Description"
          name="description"
          onChange={onChange}
          value={data.description}
          rows={5}
        />
        <Input
          type="text"
          id="category"
          name="category"
          label="Category"
          onChange={onChange}
          value={data.category}
        />
        <Input
          type="text"
          id="location"
          name="location"
          label="Location"
          onChange={onChange}
          value={data.location}
        />
        <Input
          type="text"
          id="salary"
          name="salary"
          label="Salary"
          onChange={onChange}
          value={data.salary}
        />
        <Input
          type="text"
          id="experience"
          name="experience"
          label="Experience"
          onChange={onChange}
          value={data.experience}
        />
        <Input
          type="text"
          id="jobType"
          name="jobType"
          label="Job Type"
          onChange={onChange}
          value={data.jobType}
        />
        <Input
          type="text"
          id="skills"
          name="skills"
          label="Skills"
          onChange={onChange}
          value={data.skills}
        />
        <Input
          type="text"
          id="status"
          name="status"
          label="Status"
          onChange={onChange}
          value={data.status}
        />
        <Button
          text={`Update Job`}
          onClick={updateJob}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateJob();
            }
          }}
        />
      </div>
    </div>
  );
}

export default UpdateJob;
