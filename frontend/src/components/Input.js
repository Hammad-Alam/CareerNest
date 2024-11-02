import React from "react";

function Input({
  type = "text",
  id,
  label,
  name,
  value,
  onChange,
  className,
  disabled,
}) {
  return (
    <div className={`flex flex-col mt-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-start ml-10 text-sm font-semibold">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mx-10 px-2 py-1 my-2 border rounded-lg focus:outline-none text-xs md:text-base`}
      />
    </div>
  );
}

export default Input;
