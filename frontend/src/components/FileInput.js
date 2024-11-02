import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function FileInput({ id, label, name, onChange, className }) {
  return (
    <div className={`flex flex-col mt-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-start ml-10 text-sm font-semibold">
          {label}
        </label>
      )}
      <div className="mx-10 px-2 py-1 my-2 border rounded-lg focus:outline-none flex items-center">
        <input
          id={id}
          name={name}
          type="file"
          onChange={onChange}
          className="hidden"
        />
        <FontAwesomeIcon icon={faUpload} className="ml-auto" />
      </div>
    </div>
  );
}

export default FileInput;
