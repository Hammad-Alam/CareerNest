import React from "react";

function Textarea({
  id,
  label,
  name,
  value,
  onChange,
  className,
  disabled,
  rows = 5,
  cols = 30,
}) {
  return (
    <div className={`flex flex-col mt-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-start ml-10 text-sm font-semibold">
          {label}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        rows={rows}
        cols={cols}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mx-10 px-2 py-1 my-2 border rounded-lg focus:outline-none text-xs md:text-base resize-none`}
      />
    </div>
  );
}

export default Textarea;
