import React from "react";

function AuthButton(props) {
  return (
    <div className="mt-4 flex justify-center">
      <button
        onClick={props.onClick}
        className="w-[210px] py-1 rounded-lg text-white mx-auto 
        bg-gray-700 
        hover:bg-gray-600 
        transition duration-300 ease-in-out"
      >
        {props.text}
      </button>
    </div>
  );
}

export default AuthButton;
