import React, { useEffect, useState } from "react";
import whiteShop from "../assets/whiteShop.png";
import blackShop from "../assets/blackShop.png";
import editIcon from "../assets/editIcon.png";
import deleteIcon from "../assets/deleteIcon.png";
import copyIcon from "../assets/copyIcon.png";
import instaColor from "../assets/instaColor.png";
import fbColor from "../assets/fbColor.png";
import youtubeColor from "../assets/youtubeColor.png";
import xColor from "../assets/xColor.png";
import "../styles/addlink.css";
import { addLinks } from "../services";

const AddLink = ({ setIsAddLinkModalOpen, setIsLinkAdded }) => {
  const [activeBtn, setActiveBtn] = useState("links");
  const [isSliderOn, setIsSliderOn] = useState(false);
  const [addLinkData, setAddLinkData] = useState({
    title: "",
    url: "",
    type: "links",
    expiry: false,
    socialMedia: "",
  });

  useEffect(() => {
    setAddLinkData((prev) => ({
      ...prev,
      type: activeBtn,
    }));
  }, [activeBtn]);

  const handleSlider = () => {
    setIsSliderOn(!isSliderOn);
    setAddLinkData((prev) => ({
      ...prev,
      expiry: !prev.expiry,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddLinkData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMediaIcon = (app) => {
    setAddLinkData((prev) => ({
      ...prev,
      socialMedia: app,
    }));
  };

  const handleSubmit = async () => {
    if (!addLinkData.title || !addLinkData.url) {
      alert("Please fill out both fields!");
      return;
    }
    const res = await addLinks(addLinkData);
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
      setIsLinkAdded(true);
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
    setIsAddLinkModalOpen(false);
  };

  return (
    <div className="overlay">
      <div className="container">
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
            <img src={activeBtn == "shop" ? whiteShop : blackShop} alt="Shop" />
            Add Shop
          </button>
        </div>
        <div className="add-link-content">
          <div className="add-link-div">
            <h1 className="add-link-heading">Enter URL</h1>
            <div className="enter-title-url-div">
              <div className="enter-title-div">
                <div className="title-div">
                  <input
                    type="text"
                    placeholder="Link title"
                    name="title"
                    value={addLinkData.title}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <img src={editIcon} alt="Edit" />
                </div>
                <div className="link-expiry-slider">
                  <div className="link-slider">
                    <input
                      type="checkbox"
                      id="active-slider"
                      className="change-slider"
                      checked={isSliderOn}
                      onChange={() => handleSlider()}
                    />
                    <label
                      htmlFor="active-slider"
                      className="move-slider"
                    ></label>
                  </div>
                </div>
              </div>
              <div className="enter-url-div">
                <div className="url-div">
                  <input
                    type="text"
                    placeholder="Link Url"
                    name="url"
                    value={addLinkData.url}
                    onChange={handleInputChange}
                  />
                  <img src={editIcon} alt="Edit" />
                </div>
                <div className="copy-delete-icons">
                  <img src={copyIcon} alt="Copy" />
                  <img src={deleteIcon} alt="Delete" />
                </div>
              </div>
            </div>
            <div className="add-link-applications">
              <h3 className="add-link-application-heading">Applications</h3>
              <div className="link-applications">
                <div
                  className="insta-application"
                  onClick={() => handleMediaIcon("insta")}
                >
                  <div
                    className={`social-media-insta-application ${
                      addLinkData.socialMedia === "insta" ? "selected" : ""
                    }`}
                  >
                    <img src={instaColor} alt="Insta" />
                  </div>
                  <h4>{activeBtn == "links" ? "Instagram" : "Amazon"}</h4>
                </div>
                <div
                  className="insta-application"
                  onClick={() => handleMediaIcon("fb")}
                >
                  <div
                    className={`social-media-insta-application ${
                      addLinkData.socialMedia === "fb" ? "selected" : ""
                    }`}
                  >
                    <img src={fbColor} alt="Fb" />
                  </div>
                  <h4>{activeBtn == "links" ? "FaceBook" : "Flipkart"}</h4>
                </div>
                <div
                  className="insta-application"
                  onClick={() => handleMediaIcon("yt")}
                >
                  <div
                    className={`social-media-insta-application ${
                      addLinkData.socialMedia === "yt" ? "selected" : ""
                    }`}
                  >
                    <img src={youtubeColor} alt="Youtube" />
                  </div>
                  <h4>{activeBtn == "links" ? "YouTube" : "Myntra"}</h4>
                </div>
                <div
                  className="insta-application"
                  onClick={() => handleMediaIcon("x")}
                >
                  <div
                    className={`social-media-insta-application ${
                      addLinkData.socialMedia === "x" ? "selected" : ""
                    }`}
                  >
                    <img src={xColor} alt="X" />
                  </div>
                  <h4>{activeBtn == "links" ? "X" : "Meesho"}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="add-link-btns">
          <button
            className="signup-btn close-modal-btn"
            onClick={() => setIsAddLinkModalOpen(false)}
          >
            Close
          </button>
          <button
            className="signup-btn close-modal-btn"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLink;
