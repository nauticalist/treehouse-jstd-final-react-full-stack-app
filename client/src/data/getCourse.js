import axios from "axios";

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
