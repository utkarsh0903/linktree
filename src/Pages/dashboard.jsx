import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import logo from "../assets/greenLogo.png";
import greenLinks from "../assets/greenLinks.png";
import linksIcon from "../assets/linksIcon.png";
import greenAppearance from "../assets/greenAppearance.png";
import appearanceIcon from "../assets/appearanceIcon.png";
import greenAnalytics from "../assets/greenAnalytics.png";
import analyticsIcon from "../assets/analyticsIcon.png";
import greenSettings from "../assets/greenSettings.png";
import settingsIcon from "../assets/settingsIcon.png";
import profileIcon from "../assets/profileIcon.png";
import shareLink from "../assets/shareLink.png";
import logout from "../assets/logout.png";
import { useNavigate } from "react-router";
import Links from "../components/Links";
import Appearance from "../components/Appearance";
import Analytics from "../components/Analytics";
import Settings from "../components/Settings";
import { getUser } from "../services";

const Dashboard = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("links");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    showUserDetails();
  }, []);

  const showUserDetails = async () => {
    const res = await getUser();
    if (res.status === 200) {
      const data = await res.json(res);
      setIsLoading(false);
      setActiveUser(data);
      setUsername(data.username);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className=" left-navbar">
        <div className="logo-section">
          <img className="logo" src={logo} alt="Logo" />
          <h1 className="dashboard-logo">Spark</h1>
        </div>
        <nav className="dashboard-navbar">
          <ul>
            <li className={activeTab == "links" ? "active" : ""}>
              <button onClick={() => setActiveTab("links")}>
                <img
                  src={activeTab == "links" ? greenLinks : linksIcon}
                  alt="Links Icon"
                />
                Links
              </button>
            </li>
            <li className={activeTab == "appearance" ? "active" : ""}>
              <button onClick={() => setActiveTab("appearance")}>
                <img
                  src={
                    activeTab == "appearance" ? greenAppearance : appearanceIcon
                  }
                  alt="Appearance Icon"
                />
                Appearance
              </button>
            </li>
            <li className={activeTab == "analytics" ? "active" : ""}>
              <button onClick={() => setActiveTab("analytics")}>
                <img
                  src={
                    activeTab == "analytics" ? greenAnalytics : analyticsIcon
                  }
                  alt="Analytics Icon"
                />
                Analytics
              </button>
            </li>
            <li className={activeTab == "settings" ? "active" : ""}>
              <button onClick={() => setActiveTab("settings")}>
                <img
                  src={activeTab == "settings" ? greenSettings : settingsIcon}
                  alt="Settings Icon"
                />
                Settings
              </button>
            </li>
          </ul>
        </nav>
        <div className="nav-profile-name">
          <div className="profile-photo-div">
            <img src={profileIcon} alt="ProfileIcon" />
          </div>
          <button
            className="profile-btn"
            onClick={() => setShowLogoutBtn(!showLogoutBtn)}
          >
            {activeUser.firstname} {activeUser.lastname}
          </button>
          {showLogoutBtn && (
            <div className="dropdown-content">
              <button className="logout-btn" onClick={() => handleLogout()}>
                <img src={logout} alt="Logout" className="logout-btn" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="content-section">
        <div className="dashboard-top-navbar">
          {isLoading ? (
            <p>Loading....</p>
          ) : (
            <div className="current-data">
              <p className="dashboard-username">
                Hi,{" "}
                <span className="name-highlight">
                  {activeUser.firstname} {activeUser.lastname}
                </span>
                !
              </p>
              <p className="dashboard-message">
                Congratulations . You got a great response today .{" "}
              </p>
            </div>
          )}

          {activeTab == "links" && (
            <div className="share-btn">
              <button
              // onClick={() => {
              //   setIsCreateLinkModalOpen(true);
              // }}
              >
                <img src={shareLink} alt="share link" />
                Share
              </button>
            </div>
          )}
        </div>
        <div className="hero-section">
          {activeTab == "links" && (
            <Links
              username={username}
              setUsername={setUsername}
              bannerBackground={activeUser.bannerBackground}
              bio={activeUser.bio}
            />
          )}
          {activeTab == "appearance" && <Appearance />}
          {activeTab == "analytics" && <Analytics />}
          {activeTab == "settings" && <Settings />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
