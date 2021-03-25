import axios from "axios";

/**
 * posts new user data to endpoint
 *
 * @param {Object} user
 * @returns {Promise}
 */
export const createUser = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/users`, user, { responseType: "json" })
      .then((response) => {
        if (response.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error.response);
      });
  });
};
