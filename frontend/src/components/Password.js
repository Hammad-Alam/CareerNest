import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Password({ id, label, name, onChange, className }) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <div className={`flex flex-col mt-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-start ml-10 text-sm font-semibold">
          {label}
        </label>
      )}
      <div className="relative mx-10 my-2">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          onChange={onChange}
          className="px-2 py-1 pr-10 border rounded-lg w-full focus:outline-none"
        />
        <button
          type="button"
          onClick={handleShow}
          className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
        >
          <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
        </button>
      </div>
    </div>
  );
}

export default Password;
