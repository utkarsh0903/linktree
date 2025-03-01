import React, { useEffect, useState } from "react";
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
import { getLinks, updateProfile } from "../services";
import AddLink from "./AddLink";

const Links = ({ username, setUsername, bannerBackground, bio }) => {
  const [activeBtn, setActiveBtn] = useState("links");
  const [loading, setLoading] = useState(false);
  const [isSliderOn, setIsSliderOn] = useState(false);
  const [isLinkAdded, setIsLinkAdded] = useState(false);
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);
  const [userLinks, setUserLinks] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    username: username,
    bio: bio || "Bio",
    bannerBackground: bannerBackground || "#342B26",
  });

  useEffect(() => {
    setUpdatedData({
      username: username || "",
      bio: bio || "Bio",
      bannerBackground: bannerBackground || "#342B26",
    });
    getUserLinks();
    setIsLinkAdded(false);
  }, [bio, bannerBackground, isLinkAdded]);

  const getUserLinks = async () => {
    const res = await getLinks();
    if (res.status === 200) {
      const data = await res.json(res);
      setUserLinks(data.links);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

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
    const res = await updateProfile(updatedData);
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
    setLoading(false);
  };

  const handleAddLinkBtn = () => {
    setIsAddLinkModalOpen(true);
  };

  const links = userLinks.filter((link) => link.type === "links");
  const shops = userLinks.filter((link) => link.type === "shop");

  return (
    <div className="link-container">
      <MobileView
        username={username}
        bannerBackground={updatedData.bannerBackground}
        links={links}
        shops={shops}
      />
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
          <button className="add-link-btn" onClick={() => handleAddLinkBtn()}>
            <img src={plus} alt="plus" />
            Add
          </button>
          {isAddLinkModalOpen && (
            <AddLink setIsAddLinkModalOpen={setIsAddLinkModalOpen} setIsLinkAdded={setIsLinkAdded} />
          )}
          {activeBtn == "links" ? (
            links.length > 0 && (
              links.map((link) => (
                <div className="profile-show-links" key={link._id}>
              <div className="list-bullet">
                <img src={dots} alt="Dots" />
              </div>
              <div className="list-link">
                <div className="link-details">
                  <div className="link-name-url">
                    <div className="link-name">
                      <div className="link-flex" >
                        <p>{link.title}</p>
                        <img src={editIcon} alt="Edit" />
                      </div>
                      <div className="link-expiry-slider">
                        <div className="link-slider">
                          <input
                            type="checkbox"
                            id="active-slider"
                            className="change-slider"
                            checked={link.expiry}
                            onChange={() => setIsSliderOn(!isSliderOn)}
                          />
                          <label
                            htmlFor="active-slider"
                            className="move-slider"
                          ></label>
                        </div>
                      </div>
                    </div>
                    <div className="link-url">
                      <p>{link.url}</p>
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
              ))
            )
          ) : (
            shops.length > 0 && (
              shops.map((link) => (
                <div className="profile-show-links" key={link._id}>
              <div className="list-bullet">
                <img src={dots} alt="Dots" />
              </div>
              <div className="list-link">
                <div className="link-details">
                  <div className="link-name-url">
                    <div className="link-name">
                      <div className="link-flex" >
                        <p>{link.title}</p>
                        <img src={editIcon} alt="Edit" />
                      </div>
                      <div className="link-expiry-slider">
                        <div className="link-slider">
                          <input
                            type="checkbox"
                            id="active-slider"
                            className="change-slider"
                            checked={link.expiry}
                            onChange={() => setIsSliderOn(!isSliderOn)}
                          />
                          <label
                            htmlFor="active-slider"
                            className="move-slider"
                          ></label>
                        </div>
                      </div>
                    </div>
                    <div className="link-url">
                      <p>{link.url}</p>
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
              ))
            )
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
                <img
                  src={
                    updatedData.bannerBackground === "#FFFFFF"
                      ? blackLogo
                      : whiteLogo
                  }
                  alt="Logo"
                />
                <p
                  style={{
                    color:
                      updatedData.bannerBackground === "#FFFFFF"
                        ? "black"
                        : "white",
                  }}
                >
                  /{username}
                </p>
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
                    border:
                      updatedData.bannerBackground == "#FFFFFF" &&
                      "1px solid black",
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
