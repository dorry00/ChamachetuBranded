import React from "react";
import "./DashboardSidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function DashboardSidebar() {
  return (
    <div className="dashboardSidebar">
      <div className="sidebarTop">
        <span className="logo">ChamaChetu</span>
      </div>
      <hr />
      <div className="sidebarCenter">
        <ul>
          <p className="itemTitle">MAIN</p>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          <p className="itemTitle">SERVICES</p>
          <li>
            <GroupsOutlinedIcon  className="icon"/>
            <span>Chamas</span>
          </li>

          <li>
            <AccountBalanceWalletOutlinedIcon  className="icon"/>
            <span>Your Wallet</span>
          </li>
          <li>
            <MeetingRoomOutlinedIcon className="icon"/>
            <span>Meetings</span>
          </li>
          <li>
            <MeetingRoomOutlinedIcon className="icon"/>
            <span>Discover</span>
          </li>
          <p className="itemTitle">MEMBER</p>
          <li>
            <AdminPanelSettingsOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>

          <li>
            <NotificationsActiveOutlinedIcon  className="icon"/>
            <span>Notifications</span>
          </li>
          <li>
            <SettingsOutlinedIcon  className="icon"/>
            <span>Settings</span>
          </li>

          <li>
            <LogoutOutlinedIcon  className="icon"/>
            <span>Logout</span>
          </li>
          
        </ul>
      </div>
      <div className="sidebarBottom">
         <div className="colorTheme"></div>
         <div className="colorTheme"></div>
    </div>
    </div>
  );
}

export default DashboardSidebar;
