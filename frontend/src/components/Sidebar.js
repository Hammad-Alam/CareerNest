// Sidebar.js
import React, { useState, useEffect } from "react";
import SidebarItem from "../components/SidebarItem";
import Logo from "../assets/logo.PNG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { LayoutDashboard, Briefcase, User, LogOut, Lock } from "lucide-react";

function Sidebar({ role, handleLogout }) {
  const [user, setUser] = useState({});
  const [firstLetter, setFirstLetter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/getuser", {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });

        const data = await response.json();
        setUser(data);
        setFirstLetter(data.name.charAt(0));
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <aside className="lg:w-64 xl:w-64 md:w-56 sm:w-48 w-full h-screen lg:h-screen md:h-screen msm:h-2/4 bg-white border-r shadow-sm flex-shrink-0">
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src={Logo}
            className="lg:w-24 lg:h-16 md:w-16 md:h-12 sm:w-12 sm:h-10 w-8 h-8"
            alt=""
          />
        </div>
        <ul className="flex-1 px-3 overflow-y-auto">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text={"Dashboard"}
            to={role === "admin" ? "/admin-profile" : "/user-profile"}
          />
          <SidebarItem
            icon={<Briefcase size={20} />}
            text={role === "admin" ? "Job Listings" : "Jobs"}
            to={role === "admin" ? "/admin-profile/jobs" : "/user-profile/jobs"}
          />
          <li>
            <button
              className="flex items-center w-full py-2 px-[10px] hover:bg-indigo-50 hover:rounded-md"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <User size={20} />
              <span className="ml-3">Profile</span>
              <svg
                className={`ml-auto h-5 w-5 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
              </svg>
            </button>
            {dropdownOpen && (
              <ul className="py-2 px-4 ml-4">
                <SidebarItem
                  icon={
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="my-1 cursor-pointer"
                    />
                  }
                  text={"Update Profile"}
                  to={
                    role === "admin"
                      ? "/admin-profile/update"
                      : "/user-profile/update"
                  }
                />
                <SidebarItem
                  icon={<Lock size={20} />}
                  text={"Change Password"}
                  to={
                    role === "admin"
                      ? "/admin-profile/changepassword"
                      : "/user-profile/changepassword"
                  }
                />
              </ul>
            )}
          </li>
          <SidebarItem
            icon={<LogOut size={20} />}
            text={"Logout"}
            to={"/"}
            onClick={handleLogout}
          />
        </ul>
        <div className="border-t flex p-3">
          <span className="w-10 h-10 rounded-md bg-purple-200 text-center py-2 lg:text-lg md:text-md sm:text-sm">
            {firstLetter}
          </span>
          <div className="flex justify-between items-center ml-3">
            <div className="leading-4">
              <h4 className="font-semibold">{user.name}</h4>
              <span className="text-xs text-gray-600 lg:text-sm md:text-xs sm:text-2xs">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
