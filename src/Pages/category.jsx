import React, { useEffect, useState } from "react";
import greenLogo from "../assets/greenLogo.png";
import { addUsername, getUser } from "../services";
import { useNavigate } from "react-router";
import halfBg from "../assets/halfBg.png";
import "../styles/register.css";
import business from "../assets/business.png";
import creative from "../assets/creative.png";
import education from "../assets/education.png";
import entertainment from "../assets/entertainment.png";
import fashion from "../assets/fashion.png";
import food from "../assets/food.png";
import govt from "../assets/govt.png";
import health from "../assets/health.png";
import other from "../assets/other.png";
import tech from "../assets/tech.png";
import tourism from "../assets/tourism.png";
import toast from "react-hot-toast";

const Category = () => {
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const navigate = useNavigate();

  const categories = [
    { name: "Business", image: business },
    { name: "Creative", image: creative },
    { name: "Education", image: education },
    { name: "Entertainment", image: entertainment },
    { name: "Fashion & Beauty", image: fashion },
    { name: "Food & Beverage", image: food },
    { name: "Government & Politics", image: govt },
    { name: "Health & Wellness", image: health },
    { name: "Non-Profit", image: other },
    { name: "Other", image: other },
    { name: "Tech", image: tech },
    { name: "Travel & Tourism", image: tourism },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    showUserDetails();
  }, []);

  const showUserDetails = async () => {
    const res = await getUser();
    if (res.status === 200) {
      const data = await res.json(res);
      // setIsLoading(false);
      if(data.username){
        setUsername(data.username);
      }
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleUsername = async (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      setCategoryError("Please select a category.");
      return;
    }
    setUsernameError("");
    setCategoryError("");
    const res = await addUsername(username);
    if (res.status === 200) {
      const data = await res.json(res);
      toast(
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#000000" }}>{data.message}</span>
        </div>,
        {
          duration: 2000,
          position: "top-center",
          style: {
            padding: "0.5em",
            border: "none",
            borderRadius: "8px",
            background: "#05A763",
            color: "#000000",
          },
        }
      );
      navigate("/dashboard");
      setUsername("");
    } else {
      const data = await res.json(res);
      if (data.errorType === "username") {
        setUsernameError(data.message);
      } else {
        toast(
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ color: "#000000" }}>{data.message}</span>
          </div>,
          {
            duration: 2000,
            position: "top-center",
            style: {
              padding: "0.5em",
              border: "none",
              borderRadius: "8px",
              background: "#FF003D",
              color: "#000000",
            },
          }
        );
      }
    }
  };

  return (
    <div className="category-container">
      <div className="left-container">
        <div className="login-logo">
          <img src={greenLogo} alt="Logo" className="logo" />
          <h2 className="logo-title">
            SPARK<sup>TM</sup>
          </h2>
        </div>
        <div className="category-content">
          <div className="category-heading">
            <h1>Tell us about yourself</h1>
          </div>
          <p className="category-subheading">
            For a personalized Spark experience
          </p>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Tell us your username"
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
          <p className="select-category">
            Select one category that best describes your Linktree:
          </p>
          <div className="category-grid">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`category-item ${
                  selectedCategory === category.name ? "selected" : ""
                }`}
                onClick={() => handleCategory(category.name)}
              >
                <img src={category.image} alt={category.name} />
                <p>{category.name}</p>
              </div>
            ))}
          </div>
          {categoryError && <p className="error-message">{categoryError}</p>}
          <button
            className="signup-btn continue-btn"
            onClick={(e) => handleUsername(e)}
          >
            Continue
          </button>
        </div>
      </div>
      <div className="right-container">
        <img className="half-bg" src={halfBg} alt="halfBg" />
      </div>
    </div>
  );
};

export default Category;
