import React from "react";
import AdminSidebar from "../pages/AdminSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function AdminLayout() {
  return (
    <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col">
      <div className="sm:flex-row lg:flex-shrink-0 flex lg:flex">
        <AdminSidebar />
      </div>
      <div className="flex-1 p-4 overflow-y-auto flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
