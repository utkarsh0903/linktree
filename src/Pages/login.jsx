import React, { useEffect, useState } from "react";
import "../App.css";
// import "../styles/login.css";
import { login } from "../services";
import { Link, useNavigate } from "react-router-dom";
import greenLogo from "../assets/greenLogo.png";
import halfBg from "../assets/halfBg.png";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(loginData);
    if (res.status === 200) {
      const data = await res.json(res.token);
      localStorage.setItem("token", data.token);
      alert("Login successfully");
      navigate("/dashboard");
      setLoginData({
        email: "",
        password: "",
      });
    } else {
      const data = await res.json(res);
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="left-container">
        <img className="logo" src={greenLogo} alt="Logo" />
        <div className="register-content">
          <div className="heading">
            <h1>Sign in to your Spark</h1>
          </div>
        </div>
        <form className="user-data" onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Email id"
            required
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Password"
            required
          />
          <button className="login-btn" type="submit">
            Log in
          </button>
        </form>
        <div className="signup-request">
          <p>
            Don't have an account?<Link to="/"> Sign up</Link>
          </p>
        </div>
        <p>
          This site is protected by reCAPTCHA and the{" "}
          <span>Google Privacy Policy</span>and <span>Terms of Service</span>
          apply.
        </p>
      </div>
      <div className="right-container">
        <img className="half-bg" src={halfBg} alt="halfBg" />
      </div>
    </div>
  );
};

export default Login;
