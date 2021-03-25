import axios from "axios";

/**
 * get course details with given course id from courses endpoint
 *
 * @param {number} courseId
 * @returns {Promise}
 */
export const getCourse = (courseId) => {
  return new Promise((resolve, reject) =>
    axios
      .get(`/api/courses/${courseId}`, { responseType: "json" })
      .then((response) => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error.response);
      })
  );
};
