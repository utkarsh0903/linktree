import React, { useEffect, useState } from "react";
import MobileView from "./MobileView";
import { getLinks } from "../services/index.js";
import "../styles/appearance.css";

const Appearance = ({ username, bannerBackground }) => {
  const [userLinks, setUserLinks] = useState([]);
  useEffect(() => {
    getUserLinks();
  }, []);

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

  const links = userLinks.filter((link) => link.type === "links");
  const shops = userLinks.filter((link) => link.type === "shop");

  return (
    <div className="appearance-container">
      <MobileView
        username={username}
        bannerBackground={bannerBackground}
        links={links}
        shops={shops}
      />
      <div className="link-profile-edit hide-scrollbar">
        <div className="layout-section">
          <h2 className="layout-heading">Layout</h2>
          <div className="layout-edit-section">
            <div className="stack">
              <div className="stack-layout">
                <div className="stack-1"></div>
                <div className="stack-2"></div>
                <div className="stack-3"></div>
              </div>
              <p>Stack</p>
            </div>
            <div className="grid">
              <div className="grid-layout">
                <div className="grid-1"></div>
                <div className="grid-2"></div>
                <div className="grid-3"></div>
                <div className="grid-4"></div>
              </div>
              <p>Grid</p>
            </div>
            <div className="carousel">
              <div className="carousel-layout">
                <div className="carousel-1"></div>
                <div className="carousel-2"></div>
              </div>
              <p>Carousel</p>
            </div>
          </div>
        </div>
        <div className="button-section">
          <h2 className="button-heading">Buttons</h2>
          <div className="button-edit-section">
            <div className="button-group">
              <h3>Fill</h3>
              <button className="btn fill"></button>
              <button className="btn fill rounded"></button>
              <button className="btn fill rounded rounded-outline"></button>
            </div>

            <div className="button-group">
              <h3>Outline</h3>
              <button className="btn outline"></button>
              <button className="btn outline rounded"></button>
              <button className="btn outline curve"></button>
            </div>

            <div className="button-group">
              <h3>Hard Shadow</h3>
              <button className="btn shadow hard"></button>
              <button className="btn shadow hard rounded"></button>
              <button className="btn shadow hard rounded curve"></button>
            </div>

            <div className="button-group">
              <h3>Soft Shadow</h3>
              <button className="btn shadow soft"></button>
              <button className="btn shadow soft rounded"></button>
              <button className="btn shadow soft rounded curve"></button>
            </div>

            <div className="button-group">
              <h3>Special</h3>
              <button className="btn special wavy"></button>
              <button className="btn special wavy more"></button>
              <button className="btn special outline"></button>
              <button className="btn fill special curve"></button>
              <button className="btn special outline square"></button>
              <button className="btn fill special onesidecurve"></button>
            </div>

            <div className="color-section">
              <h3>Button Color</h3>
              <div className="choose-btn-color">
                <div className="show-choosen-color"></div>
                <input type="color" className="color-picker" placeholder="" />
              </div>

              <h3>Button Font Color</h3>
              <div className="choose-btn-color">
                <div className="show-choosen-color"></div>
                <input type="color" className="color-picker" placeholder="" />
              </div>
            </div>
          </div>
        </div>
        <button
          className="signup-btn save-profile-btn"
          onClick={(e) => handleSave(e)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Appearance;
