import React from "react";

function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div className="h-14 relative">
      {props.alert && (
        <div
          className={`py-5 px-3 rounded-md 
            ${
              props.alert.type === "success"
                ? "bg-green-100 text-green-600 border-green-500 border"
                : props.alert.type === "danger"
                ? "bg-red-100 text-red-600 border-red-600"
                : ""
            }`}
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
