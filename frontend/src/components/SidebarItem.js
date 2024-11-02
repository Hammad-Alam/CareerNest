// components/SidebarItem.js
import React from "react";
import { Link } from "react-router-dom";

export default function SidebarItem({
  icon,
  text,
  to,
  active,
  alert,
  // onClick,
}) {
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      <Link to={to} className="flex">
        {icon}
        <span className="ml-3">{text}</span>
      </Link>
      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400" />
      )}
    </li>
  );
}
