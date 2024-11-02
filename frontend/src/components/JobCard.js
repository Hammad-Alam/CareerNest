import React from "react";
import TransparentLogo from "../assets/transparentlogo.png";

const JobCard = ({ job, onClick }) => {
  return (
    <div
      className="shadow-md rounded-xl border-2 border-[#E0E4E8] bg-[#F3F4F6] hover:bg-[#EDF2F7] p-6 flex justify-between cursor-pointer"
      onClick={onClick}
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="text-sm">
        <h2 className=" font-semibold">{job.title}</h2>
        <h3 className=" font-medium py-3">{job.category}</h3>
        <p className="text-gray-500 font-medium">{job.salary}</p>
        <p className="pt-10 font-medium">{job.location}</p>
        <p className="text-sm py-2">
          Posted At: {new Date(job.postedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="">
        <img
          src={TransparentLogo}
          alt="Company Logo"
          className="w-16 h-20 mb-4"
        />
        <p className="text-gray-500 pt-[50px] font-medium">{job.status}</p>
      </div>
    </div>
  );
};

export default JobCard;
