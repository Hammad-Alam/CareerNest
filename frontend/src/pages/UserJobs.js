import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import JobDetail from "../components/JobDetail"; // Import JobDetail component
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const UserJobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null); // State to track selected job

  useEffect(() => {
    const getJobs = async () => {
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
      }
    };

    getJobs();
  }, []);

  const handleSearch = async (e) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/job/searchjob/${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await response.json();
      if (data.length === 0) {
        props.handleAlert("No Job found of this category.", "danger");
        setFilteredJobs([]);
      } else {
        setFilteredJobs(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  // Function to open JobDetail with selected job
  const openJobDetail = (job) => {
    setSelectedJob(job);
  };

  // Function to close JobDetail
  const closeJobDetail = () => {
    setSelectedJob(null);
  };

  return (
    <div className="p-6 -mx-4 h-[80vh] my-6 flex flex-col space-y-4">
      <div className="flex justify-between">
        <h1 className="text-base mt-4 md:text-2xl font-bold mb-4">
          Job Listings
        </h1>
        <div className="flex items-center bg-gray-700 text-white rounded-full px-4 py-2 w-[65%] md:w-1/2 max-w-sm text-xs md:text-base">
          <input
            type="text"
            placeholder="Search Job by Category"
            className="bg-transparent focus:outline-none text-white flex-grow"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-white w-5 h-5 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 xxl:grid-cols-3 overflow-y-auto gap-6">
        {isSearching ? (
          <div className="md:mx-[600px]">
            <Spinner />
          </div>
        ) : searchQuery === "" ? (
          jobs.map((job, index) => (
            <JobCard key={index} job={job} onClick={() => openJobDetail(job)} />
          ))
        ) : (
          filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} onClick={() => openJobDetail(job)} />
          ))
        )}
      </div>

      {/* JobDetail Modal */}
      {selectedJob && <JobDetail job={selectedJob} onClose={closeJobDetail} />}
    </div>
  );
};

export default UserJobs;
