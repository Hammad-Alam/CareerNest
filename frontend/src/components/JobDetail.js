import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const JobDetail = ({ job, onClose }) => {
  let navigate = useNavigate();
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-opacity-40"
      data-aos="flip-right"
    >
      <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 p-8 space-y-6 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 absolute top-4 right-4 text-2xl focus:outline-none"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {job.title}
          </h2>
          <p className="text-base md:text-lg text-gray-500 mt-1">
            {job.category}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-gray-600">
          <p>
            <span className="font-medium">Location:</span> {job.location}
          </p>
          <p>
            <span className="font-medium">Salary:</span>
            {job.salary ? job.salary : "Not Mentioned"}
          </p>
          <p>
            <span className="font-medium">Experience:</span> {job.experience}
          </p>
          <p>
            <span className="font-medium">Job Type:</span> {job.jobType}
          </p>
        </div>

        <div className="text-base md:text-xl">
          <h3 className="font-semibold text-gray-800 mb-2">Job Description</h3>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="text-base md:text-xl">
            <h3 className="font-semibold text-gray-800 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-700 hover:bg-transparent hover:border-2 hover:border-gray-700 hover:text-black transition duration-300 ease-in-out text-white text-sm font-medium px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-gray-600">
          <p>
            <span className="font-medium">Posted at: </span>
            {new Date(job.postedAt).toLocaleDateString()}
          </p>
        </div>

        <div>
          <Button
            text={"Apply Now"}
            disabled={job.status !== "Available"}
            onClick={() => navigate("/user-profile/jobform")}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
