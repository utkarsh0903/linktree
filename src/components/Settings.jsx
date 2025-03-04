import React, { useState } from "react";
import "../styles/settings.css";
import { updateUser } from "../services";
import toast from "react-hot-toast";

const Settings = ({ activeUser, setActiveUser }) => {
  const [userDetails, setUserDetails] = useState(activeUser);
  const [updatedFields, setUpdatedFields] = useState({});
  const [confirmPassword, setConfirmPassword] = useState(activeUser.password);
  const [errors, setErrors] = useState({});

  const handleSave = async () => {
    let newErrors = {};

    if (userDetails.password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (userDetails.firstname !== activeUser.firstname) {
      updatedFields.firstname = userDetails.firstname;
    }
    if (userDetails.lastname !== activeUser.lastname) {
      updatedFields.lastname = userDetails.lastname;
    }
    if (userDetails.email !== activeUser.email) {
      updatedFields.email = userDetails.email;
    }
    if (userDetails.password !== activeUser.password) {
      updatedFields.password = userDetails.password;
    }

    if (Object.keys(updatedFields).length === 0) {
      toast(
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: "#000000" }}>No Changes detected</span>
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
      setErrors({});
      return;
    }
    const res = await updateUser(updatedFields);
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
      setActiveUser(userDetails);
      setUpdatedFields({});
      setErrors({});
    } else {
      const data = await res.json(res);
      let backendErrors = {};
      if (data.errorType) {
        backendErrors[data.errorType] = data.message;
      }
      setErrors(backendErrors);
      setUserDetails(activeUser);
      setConfirmPassword(activeUser.password);
      setUpdatedFields({});
    }
  };

  return (
    <div className="settings-container hide-scrollbar">
      <h2 className="settings-heading">Edit Profile</h2>
      <hr />
      <div className="edit-first-name">
        <label className="name-section" htmlFor="firstname">
          First name
        </label>
        <input
          type="text"
          name="firstname"
          value={userDetails.firstname}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
        {errors.firstname && (
          <p className="error-message">{errors.firstname}</p>
        )}
      </div>
      <div className="edit-last-name">
        <label className="name-section" htmlFor="lastname">
          Last name
        </label>
        <input
          type="text"
          name="lastname"
          value={userDetails.lastname}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
        {errors.lastname && <p className="error-message">{errors.lastname}</p>}
      </div>
      <div className="edit-email">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            })
          }
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div className="edit-password">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails({
              ...userDetails,
              [e.target.name]: e.target.value,
            })
          }
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
      </div>
      <div className="edit-confirm-password">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
        <p className="error-message">{errors.confirmPassword}</p>
      )}
      </div>
      <button className="save-btn signup-btn" onClick={() => handleSave()}>
        Save
      </button>
    </div>
  );
};

export default Settings;
