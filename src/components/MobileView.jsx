import React, { useState } from "react";
import shareProfileIcon from "../assets/shareProfileIcon.png";
import bigProfile from "../assets/bigProfile.png";
import blackLogo from "../assets/blackLogo.png";
import youtubeColor from "../assets/youtubeColor.png";
import instaColor from "../assets/instaColor.png";
import fbColor from "../assets/fbColor.png";
import xColor from "../assets/xColor.png";
import "../styles/links.css";

const MobileView = ({username, bannerBackground}) => {
  const [activeBtn, setActiveBtn] = useState("links");
  return (
    <div className="mobile-view">
      <div className="mobile-view-top" style={{ backgroundColor: bannerBackground }}>
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
          <h3 className="mobile-username" style={{
                  color:
                    bannerBackground === "#FFFFFF"
                      ? "black"
                      : "white",
                }}>@{username}</h3>
        </div>
      </div>
      <div className="mobile-view-content">
        <div className="link-shop-section">
          <button
            className={
              activeBtn == "links"
                ? "mobile-active-btn"
                : "mobile-link-btn"
            }
            onClick={() => setActiveBtn("links")}
          >
            link
          </button>
          <button
            className={
              activeBtn == "shop"
                ? "mobile-active-btn"
                : "mobile-shop-btn"
            }
            onClick={() => setActiveBtn("shop")}
          >
            Shop
          </button>
        </div>
        { activeBtn == "links" ? <div className="show-links">
          <div className="link">
            <div className="link-image">
              <img src={youtubeColor} alt="Youtube" />
            </div>
            <h3 className="link-title">Latest YouTube Video</h3>
          </div>
          <div className="link">
            <div className="link-image">
              <img src={instaColor} alt="Instagram" />
            </div>
            <h3 className="link-title">Latest Instagram reel</h3>
          </div>
        </div> : <div className="show-shops">
          <div className="shop">
            <div className="shop-image">
              <img src={fbColor} alt="Facebook" />
            </div>
            <h3 className="shop-title">Latest Fb Video</h3>
          </div>
          <div className="shop">
            <div className="shop-image">
              <img src={xColor} alt="X" />
            </div>
            <h3 className="shop-title">Latest X reel</h3>
          </div>
        </div>}
      </div>
      <div className="mobile-view-footer">
        <button className="get-connected-btn">Get Connected</button>
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
