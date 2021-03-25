import axios from "axios";

/**
 * posts new course data to endpoint with credentials
 *
 * @param {Object} course
 * @param {Object} user
 * @returns {Promise}
 */
export const createCourse = (course, user) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`/api/courses`, course, {
        responseType: "json",
        auth: {
          username: user.emailAddress,
          password: user.password,
        },
      })
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
