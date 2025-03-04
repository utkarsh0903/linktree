const URL = "http://localhost:9000/api";
// const URL = "https://linktree-backend-tsgy.onrender.com/api";

export const register = (data) => {
  return fetch(`${URL}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const login = (data) => {
  return fetch(`${URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const addUsername = (username) => {
  return fetch(`${URL}/user/username`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ username }),
  });
};

export const getUser = () => {
  return fetch(`${URL}/user/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const updateProfile = (data) => {
  return fetch(`${URL}/user/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateUser = (data) => {
  return fetch(`${URL}/user/update-user-info`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const addLinks = (data) => {
  return fetch(`${URL}/link/add-links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};

export const getLinks = () => {
  return fetch(`${URL}/link/get-links`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const updateClick = async (id) => {
  return fetch(`${URL}/link/${id}/click`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const getUserById = (userId) => {
  return fetch(`${URL}/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

export const getLinksById = (userId) => {
  return fetch(`${URL}/link/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
};

//   export const getClicksData = () => {
//     return fetch(`${URL}/analyse/clicks`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${localStorage.getItem("token")}`,
//       },
//     });
//   };
