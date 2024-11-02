import React from "react";

function Button(props) {
  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={props.onClick}
        className="bg-gray-700 w-fit px-4 py-2 rounded-lg text-white mx-auto         hover:bg-gray-600 
        transition duration-300 ease-in-out"
        disabled={props.disabled}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
