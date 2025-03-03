import React, { useEffect, useState } from "react";
import MobileView from "./MobileView";
import {getLinks} from "../services/index.js";

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
      <div className="appearance-content"></div>
    </div>
  );
};

export default Appearance;
