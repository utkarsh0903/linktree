import React, { useEffect, useState } from "react";
import "../App.css";
import "../styles/register.css";
import { register } from "../services/index";
import { Link, useNavigate } from "react-router-dom";
import halfBg from "../assets/halfBg.png";
import greenLogo from "../assets/greenLogo.png";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    const res = await register(registerData);
    if (res.status === 200) {
      const data = await res.json(res);
      alert(data.message);
      navigate("/login");
      setRegisterData({
        username: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      const data = await res.json(res);
      const errorMap = {};
      errorMap[data.errorType] = data.message;

      setErrors(errorMap);
    }
  };

  return (
    <div className="register-container">
      <div className="left-container">
        <div className="login-logo">
          <img src={greenLogo} alt="Logo" className="logo" />
          <h2 className="logo-title">
            SPARK<sup>TM</sup>
          </h2>
        </div>
        <div className="register-content">
          <div className="register-heading">
            <h1>Sign up to your Spark</h1>
          </div>
          <div className="top-content">
            <h2>Create an account</h2>
            <button className="login-btn btn">
              <Link to="/login" className="login-link">
                Sign in instead
              </Link>
            </button>
          </div>

          <form className="register-data" onSubmit={handleRegister}>
            <label className="firstname-section" htmlFor="firstname">
              First name
            </label>
            <input
              type="text"
              name="firstname"
              value={registerData.firstname}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {errors.firstname && (
              <p className="error-message">{errors.firstname}</p>
            )}
            <label className="lastname-section" htmlFor="lastname">
              Last name
            </label>
            <input
              type="text"
              name="lastname"
              value={registerData.lastname}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {errors.lastname && (
              <p className="error-message">{errors.lastname}</p>
            )}
            <label className="email-section" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
            <label className="password-section" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {errors.password && (
              <p className="error-message password hide-scrollbar">{errors.password}</p>
            )}
            <label
              className="confirm-password-section"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
            <div className="checkbox-div">
              <input type="checkbox" />
              <p>
                By creating an account, I agree to our{" "}
                <span>Terms of use </span>
                and <span>Privacy Policy</span>{" "}
              </p>
            </div>
            <button className="register-btn signup-btn" type="submit">
              Create an account
            </button>
          </form>
          <div className="login-request">
            <p>
              This site is protected by reCAPTCHA and the{" "}
              <span>Google Privacy Policy</span>and{" "}
              <span>Terms of Service</span>apply.
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

export default Register;
