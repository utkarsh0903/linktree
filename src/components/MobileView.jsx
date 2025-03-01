import React, { useState } from "react";
import shareProfileIcon from "../assets/shareProfileIcon.png";
import bigProfile from "../assets/bigProfile.png";
import blackLogo from "../assets/blackLogo.png";
import youtubeColor from "../assets/youtubeColor.png";
import instaColor from "../assets/instaColor.png";
import fbColor from "../assets/fbColor.png";
import xColor from "../assets/xColor.png";
import "../styles/links.css";
import { useNavigate } from "react-router";

const MobileView = ({ username, bannerBackground, links, shops }) => {
  const [activeBtn, setActiveBtn] = useState("links");
  const socialMediaIcons = {
    yt: youtubeColor,
    insta: instaColor,
    fb: fbColor,
    x: xColor,
  };
  const navigate = useNavigate();

  return (
    <div className="mobile-view">
      <div
        className="mobile-view-top"
        style={{ backgroundColor: bannerBackground }}
      >
        <button className="mobile-share-btn">
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
            @{username}
          </h3>
        </div>
      </div>
      <div className="mobile-view-content">
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
          ? links.length > 0 &&
            links.map((link) => (
              <div className="show-links" key={link._id}>
                <div className="link">
                  <div className="link-image">
                    <img src={socialMediaIcons[link.socialMedia]} alt="Youtube" />
                  </div>
                  <a className="link-title" href={link.url} target="_blank">{link.title}</a>
                </div>
              </div>
            ))
          : shops.length > 0 &&
            shops.map((link) => (
              <div className="show-links" key={link._id}>
                <div className="link">
                  <div className="link-image">
                    <img src={socialMediaIcons[link.socialMedia]} alt="Youtube" />
                  </div>
                  <a className="link-title" href={link.url} target="_blank">{link.title}</a>
                </div>
              </div>
            ))}
      </div>
      <div className="mobile-view-footer">
        <button className="get-connected-btn" onClick={() => navigate("/")}>Get Connected</button>
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

{
  /* <div className="link">
            <div className="link-image">
              <img src={instaColor} alt="Instagram" />
            </div>
            <h3 className="link-title">Latest Instagram reel</h3>
          </div> */
}
