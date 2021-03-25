import axios from "axios";

/**
 * Get logged in user information from api endpoint
 *
 * @param {string} email as username
 * @param {string} password
 * @returns {Promise} logged in user data
 */
export const getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/api/users", {
        responseType: "json",
        auth: {
          username: email,
          password: password,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resolve({ ...response.data, password });
        } else {
          reject(response.status);
        }
      })
      .catch((error) => {
        reject(error.response.status);
      });
  });
};
