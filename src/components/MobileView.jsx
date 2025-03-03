import React, { useEffect, useState } from "react";
import shareProfileIcon from "../assets/shareProfileIcon.png";
import bigProfile from "../assets/bigProfile.png";
import blackLogo from "../assets/blackLogo.png";
import youtubeColor from "../assets/youtubeColor.png";
import instaColor from "../assets/instaColor.png";
import fbColor from "../assets/fbColor.png";
import xColor from "../assets/xColor.png";
import "../styles/links.css";
import { useNavigate, useParams } from "react-router-dom";
import { getLinksById, getUserById, updateClick } from "../services";

const MobileView = ({ username, bannerBackground, links = [], shops = [] }) => {
  const [activeBtn, setActiveBtn] = useState("links");
  const [isLoading, setIsLoading] = useState(true);
  const socialMediaIcons = {
    yt: youtubeColor,
    insta: instaColor,
    fb: fbColor,
    x: xColor,
  };
  const navigate = useNavigate();

  const { id } = useParams();

  const [userData, setUserData] = useState({
    username: "",
    bannerBackground: "#342B26",
    links: [],
    shops: [],
  });

  useEffect(() => {
    if (!username && id) {
      showUserDetails(id);
      showUserLinks(id);
    }
  }, [id]);

  const showUserDetails = async (id) => {
    const res = await getUserById(id);
    if (res.status === 200) {
      const data = await res.json(res);
      setIsLoading(false);
      setUserData({
        username: data.username,
        bannerBackground: data.bannerBackground || "#342B26",
      });
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const showUserLinks = async (id) => {
    const res = await getLinksById(id);
    if (res.status === 200) {
      const data = await res.json(res);

      const linksArray = Array.isArray(data) ? data : [];
      const filteredLinks = linksArray.filter((link) => link.type === "links");
      const filteredShops = linksArray.filter((link) => link.type === "shop");

      setUserData((prev) => ({
        ...prev,
        links: filteredLinks,
        shops: filteredShops,
      }));
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const handleLinkClick = async (id) => {
    console.log(id)
    const res = await updateClick(id);
    if (res.status == 200) {
      const data = await res.json(res);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  return (
    <div className="mobile-view">
      <div
        className="mobile-view-top"
        style={{
          backgroundColor: username
            ? bannerBackground
            : userData.bannerBackground,
        }}
      >
        <button className="mobile-share-btn" disabled={username ? true : false} onClick={() => navigate("/")}>
          <img
            src={shareProfileIcon}
            alt="Share Profile"
            className="mobile-share-img"
          />
        </button>
        <div className="show-profile-info">
          <div className="profile-photo-div">
            <img src={bigProfile} alt="ProfileIcon" />
          </div>
          <h3
            className="mobile-username"
            style={{
              color: bannerBackground === "#FFFFFF" ? "black" : "white",
            }}
          >
            @{username ? username : userData.username}
          </h3>
        </div>
      </div>
      <div className="mobile-view-content hide-scrollbar">
        <div className="link-shop-section">
          <button
            className={
              activeBtn == "links" ? "mobile-active-btn" : "mobile-link-btn"
            }
            onClick={() => setActiveBtn("links")}
          >
            link
          </button>
          <button
            className={
              activeBtn == "shop" ? "mobile-active-btn" : "mobile-shop-btn"
            }
            onClick={() => setActiveBtn("shop")}
          >
            Shop
          </button>
        </div>
        {activeBtn == "links"
          ? (username ? links?.length > 0 : userData?.links?.length > 0) &&
            (username ? links : userData?.links || []).map((link) => (
              <div className="show-links" key={link._id}>
                <div className="link">
                  <div className="link-image">
                    <img
                      src={socialMediaIcons[link.socialMedia]}
                      alt="Youtube"
                    />
                  </div>
                  <a
                    className="link-title"
                    href={link.url}
                    target="_blank"
                    onClick={() => handleLinkClick(link._id)}
                  >
                    {link.title}
                  </a>
                </div>
              </div>
            ))
          : (username ? shops?.length > 0 : userData?.shops?.length > 0) &&
            (username ? shops : userData?.shops || []).map((link) => (
              <div className="show-links" key={link._id}>
                <div className="link">
                  <div className="link-image">
                    <img
                      src={socialMediaIcons[link.socialMedia]}
                      alt="Youtube"
                    />
                  </div>
                  <a
                    className="link-title"
                    href={link.url}
                    target="_blank"
                    onClick={() => handleLinkClick(link._id)}
                  >
                    {link.title}
                  </a>
                </div>
              </div>
            ))}
      </div>
      <div className="mobile-view-footer">
        <button className="get-connected-btn" onClick={() => navigate("/")} disabled={username ? true : false}>
          Get Connected
        </button>
        <div className="mobile-footer-logo">
          <img src={blackLogo} alt="Logo" className="mobile-logo" />
          <h2 className="mobile-logo-title">
            SPARK<sup>TM</sup>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MobileView;
