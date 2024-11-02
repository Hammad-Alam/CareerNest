import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";

const JobsTable = (props) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/job/fetchalljobs",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleEdit = (jobId) => {
    props.setShowUpdateForm(true);
    props.setJobId(jobId);
  };

  const handleDelete = async (jobId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/job/deletejob/${jobId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const newJobs = jobs.filter((jobs) => jobs._id !== jobId);
      setJobs(newJobs);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center border border-gray-200 bg-gray-100 py-2">
        <h1 className="text-xl md:text-2xl font-semibold ml-4">Jobs</h1>
        <button
          className="bg-gray-700 text-white px-2 py-1 md:px-4 md:py-2 mr-4 rounded-[50%] hover:bg-gray-800"
          onClick={getJobs}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
        </button>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto overflow-y-auto h-[40vh]">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 text-sm md:text-base sticky top-0 z-10">
              <tr>
                <th className="text-left py-2 px-4">Title</th>
                <th className="text-left py-2 px-4">Category</th>
                <th className="text-left py-2 px-4">Location</th>
                <th className="text-left py-2 px-4">Job Type</th>
                <th className="text-left py-2 px-4">PostedAt</th>
                <th className="text-left py-2 px-4">Status</th>
                <th className="text-left py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="border-t border-gray-200 text-sm md:text-base"
                >
                  <td className="py-2 px-4">{job.title}</td>
                  <td className="py-2 px-4">{job.category}</td>
                  <td className="py-2 px-4">{job.location}</td>
                  <td className="py-2 px-4">{job.jobType}</td>
                  <td className="py-2 px-4">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-sm font-medium rounded-full ${
                        job.status === "Available"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 space-x-5 md:space-x-6">
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => handleEdit(job._id)}
                      className="my-1 cursor-pointer"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(job._id)}
                      className="my-1 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobsTable;
