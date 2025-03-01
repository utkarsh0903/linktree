import React, { useState } from "react";
import "../styles/links.css";
import whiteShop from "../assets/whiteShop.png";
import blackShop from "../assets/blackShop.png";
import plus from "../assets/plus.png";
import dots from "../assets/dots.png";
import clicks from "../assets/clicks.png";
import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import whiteLogo from "../assets/whiteLogo.png";
import blackLogo from "../assets/blackLogo.png";
import bigProfile from "../assets/bigProfile.png";
import MobileView from "./MobileView";
import { updateProfile } from "../services";

const Links = ({ username, setUsername }) => {
  const [activeBtn, setActiveBtn] = useState("links");
  const [loading, setLoading] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    username: username,
    bio: "Bio",
    bannerBackground: "#342B26",
  });

  const handleTextChange = (event) => {
    const words = event.target.value.split(/\s+/).filter(Boolean);
    if (words.length <= 80) {
      setUpdatedData((prev) => ({
        ...prev,
        bio: event.target.value,
      }));
    }
  };

  const changeUsername = (event) => {
    setUsername(event.target.value);
    setUpdatedData((prev) => ({
      ...prev,
      username: event.target.value,
    }));
  };

  const changeBannerBg = (bgColor) => {
    setUpdatedData((prev) => ({
      ...prev,
      bannerBackground: bgColor,
    }));
  };

  const changeBannerInput = (event) => {
    setUpdatedData((prev) => ({
      ...prev,
      bannerBackground: event.target.value,
    }));
  };

  const handleSave = async (e) => {
    if (!username.trim()) {
      alert("Username cannot be empty!");
      return;
    }
    setLoading(true);
    e.preventDefault();
    console.log(updatedData);
    setLoading(false);
    const res = await updateProfile(updatedData);
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  return (
    <div className="link-container">
      <MobileView username={username} bannerBackground={updatedData.bannerBackground} />
      <div className="link-profile-edit">
        <div className="profile-section">
          <h2 className="profile-heading">Profile</h2>
          <div className="profile-edit-info">
            <div className="edit-image">
              <div className="profile-photo-div">
                <img src={bigProfile} alt="ProfileIcon" />
              </div>
              <div className="choose-image-div">
                <button className="pick-an-image">Pick an image</button>
                <button className="remove-image">Remove</button>
              </div>
            </div>
            <div className="edit-profile-title">
              <label htmlFor="title">Profile Title</label>
              <input
                type="text"
                placeholder={`@${username}`}
                value={username}
                onChange={(e) => changeUsername(e)}
              />
            </div>
            <div className="edit-profile-bio">
              <label htmlFor="bio">Bio</label>
              <textarea
                value={updatedData.bio}
                onChange={handleTextChange}
                name="bio"
                placeholder="Bio"
              ></textarea>
              <div className="textarea-count">
                {updatedData.bio.split(/\s+/).filter(Boolean).length}/80
              </div>
            </div>
          </div>
        </div>
        <div className="add-link-shop-section">
          <div className="add-link-shop">
            <button
              className={
                activeBtn == "links" ? "link-active-btn" : "profile-link-btn"
              }
              onClick={() => setActiveBtn("links")}
            >
              <img
                src={activeBtn == "links" ? whiteShop : blackShop}
                alt="Link"
              />
              Add Link
            </button>
            <button
              className={
                activeBtn == "shop" ? "link-active-btn" : "profile-shop-btn"
              }
              onClick={() => setActiveBtn("shop")}
            >
              <img
                src={activeBtn == "shop" ? whiteShop : blackShop}
                alt="Shop"
              />
              Add Shop
            </button>
          </div>
          <button className="add-link-btn">
            <img src={plus} alt="plus" />
            Add
          </button>
          {activeBtn == "links" ? (
            <div className="profile-show-links">
              <div className="list-bullet">
                <img src={dots} alt="Dots" />
              </div>
              <div className="list-link">
                <div className="link-details">
                  <div className="link-name-url">
                    <div className="link-name">
                      <p>Instagram</p>
                      <img src={editIcon} alt="Edit" />
                    </div>
                    <div className="link-url">
                      <p>https://www.instagram.com/opopo_08/</p>
                      <img src={editIcon} alt="Edit" />
                    </div>
                  </div>
                  <div className="link-active"></div>
                </div>
                <div className="link-clicks-delete-section">
                  <div className="link-clicks">
                    <img src={clicks} alt="Clicks" />
                    <p>0 clicks</p>
                  </div>
                  <img src={deleteIcon} alt="Delete" />
                </div>
              </div>
            </div>
          ) : (
            <div className="show-shops">
              {/* <div className="shop">
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
              </div> */}
            </div>
          )}
        </div>
        <div className="banner-section">
          <h2 className="banner-heading">Banner</h2>
          <div className="banner-edit-section">
            <div
              className="show-banner"
              style={{ backgroundColor: updatedData.bannerBackground }}
            >
              <div className="profile-photo-div">
                <img src={bigProfile} alt="ProfileIcon" />
              </div>
              <p
                className="banner-username"
                style={{
                  color:
                    updatedData.bannerBackground === "#FFFFFF"
                      ? "black"
                      : "white",
                }}
              >
                @{username}
              </p>
              <div className="banner-logo-username">
                <img src={updatedData.bannerBackground === "#FFFFFF" ? blackLogo : whiteLogo} alt="Logo" />
                <p style={{
                  color:
                    updatedData.bannerBackground === "#FFFFFF"
                      ? "black"
                      : "white",
                }}>/{username}</p>
              </div>
            </div>
            <div className="change-banner">
              <div className="choose-color-section">
                <h3 className="choose-color-heading">
                  Custom Background Color
                </h3>
                <div className="choose-color">
                  <div
                    className="brown-color-div"
                    onClick={() => changeBannerBg("#342B26")}
                  ></div>
                  <div
                    className="white-color-div"
                    onClick={() => changeBannerBg("#FFFFFF")}
                  ></div>
                  <div
                    className="black-color-div"
                    onClick={() => changeBannerBg("#000000")}
                  ></div>
                </div>
              </div>
              <div className="type-color">
                <div
                  className="show-typed-color"
                  style={{
                    backgroundColor: updatedData.bannerBackground,
                    border: updatedData.bannerBackground == "#FFFFFF" && "1px solid black"
                  }}
                ></div>
                <input
                  type="text"
                  placeholder="#000000"
                  value={updatedData.bannerBackground}
                  onChange={changeBannerInput}
                />
              </div>
            </div>
          </div>
          <button
            className="signup-btn save-profile-btn"
            onClick={(e) => handleSave(e)}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Links;
