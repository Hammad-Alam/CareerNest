import React from "react";

function DashboardCard(props) {
  return (
    <div
      className="md:mx-3 my-4 p-5 rounded-xl border-2 border-[#E0E4E8] flex flex-col items-center bg-[#F3F4F6] hover:bg-[#EDF2F7]"
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div className="flex items-center mb-4">
        <span
          className="p-2 bg-[#CBC3E3] rounded-full"
          style={{ fontSize: "1.5rem" }}
        >
          {props.icon}
        </span>
        <h1 className="text-center font-semibold text-lg lg:text-xl md:text-lg sm:text-md ml-2 text-[#4A4A4A]">
          {props.heading}
        </h1>
      </div>
      <div className="my-8 flex justify-center items-center space-x-4">
        <span className="text-lg lg:text-xl md:text-lg sm:text-md text-[#4A4A4A]">
          {props.count}
        </span>
      </div>
    </div>
  );
}

export default DashboardCard;
