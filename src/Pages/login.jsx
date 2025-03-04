import React, { useEffect, useState } from "react";
import "../App.css";
import "../styles/register.css";
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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    const res = await login(loginData);
    if (res.status === 200) {
      const data = await res.json(res.token);
      localStorage.setItem("token", data.token);
      alert(data.message);
      navigate("/category");
      setLoginData({
        email: "",
        password: "",
      });
    } else {
      const data = await res.json(res);
      const errorMap = {};
      if (data.errorType) {
        errorMap[data.errorType] = data.message;
      } else {
        alert(data.message);
      }

      setErrors(errorMap);
    }
  };

  return (
    <div className="login-container">
      <div className="left-container">
        <div className="login-logo">
          <img src={greenLogo} alt="Logo" className="logo" />
          <h2 className="logo-title">
            SPARK<sup>TM</sup>
          </h2>
        </div>
        <div className="register-content">
          <div className="register-heading">
            <h1>Sign in to your Spark</h1>
          </div>

          <form className="register-data login-data" onSubmit={handleLogin}>
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
              placeholder="Spark/Username"
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
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
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
            <button className="signup-btn login-btn" type="submit">
              Log in
            </button>
          </form>
          <div className="forget-password">
            <p>Forgot password?</p>
          </div>

          <div className="signup-request">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="register-link">
                Sign up
              </Link>
            </p>
          </div>
          <div className="login-request ">
            <p>
              This site is protected by reCAPTCHA and the{" "}
              <span>Google Privacy Policy</span>and{" "}
              <span>Terms of Service</span>
              apply.
            </p>
          </div>
        </div>
      </div>
      <div className="right-container">
        <img className="half-bg" src={halfBg} alt="halfBg" />
      </div>
    </div>
  );
};

export default Login;
