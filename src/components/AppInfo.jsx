import React from "react";

const AppInfo = ({ imgSrc, appName, appDetails }) => {
  return (
    <div className="app-details">
      <img src={imgSrc} alt={appName} className="app-image" />
      <div className="app-content">
        <h3 className="app-name">{appName}</h3>
        <p className="app-desc">{appDetails}</p>
      </div>
    </div>
  );
};

export default AppInfo;
