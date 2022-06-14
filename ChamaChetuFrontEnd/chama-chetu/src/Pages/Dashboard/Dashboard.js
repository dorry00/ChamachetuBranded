import React from "react";
import DashboardSidebar from "../../Components/DashboardSidebar/DashboardSidebar";
import "./Dashboard.css";
import DashboardNavbar from "../../Components/DashboardNavbar/DashboardNavbar";

function Dashboard() {
  return (
    <div className="dashboard">
      <DashboardSidebar />
      <div className="dashboardContainer">
        <DashboardNavbar/>
        dashboard container
      </div>
    </div>
  );
}

export default Dashboard;
