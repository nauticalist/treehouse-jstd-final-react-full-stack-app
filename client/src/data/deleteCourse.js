import axios from "axios";

/**
 * send delete request to course endpoint with credentials
 *
 * @param {number} id course id
 * @param {Object} user
 * @returns {Promise}
 */
export const deleteCourse = (id, user) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/courses/${id}`, {
        responseType: "json",
        auth: {
          username: user.emailAddress,
          password: user.password,
        },
      })
      .then((response) => {
        if (response.status === 204) {
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
