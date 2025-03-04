import React, { useState } from "react";
// import "../styles/settings.css";
// import { updateUser } from "../services";
import { useNavigate } from "react-router";

const Settings = ({ activeUser }) => {
  const [userDetails, setUserDetails] = useState(activeUser);
  const [updatedFields, setUpdatedFields] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSave = async () => {
    if(userDetails.password != confirmPassword){
      alert("Password do not match");
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
      alert("No changes detected.");
      return;
    }

    console.log(updatedFields)
    // const res = await updateUser(updatedFields);
    // if (res.status === 200) {
    //   if(nameChanged) updateShortName(updatedFields.username);
    //   const data = await res.json(res);
    //   alert(data.message);
    //   setActiveUser(userDetails);
    //   setUpdatedFields({});
    // } else {
    //   const data = await res.json(res);
    //   alert(data.message);
    //   setUserDetails(activeUser);
    // }
  };

  return (
    <div className="settings-container">
      {console.log(userDetails)}
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
      </div>
      <div className="edit-password">
        <label htmlFor="mobile">Password</label>
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
      </div>
      <div className="edit-confirm-password">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
        />
      </div>
      <button className="save-btn signup-btn" onClick={() => handleSave()}>
        Save
      </button>
    </div>
  );
};

export default Settings;
