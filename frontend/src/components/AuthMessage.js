import React from "react";
import { useNavigate } from "react-router-dom";

function AuthMessage(props) {
  let navigate = useNavigate();
  return (
    <div className="flex mx-auto justify-center items-center text-center mt-1 space-x-1 mb-6">
      <p className="text-[#747686] text-sm">{props.message}</p>
      <span
        onClick={() => navigate(props.route)}
        style={{ cursor: "pointer" }}
        className="text-sm font-semibold"
      >
        {props.link}
      </span>
    </div>
  );
}

export default AuthMessage;
