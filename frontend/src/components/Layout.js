// Layout.js
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ role, setProgress }) {
  useEffect(() => {
    setProgress(100);
    const timer = setTimeout(() => {
      setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setProgress]);
  return (
    <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col">
      <div className="sm:flex-row lg:flex-shrink-0 flex lg:flex">
        <Sidebar role={role} />
      </div>
      <div className="flex-1 p-4 overflow-y-auto flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
