import React from "react";
import AOS from "aos"; // Import AOS library for animations
import "aos/dist/aos.css";
AOS.init();

function Alert(props) {
  // Capitalize the first letter of the alert type (e.g., "success" -> "Success")
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error"; // Replace "danger" with "error" for consistency
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div
      className="h-14 relative"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
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
          {/* Display capitalized alert type and message */}
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.message}
        </div>
      )}
    </div>
  );
}

export default Alert;
