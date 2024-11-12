import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { Briefcase, User, AlertCircle, Tag } from "lucide-react";

function AdminDashboard(props) {
  // Reset progress bar after loading
  useEffect(() => {
    props.setProgress(100);
    const timer = setTimeout(() => {
      props.setProgress(0);
    }, 1000);
    return () => clearTimeout(timer);
  }, [props.setProgress]);

  // State to store dashboard statistics
  const [dashboardStats, setDashboardStats] = useState({});

  // Fetch dashboard statistics on mount
  useEffect(() => {
    const getStats = async () => {
      try {
        // API endpoint to fetch dashboard statistics
        const response = await fetch(
          "http://localhost:5000/api/dashboardstats/admin",
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        );

        const data = await response.json();
        setDashboardStats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="mt-5">
      <h1 className="font-bold text-xl lg:text-2xl md:text-xl sm:text-lg md:mx-4">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-center items-center">
        {/* Dashboard cards */}
        <DashboardCard
          icon={<Briefcase size={20} />}
          heading={"Total Job Postings"}
          count={dashboardStats.totalJobs}
        />
        <DashboardCard
          icon={<Briefcase size={20} />}
          heading={"Active Jobs"}
          count={dashboardStats.activeJobs}
        />
        <DashboardCard
          icon={<AlertCircle size={20} />}
          heading={"Expired Jobs"}
          count={dashboardStats.expiredJobs}
        />
        <DashboardCard
          icon={<User size={20} />}
          heading={"Total Users"}
          count={dashboardStats.totalUsers}
        />
        <DashboardCard
          icon={<Tag size={20} />}
          heading={"Top Job Category"}
          count={dashboardStats.topCategory?.[0]?._id || ""}
        />
        <DashboardCard
          icon={<Briefcase size={20} />}
          heading={"Total Applications"}
          count={dashboardStats.totalApplications}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
