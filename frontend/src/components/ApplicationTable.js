import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";

const ApplicationTable = (props) => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/api/application/fetchallapplication",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center border border-gray-200 bg-gray-100 py-2">
        <h1 className="text-xl md:text-2xl font-semibold ml-4">Applications</h1>
        <button
          className="bg-gray-700 text-white px-2 py-1 md:px-4 md:py-2 mr-4 rounded-[50%] hover:bg-gray-800"
          onClick={getApplications}
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
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Phone</th>
                <th className="text-left py-2 px-4">Position</th>
                <th className="text-left py-2 px-4">LinkedIn Profile</th>
                <th className="text-left py-2 px-4">Portfolio URL</th>
                <th className="text-left py-2 px-4">Posted At</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr
                  key={application._id}
                  className="border-t border-gray-200 text-sm md:text-base"
                >
                  <td className="py-2 px-4">{application.name}</td>
                  <td className="py-2 px-4">{application.email}</td>
                  <td className="py-2 px-4">{application.phone}</td>
                  <td className="py-2 px-4">{application.position}</td>
                  <td className="py-2 px-4 text-sm font-medium text-blue-500 underline">
                    <a href={application.linkedin}>View LinkedIN Profile</a>
                  </td>
                  <td className="py-2 px-4 text-sm font-medium text-blue-500 underline">
                    <a href={application.portfolio}>View Portfolio</a>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(application.postedAt).toLocaleDateString()}
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

export default ApplicationTable;
