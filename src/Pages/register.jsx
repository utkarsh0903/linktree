import React, { useEffect, useState } from "react";
import "../App.css";
// import "../styles/register.css";
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

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(registerData);
    const res = await register(registerData);
    if (res.status === 200) {
      alert("Registered successfully");
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
      alert(data.message);
    }
  };

  return (
    <div className="register-container">
      <div className="left-container">
        <img className="logo" src={greenLogo} alt="Logo" />
        <div className="register-content">
          <div className="heading">
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

          <form className="user-data" onSubmit={handleRegister}>
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
              placeholder="First Name"
              required
            />
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
              placeholder="Last Name"
              required
            />
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
              placeholder="Email"
              required
            />
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
              placeholder="Password"
              required
            />
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
              placeholder="Confirm Password"
              required
            />
            <input type="checkbox" />
            <p>By creating an account, I agree to our <span>Terms of use </span> 
            and <span>Privacy Policy</span> </p>
            <button className="register-btn" type="submit">
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
