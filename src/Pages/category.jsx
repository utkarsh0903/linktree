import React, { useState } from "react";
import greenLogo from "../assets/greenLogo.png";
import { addUsername } from "../services";
import { useNavigate } from "react-router";

const Category = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleUsername = async (e) => {
    e.preventDefault();
    const res = await addUsername(username);
    if (res.status === 200) {
        const data = await res.json(res);
      alert(data.message);
      navigate("/dashboard");
      setUsername("");
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  return (
    <div className="category-container">
      <div className="category-logo">
        <img src={greenLogo} alt="Logo" className="logo" />
        <h2 className="logo-title">
          SPARK<sup>TM</sup>
        </h2>
      </div>
      <div className="category-input">
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="First Name"
          required
        />
        <button className="signup-btn" onClick={(e) => handleUsername(e)}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Category;
